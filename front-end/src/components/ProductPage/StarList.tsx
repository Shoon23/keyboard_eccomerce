import React, { useState } from "react";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

interface Props {
  startFill: number;
  size: number;
  color: string;
}

function StarList({ startFill, size, color }: Props) {
  const star = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {star.slice(0, startFill).map((_, idx: number) => (
        <StarFill color={color} key={idx} size={size} />
      ))}
      {star.slice(0, 5 - startFill).map((_, idx: number) => (
        <Star color={color} key={idx} size={size} />
      ))}
    </div>
  );
}

export default StarList;
