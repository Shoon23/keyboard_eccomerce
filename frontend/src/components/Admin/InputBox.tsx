import React from "react";
interface Props {
  name: String;
  value?: string | number | readonly string[] | undefined;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  type: React.HTMLInputTypeAttribute | undefined;
}

function InputBox({ name, value, setValue, type }: Props) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{name}</span>
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        placeholder="Type here"
        className="input-bordered input w-full max-w-xs"
      />
    </div>
  );
}

export default InputBox;
