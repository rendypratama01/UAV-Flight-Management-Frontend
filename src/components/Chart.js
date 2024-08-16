import React, { useState, useEffect } from "react";
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
  Filler,
} from "chart.js";

import totalDataService from "../services/totalData.service";
import Cuaca from "./Cuaca";

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
  Filler
);

function Chart() {
  const [activityData, setActivityData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: "Kategori Misi",
        data: [],
        backgroundColor: [],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Fetch data by category
    totalDataService.getDataByCategory("your-category-here") // Replace with actual category if needed
      .then((response) => {
        const categories = response.totalMissionsByCategory.map((item) => item.kategori);
        const totals = response.totalMissionsByCategory.map((item) => parseInt(item.total, 10));
        const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a3e635", "#f472b6"]; // Customize colors

        setPieData({
          labels: categories,
          datasets: [
            {
              label: "Kategori Misi",
              data: totals,
              backgroundColor: colors.slice(0, categories.length),
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data for Pie Chart:", error);
      });
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // const tahun = 2024;
        const response = await totalDataService.getDataActivity(selectedYear);
        setActivityData(response.aktivitasPerBulan);
        console.log(response.aktivitasPerBulan)
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    const fetchResourceData = async () => {
      try {
        // const tahun = 2024;
        const response = await totalDataService.getDataResource(selectedYear);
        setResourceData(response.aktivitasPerBulan);
      } catch (error) {
        console.error("Error fetching resource data:", error);
      }
    };

    fetchActivityData();
    fetchResourceData();
  }, [selectedYear] );

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const getLineChartData = (data, chartType) => {
    const labels = data.map(item => item.bulan);
    let datasets = [];

    if (chartType === "activity") {
      datasets = [
        {
          label: "Misi",
          data: data.map(item => item.totalMisi),
          borderColor: "#dc2626",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
        },
        {
          label: "Perbaikan Wahana",
          data: data.map(item => item.totalPerbaikanWahana),
          borderColor: "#0891b2",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
        },
        {
          label: "Perbaikan Komponen",
          data: data.map(item => item.totalPerbaikanKomponen),
          borderColor: "#4f46e5",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
        },
      ];
    }

    if (chartType === "resource") {
      datasets = [
        {
          label: "Wahana",
          data: data.map(item => item.totalWahana),
          borderColor: "#2563eb",
          backgroundColor: "rgba(248, 113, 113, 0.1)",
          fill: true,
        },
        {
          label: "Komponen",
          data: data.map(item => item.totalKomponen),
          borderColor: "#16a34a",
          backgroundColor: "rgba(52, 211, 153, 0.1)",
          fill: true,
        },
        {
          label: "Operator",
          data: data.map(item => item.totalOperator),
          borderColor: "#fb923c",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
        },
      ];
    }

    return {
      labels,
      datasets,
    };
  };


  return (
    <div className="flex flex-col space-y-4">
      {/* Diagram Garis Jumlah Misi dan Diagram Pie */}
      <div className="flex flex-row space-x-4">
        {/* Diagram Garis Jumlah Misi */}
        <div className="w-2/3 p-4 border border-gray-100 rounded-xl bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-center">Activity</h3>
          <select
            className="block w-1/6 mb-4 mx-auto border border-gray-300 rounded-lg p-2"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Line
                data={getLineChartData(activityData, "activity")}
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
              data={pieData}
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
            className="block w-1/6 mb-4 mx-auto border border-gray-300 rounded-lg p-2"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Line
                data={getLineChartData(resourceData, "resource")}
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
        
        <Cuaca/>
        
      </div>
    </div>
  );
}

export default Chart;
