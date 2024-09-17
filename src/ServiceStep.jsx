import React, { useState } from "react";
import ServicesSlider from "./components/ServicesSlider";
import Counter from "./components/Counter";
import TabsContent from "./components/TabsContent";
import SelectServices from "./components/SelectServices";

export const ServiceStep = ({
  counter,
  selectTab,
  contentSelected,
  serviceSlected,
  SubSelected,
  checkboxChecked,
  servivesSelectedPrice,
}) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedData, setSelectedData] = useState(null);
  const [selectedService, setSelectedServices] = useState(null);
  const [selectedSubServices, setSelectedSubServices] = useState(null);
  const [servicePrice, setServicePrice] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(4);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    checkboxChecked(e);
  };

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
    serviceSlected(newData);
  };

  const hundleServicesSelected = (newData) => {
    setSelectedServices(newData);
    contentSelected(newData);
  };

  const hundleSubServicesSelected = (newSub) => {
    setSelectedSubServices(newSub);
    SubSelected(newSub);
  };
  const hundleServicePrice = (newPrice) => {
    setServicePrice(newPrice);
    servivesSelectedPrice(newPrice);
  };

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    selectTab(newTab);
  };

  const handleCounter = (e) => {
    let newCount = parseInt(e.target.value);
    if (isNaN(newCount) || newCount < 4) {
      newCount = 4;
    } else if (newCount > 10) {
      newCount = 10;
    }
    setCount(newCount);
    counter(newCount);
  };

  const increment = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      counter(newCount);
    }
  };

  const decrement = () => {
    if (count > 4) {
      const newCount = count - 1;
      setCount(newCount);
      counter(newCount);
    }
  };
 

  return (
    <>
      <SelectServices
        onServicesSelected={hundleServicesSelected}
        onSubServicesSelected={hundleSubServicesSelected}
        onServicePrice={hundleServicePrice}
      />
      {selectedService === "Deep Cleaning" && selectedSubServices !== null && (
        <ServicesSlider onDataSelected={hundleDataSelected} />
      )}
      {selectedService !== null && (
        <TabsContent
          onTabChange={handleTabChange}
          checkboxClasses={isChecked}
        />
      )}
      {selectedService !== null && (
        <Counter
          inputChange={handleCounter}
          count={count}
          increment={increment}
          decrement={decrement}
          counterDisabled={isChecked}
        />
      )}
      {selectedService !== null && (
        <div className="bg-[#CAEFDA] py-5">
          <label className="text-[#0D6332] font-alexandria font-bold text-base">
            <input
              className="mr-1"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Let The Expert Decide
          </label>
        </div>
      )}
    </>
  );
};
