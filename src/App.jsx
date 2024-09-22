import React, { useContext, useEffect, useState } from "react";
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
import expectedPrice from "../public/images/services/expected-prices.svg";
import contacts from "../public/images/contacts.svg";
import dateTime from "../public/images/date-time.svg";
import dateImage from "../public/images/date.svg";
import emailImage from "../public/images/email.svg";
import frequency from "../public/images/frequency.svg";
import location from "../public/images/location.svg";
import nameImage from "../public/images/name.svg";
import phoneImage from "../public/images/phone.svg";
import Connecting from "../public/images/Connecting.png";
import service from "../public/images/service.svg";
import timeImage from "../public/images/time.svg";
import hours from "../public/images/hour-small.svg";
import crew from "../public/images/crew-small.svg";
import fireworks from "../public/images/fireworks.svg";

import dayjs from "dayjs";
import { Steps, Button, message } from "antd";
import SideBarCard from "./components/SideBarCard";
import CardTitle from "./components/CardTitle";

const { Step } = Steps;

const App = () => {
  const [selectedTab, setSelectedTab] = useState({
    value: "",
    price: 0,
  });
  const [selectedData, setSelectedData] = useState(null);
  const [servicesPrice, setServicesPrice] = useState(null);
  const [countPrice, setCountPrice] = useState(null);
  const [count, setCount] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [current, setCurrent] = useState(0);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [formData, setFormData] = useState({});
  const [radioSelection, setRadioSelection] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const hundleDataSelected = (newData) => {
    setSelectedData(newData);
  };
  const hundleServicePrice = (newPrice) => {
    setServicesPrice(newPrice);
  };
  const hundleCounterPrice = (counterPrice) => {
    setCountPrice(counterPrice);
  };

  const hundelTabSummary = (newTab) => {
    setSelectedTab(newTab);
  };

  const handleItemClick = (item) => {
    setSelectedContent(item);
  };
  const hundelSubSelected = (sub) => {    
    setSelectedSub(sub);   
  };
  const hundleCounter = (newCount) => {
    setCount(newCount);
  };
  const hundleCheckbox = () => {
    setIsChecked(!isChecked);
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
  const hundleRadioChange = (radioSelection) => {
    setRadioSelection(radioSelection);
  }

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
  // const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const libraries = ["places"];
  const steps = [
    {
      title: "Services",
      content: (
        <ServiceStep
          selectTab={hundelTabSummary}
          serviceSlected={hundleDataSelected}
          contentSelected={handleItemClick}
          SubSelected={hundelSubSelected}
          counter={hundleCounter}
          checkboxChecked={hundleCheckbox}
          servivesSelectedPrice={hundleServicePrice}
          totalCounterPrice={hundleCounterPrice}
        />
      ),
    },
    {
      title: "Address",
      content: (
        // <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
          <LocationStep addressSelected={hundleAddress} />
        // </LoadScript>
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
      content: <ContactStep onInputChange={handleInputChange} radioSelection={hundleRadioChange} />,
    },
  ];
  const isEmpty = selectedContent == null;
  // count == "";

  const EmptyContact =
    formData.fullName == null ||
    formData.email == null ||
    formData.phoneNumber == null;

    return (
    <>
      <Header />

      <main className="bg-[#205164] bg-cover bg-center py-24">
        {!isCompleted ? (
          <>
            {/* content section  */}
            <div className="bg-white w-[90%] sm:w-[85%] mx-auto mt-10 rounded-3xl h-auto px-3 py-7 sm:p-10 md:pt-0 md:pr-0 md:pb-0 sm:pl-0 flex flex-col items-start">
              {/* booking section  */}
              <div className="flex flex-col xl:flex-row  justify-between pt-5 sm:pt-0 space-y-6 sm:space-y-0 sm:space-x-6 w-full">
                <div className="mx-auto sm:w-2/3 md:pr-0 sm:pl-0 w-full  flex-2 p-5">
                  <h1 className="text-4xl uppercase text-[#1D506A] font-alexandria font-[500] pb-16 pt-8">
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
                <div className="flex-1  space-y-8 md:!ml-0 bg-[#E4ECEF] rounded-tr-3xl rounded-br-3xl border-l-2 border-[#286380]">
                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 pt-10 rounded-3xl ">
                    <CardTitle
                      imageSrc={booking}
                      imageAlt="booking-details"
                      titleCard="Booking Details"
                      customJusticfyTitle="start"
                    />
                    <div className="border-b-2 border-solid border-[#286380] w-full" />
                    {/* {selectedContent && ( */}
                    <div className="text-left rounded-lg space-y-3 pt-0 flex flex-col w-full items-start justify-around">
                      <SideBarCard
                        cardImage={service}
                        imageAlt="service"
                        title="Service"
                        condtion={selectedContent}
                        cardContent={selectedContent}
                        customWidth={false}
                        customJusticfy="between"
                        contentWidth
                      />
                      <SideBarCard
                        cardImage={service}
                        imageAlt=""
                        title="Sub Service"
                        condtion={selectedSub}
                        cardContent={selectedSub}
                        customWidth={false}
                        customJusticfy="between"
                        contentWidth
                      />
                    
                      {selectedContent === "Deep Cleaning" &&
                        selectedSub !== null && (
                          <SideBarCard
                            cardImage={frequency}
                            imageAlt="frequency"
                            title="frequency"
                            condtion={selectedData}
                            cardContent={selectedData}
                            customWidth={false}
                            customJusticfy="between"
                            contentWidth
                          />
                        )}

                      {selectedContent !== "Other" && !isChecked && (
                        <SideBarCard
                          cardImage={hours}
                          imageAlt="hours"
                          title="Hours"
                          condtion={count}
                          cardContent={`${count} hours`}
                          customWidth={false}
                          customJusticfy="between"
                          contentWidth
                        />
                      )}
                      {selectedContent !== "Other" && !isChecked && (
                        <SideBarCard
                          cardImage={crew}
                          imageAlt="crew"
                          title="Crew Workers"
                          condtion={selectedTab.value}
                          cardContent={`${selectedTab.value} Crew`}
                          customWidth={false}
                          customJusticfy="between"
                          contentWidth
                        />
                      )}
                    </div>
                  </div>
                  {selectedContent !== "Other" && (
                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <CardTitle
                      imageSrc={expectedPrice}
                      imageAlt="expected price"
                      titleCard="expected price"
                      customJusticfyTitle="start"
                    />
                    <div className="border-b-2 border-solid border-[#286380] w-full" />
                    
                    <div className="flex flex-col px-7 py-2">
                      <span className="text-[#1D506A] font-alexandria text-sm font-normal uppercase">
                        approximately SERVICE price
                      </span>
                      <h2 className="text-[#245172] font-alexandria text-4xl font-medium">
                      {!isChecked ? servicesPrice + selectedTab.price +countPrice : servicesPrice} AED
                      </h2>
                    </div>
                  </div>
                   )} 
                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <CardTitle
                      imageSrc={addressImage}
                      imageAlt="address"
                      titleCard="Address"
                      customJusticfyTitle="start"
                    />
                    <div className="border-b-2 border-solid border-[#286380] w-full" />
                    <div className="w-full flex justify-between items-center space-x-3 bg-[#D0E3EB] py-1">
                      <div className="px-7">
                        <img
                          src={location}
                          alt="location"
                          className="service-icon w-8 h-6 object-contain transition-transform"
                        />
                      </div>
                      <div className="text-base font-alexandria font-[400] text-left text-[#123553]">
                        <h3>{address}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <CardTitle
                      imageSrc={dateTime}
                      imageAlt="date-time"
                      titleCard="Date and Time"
                      customJusticfyTitle="start"
                    />
                    <div className="border-b-2 border-solid border-[#286380] w-full" />
                    <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 space-y-3 rounded-3xl ">
                      <SideBarCard
                        cardImage={dateImage}
                        imageAlt="dateImage"
                        // title="Date"
                        condtion={date}
                        cardContent={dayjs(date).format("MMM D YYYY")}
                        customWidth
                        customJusticfy="start"
                        contentWidth
                      />

                      <SideBarCard
                        cardImage={timeImage}
                        imageAlt="timeImage"
                        // title="Email"
                        condtion={time}
                        cardContent={dayjs(time).format("hh:mm A")}
                        customWidth
                        customJusticfy="start"
                        contentWidth
                      />
                    </div>
                  </div>

                  <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
                    <CardTitle
                      imageSrc={contacts}
                      imageAlt="contact-information"
                      titleCard="Contact Information"
                      customJusticfyTitle="start"
                    />
                    <div className="border-b-2 border-solid border-[#286380] w-full" />
                    <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 space-y-3 rounded-3xl ">
                      <SideBarCard
                        cardImage={nameImage}
                        imageAlt="nameImage"
                        title="Name"
                        condtion={formData.fullName}
                        cardContent={formData.fullName}
                        customWidth
                        customJusticfy="between"
                        contentWidth
                      />

                      <SideBarCard
                        cardImage={emailImage}
                        imageAlt="emailImage"
                        title="Email"
                        condtion={formData.email}
                        cardContent={formData.email}
                        customWidth
                        customJusticfy="between"
                        contentWidth
                      />

                      <SideBarCard
                        cardImage={phoneImage}
                        imageAlt="phoneImage"
                        title="Phone"
                        condtion={formData.phoneNumber}
                        cardContent={formData.phoneNumber}
                        customWidth
                        customJusticfy="between"
                        contentWidth
                      />
                      <SideBarCard
                        cardImage={Connecting}
                        imageAlt="Connecting"
                        title="Support"
                        condtion={radioSelection}
                        cardContent={radioSelection}
                        customWidth
                        customJusticfy="between"
                        contentWidth
                      />
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
                className="w-16 h-16 object-contain transition-transform"
              />
            </div>
            <h3 className="text-lg sm:text-3xl font-alexandria font-bold text-[#123553]">
              CONGRATIOLATIONS
            </h3>
            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 pt-10 rounded-3xl ">
              <div className="text-left rounded-lg space-y-3 pt-0 flex flex-col w-full items-start justify-around">
                <SideBarCard
                  cardImage={service}
                  imageAlt="service"
                  title="Service"
                  condtion={selectedContent}
                  cardContent={selectedContent}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />

                <SideBarCard
                  cardImage={hours}
                  imageAlt="hours"
                  title="Hours"
                  condtion={count}
                  cardContent={`${count} hours`}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />

                <SideBarCard
                  cardImage={crew}
                  imageAlt="crew"
                  title="Crew Workers"
                  condtion={selectedTab.value}
                  cardContent={`${selectedTab.value} Crew`}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />

                <SideBarCard
                  cardImage={frequency}
                  imageAlt="frequency"
                  title="frequency"
                  condtion={selectedData}
                  cardContent={selectedData}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />
              </div>
            </div>

            <div className="text-left flex flex-col w-full items-start justify-around px-6 md:px-0 py-0 rounded-3xl  ">
              <div className=" w-full pt-10" />
              <CardTitle
                imageSrc={addressImage}
                imageAlt="address"
                titleCard="Address"
                customJusticfyTitle="center"
              />
              <div className="border-b-2 border-solid border-[#286380] w-full" />
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
              <div className=" w-full pt-10" />

              <CardTitle
                imageSrc={dateTime}
                imageAlt="date-time"
                titleCard="Date and Time"
                customJusticfyTitle="center"
              />
              <div className="border-b-2 border-solid border-[#286380] w-full" />
              <div className="text-left flex flex-col lg:flex-row pt-4 md:pt-10 w-full items-start justify-around px-6 md:px-0 rounded-3xl ">
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
              <div className=" w-full pt-10" />
              <CardTitle
                imageSrc={contacts}
                imageAlt="contact information"
                titleCard="Contact Information"
                customJusticfyTitle="center"
              />
              <div className="border-b-2 border-solid border-[#286380] w-full" />
              <div className="text-left flex flex-col w-full items-start justify-around px-0 md:px-0 space-y-3 rounded-3xl ">
                <SideBarCard
                  cardImage={nameImage}
                  imageAlt="nameImage"
                  title="Name"
                  condtion={formData.fullName}
                  cardContent={formData.fullName}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />

                <SideBarCard
                  cardImage={emailImage}
                  imageAlt="emailImage"
                  title="Email"
                  condtion={formData.email}
                  cardContent={formData.email}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />

                <SideBarCard
                  cardImage={phoneImage}
                  imageAlt="phoneImage"
                  title="phone"
                  condtion={formData.phoneNumber}
                  cardContent={formData.phoneNumber}
                  customWidth={false}
                  customJusticfy="between"
                  contentWidth={false}
                />
              </div>
            </div>
            <div className="py-10">
              <a href="https://mammutfm.ch/contact-us/">
                <button className="bg-[#336985] py-7 px-16 font-alexandria font-normal text-2xl rounded-xl text-white border border-solid border-[#707070] shadow-lg w-full">
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
