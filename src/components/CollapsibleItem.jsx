import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

const CollapsibleItem = ({ title, children, isOpen, onToggle }) => {
  return (
   <>
     <div className="mb-4">
      <Button onClick={onToggle} className="bg-transparent hover:bg-transparent">
        {title}
      </Button>
      {isOpen && (
      <div className="mt-2 p-4  rounded w-full">
      {children}
    </div>
      
    )}  
    </div>
    
    </>

  );
};

export default CollapsibleItem;
