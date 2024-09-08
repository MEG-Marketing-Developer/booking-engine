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
}) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedData, setSelectedData] = useState(null);
  const [selectedService, setSelectedServices] = useState(null);

  const [count, setCount] = useState(4);

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
    serviceSlected(newData);
  };

  const hundleServicesSelected = (newData) => {
    setSelectedServices(newData);
    contentSelected(newData);
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
      <SelectServices onServicesSelected={hundleServicesSelected} />
      <ServicesSlider onDataSelected={hundleDataSelected} />
      <TabsContent onTabChange={handleTabChange} />
      <Counter
        inputChange={handleCounter}
        count={count}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
};
