import * as React from "react";
import { WelcomeCard } from "@/components/auth/WelcomeCard";

const Index = () => {
  return (
    <main
      className="bg-white relative flex items-start gap-2.5 overflow-hidden justify-center flex-wrap px-[370px] py-[162px] max-md:px-5 max-md:py-[100px]"
      role="main"
      aria-label="Welcome page"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/c1f1f771b9982e93bacdef2dac3a582842dc5d837320e7d3285f967e65fbb99a?placeholderIfAbsent=true"
        alt="Background decoration"
        className="aspect-[2.82] object-contain w-[1300px] absolute z-0 h-[510px] grow shrink bottom-0.5 inset-x-0 max-md:max-w-full"
      />
      <WelcomeCard />
    </main>
  );
};

export default Index;
