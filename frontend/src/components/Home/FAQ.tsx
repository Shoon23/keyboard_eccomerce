import React, { useState } from "react";
import FAQCard from "./FAQCard";
function FAQ() {
  const [isSelected, setIsSelected] = useState<number>(-1);
  const faq = [
    {
      question:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione,",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione, dolor necessitatibus repudiandae architecto illo nobis expedita aliquid id officia debitis.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione,",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione, dolor necessitatibus repudiandae architecto illo nobis expedita aliquid id officia debitis.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione,",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione, dolor necessitatibus repudiandae architecto illo nobis expedita aliquid id officia debitis.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione,",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione, dolor necessitatibus repudiandae architecto illo nobis expedita aliquid id officia debitis.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione,",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quam underatione, dolor necessitatibus repudiandae architecto illo nobis expedita aliquid id officia debitis.",
    },
  ];
  return (
    <section className="min-h-screen bg-white ">
      <h1 className="p-5 text-2xl md:text-3xl">Frequenlty Asked Questions</h1>

      <div className={`mt-2 flex flex-col place-items-center gap-3 `}>
        {faq.map((faq: { question: string; answer: string }, idx: number) => (
          <FAQCard
            key={idx}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            question={faq.question}
            answer={faq.answer}
            idx={idx}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
