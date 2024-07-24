import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler, // Import Filler plugin
} from "chart.js";
import { FaWind } from "react-icons/fa";

// Registering the components needed
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler // Register Filler plugin
);

// Data for Line Chart
const getLineChartData = (year, chartType) => {
  const data = {
    2023: {
      misi: [12, 19, 3, 5, 2, 3, 1, 8, 4, 7, 1, 1],
      perbaikan: [10, 15, 5, 7, 1, 9, 4, 6, 3, 2, 8, 4],
      operator: [15, 20, 10, 25, 5, 8, 3, 12, 6, 10, 4, 2],
      wahana: [10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      komponen: [5, 10, 15, 10, 5, 12, 7, 8, 3, 6, 9, 4],
    },
    2024: {
      misi: [2, 29, 5, 5, 12, 8, 4, 7, 1, 1, 3, 9],
      perbaikan: [12, 25, 17, 8, 19, 20, 8, 7, 6, 3, 11, 9],
      operator: [12, 25, 15, 10, 18, 20, 22, 25, 28, 30, 35, 40],
      wahana: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      komponen: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72],
    },
  };

  if (chartType === "activity") {
    return {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      datasets: [
        {
          label: "Misi",
          data: data[year].misi,
          borderColor: "#dc2626",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true, // Ensure fill is set
        },
        {
          label: "Perbaikan",
          data: data[year].perbaikan,
          borderColor: "#0891b2",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true, // Ensure fill is set
        },
      ],
    };
  }

  if (chartType === "resource") {
    return {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      datasets: [
        {
          label: "Wahana",
          data: data[year].wahana,
          borderColor: "#2563eb",
          backgroundColor: "rgba(248, 113, 113, 0.1)",
          fill: true, // Ensure fill is set
        },
        {
          label: "Operator",
          data: data[year].operator,
          borderColor: "#fb923c",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true, // Ensure fill is set
        },
        {
          label: "Komponen",
          data: data[year].komponen,
          borderColor: "#16a34a",
          backgroundColor: "rgba(52, 211, 153, 0.1)",
          fill: true, // Ensure fill is set
        },
      ],
    };
  }
};

// Data for Pie Chart
const pieChartData = {
  labels: ["Pemetaan", "Monitoring", "Pengiriman", "Kompetisi"],
  datasets: [
    {
      label: "Kategori Misi",
      data: [10, 20, 30, 40],
      backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa"],
      borderColor: "#ffffff", // White border for pie chart slices
      borderWidth: 2, // Adjust the border width to make it visible
    },
  ],
};

function Chart() {
  const [year, setYear] = useState("2024");

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Diagram Garis Jumlah Misi dan Diagram Pie */}
      <div className="flex flex-row space-x-4">
        {/* Diagram Garis Jumlah Misi */}
        <div className="w-2/3 p-4 border border-gray-100 rounded-xl bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-center">Activity</h3>
          <select
            value={year}
            onChange={handleYearChange}
            className="block w-1/6 mb-4 mx-auto border border-gray-300 rounded-lg p-2"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Line
                data={getLineChartData(year, "activity")}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.dataset.label + ": " + context.raw;
                        },
                      },
                    },
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Diagram Pie */}
        <div className="w-1/3 p-4 border border-gray-100 rounded-xl bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Kategori Misi
          </h3>
          <div className="flex items-center justify-center h-72">
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return context.label + ": " + context.raw;
                      },
                    },
                  },
                },
              }}
              className="w-4/5 h-4/5"
            />
          </div>
        </div>
      </div>

      {/* Diagram Garis Jumlah Resource */}
      <div className="flex flex-row space-x-4">
        <div className="w-2/3 p-4 border border-gray-100 rounded-xl bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-center">Resource</h3>
          <select
            value={year}
            onChange={handleYearChange}
            className="block w-1/6 mb-4 mx-auto border border-gray-300 rounded-lg p-2"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Line
                data={getLineChartData(year, "resource")}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.dataset.label + ": " + context.raw;
                        },
                      },
                    },
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col bg-white rounded-xl duration-300 p-4 w-1/3 shadow-lg">
          <div className="font-bold text-xl text-center">Bandar Lampung</div>
          <div className="text-sm text-gray-500 text-center">
            Thursday 10 May 2024
          </div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-gray-900 h-24 w-24">
            <FaWind className="h-20 w-20" />
          </div>
          <div className="flex flex-row items-center justify-center mt-6 mb-cb1">
            <div className="font-medium text-4xl">50 m/s</div>
            <div className="flex flex-col items-center ml-6"></div>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Temperatur</div>
              <div className="text-sm text-gray-500">28°C</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Humidity</div>
              <div className="text-sm text-gray-500">68%</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Visibility</div>
              <div className="text-sm text-gray-500">10km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
