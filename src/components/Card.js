import React, { useEffect, useState } from "react";
import { TbDrone } from "react-icons/tb";
import { GrHostMaintenance } from "react-icons/gr";
import { FaUserAlt, FaTasks, FaTools } from "react-icons/fa";
import totalDataService from "../services/totalData.service";

const Card = () => {
  const [data, setData] = useState({
    totalMissions: 0,
    totalWahana: 0,
    totalKomponen: 0,
    totalPerbaikanWahana: 0,
    totalPerbaikanKomponen: 0,
    totalOperator: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await totalDataService.getAllData();
        console.log("Fetched data:", result); // Log the fetched data
        setData(result);
      } catch (error) {
        console.error("Failed to fetch total data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Misi Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-red-900">
            <FaTasks className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Misi</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalMissions}
              </strong>
            </div>
          </div>
        </div>

        {/* Operator Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-orange-900">
            <FaUserAlt className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Operator</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalOperator}
              </strong>
            </div>
          </div>
        </div>

        {/* Wahana Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-new-200">
            <TbDrone className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Wahana</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalWahana}
              </strong>
            </div>
          </div>
        </div>

        {/* Perbaikan Wahana Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-cyan-700">
            <GrHostMaintenance className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Perbaikan Wahana</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalPerbaikanWahana}
              </strong>
            </div>
          </div>
        </div>

        {/* Perbaikan Komponen Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-cyan-700">
            <GrHostMaintenance className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Perbaikan Komponen</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalPerbaikanKomponen}
              </strong>
            </div>
          </div>
        </div>

        {/* Komponen Card */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-green-700">
            <FaTools className="text-3xl text-white" />
          </div>
          <div className="ml-4 flex-1">
            <span className="text-xl font-light text-gray-700 truncate">Komponen</span>
            <div className="flex items-center">
              <strong className="text-2xl text-gray-700 font-bold">
                {data.totalKomponen}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
