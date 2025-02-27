import React from "react";

export const Header = () => {
  return (
    <header className="flex w-full max-w-[1374px] items-stretch gap-[40px_100px] flex-wrap max-md:max-w-full">
      <nav className="grow shrink basis-auto max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-1/5 max-md:w-full max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a15453eaca75974dc02d292e7448c7126333252cba35c6000812ad07e30db737?placeholderIfAbsent=true"
              alt="NEUPoliSeek Logo"
              className="aspect-[1] object-contain w-[101px] shrink-0 max-w-full max-md:mt-10"
            />
          </div>
          <div className="w-4/5 ml-5 max-md:w-full max-md:ml-0">
            <div className="text-black text-[22px] font-semibold self-stretch my-auto max-md:mt-10">
              Home About Us Contact
            </div>
          </div>
        </div>
      </nav>
      <div className="flex items-stretch gap-9 my-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/bf5834d7ef2f47c1c0e03a904da3f4fd434d9906473c3fdebfd943354ba46957?placeholderIfAbsent=true"
          alt="User Icon"
          className="aspect-[1] object-contain w-10 shrink-0 my-auto"
        />
        <div className="flex items-stretch">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/f559f5b5469f122ba5ac3cc86b241e2d5ee59aacf2762f8f04be06dedbc42300?placeholderIfAbsent=true"
            alt="Settings"
            className="aspect-[1.05] object-contain w-20 shrink-0"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a173d29bb6ba64cd7034e49a4aa0e670371f0ca6d331a87a20afdb8ab45c065c?placeholderIfAbsent=true"
            alt="Menu"
            className="aspect-[1] object-contain w-[50px] shrink-0 my-auto"
          />
        </div>
      </div>
    </header>
  );
};