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
import dateImage from "../public/images/date.svg";
import emailImage from "../public/images/email.svg";
import frequency from "../public/images/frequency.svg";
import location from "../public/images/location.svg";
import nameImage from "../public/images/name.svg";
import phoneImage from "../public/images/phone.svg";
import service from "../public/images/service.svg";
import timeImage from "../public/images/time.svg";
import hours from "../public/images/hour-small.svg";
import crew from "../public/images/crew-small.svg";
import fireworks from "../public/images/fireworks.svg";

import dayjs from "dayjs";
import { Steps, Button, message } from "antd";

const { Step } = Steps;

const App = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [count, setCount] = useState("2");
  const [selectedContent, setSelectedContent] = useState(null);
  const [current, setCurrent] = useState(0);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [formData, setFormData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

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

  const hundleDateSelected = (newDate) => {
    setDate(newDate);
  };
  const hundelTimeSeselected = (newTime) => {
    setTime(newTime);
  };
  const handleInputChange = (formData) => {
    setFormData(formData);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = () => {
    message.success("Booking Completed!");
    setIsCompleted(true);
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
      content: (
        <DateStep
          dateSelected={hundleDateSelected}
          timeSelected={hundelTimeSeselected}
        />
      ),
    },
    {
      title: "Contact",
      content: <ContactStep onInputChange={handleInputChange} />,
    },
  ];
  const isEmpty =
    selectedContent == null || selectedData == null || selectedTab == "";
  // count == "";

  const EmptyContact =
    formData.fullName == null ||
    formData.email == null ||
    formData.phoneNumber == null;
  return (
    <>
      <Header />

      <main className="bg-custom-bg bg-cover bg-center py-24">
        {!isCompleted ? (
          <>
            {/* content section  */}
            <div className="bg-white w-[90%] sm:w-[95%] mx-auto mt-10 rounded-3xl h-auto px-3 py-7 sm:p-10 md:pt-0 md:pr-0 md:pb-0 sm:pl-0 flex flex-col items-start">
              {/* booking section  */}
              <div className="flex flex-col xl:flex-row  justify-between pt-5 sm:pt-0 space-y-6 sm:space-y-0 sm:space-x-6 w-full">
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
                        className={current === 0 ? "first-next-btn" : ""}
                        onClick={() => next()}
                        disabled={isEmpty}
                      >
                        Next
                      </Button>
                    )}
                    {current === steps.length - 1 && (
                      <Button
                        type="primary"
                        disabled={EmptyContact}
                        onClick={() => done()}
                      >
                        Confirm
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
                        className="service-icon w-auto h-auto    transition-transform"
                      />
                      <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Booking Details
                      </h1>
                    </div>
                    <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                    {/* {selectedContent && ( */}
                    <div className="text-left rounded-lg space-y-3 pt-0 flex flex-col w-full items-start justify-around">
                      <div className="flex w-full justify-between bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={service}
                            alt="service"
                            className="service-icon w-auto h-auto   transition-transform"
                          />
                          <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                            Service
                          </h2>
                        </div>
                        {selectedContent && (
                          <div className="px-7 py-4 mx-auto md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                            <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                              {selectedContent}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="flex w-full justify-between bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                          <img
                            src={hours}
                            alt="hours"
                            className="service-icon w-[40px] h-auto   transition-transform"
                          />
                          <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                            Hours
                          </h2>
                        </div>
                        {count && (
                          <div className="px-7 py-4 mx-auto md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                            <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                              {count} hours
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="flex w-full justify-between bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={crew}
                            alt="crew"
                            className="service-icon w-auto h-auto    transition-transform"
                          />
                          <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                            Crew Workers
                          </h2>
                        </div>
                        {selectedTab && (
                          <div className="px-7 py-4 mx-auto md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                            <h3 className="text-base sm:text-xl  text-[#123553] pl-4">
                              {selectedTab} Crew
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="flex w-full justify-between bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={frequency}
                            alt="frequency"
                            className="service-icon w-auto h-auto   transition-transform"
                          />
                          <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                            frequency
                          </h2>
                        </div>
                        {selectedData && (
                          <div className="px-7 py-4 mx-auto md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
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
                        className="service-icon w-auto h-auto    transition-transform"
                      />
                      <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Address
                      </h1>
                    </div>
                    <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                    <div className="w-full flex justify-between items-center pt-5 space-x-3 bg-[#D0E3EB] py-7">
                      <div className="px-7">
                        <img
                          src={location}
                          alt="location"
                          className="service-icon w-[20px] h-[33px] object-contain   transition-transform"
                        />
                      </div>
                      <div className="text-base sm:text-xl text-left text-[#123553]">
                        <h3>{address}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={dateTime}
                        alt="date-time"
                        className="service-icon w-auto h-auto   transition-transform"
                      />
                      <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Date and Time
                      </h1>
                    </div>
                    <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                    <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 space-y-3 rounded-3xl ">
                      <div className="w-full flex justify-start items-center pt-5 space-x-3 bg-[#D0E3EB] py-7">
                        <div className="px-7">
                          <img
                            src={dateImage}
                            alt="dateImage"
                            className="service-icon w-[30px] h-[50px]  object-contain  transition-transform"
                          />
                        </div>
                        {date && (
                          <div className="px-7 py-3 !mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                            <h3 className="text-base sm:text-xl  text-[#123553]">
                              {dayjs(date).format("MMM D YYYY")}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="w-full flex justify-start items-center pt-5 space-x-3 bg-[#D0E3EB] py-7">
                        <div className="px-7">
                          <img
                            src={timeImage}
                            alt="timeImage"
                            className="service-icon w-[30px] h-[30px] object-contain   transition-transform"
                          />
                        </div>
                        {time && (
                          <div className="px-7 py-3 !mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                            <h3 className="text-base sm:text-xl  text-[#123553]">
                              {dayjs(time).format("hh:mm A")}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <div className="flex flex-row space-x-3 px-7">
                      <img
                        src={contacts}
                        alt="contact information"
                        className="service-icon w-auto h-auto    transition-transform"
                      />
                      <h1 className="font-segoe text-base sm:text-3xl text-left my-3 text-[#1D506A] font-semibold uppercase">
                        Contact Information
                      </h1>
                    </div>
                    <div className="border-b-2 border-solid border-[#286380] w-full pt-5" />
                    <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 space-y-3 rounded-3xl ">
                      <div className="w-full flex justify-between items-center pt-5 space-x-3 bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={nameImage}
                            alt="nameImage"
                            className="service-icon w-[20px] h-[33px] object-contain   transition-transform"
                          />
                        </div>
                        {formData.fullName && (
                          <div className="px-7 py-3 !mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                            <h3 className="text-base sm:text-xl  text-[#123553]">
                              {formData.fullName}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="w-full flex justify-between items-center pt-5 space-x-3 bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={emailImage}
                            alt="emailImage"
                            className="service-icon w-[20px] h-[33px] object-contain   transition-transform"
                          />
                        </div>
                        {formData.email && (
                          <div className="px-7 py-3 md:!mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                            <h3 className="text-base sm:text-xl  text-[#123553]">
                              {formData.email}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="w-full flex justify-between items-center pt-5 space-x-3 bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-3">
                        <div className="flex flex-row space-x-3 px-7 justify-center">
                          <img
                            src={phoneImage}
                            alt="phoneImage"
                            className="service-icon w-[20px] h-[20px] object-contain   transition-transform"
                          />
                        </div>
                        {formData.phoneNumber && (
                          <div className="px-7 py-3 md:!mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                            <h3 className="text-base sm:text-xl  text-[#123553]">
                              {formData.phoneNumber}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="final-component bg-white w-[90%] sm:w-[85%] mx-auto mt-10 rounded-3xl h-auto px-3 py-7 sm:p-10 md:pt-0 md:pr-0 md:pb-0 sm:pl-0 flex flex-col items-center">
            <div className="pt-16 pb-6">
              <img
                src={fireworks}
                alt="fireworks"
                className="w-auto h-auto object-contain transition-transform"
              />
            </div>
            <h3 className="text-base sm:text-3xl font-segoe font-bold text-[#123553]">
              CONGRATIOLATIONS
            </h3>
            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 pt-10 rounded-3xl ">
              <div className="text-left rounded-lg space-y-3 pt-0 flex flex-col w-full items-start justify-around">
                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={service}
                      alt="service"
                      className="service-icon w-auto h-auto  rounded-full  transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      Service
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                    <h3>{selectedContent}</h3>
                  </div>
                </div>

                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={hours}
                      alt="hours"
                      className="service-icon w-[40px] h-auto  rounded-full  transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      Hours
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                    <h3>{count} hours</h3>
                  </div>
                </div>

                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={crew}
                      alt="crew"
                      className="service-icon w-[40px] h-auto  rounded-full  transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      Crew Workers
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                    <h3>{selectedTab} Crew</h3>
                  </div>
                </div>

                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={frequency}
                      alt="frequency"
                      className="service-icon w-[40px] h-auto  rounded-full  transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      frequency
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-auto md:w-[259px]">
                    <h3>{selectedData}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
              <div className="flex flex-row space-x-3 px-7 w-full justify-center pt-10">
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
              <div className="w-full flex justify-center items-center pt-5 space-x-3 bg-[#D0E3EB] py-7">
                <div className="px-7">
                  <img
                    src={location}
                    alt="location"
                    className="service-icon w-[20px] h-[33px] object-contain rounded-full  transition-transform"
                  />
                </div>
                <div className="text-base sm:text-xl text-left text-[#123553]">
                  <h3>{address}</h3>
                </div>
              </div>
            </div>

            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
              <div className="flex flex-row space-x-3 px-7 justify-center w-full pt-10">
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
              <div className="text-left flex flex-col lg:flex-row pt-10 w-full items-start justify-around px-6 md:px-0 rounded-3xl ">
                <div className="w-fit flex flex-col md:flex-row justify-start items-center space-x-3 bg-[#D0E3EB] py-7 rounded-2xl px-10 mb-10">
                  <div className="px-7">
                    <img
                      src={dateImage}
                      alt="dateImage"
                      className="service-icon w-[30px] h-[50px]  object-contain rounded-full  transition-transform"
                    />
                  </div>
                  <div className="px-7 py-3 !mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                    <h3 className="text-base sm:text-xl  text-[#123553]">
                      {dayjs(date).format("MMM D YYYY")}
                    </h3>
                  </div>
                </div>

                <div className="md:w-fit w-full flex flex-col md:flex-row justify-start items-center space-x-3 bg-[#D0E3EB] py-7 rounded-2xl px-10">
                  <div className="px-7 mb-7 md:mb-0">
                    <img
                      src={timeImage}
                      alt="timeImage"
                      className="service-icon w-auto md:w-[50px] h-[30px] object-contain rounded-full  transition-transform"
                    />
                  </div>

                  <div className="px-7 py-3 !mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-full">
                    <h3 className="text-base sm:text-xl  text-[#123553]">
                      {dayjs(time).format("hh:mm A")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
              <div className="flex flex-row space-x-3 px-7 w-full justify-center pt-10">
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
              <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 space-y-3 rounded-3xl ">
                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={nameImage}
                      alt="nameImage"
                       className="service-icon w-auto h-auto transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      Name
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                    <h3>{formData.fullName}</h3>
                  </div>
                </div>

                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={emailImage}
                      alt="emailImage"
                       className="service-icon w-auto h-auto transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      Email
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                    <h3>{formData.email}</h3>
                  </div>
                </div>

                <div className="flex w-full justify-evenly bg-[#D0E3EB] py-7 flex-col md:flex-row space-y-2">
                  <div className="flex flex-row space-x-3 px-7 justify-center items-center">
                    <img
                      src={phoneImage}
                      alt="phoneImage"
                      className="service-icon w-auto h-auto transition-transform"
                    />
                    <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
                      phone number
                    </h2>
                  </div>

                  <div className="px-7 py-4 mx-auto md:mx-0 md:mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md w-fit">
                    <h3>{formData.phoneNumber}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-10">
              <a href="https://mammutfm.ch/contact-us/">
                <button className="bg-[#336985] py-7 px-16 font-segoe font-semibold text-2xl rounded-xl text-white border border-solid border-[#707070] shadow-lg w-full">
                  CONTACT US NOW
                </button>
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default App;
