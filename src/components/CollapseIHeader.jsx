import React from 'react'

function CollapseIHeader({imageSrc,serviceTitle }) {
  return (
    <div className="flex flex-col justify-center items-center">
                <img src={imageSrc} alt={serviceTitle} className='w-24 border-2 bg-[#123553] rounded-lg p-4' />
                <h2 className='text-[#123553] text-lg font-bold'>{serviceTitle}</h2>
               </div>
  )
}

export default CollapseIHeader