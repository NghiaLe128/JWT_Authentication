import React from "react";

const Label = ({ text, htmlFor, isRequired }) => (
  <label
    htmlFor={htmlFor}
    className="absolute left-3 text-gray-500 text-sm transition-all transform
               pointer-events-none peer-placeholder-shown:top-1/2
               peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
               peer-placeholder-shown:text-gray-500  peer-focus:-top-2.5 peer-focus:text-indigo-600
               peer-focus:text-xs peer-focus:font-semibold px-1 peer-focus:pb-2 bg-white"
    style={{ transform: "translateY(-50%)" }} 
  >
    {text} {isRequired && <span className="text-red-500">*</span>}
  </label>
);

export default Label;
