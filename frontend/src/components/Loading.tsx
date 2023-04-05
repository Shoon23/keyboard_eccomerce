import React from "react";
import { CircleHalf } from "react-bootstrap-icons";

interface Props {
  isWhite: boolean;
  isSpinnerBlue: boolean;
}

function Loading({ isWhite, isSpinnerBlue }: Props) {
  return (
    <main
      className={`flex min-h-screen items-center justify-center ${
        isWhite ? `bg-white` : `bg-sky-600`
      }`}
    >
      <CircleHalf
        className={`animate-spin ${
          isSpinnerBlue ? `fill-sky-600` : `fill-white`
        }`}
        size={50}
      />
    </main>
  );
}

export default Loading;
