import React, { useState } from "react";
import { FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import { loginPath } from "../routes";

const missions = [
  {
    id: 1,
    judul: "Pemetaan Krakatau",
    kategori: "Pemetaan",
    tanggal: "15 Agustus 2023",
  },
  {
    id: 2,
    judul: "Monitoring Gunung Bromo",
    kategori: "Monitoring",
    tanggal: "26 Agustus 2023",
  },
  {
    id: 3,
    judul: "Kompetisi Fotografi Semeru",
    kategori: "Kompetisi",
    tanggal: "13 September 2023",
  },
  {
    id: 4,
    judul: "Pengiriman Logistik Merapi",
    kategori: "Pengiriman",
    tanggal: "19 Oktober 2023",
  },
  {
    id: 5,
    judul: "Pemetaan Rinjani",
    kategori: "Pemetaan",
    tanggal: "14 November 2023",
  },
  {
    id: 6,
    judul: "Monitoring Gunung Agung",
    kategori: "Monitoring",
    tanggal: "15 Desember 2023",
  },
];

function Profile() {
  const [activeTab, setActiveTab] = useState("Informasi");

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Profil</h3>
      <div className="min-h-screen flex flex-col items-center p-6">
        {/* Tabs */}
        <div className="w-full max-w-lg mb-6">
          <div className="flex border-b border-gray-300">
            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "Informasi"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("Informasi")}
            >
              Informasi
            </button>
            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "Misi"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("Misi")}
            >
              Misi
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Informasi" && (
          <div className="w-full max-w-lg">
            {/* Profile Info Section */}
            <div className="bg-white border border-gray-300 rounded-lg mb-6 p-6">
              <div className="flex items-center space-x-6">
                <img
                  src={logo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    John Doe
                  </h2>
                  <p className="text-gray-600">Pilot</p>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white border border-gray-300 rounded-lg mb-6 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Informasi
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">NIK:</span>
                  <span className="text-gray-600">1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Tanggal Lahir:
                  </span>
                  <span className="text-gray-600">1 Januari 1990</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-600">johndoe@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">No. Telpon:</span>
                  <span className="text-gray-600">08123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Tanggal Bergabung:
                  </span>
                  <span className="text-gray-600">1 Januari 2022</span>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pengaturan
              </h3>
              <div className="space-y-4">
                <button className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md">
                  <FaEdit className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg">Edit Profil</span>
                </button>
                <button className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md">
                  <FaLock className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg">Ganti Password</span>
                </button>
                <a
                  href={loginPath}
                  className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md no-underline hover:no-underline"
                >
                  <FaSignOutAlt className="text-red-500 text-lg" />
                  <span className="text-gray-700 text-lg">Keluar</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Misi" && (
          <div className="w-full max-w-lg">
            {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Misi</h3> */}
            <div className="grid grid-cols-1 gap-6">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {mission.judul}
                  </h4>
                  <p className="text-gray-600">{mission.kategori}</p>
                  <p className="text-gray-600">{mission.tanggal}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
