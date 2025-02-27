import React from "react";
import { CategoryCard } from "./CategoryCard";

const categories = [
  "Academic Policies",
  "Attendance Policies",
  "Discipline Policies",
  "Safety Policies",
  "Extracurricular Policies",
  "Technology Use Policies",
];

export const CategoryGrid = () => {
  return (
    <section className="mt-14 w-full">
      <h2 className="text-black text-[25px] font-semibold mb-5">
        Explore Policies by Category
      </h2>
      <div className="border w-full h-px border-black border-solid" />
      <div className="w-full max-w-[1075px] mt-[19px] max-md:max-w-full">
        <div className="gap-5 flex flex-wrap max-md:flex-col max-md:items-stretch">
          {categories.map((category) => (
            <CategoryCard key={category} title={category} />
          ))}
        </div>
      </div>
    </section>
  );
};