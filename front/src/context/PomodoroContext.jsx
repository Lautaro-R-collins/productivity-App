import React, { createContext, useContext, useState, useEffect } from 'react';

const PomodoroContext = createContext();

const MODES = {
  POMODORO: { id: 'pomodoro', name: 'Pomodoro', defaultTime: 25 * 60 },
  SHORT_BREAK: { id: 'short_break', name: 'Descanso Corto', defaultTime: 5 * 60 },
  LONG_BREAK: { id: 'long_break', name: 'Descanso Largo', defaultTime: 15 * 60 },
};

export const PomodoroProvider = ({ children }) => {
  const getSavedSettings = () => {
    const saved = localStorage.getItem('pomodoroSettings');
    if (saved) return JSON.parse(saved);
    return { pomodoro: 25, short_break: 5, long_break: 15 };
  };

  const [settings] = useState(getSavedSettings());
  const [currentMode, setCurrentMode] = useState(MODES.POMODORO);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isActive, setIsActive] = useState(false);

  // Lógica del Cronómetro Global
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // eslint-disable-next-line
      setIsActive(false);
      
      // Emitir sonido
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.log('Audio permissions blocked by browser', e));

      // Notificaciones Nativas del Navegador
      if (Notification.permission === 'granted') {
        new Notification('¡Tiempo terminado!', { body: `Tu fase de ${currentMode.name} ha finalizado.` });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('¡Tiempo terminado!', { body: `Tu fase de ${currentMode.name} ha finalizado.` });
          }
        });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings[currentMode.id] * 60);
  };

  const changeMode = (modeKey) => {
    const newMode = MODES[modeKey];
    setCurrentMode(newMode);
    setTimeLeft(settings[newMode.id] * 60);
    setIsActive(false);
  };

  return (
    <PomodoroContext.Provider value={{
      settings,
      currentMode,
      timeLeft,
      isActive,
      toggleTimer,
      resetTimer,
      changeMode,
      MODES
    }}>
      {children}
    </PomodoroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePomodoro = () => useContext(PomodoroContext);
