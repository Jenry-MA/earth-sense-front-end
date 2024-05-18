"use client"
import { useEffect, useState } from "react";
import { H2oSense } from "./Charts/H2oSense";
import { TemperatureSense } from "./Charts/TemperatureSense";
import { TemperatureSense as TemperatureSenseApi } from "../Helpers/Api";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePickerTheme } from "../Helpers/Config";
import { ThemeProvider } from '@mui/material/styles';
import { Search } from 'lucide-react';

export const Main = () => {

   const {getTemperatureSensorIndex} = TemperatureSenseApi
   const { datePickerLightTheme } = DatePickerTheme

   const [data, setData] = useState([]);
   const [selectedFromDate, setSelectedFromDate] = useState(null);
   const [selectedToDate, setSelectedToDate] = useState(null);

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

  const handleFromDate = (date) => {
    const dateObj = new Date(date)
    const unixTimestamp = Math.floor(dateObj.getTime() / 1000)
    setSelectedFromDate(unixTimestamp)
  }

  const handleToDate = (date) => {
    const dateObj = new Date(date)
    const unixTimestamp = Math.floor(dateObj.getTime() / 1000)
    setSelectedToDate(unixTimestamp)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container mx-auto">
      <form className="flex flex-row gap-2 items-center">
        <ThemeProvider theme={datePickerLightTheme}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker onChange={handleFromDate} label="From" />
          </DemoContainer>
        </ThemeProvider>
        <ThemeProvider theme={datePickerLightTheme}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker onChange={handleToDate} label="To" />
          </DemoContainer>
        </ThemeProvider>
        <button 
          type="button" 
          title="search" 
          className="rounded bg-blue-500 hover:bg-blue-400 p-4 mt-2 cursor-pointer"
          onClick={handleSubmit}
        >
          <Search />
        </button>
      </form>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 py-4">
        <div className="p-2 bg-white rounded-lg">
          <H2oSense />
        </div>
        <div className="p-2 bg-white rounded-lg">
          <TemperatureSense />
        </div>
      </div>
    </div>
  );
};
