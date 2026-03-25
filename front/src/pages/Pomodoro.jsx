import ModeSelector from '../components/pomodoro/ModeSelector';
import TimerDisplay from '../components/pomodoro/TimerDisplay';
import Controls from '../components/pomodoro/Controls';

const Pomodoro = () => {
  return (
    <main className="flex-1 min-h-screen overflow-auto bg-slate-900 p-6 text-slate-300 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-10 flex flex-col items-center">
        <ModeSelector />
        <TimerDisplay />
        <Controls />
      </div>
    </main>
  );
};

export default Pomodoro;
