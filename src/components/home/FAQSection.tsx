import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the penalty for not wearing the school ID on campus?",
    answer: "For the first offense, the student receives a warning or verbal reprimand. Repeated offenses may lead to written warnings or student service.",
  },
  {
    question: "What is the penalty for not wearing the prescribed uniform?",
    answer: "For the first offense, the student receives a warning or verbal reprimand. For the second offense, a written warning is issued, and for the third offense, the student must render 20 hours of student service or attend a relevant seminar.",
  },
  {
    question: "Can students wear civilian attire on campus?",
    answer: "Yes, but only with a permit from the College Dean and Office of Student Discipline. Students must still adhere to guidelines on decent clothing.",
  },
  {
    question: "Can students access university facilities like the library and gym?",
    answer: "Yes, students have the right to access university facilities, such as the library, gym, and computer labs, subject to regulations and guidelines.",
  },
];

export const FAQSection = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full">
        <h2 className="text-black text-[25px] font-semibold mt-[63px] mb-5 max-md:mt-10">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="border w-full h-px border-black border-solid mb-[47px]" />
        <div className="w-full max-w-[1075px] mx-auto">
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
                <AccordionContent className="text-[18px] bg-gray-100 p-4 rounded-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};