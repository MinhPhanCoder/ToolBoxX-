import React, { useState } from 'react';
import { SendIcon, UserIcon, BotIcon, RefreshCwIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
const ChatGPT = () => {
  const {
    t
  } = useLanguage();
  const {
    currentUser
  } = useAuth();
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getMockResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  const getMockResponse = (input: string): string => {
    const responses = ['I understand your question. Let me help you with that.', "That's an interesting point. Here's what I think...", 'Based on my knowledge, I would suggest...', 'Let me provide some information about that...', 'I can help you understand this better.'];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };
  return <div className="w-full h-[calc(100vh-12rem)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('chatGPT')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Chat with an AI assistant to get answers to your questions.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={clearChat} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <RefreshCwIcon size={16} className="mr-2" />
            Clear Chat
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.sender === 'user' ? <UserIcon size={16} className="text-blue-600" /> : <BotIcon size={16} className="text-gray-600" />}
              </div>
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  {message.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>)}
          {isLoading && <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <BotIcon size={16} className="text-gray-600" />
              </div>
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{
              animationDelay: '0.2s'
            }}></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{
              animationDelay: '0.4s'
            }}></div>
              </div>
            </div>}
        </div>
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-4">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" disabled={!input.trim() || isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center">
              <SendIcon size={16} className="mr-2" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default ChatGPT;