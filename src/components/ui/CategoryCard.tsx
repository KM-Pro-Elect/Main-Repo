import React from "react";

interface CategoryCardProps {
  title: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => {
  return (
    <div className="w-[33%] max-md:w-full max-md:ml-0">
      <button
        className="bg-[rgba(49,159,67,1)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] grow text-[22px] text-white font-semibold text-center w-full px-[70px] py-[42px] rounded-[20px] max-md:mt-5 max-md:px-5 hover:bg-[rgba(44,143,60,1)] transition-colors"
        aria-label={`View ${title} policies`}
      >
        {title}
      </button>
    </div>
  );
};
