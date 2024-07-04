import React from "react";
import "./ButtonSilder.css";

function Counter({ count, increment, decrement, inputChange }) {
  return (
    <>
      <button
        className="px-4 py-2 bg-[#123553] text-white rounded hover:bg-blue-700"
        onClick={decrement}
      >
        -
      </button>

      <input
        className="input-number text-2xl font-bold bg-white  px-4 py-1 rounded"
        type="number"
        value={count}
        onChange={inputChange}
        min="2" max="10"
    
      />
      <button
        className="px-4 py-2 bg-[#123553] text-white rounded hover:bg-blue-700"
        onClick={increment}
      >
        +
      </button>
      <div>
        <span>
          CHF
          <br />
          <strong>30/hr</strong>
        </span>
      </div>
    </>
  );
}

export default Counter;
