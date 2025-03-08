import React from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { CategoryGrid } from "./CategoryGrid";
import { FAQSection } from "./FAQSection";

const UserHome = () => {
  return (
    <main className="bg-white flex flex-col items-center px-5 py-8">
      <div className="w-full max-w-[1374px] flex flex-col items-center">
        <Header />
        <SearchBar />
        <CategoryGrid />
        <FAQSection />
      </div>
    </main>
  );
};

export default UserHome;