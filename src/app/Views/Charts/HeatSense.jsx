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

export const HeatSense = ({props}) => {

  const [objStructure, setObjStructure] = useState({
    labels: props.label,
    datasets: [
      {
        label: "Indice de Calor",
        data: props.heat_index_c,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]
  });

  const updateData = (data) => {

    setObjStructure({
      labels: data.label,
      datasets: [
        {
          label: "Indice de Calor",
          data: data.heat_index_c,
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
        text: "Indice de Calor",
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
