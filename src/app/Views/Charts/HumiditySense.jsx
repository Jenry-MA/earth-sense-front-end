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

export const HumiditySense = ({props}) => {

  const [objStructure, setObjStructure] = useState({
    labels: props.label,
    datasets: [
      {
        label: "Humedad",
        data: props.humidity,
        borderColor: "rgb(52, 123, 255)",
        backgroundColor: "rgba(52, 123, 255, 0.5)",
      },
    ]
  });

  const updateData = (data) => {

    setObjStructure({
      labels: data.label,
      datasets: [
        {
          label: "Humedad",
          data: data.humidity,
          borderColor: "rgb(52, 123, 255)",
          backgroundColor: "rgba(52, 123, 255, 0.5)",
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
        text: "Humedad 💧",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + "💧"; // Add the degree symbol
          },
        },
      },
    }
  };

 

  return <Line options={options} data={objStructure} />;
};
