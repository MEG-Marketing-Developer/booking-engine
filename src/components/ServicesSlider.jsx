import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "./ButtonSilder.css";

function ServicesSlider({ onDataSelected }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = [
    { id: 1, value: "One Time", value1: "One", value2: "Time" },
    { id: 2, value: "Once a Week", value1: "Once", value2: "a Week" },
    { id: 3, value: "Every Week", value1: "Every", value2: "Week" },
    { id: 4, value: "Every 3 Weeks", value1: "Every", value2: "3 Weeks" },
    { id: 5, value: "Every 4 Weeks", value1: "Every", value2: "4 Weeks" },
    { id: 6, value: "Every 5 Weeks", value1: "Every", value2: "5 Weeks" },
    { id: 7, value: "Every 6 Weeks", value1: "Every", value2: "6 Weeks" },
    { id: 8, value: "Twice a Week" , value1: "Twice", value2: "a week"},
    { id: 9, value: "Thrice a Week" , value1: "Thrice", value2: "a week"},
    { id: 10, value: "4 Times a Week" , value1: "4 Times", value2: "a week"},
    { id: 11, value: "5 Times a Week" , value1: "5 Times", value2: "a week"},
    { id: 12, value: "6 Times a Week" , value1: "6 Times", value2: "a week"},
  ];
  const handleClick = (index) => {
    setActiveIndex(index);
    onDataSelected(items[index].value);
  };

  return (
    <div className="bg-[#E1E7E9] py-7 my-10">
      <h1 className="text-base sm:text-3xl my-8 text-[#205164] font-[500] text-center font-alexandria uppercase ">
        Select your booking frequency
      </h1>
      <Carousel className="w-[75%] mx-auto carousel-container">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem className="basis-[49%] md:basis-[16%]" key={item.id}>
              <li
                key={item.id}
                className={`text-[#205164] web-list-service font-alexandria h-[100px] bg-white w-full rounded-lg border border-solid border-[#113553] shadow-custom-light ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                <span className="text-base">{item.value1}</span>
                <span className="text-xl">{item.value2}</span>
                
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ServicesSlider;
