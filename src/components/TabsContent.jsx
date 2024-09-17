import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import crew from "../../public/images/crew.svg";

function TabsContent({ onTabChange, checkboxClasses }) {
  const handleTabChange = (value) => {
    onTabChange(value);
  };

  return (
    <div className="w-full text-left mt-10 bg-[#E1E7E9] py-7 my-10 flex flex-col space-y-10 md:space-y-0 md:flex-row justify-around items-center">
      <div className="flex flex-row space-x-3">
        <img
          src={crew}
          alt="crew"
          className="service-icon w-14 h-12  rounded-full  transition-transform"
        />
        <h1 className="font-alexandria text-base sm:text-lg text-left my-3 text-[#1D506A] font-normal">
          How Many Crew?
        </h1>
      </div>
      <Tabs
        onValueChange={handleTabChange}
        defaultValue=""
        className={cn("relative w-fit")}
      >
        <TabsList className="grid md:block grid-cols-2 grid-rows-2 gap-4 w-full h-full p-4">
          <TabsTrigger
          disabled={checkboxClasses}
            value="1"
            className={cn(
              "bg-white font-normal text-lg text-[#286380]  p-2 data-[state=active]:text-white data-[state=active]:bg-[#286380] mr-2 md:mr-5 h-[70px] w-[70px] border border-[#113553] border-solid"
            )}
          >
            One
          </TabsTrigger>
          <TabsTrigger
          disabled={checkboxClasses}
            value="2"
            className={cn(
              "bg-white font-normal text-lg text-[#286380]  p-2 data-[state=active]:text-white data-[state=active]:bg-[#286380] mr-2 md:mr-5 h-[70px] w-[70px] border border-[#113553] border-solid"
            )}
          >
            Two
          </TabsTrigger>
          <TabsTrigger
          disabled={checkboxClasses}
            value="3"
            className={cn(
              "bg-white font-normal text-lg text-[#286380]  p-2 data-[state=active]:text-white data-[state=active]:bg-[#286380] mr-2 md:mr-5 h-[70px] w-[70px] border border-[#113553] border-solid"
            )}
          >
            Three
          </TabsTrigger>
          <TabsTrigger
          disabled={checkboxClasses}
            value="4"
            className={cn(
              "bg-white font-normal text-lg text-[#286380]  p-2  data-[state=active]:text-white data-[state=active]:bg-[#286380] mr-2 md:mr-5 h-[70px] w-[70px] border border-[#113553] border-solid"
            )}
          >
            Four
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default TabsContent;
