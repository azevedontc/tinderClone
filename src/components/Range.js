import React, { useState } from "react";

export default function Range({
  min = 0,
  max = 100,
  name = "range",
  onChange,
  defaultValue = 5,
  ...props
}) {
  const [range, setRange] = useState(defaultValue);
  const handleChange = (e) => {
    onChange(Number(e.target.value));
    setRange(e.target.value);
  };

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        name={name}
        defaultValue={props.defaultValue || range}
        onChange={handleChange}
        style={{
          backgroundSize: `${((range - min) * 100) / (max - min)}% 100%`,
        }}
        {...props}
      />
      <label htmlFor={name}>{range} km de distância</label>
    </>
  );
}
