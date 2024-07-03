import React from "react";
import { cn } from "@/lib/utils";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";


function TabsContent({ onTabChange }) {
  const handleTabChange = (value) => {
    onTabChange(value);
  };

  return (
    <div className="w-full text-left mt-10">
      <h1 className="text-xl text-left my-3 text-[#123553] font-bold">
        How Many Crew?
      </h1>
      <Tabs onValueChange={handleTabChange} defaultValue="1" className={cn("relative mt-6 w-full")}>
        <TabsList>
          <TabsTrigger
            value="1"
            className={cn(
              "font-bold text-[#123553] w-fit p-2 data-[state=active]:text-white data-[state=active]:bg-[#123553]"
            )}
          >
            One
          </TabsTrigger>
          <TabsTrigger
            value="2"
            className={cn(
              "font-bold text-[#123553] w-fit p-2 data-[state=active]:text-white data-[state=active]:bg-[#123553]"
            )}
          >
            Two
          </TabsTrigger>
          <TabsTrigger
            value="3"
            className={cn(
              "font-bold text-[#123553] w-fit p-2 data-[state=active]:text-white data-[state=active]:bg-[#123553]"
            )}
          >
            Three
          </TabsTrigger>
          <TabsTrigger
            value="4"
            className={cn(
              "font-bold text-[#123553] w-fit p-2  data-[state=active]:text-white data-[state=active]:bg-[#123553]"
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
