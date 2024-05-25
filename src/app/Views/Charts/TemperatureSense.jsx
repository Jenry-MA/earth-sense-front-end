"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TemperatureSense = ({props}) => {


  const [objStructure, setObjStructure] = useState({
    labels: props.label,
    datasets: [
      {
        label: "Temperature",
        data: props.values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const updateData = (labels, values) => {

    setObjStructure({
      labels: labels,
      datasets: [
        {
          label: "Temperature",
          data: values,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
      ]
    })
  };

  useEffect(() => {
    
    console.log("obj",props.label)
    updateData(props.label,props.values)
  },[props])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperatura en Grados",
      },
    },
  };

 

  return <Line options={options} data={objStructure} />;
};
