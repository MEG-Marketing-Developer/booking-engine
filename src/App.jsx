import React, { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ServiceStep } from "./ServiceStep";
import { LocationStep } from "./LocationStep";
import { LoadScript } from "@react-google-maps/api";
import DateStep from "./DateStep";
import ContactStep from "./ContactStep";
import booking from "../public/images/booking-details.svg";
import addressImage from "../public/images/address.svg";
import contacts from "../public/images/contacts.svg";
import dateTime from "../public/images/date-time.svg";
import date from "../public/images/date.svg";
import email from "../public/images/email.svg";
import frequency from "../public/images/frequency.svg";
import location from "../public/images/location.svg";
import name from "../public/images/name.svg";
import phone from "../public/images/phone.svg";
import service from "../public/images/service.svg";
import time from "../public/images/time.svg";
import hours from "../public/images/hour-small.svg";
import crew from "../public/images/crew-small.svg";

// import 'antd/dist/antd.css';
import { Steps, Button, message } from "antd";

const { Step } = Steps;

const App = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [count, setCount] = useState();
  const [selectedContent, setSelectedContent] = useState(null);

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
      content: (
        <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
          <LocationStep apiKey={API_KEY} addressSelected={hundleAddress} />
        </LoadScript>
      ),
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
  const isEmpty = selectedContent == null || selectedData == null;
  console.log(selectedContent, "selcted");
  return (
    <>
      <Header />
      <main className="bg-custom-bg bg-cover bg-center py-24">
        {/* content section  */}
        <div className="bg-white w-[90%] sm:w-[95%] mx-auto mt-10 rounded-3xl h-auto px-3 py-7 sm:p-10 md:pt-0 md:pr-0 md:pb-0 sm:pl-0 flex flex-col items-start">
          {/* booking section  */}
          <div className="flex flex-col sm:flex-row  justify-between pt-5 sm:pt-0 space-y-6 sm:space-y-0 sm:space-x-6 w-full">
            <div className="mx-auto sm:w-2/3 md:pr-0 sm:pl-0 w-full  flex-2 p-5">
              <h1 className="text-4xl uppercase text-[#1D506A] font-segoe font-bold pb-16">
                Quick Booking
              </h1>
              <Steps current={current} className="sm:px-24">
                {steps.map((item, index) => (
                  <Step
                    key={index}
                    title={item.title}
                    className="custom-step"
                  />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">
                {current > 0 && (
                  <Button onClick={() => prev()}>Previous</Button>
                )}
                {current < steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => next()}
                    disabled={isEmpty}
                  >
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
            <div className="flex-1 space-y-8 md:!ml-0 bg-[#E4ECEF] rounded-tr-3xl rounded-br-3xl border-l-2 border-[#286380]">
              <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 pt-10 rounded-3xl ">
                <div className="flex flex-row space-x-3 px-7">
                  <img
                    src={booking}
                    alt="booking-details"
                    className="service-icon w-auto h-auto  rounded-full  transition-transform"
                  />
                  <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                    Booking Details
                  </h1>
                </div>
                <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                {/* {selectedContent && ( */}
                <div className="text-left rounded-lg space-y-3 pt-0 flex flex-col w-full items-start justify-around">
                  <div className="flex w-full justify-between bg-[#D0E3EB] py-7">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={service}
                        alt="service"
                        className="service-icon w-auto h-auto  rounded-full  transition-transform"
                      />
                      <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Service
                      </h2>
                    </div>
                    {selectedContent && (
                      <div className="px-7 mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-[259px]">
                        <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                          {selectedContent}
                        </h3>
                      </div>
                    )}
                  </div>

                  <div className="flex w-full justify-between bg-[#D0E3EB] py-7">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={hours}
                        alt="hours"
                        className="service-icon w-auto h-auto  rounded-full  transition-transform"
                      />
                      <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Hours
                      </h2>
                    </div>
                    {count && (
                      <div className="px-7 mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-[259px]">
                        <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                          {count} hours
                        </h3>
                      </div>
                    )}
                  </div>

                  <div className="flex w-full justify-between bg-[#D0E3EB] py-7">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={crew}
                        alt="crew"
                        className="service-icon w-auto h-auto  rounded-full  transition-transform"
                      />
                      <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Crew Workers
                      </h2>
                    </div>
                    {selectedTab && (
                      <div className="px-7 mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-[259px]">
                        <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                          {selectedTab} Crew
                        </h3>
                      </div>
                    )}
                  </div>

                  <div className="flex w-full justify-between bg-[#D0E3EB] py-7">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={frequency}
                        alt="frequency"
                        className="service-icon w-auto h-auto  rounded-full  transition-transform"
                      />
                      <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                        frequency
                      </h2>
                    </div>
                    {selectedData && (
                      <div className="px-7 mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-[259px]">
                        <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                          {selectedData}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                <div className="flex flex-row space-x-3 px-7">
                  <img
                    src={addressImage}
                    alt="address"
                    className="service-icon w-auto h-auto  rounded-full  transition-transform"
                  />
                  <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                    Address
                  </h1>
                </div>
                <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                {address && (
                  <div className="w-full flex justify-between items-center pt-5 space-x-3 bg-[#D0E3EB] py-7">
                    <div className="px-7">
                      <img
                        src={location}
                        alt="location"
                        className="service-icon w-[20px] h-[33px] object-contain rounded-full  transition-transform"
                      />
                    </div>
                    <div className="text-base sm:text-xl text-right text-[#123553]">
                      <h3>{address}</h3>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                <div className="flex flex-row space-x-3 px-7">
                  <img
                    src={dateTime}
                    alt="date-time"
                    className="service-icon w-auto h-auto  rounded-full  transition-transform"
                  />
                  <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                    Date and Time
                  </h1>
                </div>
                <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
              </div>

              <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                <div className="flex flex-row space-x-3 px-7">
                  <img
                    src={contacts}
                    alt="contact information"
                    className="service-icon w-auto h-auto  rounded-full  transition-transform"
                  />
                  <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                    Contact Information
                  </h1>
                </div>
                <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
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
