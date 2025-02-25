import React from "react";

export const BrandLogo: React.FC = () => {
  return (
    <div className="flex items-stretch gap-[25px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/93b5817c8b80bc3234215f3b139e7a7a537be1baed71d47a6e0dd4a9acc6063e?placeholderIfAbsent=true"
        alt="NEUPoliSeek Logo"
        className="aspect-[1] object-contain w-[111px] shrink-0 max-w-full"
      />
      <div className="text-[35px] text-black font-semibold my-auto">
        NEUPoliSeek
      </div>
    </div>
  );
};
