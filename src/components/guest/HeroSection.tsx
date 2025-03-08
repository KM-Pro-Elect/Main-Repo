import React from 'react';

const HeroSection = () => {
  return (
    <div className="px-4 py-12 md:py-16 w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-4 animate-pulse-subtle">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/93b5817c8b80bc3234215f3b139e7a7a537be1baed71d47a6e0dd4a9acc6063e?placeholderIfAbsent=true"
            alt="Icon"
            className="w-20 h-20" // Adjusted size for better visibility
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Welcome to NEUPoliSeek!
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find, Understand, and Navigate School Policies with Ease.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;