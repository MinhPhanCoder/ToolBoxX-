import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MessageCircleIcon, SendIcon, UserIcon, BotIcon, RefreshCwIcon, XIcon } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const ChatGPTTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      let response = '';
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        response = 'Hello! How can I assist you today?';
      } else if (lowercaseInput.includes('weather')) {
        response = "I don't have access to real-time weather data, but I can help you find a weather service or answer general questions about weather patterns.";
      } else if (lowercaseInput.includes('help')) {
        response = "I'm here to help! You can ask me questions, request information, or just chat. What would you like to know?";
      } else if (lowercaseInput.includes('thank')) {
        response = "You're welcome! Feel free to ask if you need anything else.";
      } else if (lowercaseInput.includes('name')) {
        response = "I'm an AI assistant here to help you with your questions and tasks.";
      } else {
        response = "That's an interesting question. I'm a simulated AI in this demo, so my responses are pre-programmed. In a real implementation, this would connect to an actual AI service like GPT.";
      }
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date()
    }]);
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col h-[calc(100vh-12rem)] transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircleIcon size={24} className="text-purple-500 dark:text-purple-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('chatGPT')}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={clearChat} leftIcon={<RefreshCwIcon size={16} />}>
            New Chat
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map(message => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
              <div className="flex items-center mb-1">
                {message.role === 'user' ? <UserIcon size={16} className="text-blue-700 dark:text-blue-400 mr-1" /> : <BotIcon size={16} className="text-purple-700 dark:text-purple-400 mr-1" />}
                <span className="text-xs font-medium">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-sm">
                {message.content}
              </div>
            </div>
          </div>)}
        <div ref={messagesEndRef} />
        {loading && <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{
              animationDelay: '0ms'
            }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{
              animationDelay: '150ms'
            }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{
              animationDelay: '300ms'
            }}></div>
              </div>
            </div>
          </div>}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input placeholder="Type your message..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} fullWidth disabled={loading} />
          </div>
          <Button onClick={handleSend} disabled={!input.trim() || loading} isLoading={loading} leftIcon={!loading ? <SendIcon size={16} /> : undefined}>
            Send
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This is a simulated chat interface. In a real implementation, it would
          connect to an actual AI service.
        </p>
      </div>
    </div>;
};
export default ChatGPTTool;