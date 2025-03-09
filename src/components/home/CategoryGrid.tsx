import React, { useState } from "react";
import { supabase } from "../SupabaseClient";
import { CategoryCard } from "./CategoryCard";
import { PdfModal } from "../PdfModal"; 

const categories = [
  "Academic Policies",
  "Attendance Policies",
  "Discipline Policies",
  "Safety Policies",
  "Extracurricular Policies",
  "Technology Use Policies",
];

export const CategoryGrid: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCategoryClick = async (category: string) => {
    // Fetch the specific "NEUPoliseek.pdf" file in the category folder
    const { data } = supabase.storage
      .from("NEUPoliSeek")
      .getPublicUrl(`${category}/NEUPoliSeek.pdf`);

    if (!data.publicUrl) {
      alert(`No PDF found for ${category}`);
      return;
    }

    setPdfUrl(data.publicUrl);
    setModalOpen(true); // Open modal
  };

  return (
    <section className="mt-14 w-full">
      <h2 className="text-black text-[25px] font-semibold mb-5">
        Explore Policies by Category
      </h2>
      <div className="border w-full h-px border-black border-solid" />
      <div className="w-full max-w-[1075px] mt-[19px] max-md:max-w-full mx-auto">
        <div className="gap-5 flex flex-wrap justify-center">
          {categories.map((category) => (
            <CategoryCard 
              key={category} 
              title={category} 
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      {modalOpen && pdfUrl && (
        <PdfModal pdfUrl={pdfUrl} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
};