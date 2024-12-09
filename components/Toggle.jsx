import React, { useState } from "react";

export default function Toggle({ estado, handler }) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handler}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 
          ${estado ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300
            ${estado ? "translate-x-8" : "translate-x-1"}`}
        ></span>
      </button>
    </div>
  );
};