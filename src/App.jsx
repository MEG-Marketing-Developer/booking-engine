import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoIcone from "../public/images/mammut-logo-icon.png";
import residentialCleaning from "../public/images/residentialcleaning.png";
import umzugPauschal from "../public/images/umzugPauschal.png";
import Disposal from "../public/images/Disposal.png";
import CollapseIHeader from "./components/CollapseIHeader";
import CollapsibleItem from "./components/CollapsibleItem";
import ResidentialCleaning from "./components/ResidentialCleaning";
const App = () => {

 

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            <div className="mx-auto w-2/3  flex-2 p-10 pt-16 rounded-3xl bg-[#E7F3FC]">
              <div className="flex justify-around">
                <CollapsibleItem
                  key={0}
                  title={
                    <CollapseIHeader
                      imageSrc={residentialCleaning}
                      serviceTitle="Residential Cleaning"
                    />
                  }
                  isOpen={openIndex === 0}
                  onToggle={() => handleToggle(0)}
                />

                <CollapsibleItem
                  key={1}
                  title={
                    <CollapseIHeader
                      imageSrc={umzugPauschal}
                      serviceTitle="Umzug Pauschal"
                    />
                  }
                  isOpen={openIndex === 1}
                  onToggle={() => handleToggle(1)}
                />

                <CollapsibleItem
                  key={2}
                  title={
                    <CollapseIHeader
                      imageSrc={Disposal}
                      serviceTitle="Umzug Pauschal"
                    />
                  }
                  isOpen={openIndex === 2}
                  onToggle={() => handleToggle(2)}
                />
              </div>
              {openIndex !== null && (
                <div className="mt-2 p-4 border border-gray-200 rounded w-full text-base">
                  {openIndex === 0 && <ResidentialCleaning />}
                  {openIndex === 1 && <ResidentialCleaning />}
                  {openIndex === 2 && <ResidentialCleaning />}
                </div>
              )}
            </div>
            <div className="flex-1 p-10">
              
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
