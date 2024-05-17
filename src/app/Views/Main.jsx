"use client"
import { useEffect, useState } from "react";
import { H2oSense } from "./Charts/H2oSense";
import { TemperatureSense } from "./Charts/TemperatureSense";
import { TemperatureSense as TemperatureSenseApi } from "../Helpers/Api";

export const Main = () => {

   const {getTemperatureSensorIndex} = TemperatureSenseApi

   const [data, setData] = useState([]);

  useEffect(() => {
    getTemperatureSensorIndex("1715825829","1715827029")
    .then((response) => {
      console.log(response)
      setData(response)
    })
    .catch((error) => {
      alert(error)
    })
  },[])

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 py-4 px-2">
        <div className=" p-2 bg-white rounded-lg">
          <H2oSense />
        </div>
        <div className="p-2 bg-white rounded-lg">
          <TemperatureSense />
        </div>
      </div>
    </div>
  );
};
