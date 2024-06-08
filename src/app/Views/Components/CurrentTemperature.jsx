"use client"
import { useState, useEffect } from "react";
import { TemperatureSense as TemperatureSenseApi } from "../../Helpers/Api";
import { Search, Loader } from 'lucide-react';

export const CurrentTemperature = () => {

  const {getCurrentTemperature} = TemperatureSenseApi

   const [currentTemp, setCurrentTemp] = useState(null);
   const [heatIndex, setHeatIndex] = useState(null);
   const [humidify, setHumidity] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

  /**
   * get current temperature
   */
  const currentTemperature = async () => {
    try{
      setIsLoading(true)
      const response = await getCurrentTemperature()
      setCurrentTemp(response)
    } catch (error) {
      throw error
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {

    currentTemperature()

    const interval = setInterval(currentTemperature, 300000); // 300000 ms = 5 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  },[])

  return (
    <>
      {
        isLoading ?
          <div className="md:h-72 h-32 flex flex-col justify-center items-center">
             <Loader className="animate-spin md:w-20 md:h-20 h-10 w-10" />
          </div>
        :
        <div className="grid grid-cols-2 place-content-between gap-2 py-4">
          <label className="md:text-2xl text-lg">
            Temperatura: 
          </label>
          <label className="md:text-xl text-lg font-semibold"> 
              {currentTemp?.temperature_c}°
          </label> 
          <label className="md:text-2xl text-lg">
            Indixe de Calor: 
          </label>
          <label className="md:text-xl text-lg font-semibold"> 
              {currentTemp?.heat_index_c}°
          </label> 
          <label className="md:text-2xl text-lg">
            Humedad: 
          </label>
          <label className="md:text-xl text-lg font-semibold"> 
              {currentTemp?.humidity}
          </label>
      </div>
      }
      
    </>
  );
};
