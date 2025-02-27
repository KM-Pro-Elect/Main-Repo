import React from "react";

interface CategoryCardProps {
  title: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => {
  return (
    <div className="flex flex-col w-[30%] max-md:w-full max-md:ml-0 mb-5">
      <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border grow w-full items-center flex flex-col justify-center px-5 py-9 rounded-[20px] border-[rgba(0,0,0,0.2)] border-solid">
        <div className="text-black text-center text-[22px] font-semibold self-stretch">
          {title}
        </div>
      </div>
    </div>
  );
};