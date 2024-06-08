"use client"
import { useEffect, useState } from "react";
import { TemperatureSense } from "./Charts/TemperatureSense";
import { HumiditySense } from "./Charts/HumiditySense";
import { HeatSense } from "./Charts/HeatSense";
import { TemperatureSense as TemperatureSenseApi } from "../Helpers/Api";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePickerTheme } from "../Helpers/Config";
import { ThemeProvider } from '@mui/material/styles';
import { Search, Loader } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { BasicInformation } from "./Components/BasicInformation";

export const Main = () => {

   const {getTemperatureSensorIndex} = TemperatureSenseApi
   const { datePickerLightTheme } = DatePickerTheme

   const [data, setData] = useState([]);
   const [selectedDate, setSelectedDate] = useState(null);
   const [viewData, setViewDate] = useState(new Date())
   const [validateDates, setValidateDates] = useState({
    validateFrom: false, 
    validateTo: false
   })
   const [isFiltering, setIsFiltering] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   /**
    * first fetch on load page
    */
  const onLoad = async () => {
    try{
      setIsLoading(true)
      //create obj date
      const dateObj = new Date()

      const guatemalaDate = new Date(dateObj.toLocaleString("en-US", { timeZone: "America/Guatemala" }));
      
      //create unix format
      const unixTimestamp = Math.floor(guatemalaDate.getTime() / 1000)

      setSelectedDate(unixTimestamp)

      const dates = getUnixTimestampsOfDay(unixTimestamp)
   
      const response = await getTemperatureSensorIndex(dates.startOfDay, dates.endOfDay)
    console.log(response)
      setData(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    onLoad()
  },[])

  /**
   * validate if date is diff to null, 0 or Nan
   * @param {BigInteger|Nan|null} value 
   * @returns {boolean}
   */
  const isValid = (value) => {
    return value !== null && value !== 0 && !isNaN(value);
  }

  /**
   * get value date
   * @param {string} date 
   */
  const handleToDate = (date) => {
    
    setViewDate(date)

    //create obj date
  
    const dateObj = new Date(date)

    const guatemalaDate = new Date(dateObj.toLocaleString("en-US", { timeZone: "America/Guatemala" }));
    
    //create unix format
    const utcTimestampInSeconds  = Math.floor(guatemalaDate.getTime() / 1000)

    setSelectedDate(utcTimestampInSeconds)
    setValidateDates({
      ...validateDates,
      validateTo: isValid(date),
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsFiltering(true)

    if(!validateDates.validateTo) { 
      enqueueSnackbar('Please check fill', { variant: 'error' })
      return
    }
  
    const dates = getUnixTimestampsOfDay(selectedDate)
    console.log(dates)
    try{
      const response = await getTemperatureSensorIndex(dates.startOfDay, dates.endOfDay)
      console.log(response)
      setData(response)
      enqueueSnackbar('Data fetched', { variant: 'success' })
    }catch(error){
      console.log(error)
      enqueueSnackbar('Data fetched', { variant: 'error' })
    } finally {
      setIsFiltering(false)
    }
  }

  function getUnixTimestampsOfDay(unixTimestamp) {

    const startDate = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds
    const startOfDay = new Date(startDate); // Copy the original date
    const endOfDay = new Date(startDate); // Copy the original date

    // Set start time to 00:00:00
    startOfDay.setUTCHours(0, 0, 0, 0);

    // Set end time to 23:59:59
    endOfDay.setUTCHours(23, 59, 59, 999);

    return {
      startOfDay: Math.floor(startOfDay.getTime() / 1000), // Convert back to UNIX timestamp (in seconds)
      endOfDay: Math.floor(endOfDay.getTime() / 1000) // Convert back to UNIX timestamp (in seconds)
    };
  }

  return (
    <div className="container mx-auto md:p-0 p-2">
      <SnackbarProvider/>
      <form className="flex flex-row gap-2 mt-2 items-center">
        <div className="flex flex-col gap-1">
          <ThemeProvider theme={datePickerLightTheme}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker 
                onChange={handleToDate} 
                label="Date" 
                value={viewData}
                disableFuture
              />
            </DemoContainer>
          </ThemeProvider>          
        </div>
        {!isFiltering 
        ? //if true
          <button 
            type="button" 
            title="search" 
            className="rounded bg-blue-500 hover:bg-blue-400 p-4 mt-2 cursor-pointer"
            onClick={handleSubmit}
          >
            <Search />
          </button> 
        : //else
          <button 
          type="button" 
          title="filtering" 
          className="rounded bg-blue-500 hover:bg-blue-400 p-4 mt-2 cursor-pointer"
          >
            <Loader className="animate-spin" />
          </button>
        }
        
      </form>
     <div className="grid md:grid-cols-2 grid-cols-1 gap-2 py-4">
        <div>
          <BasicInformation/>
        </div>
        <div className="p-2 bg-white rounded-lg">
          {isLoading ?   <div className="md:h-72 h-32 flex flex-col justify-center items-center">
             <Loader className="animate-spin md:w-20 md:h-20 h-10 w-10" />
          </div> : <TemperatureSense props={data} />}
        </div>
        <div className="p-2 bg-white rounded-lg">
          {isLoading ?   <div className="md:h-72 h-32 flex flex-col justify-center items-center">
             <Loader className="animate-spin md:w-20 md:h-20 h-10 w-10" />
          </div> : <HumiditySense props={data} />}
        </div>
        <div className="p-2 bg-white rounded-lg">
          {isLoading ?   <div className="md:h-72 h-32 flex flex-col justify-center items-center">
             <Loader className="animate-spin md:w-20 md:h-20 h-10 w-10" />
          </div> : <HeatSense props={data} />}
        </div>
      </div>
    </div>
  );
};
