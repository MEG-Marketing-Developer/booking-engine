import React, { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoIcone from "../public/images/mammut-logo-icon.png";
import { ServiceStep } from "./ServiceStep";
import { LocationStep } from "./LocationStep";
import { LoadScript } from "@react-google-maps/api";
import DateStep from "./DateStep";
import ContactStep from "./ContactStep";
// import 'antd/dist/antd.css';
import { Steps, Button, message } from "antd";

const { Step } = Steps;

const App = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedData, setSelectedData] = useState(null);
  const [count, setCount] = useState(2);
  const [selectedContent, setSelectedContent] = useState({
    title: "",
    image: "",
  });
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(0);

  const [address, setAddress] = useState("");

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
  };

  const hundelTabSummary = (newTab) => {
    setSelectedTab(newTab);
  };

  const handleItemClick = (item) => {
    setSelectedContent(item);
  };
  const hundleCounter = (newCount) => {
    setCount(newCount);
  };

  const hundleAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

  const steps = [
    {
      title: "Services",
      content: (
        <ServiceStep
          selectTab={hundelTabSummary}
          serviceSlected={hundleDataSelected}
          contentSelected={handleItemClick}
          counter={hundleCounter}
        />
      ),
    },
    {
      title: "Address",
      content: 
      <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
      <LocationStep apiKey={API_KEY} addressSelected={hundleAddress} />
      </LoadScript>
      ,
    },
    {
      title: "Date",
      content: <DateStep />,
    },
    {
      title: "Contact",
      content: <ContactStep />,
    },
  ];
  const isEmpty = selectedContent.title == "" || selectedData== null;

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
              <Steps current={current}>
                {steps.map((item, index) => (
                  <Step key={index} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">
                {current > 0 && (
                  <Button onClick={() => prev()}>Previous</Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()} disabled={isEmpty}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-8  h-[20%]">
              <div className="text-left flex flex-col w-full items-start justify-around px-6 py-10 rounded-3xl bg-[#E7F3FC] drop-shadow-lg">
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

              <div className="text-left flex flex-col w-full items-start justify-around px-6 py-10 rounded-3xl bg-[#E7F3FC] drop-shadow-lg ">
                <div className="text-xl font-bold text-[#123553]">Address</div>
                 {address && (
                <div className="w-full flex justify-between pt-5 space-x-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />{" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />{" "}
                    </svg>
                  </div>
                  <div className="text-base sm:text-xl text-right text-[#123553]">
                  {address}
                 </div>
                </div>
                )}
               
              </div>

              <div className="text-left flex flex-col w-full items-start justify-around px-6 py-10 rounded-3xl bg-[#E7F3FC] drop-shadow-lg ">
                <div className="text-xl font-bold text-[#123553]">
                  Date and Time
                </div>
              </div>

              <div className="text-left flex flex-col w-full items-start justify-around px-6 py-10 rounded-3xl bg-[#E7F3FC] drop-shadow-lg ">
                <div className="text-xl font-bold text-[#123553]">
                  Contact Information
                </div>
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
