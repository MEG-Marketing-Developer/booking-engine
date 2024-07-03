import React from "react";

function Counter({ count, increment, decrement }) {

  return (
    <>
      <button
        className="px-4 py-2 bg-[#123553] text-white rounded hover:bg-blue-700"
        onClick={decrement}
      >
        -
      </button>
      <div className="text-2xl font-bold ">{count}</div>

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
          30/hr
        </span>
      </div>
    </>
  );
}

export default Counter;
