
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-auto flex items-center gap-2 border-t border-border bg-background p-4 sticky bottom-0 z-10 backdrop-blur-sm"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about school policies..."
        className="flex-1 bg-secondary/50 border border-border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`rounded-full p-3 transition-all ${
          input.trim() && !isLoading
            ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;
