"use client"
import { useState } from "react";


export const CurrentTemperature = () => {

   const [currentTemperature, setCurrentTemperature] = useState(null);

  return (
    <div className="flex flex-col gap-2">
        <label className="text-2xl ">
            Temperatura Actual: 
        <label className="font-semibold"> 40°</label> 
        </label>
    </div>
  );
};
