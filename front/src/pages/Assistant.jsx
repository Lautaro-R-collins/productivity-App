import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/groqService';
import AssistantHeader from '../components/assistant/AssistantHeader';
import ChatMessageList from '../components/assistant/ChatMessageList';
import ChatInput from '../components/assistant/ChatInput';

const Assistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola, Lauta! Soy tu asistente impulsado por IA. ¿En qué te puedo ayudar hoy con tu productividad?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (inputText) => {
    const userMsg = { role: 'user', content: inputText.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const aiResponseContent = await generateChatResponse(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: aiResponseContent }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: '❌ Lo siento, ocurrió un error al intentar conectarme con el cerebro de la IA. Por favor, verifica tu API Key o conexión a internet.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-slate-900 border-l border-slate-800">
      <AssistantHeader isTyping={isLoading} />
      
      <ChatMessageList 
        messages={messages} 
        isLoading={isLoading} 
        messagesEndRef={messagesEndRef} 
      />
      
      <ChatInput 
        onSend={handleSend} 
        isLoading={isLoading} 
      />
    </main>
  );
};

export default Assistant;
