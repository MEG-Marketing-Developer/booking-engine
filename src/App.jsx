import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoIcone from "../public/images/mammut-logo-icon.png";
import residentialCleaning from "../public/images/residentialcleaning.png";
import umzugPauschal from "../public/images/umzugPauschal.png";
import Disposal from "../public/images/Disposal.png";
import ResidentialCleaning from "./components/ResidentialCleaning";
import Counter from "./components/Counter";
import TabsContent from "./components/TabsContent";

const App = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [selectedData, setSelectedData] = useState(null);


  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
  };
  
  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
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
  };
    const [count, setCount] = useState(2);
  const decrement = () => {
    if (count > 2) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Header />
      <main className="bg-custom-bg bg-cover bg-center py-24">
        {/* Logo Section  */}
        <div className="flex justify-center items-center">
          <img src={logoIcone} alt="logo" />
        </div>
        {/* content section  */}
        <div className="bg-white w-3/4 mx-auto mt-10 rounded-3xl h-auto p-10 flex flex-col items-start">
          <h1 className="text-xl font-bold">Quick Booking</h1>
          {/* booking section  */}
          <div className="flex flex-row w-full justify-between pt-10 space-x-6">
            <div className="mx-auto w-2/3  flex-2 p-10 pt-16 rounded-3xl bg-[#E7F3FC] drop-shadow-lg">
              <div className="flex justify-around mb-5">
                {items.map((item) => (
                  <div
                    className="cursor-pointer justify-center items-center text-center flex flex-col "
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[150px] p-5 rounded-lg bg-[#123553]"
                    />
                    <h3 className="text-xl font-bold text-[#123553]">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="text-center border-[1px] border-[#9E9D9D] rounded-lg p-5 flex flex-col w-full items-center justify-around">
                <img
                  src={selectedContent.image}
                  alt={selectedContent.title}
                  className="w-[100px]  rounded-lg bg-[#123553] "
                />
                <h3 className="text-xl font-bold text-[#123553]">
                  {selectedContent.title}
                </h3>
              </div>
              <ResidentialCleaning onDataSelected={hundleDataSelected} />
              <TabsContent onTabChange={handleTabChange}  />
              <h1 className="text-2xl text-left mt-5 text-[#123553] font-bold">
        Hours
      </h1>
      <div className="flex flex-row space-x-3 items-center justify-start p-4 mt-0">
      <Counter count={count} increment={increment} decrement={decrement} />

      </div>
            </div>
            <div className="flex-1 p-10  rounded-3xl bg-[#E7F3FC] drop-shadow-lg">
              <div className="text-left rounded-lg space-y-3 flex flex-col w-full items-start justify-around">
              <div className="text-xl font-bold text-[#123553]">Service Selected</div>
              {selectedContent.title && (
                <div className="text-left rounded-lg space-y-3 flex flex-col w-full items-start justify-around">
              <div className="flex flex-row items-center">
              <img
                  src={selectedContent.image}
                  alt={selectedContent.title}
                  className="w-[40px] p-1 rounded-full bg-[#123553] "
                />
                <h3 className="text-xl font-bold text-[#123553] pl-4">
                  {selectedContent.title}
                </h3>
                </div>
                <h2 className="text-xl font-bold text-[#123553]">Hours:{count}</h2>
                <div className="text-xl font-bold text-[#123553]">Crew:{selectedTab}</div>
                <div className="text-xl font-bold text-[#123553]">booking frequency:{selectedData}</div>
              
                </div>

                
               )}
               
                

                </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
