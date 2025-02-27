import React from "react";
import { BrandLogo } from "./BrandLogo";
import { LoginImages } from "./LoginImages";
import { LoginForm } from "./LoginForm";

export const LoginLayout: React.FC = () => {
  return (
    <main className="bg-white min-h-screen overflow-hidden">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <section className="w-6/12 max-md:w-full max-md:ml-0">
          <div className="mr-[-22px] mt-[29px] max-md:max-w-full">
            <div className="flex w-full flex-col pl-[34px] max-md:max-w-full max-md:pl-5">
              <BrandLogo />
              <LoginImages />
            </div>
          </div>
        </section>

        <section className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="h-screen bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
};