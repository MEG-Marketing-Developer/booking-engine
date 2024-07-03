import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoIcone from "../public/images/mammut-logo-icon.png";
import residentialCleaning from "../public/images/apartment.png";
import umzugPauschal from "../public/images/logistics.png";
import Disposal from "../public/images/trash.png";
import ServicesSlider from "./components/ServicesSlider";
import Counter from "./components/Counter";
import TabsContent from "./components/TabsContent";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("1");
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
        <div className="bg-white w-[90%] sm:w-3/4 mx-auto mt-10 rounded-3xl h-auto px-3 py-7 sm:p-10 flex flex-col items-start">
          <h1 className="text-xl font-bold">Quick Booking</h1>
          {/* booking section  */}
          <div className="flex flex-col sm:flex-row w-full justify-between pt-5 sm:pt-10 space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="mx-auto sm:w-2/3 w-full  flex-2 p-5 sm:p-10 sm:pt-16 rounded-3xl bg-[#E7F3FC] drop-shadow-lg">
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
                      className="w-[150px] p-5 rounded-lg bg-transparent border-[1px] border-[#fff] hover:scale-105 transition-transform" />
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
                      count={count}
                      increment={increment}
                      decrement={decrement}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 py-10 rounded-3xl bg-[#E7F3FC] drop-shadow-lg h-[20%]">
              <div className="text-left rounded-lg space-y-3 flex flex-col w-full items-start justify-around">
                <div className="text-xl font-bold text-[#123553]">
                Booking Details
                </div>
                {selectedContent.title && (
                  <div className="text-left rounded-lg space-y-3 flex flex-col w-full items-start justify-around">
                    <div className="flex w-full justify-between"> 
                    <h2 className="text-base sm:text-xl  text-[#123553]">
                    Service 
                    </h2>                     
                      <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                        {selectedContent.title}
                      </h3>                    
                    </div>

                    <div className="flex w-full justify-between"> 
                    <h2 className="text-base sm:text-xl  text-[#123553]">
                    Hours 
                    </h2>                     
                      <h3 className="text-base sm:text-xl text-right text-[#123553] pl-4">
                      {count} hours
                      </h3>                    
                    </div>
                    
                    <div className="flex w-full justify-between"> 
                    <h2 className="text-base sm:text-xl  text-[#123553]">
                    Crew Workers 
                    </h2>                     
                      <h3 className="text-base sm:text-xl text-right text-[#123553] pl-4">
                      {selectedTab} Crew
                      </h3>                    
                    </div>
                    
                    <div className="flex w-full justify-between"> 
                    <h2 className="text-base sm:text-xl  text-[#123553]">
                    booking frequency 
                    </h2>                     
                      <h3 className="text-base sm:text-xl text-right text-[#123553] pl-4">
                      {selectedData}
                      </h3>                    
                    </div>
                  
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
