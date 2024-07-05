import React from "react";
import { TbDrone } from "react-icons/tb";
import { GrHostMaintenance } from "react-icons/gr";
import { FaUserAlt, FaTasks, FaTools } from "react-icons/fa";

const Card = () => {
  return (
    <div className="flex gap-3">

      <div className="flex flex-row pl-6 pr-10 py-10 overflow-hidden bg-white rounded-xl shadow-lg ">
        <div className="rounded-full h-14 w-14 flex items-center justify-center bg-red-900">
          <FaTasks className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-xl sm:text-xl xl:text-xl font-light text-gray-700">Misi</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-bold">
              20
            </strong>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-10 overflow-hidden bg-white rounded-xl shadow-lg ">
        <div className="rounded-full h-14 w-14 flex items-center justify-center bg-orange-900">
          <FaUserAlt className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-xl sm:text-xl xl:text-xl font-light text-gray-700">Operator</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-bold">
              10
            </strong>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-10 overflow-hidden bg-white rounded-xl shadow-lg ">
        <div className="rounded-full h-14 w-14 flex items-center justify-center bg-new-200">
          <TbDrone className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-xl sm:text-xl xl:text-xl font-light text-gray-700">Wahana</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-bold">
              10
            </strong>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-10 overflow-hidden bg-white rounded-xl shadow-lg ">
        <div className="rounded-full h-14 w-14 flex items-center justify-center bg-cyan-700">
          <GrHostMaintenance className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-xl sm:text-xl xl:text-xl font-light text-gray-700">Perbaikan</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-bold">
              15
            </strong>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-10 overflow-hidden bg-white rounded-xl shadow-lg ">
        <div className="rounded-full h-14 w-14 flex items-center justify-center bg-green-700">
          <FaTools className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-xl sm:text-xl xl:text-xl font-light text-gray-700">Komponen</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-bold">
              20
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
