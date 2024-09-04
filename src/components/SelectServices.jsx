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

function SelectServices({ onServicesSelected }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = [
    { id: 1, value: "Deep Cleaning", icon: deepCleaning },
    { id: 2, value: "AC Maintenance", icon: acMaintainance },
    { id: 3, value: "Painting Service", icon: paintingService },
    { id: 4, value: "Pest Control", icon: pestControl },
    { id: 5, value: "Maintenance Work", icon: maintainanceWork },
    { id: 6, value: "AC Duct Cleaning", icon: acDuctCleaning },
    { id: 7, value: "Upholstery Cleaning", icon: upholsteryCleaning },
    { id: 8, value: "Marble Polishing", icon: marblePolishing },
    { id: 9, value: "Pool Cleaning", icon: poolCleaning },
    { id: 10, value: "Movers & Packers", icon: moversPackers },
  ];
  const handleClick = (index) => {
    setActiveIndex(index);
    onServicesSelected(items[index].value);
  };

  return (
    <>
      <Carousel className="w-full border rounded-3xl border-solid border-[#205164] sm:w-[80%] sm:mx-24 shadow-custom-light">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem className="basis-[50%] md:basis-[31%]" key={item.id}>
              <li
                key={item.id}
                className={`web-list-item w-full text-base sm:text-xl rounded-lg ${
                  index === activeIndex ? "active" : ""
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
                  <h3 className="text-base  mt-2 text-[#205164] font-alexandria font-[400] uppercase">
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
    </>
  );
}

export default SelectServices;
