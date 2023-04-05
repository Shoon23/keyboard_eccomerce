import React from "react";
import { Plus, Dash } from "react-bootstrap-icons";

interface Props {
  isSelected: number;
  setIsSelected: React.Dispatch<React.SetStateAction<number>>;
  question: string;
  answer: string;
  idx: number;
}

function FAQCard({ isSelected, setIsSelected, question, answer, idx }: Props) {
  return (
    <div
      key={idx}
      className={`flex w-5/6 cursor-pointer flex-col rounded-lg p-5  text-black shadow-md transition-all duration-300 ease-in  last:mb-2 md:w-4/6 lg:w-3/6 ${
        isSelected === idx ? `bg-white` : `bg-gray-200`
      }`}
    >
      <div className="flex items-center">
        <div
          className=" cursor-pointer "
          onClick={() => {
            idx === isSelected ? setIsSelected(-1) : setIsSelected(idx);
          }}
        >
          {isSelected === idx ? (
            <Dash className="object-fit h-10 w-10" />
          ) : (
            <Plus className="object-fit h-10 w-10" />
          )}
        </div>
        <p className="text-base font-bold md:text-lg">{question}?</p>
      </div>
      {isSelected === idx && (
        <p className="px-10 py-2 text-sm text-gray-400  md:text-base">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQCard;
