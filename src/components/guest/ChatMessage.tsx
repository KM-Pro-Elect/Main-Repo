
import React from 'react';
import { User, Bot } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start mb-4 gap-3 animate-fade-in ${
        isUser ? 'animate-slide-in-left' : 'animate-slide-in-right'
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-chat-user text-white' : 'bg-chat-assistant text-foreground'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          isUser
            ? 'bg-chat-user text-white'
            : 'glass-panel'
        }`}
      >
        <p className="text-sm md:text-base">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
