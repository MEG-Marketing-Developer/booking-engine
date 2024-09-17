import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "./ButtonSilder.css";

import deepCleaning from "../../public/images/services/deep-cleaning.svg";
import acMaintainance from "../../public/images/services/ac-maintainmance.svg";
import paintingService from "../../public/images/services/painting-service.svg";
import pestControl from "../../public/images/services/pest-control.svg";
import maintainanceWork from "../../public/images/services/maintenance-work.svg";
import acDuctCleaning from "../../public/images/services/ac-duct-cleaning.svg";
import upholsteryCleaning from "../../public/images/services/upholstery-cleaning.svg";
import marblePolishing from "../../public/images/services/marble-polishing.svg";
import poolCleaning from "../../public/images/services/pool-cleaning.svg";
import moversPackers from "../../public/images/services/movers-packages.svg";
import others from "../../public/images/services/others.svg";
import residentialMover from "../../public/images/services/residential-mover.svg";
import commercialMover from "../../public/images/services/commercial-mover.svg";
import studioMover from "../../public/images/services/studio-mover.svg";
import homeFurunutueMover from "../../public/images/services/home-furunutue-mover.svg";
import applianceMover from "../../public/images/services/appliance-mover.svg";
import other from "../../public/images/services/other.svg";

function SelectServices({ onServicesSelected, onSubServicesSelected, onServicePrice }) {
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [otherService, setOtherService] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubIndex, setActiveSubIndex] = useState(null);
  const items = [
    { id: 1, value: "Movers & Packers", icon: moversPackers, price:250 },
    { id: 2, value: "Deep Cleaning", icon: deepCleaning , price:450},
    { id: 3, value: "Maintenance Work", icon: maintainanceWork , price:550},
    { id: 4, value: "Other", icon: others },
  ];

  // When a service type is selected, update subservices
  const handleServiceTypeSelection = (index) => {
    const selectedService = items[index].value;
    setActiveIndex(index);
    onServicesSelected(selectedService);
    setSelectedServiceType(selectedService);
    onServicePrice(items[index].price)

    // Update subservices dynamically based on service type
    if (selectedService === "Movers & Packers") {
      setSubServices([
        { id: 10, value: "residential mover", icon: residentialMover },
        { id: 11, value: "commercial mover", icon: commercialMover },
        { id: 12, value: "studio mover", icon: studioMover },
        { id: 13, value: "home furunutue mover", icon: homeFurunutueMover },
        { id: 14, value: "appliance mover", icon: applianceMover },
        { id: 15, value: "other", icon: other },
      ]);
    } else if (selectedService === "Deep Cleaning") {
      setSubServices([
        { id: 20, value: "AC Maintenance", icon: maintainanceWork },
        { id: 21, value: "Electrical Repair", icon: others },
      ]);
    } else if (selectedService === "Maintenance Work") {
      setSubServices([
        { id: 30, value: "Movers & Packers", icon: moversPackers },
        { id: 31, value: "Others", icon: others },
      ]);
    } else if (selectedService === "Other") {
      setSubServices([]); // Clear subservices for 'Other'
    }
  };
  const handleClick = (index) => {
    // Send the value from the selected subservice
    setActiveSubIndex(index);
    onSubServicesSelected(subServices[index].value);
  };

  if (selectedServiceType === "Other") {
    // Send the value from the input field if 'Other' is selected
    onSubServicesSelected(otherService);
  }

  return (
    <>
      <Carousel className="w-full border rounded-3xl border-solid border-[#205164] sm:w-[80%] sm:mx-24 shadow-custom-light">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem className="basis-[50%] md:basis-[25%]" key={item.id}>
              <li
                key={item.id}
                className={`web-list-item w-full text-base sm:text-xl rounded-lg ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleServiceTypeSelection(index)}
              >
                <div className="cursor-pointer justify-center items-center text-center flex flex-col pl-2">
                  <div className="service-icon-container w-24 h-24 bg-[#D9E5ED] rounded-full flex items-center justify-center border border-[#707070] border-solid ">
                    <img
                      src={item.icon}
                      alt={item.value}
                      className="service-icon w-20 h-12  rounded-full  hover:scale-105 transition-transform filter-custom-blue"
                    />
                  </div>
                  <h3 className="text-xs  mt-2 text-[#205164] font-alexandria font-[400] uppercase">
                    {item.value}
                  </h3>
                </div>
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      {selectedServiceType && selectedServiceType !== "Other" && (
        <div className="bg-[#E1E7E9] py-7 my-10">
          <h1 className="text-base sm:text-3xl my-8 text-[#205164] font-[500] text-center font-alexandria uppercase ">
            Select your Type of Services
          </h1>
          <Carousel className="w-full border rounded-3xl border-solid border-[#205164] sm:w-[80%] sm:mx-24 shadow-custom-light">
            <CarouselContent>
              {subServices.map((item, index) => (
                <CarouselItem
                  className="basis-[50%] md:basis-[25%]"
                  key={item.id}
                >
                  <li
                    key={item.id}
                    className={`web-list-item w-full text-base sm:text-xl rounded-lg ${
                      index === activeSubIndex ? "active" : ""
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <div className="cursor-pointer justify-center items-center text-center flex flex-col pl-2">
                      <div className="service-icon-container w-24 h-24 bg-[#D9E5ED] rounded-full flex items-center justify-center border border-[#707070] border-solid ">
                        <img
                          src={item.icon}
                          alt={item.value}
                          className="service-icon w-20 h-12  rounded-full  hover:scale-105 transition-transform filter-custom-blue"
                        />
                      </div>
                      <h3 className="text-xs  mt-2 text-[#205164] font-alexandria font-[400] uppercase">
                        {item.value}
                      </h3>
                    </div>
                  </li>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
        <CarouselNext />
          </Carousel>
        </div>
      )}
      {selectedServiceType === "Other" && (
        <div className="my-8">
          <label className="text-base sm:text-3xl my-8 text-[#205164] font-[500] text-center font-alexandria uppercase ">
            Please specify your service:
          </label>

          <input
            type="text"
            value={otherService}
            onChange={(e) => setOtherService(e.target.value)}
            className="w-[90%] p-2 border border-gray-400 rounded-md m-10"
            placeholder="Enter service details"
          />
        </div>
      )}
    </>
  );
}

export default SelectServices;
