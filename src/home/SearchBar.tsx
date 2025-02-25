import React from "react";

export const SearchBar = () => {
  return (
    <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border flex w-[1002px] max-w-full items-stretch gap-5 text-[22px] text-[rgba(142,139,139,1)] font-normal flex-wrap justify-between mt-[50px] px-[37px] py-[19px] rounded-[30px] border-[rgba(0,0,0,0.2)] border-solid max-md:mt-10 max-md:px-5">
      <input
        type="text"
        placeholder="Search for a specific policy (eg. Attendance policy, Dress code)..."
        className="bg-transparent border-none outline-none flex-1 text-[22px]"
        aria-label="Search policies"
      />
      <button aria-label="Search">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/2b9b0ea8c50ae8110f1d276b644de71a539e292b51160062fd5f058b80c9cb1d?placeholderIfAbsent=true"
          alt="Search"
          className="aspect-[1] object-contain w-[25px] shrink-0"
        />
      </button>
    </div>
  );
};
