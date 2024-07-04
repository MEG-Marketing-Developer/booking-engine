import React, { useState } from "react";
import residentialCleaning from "../public/images/apartment.png";
import umzugPauschal from "../public/images/logistics.png";
import Disposal from "../public/images/trash.png";
import ServicesSlider from "./components/ServicesSlider";
import Counter from "./components/Counter";
import TabsContent from "./components/TabsContent";

export const ServiceStep = ({counter, selectTab, contentSelected, serviceSlected }) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedData, setSelectedData] = useState(null);

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
    serviceSlected(newData)
  };

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    selectTab(newTab)
  };

  const [selectedContent, setSelectedContent] = useState({
    title: "",
    image: "",
  });

  const items = [
    { id: 1, title: "Residential Cleaning", image: residentialCleaning },
    { id: 2, title: "Umzug Pauschal", image: umzugPauschal },
    { id: 3, title: "Disposal Entsorgung", image: Disposal },
  ];

  const handleItemClick = (item) => {
    setSelectedContent(item);
    contentSelected(item)
    
    
  };
  const [count, setCount] = useState(2);
  const handleCounter = (e) => {
    setCount(e.target.value);
    counter(e);
};
const increment = () => {
    if (count < 10) {
    setCount(parseInt(count) + 1);
    counter(count);
    }
  };

  const decrement = () => {
    if (count > 2) {
      setCount(parseInt(count) - 1);
      counter(e);
    }
  };



  return (
    <>
        <div className="flex justify-around mb-5 relative">
          {items.map((item) => (
            <div
              className="cursor-pointer justify-center items-center text-center flex flex-col pl-2"
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[150px] p-5 rounded-lg bg-transparent border-[1px] border-[#fff] hover:scale-105 transition-transform"
              />
              <h3 className="text-base sm:text-xl mt-2 text-[#123553]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center border-[1px] border-[#9E9D9D] rounded-lg p-2 sm:p-5 flex flex-col w-full items-center justify-around">
          <h3 className="text-base sm:text-xl font-normal text-[#123553]">
            {selectedContent.title}
          </h3>
        </div>
        <ServicesSlider onDataSelected={hundleDataSelected} />
        <div className="flex w-full justify-around items-center sm:flex-row flex-col">
          <TabsContent onTabChange={handleTabChange} />
          <div className="w-full text-left mt-10">
            <h1 className="text-base sm:text-2xl text-left mt-5 text-[#123553] font-bold">
              Hours
            </h1>
            <div className="flex flex-row space-x-3 items-center justify-start pl-0 p-4 mt-0">
              <Counter
                inputChange={handleCounter}
                count={count}
                increment={increment}
                decrement={decrement}
              />
            </div>
          </div>
        </div>
        </>
  );
};
