import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question:
      "What is the attendance policy, and how many absences are allowed?",
    answer: "Details about attendance policy will be displayed here.",
  },
  {
    question: "What are the consequences of violating the dress code policy?",
    answer: "Information about dress code violations will be shown here.",
  },
  {
    question:
      "Can I appeal a disciplinary decision made under the school's policies?",
    answer: "Appeal process details will be displayed here.",
  },
  {
    question:
      "What is the school's policy on academic integrity and plagiarism?",
    answer: "Academic integrity policy information will be shown here.",
  },
];

export const FAQSection = () => {
  return (
    <section className="w-full max-w-[1075px]">
      <h2 className="text-black text-[25px] font-semibold mt-[63px] mb-5 max-md:mt-10">
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="border w-full h-px border-black border-solid mb-[47px]" />
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border mb-4 px-[31px] py-[25px] rounded-[20px] border-[rgba(0,0,0,0.2)]"
          >
            <AccordionTrigger className="text-[22px] font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
