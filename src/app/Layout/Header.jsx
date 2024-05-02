import React from "react";
import { EarthSenseLogo } from "../Assets/Svg/EarthSenseLogo";

export const Header = () => {
  return (
    <div className=" bg-white h-28 font-bold flex flex-row items-center justify-between md:px-20 px-2">
      
      <div className="w-20 h-20" >
        <EarthSenseLogo/> 
      </div>
      <div className="text-3xl text-green-700">Earth Sense</div>
    </div>
  );
};
