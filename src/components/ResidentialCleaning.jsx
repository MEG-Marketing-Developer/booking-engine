import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./ButtonCarousel.css";
import { cn } from "@/lib/utils";

function ResidentialCleaning() {
  const [count, setCount] = useState(2);
  const decrement = () => {
    if (count > 2) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

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
  };

  return (
    <>
    <h1 className="text-2xl text-left my-3 text-[#123553] font-bold">Select your booking frequency</h1>
        <Carousel className="w-full">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem className="basis-[37%]">
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
        <div className="w-full text-left mt-10">
          <h1 className="text-xl text-left my-3 text-[#123553] font-bold">How Many Crew?</h1>
          <Tabs defaultValue="one" className={cn("relative mt-6 w-full")}>
            <TabsList>
              <TabsTrigger value="one" className={cn("tab-title data-[state=active]:text-white data-[state=active]:bg-[#123553]")}>One</TabsTrigger>
              <TabsTrigger value="two"  className={cn("tab-title data-[state=active]:text-white data-[state=active]:bg-[#123553]")}>Two</TabsTrigger>
              <TabsTrigger value="three"  className={cn("tab-title data-[state=active]:text-white data-[state=active]:bg-[#123553]")}>Three</TabsTrigger>
              <TabsTrigger value="four"  className={cn("tab-title  data-[state=active]:text-white data-[state=active]:bg-[#123553]")}>Four</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <h1 className="text-2xl text-left mt-5 text-[#123553] font-bold">Hours</h1>
        <div className="flex flex-row space-x-3 items-center justify-start p-4 mt-0">
          {/* <div>
            <span>Hours</span>
          </div> */}
          <button
            className="px-4 py-2 bg-[#123553] text-white rounded hover:bg-blue-700"
            onClick={decrement}
          >
            -
          </button>
          <div className="text-2xl font-bold ">{count}</div>

          <button
            className="px-4 py-2 bg-[#123553] text-white rounded hover:bg-blue-700"
            onClick={increment}
          >
            +
          </button>
          <div>
            <spa>
              CHF
              <br />
              30/hr
            </spa>
          </div>
        </div>
    </>
  );
}

export default ResidentialCleaning;
