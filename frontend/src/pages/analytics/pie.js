import React from "react";
import { Doughnut } from "react-chartjs-2";

export function Pie({ label, color, pieData }) {
  const data = {
    labels: label,
    datasets: [
      {
        label: "# of Sales",
        data: pieData,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom", // Display legend below the chart
        labels: {
          font: {
            size: 10, // Adjust the font size of the legend labels
          },
        },
      },
    },
  };

  return <Doughnut className="w-[250px]" data={data} options={options}  />;
}

export default Pie;
