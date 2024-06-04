"use client"
import { useState, useEffect } from "react";
import { TemperatureSense as TemperatureSenseApi } from "../../Helpers/Api";

export const CurrentTemperature = () => {

  const {getCurrentTemperature} = TemperatureSenseApi

   const [currentTemp, setCurrentTemp] = useState(null);

  /**
   * get current temperature
   */
  const currentTemperature = async () => {
    try{
      const response = await getCurrentTemperature()
      setCurrentTemp(response)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {

    currentTemperature()

    const interval = setInterval(currentTemperature, 300000); // 300000 ms = 5 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  },[])

  return (
    <div className="flex flex-col gap-2 drop-shadow-sm">
        <label className="text-2xl ">
            Temperatura Actual: 
        <label className="font-semibold"> {currentTemp?.temperature_c}°</label> 
        </label>
    </div>
  );
};
