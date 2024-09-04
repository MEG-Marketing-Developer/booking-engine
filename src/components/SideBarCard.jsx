import React from 'react'

function SideBarCard({cardImage, imageAlt, title, condtion,cardContent, customWidth, customJusticfy }) {
  return (
    <div className={`w-full flex items-center space-x-3 bg-[#D0E3EB] py-2 flex-col md:flex-row space-y-3 ${customJusticfy ? 'justify-between' : 'justify-start'}`}>
    <div className="flex flex-row space-x-3 px-7 justify-center items-center">
      <img
        src={cardImage}
        alt={imageAlt}
        className="service-icon w-10 h-8 object-contain   transition-transform"
      />
      <h2 className="font-segoe text-base text-left my-3 text-[#1D506A] font-semibold uppercase">
        {title}
      </h2>
    </div>
    {condtion && (
      <div className={`px-8 py-1 md:!mr-7 rounded-lg flex justify-center items-center bg-[#C8EAF8] border border-[#707070] shadow-md ${customWidth ? 'w-fit' : 'w-[200px]'}`}>
        <h3 className="text-base font-segoe font-semibold text-[#123553]">
          {cardContent}
        </h3>
      </div>
    )}
  </div>
  )
}

export default SideBarCard