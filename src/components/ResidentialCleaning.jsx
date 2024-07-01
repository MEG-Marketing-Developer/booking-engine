import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import './ButtonCarousel.css';


function ResidentialCleaning() {
    const [activeIndex, setActiveIndex] = useState(null);
    const items = [
        { id: 1, value: 'Item 1' },
        { id: 2, value: 'Item 2' },
        { id: 3, value: 'Item 3' },
        { id: 4, value: 'Item 4' },
        { id: 5, value: 'Item 5' },
      ];
      const handleClick = (index) => {
        setActiveIndex(index);
      };
    

  return (
    <>
    <ul className="list-container">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`list-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        >
          {item.value}
        </li>
      ))}
    </ul>
    </>
  );
}

export default ResidentialCleaning;
