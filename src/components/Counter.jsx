import React from "react";
import "./ButtonSilder.css";
import hours from "../../public/images/hours.svg";

function Counter({ count, increment, decrement, inputChange }) {
  return (
    <>
      <div className="flex flex-row space-x-3 items-center justify-around pl-0 p-4 mt-0 bg-[#E1E7E9] py-7 my-10">
        <div className="flex flex-row space-x-3">
          <img
            src={hours}
            alt="hours"
            className="service-icon w-14 h-12  rounded-full  transition-transform"
          />
          <h1 className="font-segoe text-base sm:text-xl text-left my-3 text-[#1D506A] font-semibold">
            Hours
          </h1>
        </div>
        <div className="flex justify-around">
          <button
            className="px-4 py-2 bg-[#286380] text-white rounded hover:bg-[#1D506A] text-xl font-bold font-segoe"
            onClick={decrement}
          >
            -
          </button>

          <input
            className="input-number text-2xl font-bold bg-white w-[40%] px-4 py-1 rounded"
            type="number"
            value={count}
            onChange={inputChange}
            min="2"
            max="10"
            onKeyUp={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <button
            className="px-4 py-2 bg-[#286380] text-white rounded hover:bg-[#1D506A] text-xl font-bold font-segoe"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default Counter;
