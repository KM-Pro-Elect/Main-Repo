import React from "react";

interface CategoryCardProps {
  title: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col w-[30%] max-md:w-full max-md:ml-0 mb-5"
    >
      <div className="bg-[#319F43] shadow-md border grow w-full flex flex-col justify-center px-5 py-9 rounded-[20px] border-[rgba(0,0,0,0.2)] border-solid hover:bg-[#267C33] transition-all duration-200 active:scale-95">
        <div className="text-white text-center text-[22px] font-semibold self-stretch">
          {title}
        </div>
      </div>
    </button>
  );
};
