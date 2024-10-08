import React from "react";

function SideBarCard({
  cardImage,
  imageAlt,
  title,
  condtion,
  cardContent,
  customWidth,
  customJusticfy,
  contentWidth,
  bgColor,
  cardBackground,
}) {
  return (
    <div
      className={`w-full   py-2 space-y-3 ${bgColor}`}
    >
      <div
        className={`${contentWidth ? "w-full" : "w-[50%]"} mx-auto flex items-center space-x-3  flex-col md:flex-row  ${
          "justify-" + customJusticfy
        }`}
      >
        <div className="flex flex-row space-x-3 px-7 justify-center items-center">
          <img
            src={cardImage}
            alt={imageAlt}
            className="service-icon w-8 h-6 object-contain transition-transform"
          />
          <h2 className="font-alexandria text-sm text-left my-3 text-[#1D506A] font-[400] uppercase">
            {title}
          </h2>
        </div>
        {condtion && (
          <div
            className={`px-8 py-1 md:!mr-7 rounded-lg flex justify-center items-center  border border-[#707070] shadow-md 
              ${
              customWidth ? "w-fit" : "w-[200px]"
            }
             ${
              cardBackground  ? "bg-[#C8EAF8]" : "bg-[#E5E5E5]"
            }
            `}
          >
            <h3 className="text-sm font-alexandria font-[400] text-[#1D506A] text-center">
              {cardContent}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBarCard;
