import React from 'react'
import { FaWind } from "react-icons/fa";

function Chart() {
  return (
    <div class="flex flex-col bg-white rounded-xl duration-300 p-4 w-full max-w-xs shadow-lg">
          <div class="font-bold text-xl text-center">Bandar Lampung</div>
          <div class="text-sm text-gray-500 text-center">
            Thursday 10 May 2024
          </div>
          <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-gray-900 h-24 w-24">
            <FaWind className="h-20 w-20" />
          </div>
          <div class="flex flex-row items-center justify-center mt-6 mb-cb1">
            <div class="font-medium text-4xl">50 m/s</div>
            <div class="flex flex-col items-center ml-6"></div>
          </div>
          <div class="flex flex-row justify-between mt-6">
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Temperatur</div>
              <div class="text-sm text-gray-500">28°C</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Humidity</div>
              <div class="text-sm text-gray-500">68%</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Visibility</div>
              <div class="text-sm text-gray-500">10km</div>
            </div>
          </div>
        </div>
  )
}

export default Chart