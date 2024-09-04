import React from "react";

function CardTitle({ imageSrc, imageAlt, titleCard, customJusticfyTitle }) {
  return (
    <div
      className={`flex flex-row space-x-3 px-7 py-3 w-full bg-[#245172] items-center 
     ${"justify-" + customJusticfyTitle}
    `}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="service-icon w-8 h-auto transition-transform filter-custom-white"
      />
      <h1 className="font-alexandria text-base sm:text-xl text-left text-[#E4ECEF] font-normal uppercase">
        {titleCard}
      </h1>
    </div>
  );
}

export default CardTitle;
