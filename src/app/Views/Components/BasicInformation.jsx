"use client";
import React, { useEffect, useState } from "react";
import { CurrentTemperature} from "./CurrentTemperature";

export const BasicInformation = ({props}) => {


  return (
    <div className="p-2 h-full bg-white rounded-lg drop-shadow" >
        <span className="text-2xl font-semibold underline" >Datos Actuales</span>
        <div className="flex flex-col justify-center md:mt-10">
            <CurrentTemperature />
        </div>
    </div>
    );
};
