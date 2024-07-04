import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoIcone from "../public/images/mammut-logo-icon.png";
import MultiStep from "react-multistep";
import { ServiceStep } from "./ServiceStep";
import { LocationStep } from "./LocationStep";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedData, setSelectedData] = useState(null);

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
  };

  const hundelTabSummary = (newTab) => {
    setSelectedTab(newTab);
  };

  const [selectedContent, setSelectedContent] = useState({
    title: "",
    image: "",
  });

  
  const handleItemClick = (item) => {
    setSelectedContent(item);
  };
  const [count, setCount] = useState(2);
  const hundleCounter = (e) => {
    setCount(e.target.value);
  };

  const steps = [
    {
      name: "Services",
      component: (
        <ServiceStep
          selectTab={hundelTabSummary}
          serviceSlected={hundleDataSelected}
          contentSelected={handleItemClick}
          counter={hundleCounter}
        />
      ),
    },
    { name: "Address", component: <LocationStep /> },
  ];

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
          <div className="flex flex-col sm:flex-row  justify-between pt-5 sm:pt-10 space-y-6 sm:space-y-0 sm:space-x-6 w-full">
            <div className="mx-auto sm:w-2/3 w-full  flex-2 p-5 sm:p-10 sm:pt-16 rounded-3xl bg-[#E7F3FC] drop-shadow-lg">
              <MultiStep steps={steps} />
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
