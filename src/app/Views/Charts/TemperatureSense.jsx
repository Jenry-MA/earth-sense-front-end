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
        label: "Temperatura",
        data: props.temperature_c,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: 'y1',
      },
    ]
  });

  const updateData = (data) => {

    setObjStructure({
      labels: data.label,
      datasets: [
        {
          label: "Temperatura (°C)",
          data: data.temperature_c,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
      ]
    })
  };

  useEffect(() => {
    updateData(props)
  },[props])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Temperatura en Grados",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + "°"; // Add the degree symbol
          },
        },
      },
    }
  };

 

  return <Line options={options} data={objStructure} />;
};
