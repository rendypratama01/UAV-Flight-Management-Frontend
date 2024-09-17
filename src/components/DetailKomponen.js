import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import komponenService from "../services/komponen.service"; // Sesuaikan path import
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  FaTag,
  FaIdBadge,
  FaMoneyBill,
  FaStore,
  FaTools,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { detailMaintenanceKomponenPath, detailMisiPath } from "../routes";

const DetailKomponen = () => {
  const { uuid } = useParams(); // Get the uuid from URL parameters
  const [komponenDetails, setKomponenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWahanaDetails = async () => {
      try {
        const data = await komponenService.getKomponenById(uuid);
        console.log(data); // Logging data for debugging
        setKomponenDetails(data.komponen);
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
  if (!komponenDetails) return <p>No Komponen details available.</p>;

  const truncateTextByChar = (text, charLimit) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">
        {komponenDetails.nama_komponen}
      </h3>
      <p className="text-lg text-gray-700 mt-4 mb-8 leading-relaxed">
        {komponenDetails.deskripsi_komponen}
      </p>
      <div className="flex justify-center items-center mt-ct1 mb-cb1">
        {komponenDetails.foto_komponens.map((foto, index) => (
          <Zoom key={index}>
            <img
              src={foto.foto_urls}
              alt={`Komponen ${index + 1}`}
              width="300px"
            />
          </Zoom>
        ))}
      </div>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaTag className="mr-2" /> Kategori
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.kategori}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    {komponenDetails.status ? (
                      <FaCheckCircle className="mr-2 text-green-600" />
                    ) : (
                      <FaTimesCircle className="mr-2 text-red-600" />
                    )}
                    Status
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.status ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaIdBadge className="mr-2" /> ID Komponen
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.id_komponen}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaMoneyBill className="mr-2" /> Harga
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.harga}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaStore className="mr-2" /> Toko
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.tempat_pembelian}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaTools className="mr-2" /> Operasional
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.operasional}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarAlt className="mr-2" /> Dibuat
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.createdAt}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaClock className="mr-2" /> Diperbarui
                  </span>
                  <span className="text-gray-900 text-xl">
                    {komponenDetails.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="misi" title="Misi">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {komponenDetails.missions.map((mission) => (
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
              {komponenDetails.komponen_perbaikanKomponen.map((perbaikan) => (
                <a
                  key={perbaikan.id}
                  href={`${detailMaintenanceKomponenPath}/${perbaikan.uuid}`} // Adjust path as needed
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
        </Tabs>
      </div>
    </div>
  );
};

export default DetailKomponen;
