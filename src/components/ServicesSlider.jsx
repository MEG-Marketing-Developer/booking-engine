import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function ServicesSlider({onDataSelected}) {
  

  const [activeIndex, setActiveIndex] = useState(null);
  const items = [
    { id: 1, value: "One Time" },
    { id: 2, value: "Once a Week" },
    { id: 3, value: "Every Other Week" },
    { id: 4, value: "Every 3 Weeks" },
    { id: 5, value: "Every 4 Weeks" },
    { id: 6, value: "Every 5 Weeks" },
    { id: 7, value: "Every 6 Weeks" },
    { id: 8, value: "Twice a Week" },
    { id: 9, value: "Thrice a Week" },
    { id: 10, value: "Twice a Week" },
    { id: 11, value: "Thrice a Week" },
    { id: 12, value: "4 Times a Week" },
    { id: 13, value: "5 Times a Week" },
    { id: 14, value: "6  Times a Week" },
  ];
  const handleClick = (index) => {
    setActiveIndex(index); 
    onDataSelected(items[index].value) 
  };

  return (
    <>
      <h1 className="text-2xl text-left my-3 text-[#123553] font-bold">
        Select your booking frequency
      </h1>
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem className="basis-[40%]">
              <li
                key={item.id}
                className={`list-item w-full text-xl rounded-lg ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {item.value}
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
        
    
    </>
  );
}

export default ServicesSlider;
