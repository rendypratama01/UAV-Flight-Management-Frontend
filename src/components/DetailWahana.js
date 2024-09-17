import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import wahanaService from "../services/wahana.service"; // Adjust import path as needed
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCog,
  FaCalendarAlt,
  FaClock,
  FaListAlt,
} from "react-icons/fa";
import { detailMaintenanceWahanaPath, detailMisiPath } from "../routes";

const DetailWahana = () => {
  const { uuid } = useParams(); // Get the uuid from URL parameters
  const [wahanaDetails, setWahanaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWahanaDetails = async () => {
      try {
        const data = await wahanaService.getWahanaById(uuid);
        console.log(data); // Logging data for debugging
        setWahanaDetails(data.wahana);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWahanaDetails();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wahanaDetails) return <p>No wahana details available.</p>;

  const renderSpecifications = () => {
    switch (wahanaDetails.tipe) {
      case "Fixed Wing":
        return (
          <>
            <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                wingspan
              </span>
              <span className="mt-1 text-lg text-gray-900">
                {wahanaDetails.wingspan}
              </span>
            </div>
            {/* Add more fixed wing specific fields here if needed */}
          </>
        );
      case "Multirotor":
        return (
          <>
            <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Rotor
              </span>
              <span className="mt-1 text-lg text-gray-900">
                {wahanaDetails.jumlah_rotor}
              </span>
            </div>
            {/* Other multirotor specific fields if needed */}
          </>
        );
      case "VTOL":
        return (
          <>
            <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                wingspan
              </span>
              <span className="mt-1 text-lg text-gray-900">
                {wahanaDetails.wingspan}
              </span>
            </div>
            <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Rotor
              </span>
              <span className="mt-1 text-lg text-gray-900">
                {wahanaDetails.jumlah_rotor}
              </span>
            </div>
            {/* Other VTOL specific fields if needed */}
          </>
        );
      default:
        return null;
    }
  };

  const truncateTextByChar = (text, charLimit) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  return (
    <div className="ml-cl7 mr-cr1 ">
      <h3 className="text-3xl text-new-300 pt-10">
        {wahanaDetails.nama_wahana}
      </h3>
      <p className="text-lg text-gray-700 mt-4 mb-8 leading-relaxed">
        {wahanaDetails.deskripsi_wahana}
      </p>
      <div className="detail_uav-container-subtitle">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaListAlt className="mr-2" /> Nama
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.nama_wahana}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    {wahanaDetails.status ? (
                      <FaCheckCircle className="mr-2 text-green-600" />
                    ) : (
                      <FaTimesCircle className="mr-2 text-red-600" />
                    )}
                    Status
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.status ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCog className="mr-2" /> Operasional
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.operasional}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaListAlt className="mr-2" /> Tipe
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.tipe}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarAlt className="mr-2" />
                    Ditambahkan
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.createdAt}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaClock className="mr-2" />
                    Diperbarui
                  </span>
                  <span className="text-gray-900 text-xl">
                    {wahanaDetails.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="spesifikasi" title="Spesifikasi">
            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderSpecifications()}
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Length
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.length}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Material
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.material}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Propulsi
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.propulsi}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Baterai
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.baterai}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Payload
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.payload}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Durasi
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.durasi}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Cakupan
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.cakupan}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Ketinggian
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.ketinggian}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Kapasitas
                  </span>
                  <span className="mt-1 text-lg text-gray-900">
                    {wahanaDetails.kapasitas}
                  </span>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="misi" title="Misi">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wahanaDetails.missions.map((mission) => (
                <a
                  key={mission.id}
                  href={`${detailMisiPath}/${mission.uuid}`} // Adjust path as needed
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    key={mission.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {truncateTextByChar(mission.judul_misi, 20)}
                    </h4>
                    <p className="text-sm mb-1">Kategori: {mission.kategori}</p>
                    <p className="text-sm">Tanggal: {mission.createdAt}</p>
                  </div>
                </a>
              ))}
            </div>
          </Tab>
          <Tab eventKey="perbaikan" title="Perbaikan">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wahanaDetails.wahana_perbaikanWahana.map((perbaikan) => (
                <a
                  key={perbaikan.id}
                  href={`${detailMaintenanceWahanaPath}/${perbaikan.uuid}`} // Adjust path as needed
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    key={perbaikan.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {perbaikan.judul_perbaikan}
                    </h4>
                    <p className="text-sm mb-1">
                      Kategori: {perbaikan.kategori}
                    </p>
                    <p className="text-sm">Tanggal: {perbaikan.createdAt}</p>
                    <p className="text-sm">Biaya: {perbaikan.biaya}</p>
                  </div>
                </a>
              ))}
            </div>
          </Tab>
          <Tab eventKey="foto" title="Foto">
            <div className="mt-3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Foto</h4>
                <div className="grid grid-cols-3 gap-4">
                  {wahanaDetails.foto_wahanas &&
                  wahanaDetails.foto_wahanas.length > 0 ? (
                    wahanaDetails.foto_wahanas.map((foto, index) => (
                      <Zoom key={index}>
                        <img
                          src={foto.foto_urls}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </Zoom>
                    ))
                  ) : (
                    <p className="text-gray-600">Tidak ada foto tersedia.</p>
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailWahana;
