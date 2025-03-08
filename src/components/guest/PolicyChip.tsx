
import React from 'react';

interface PolicyChipProps {
  text: string;
  onClick: (text: string) => void;
}

const PolicyChip = ({ text, onClick }: PolicyChipProps) => {
  return (
    <button
      className="px-4 py-2 rounded-full text-sm bg-secondary hover:bg-secondary/80 
      text-secondary-foreground transition-all duration-200 border border-border 
      shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/50"
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};

export default PolicyChip;
