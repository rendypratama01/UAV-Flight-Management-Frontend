import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import image from "../assets/img/image.png";
import { useParams } from "react-router-dom";
import operatorService from "../services/operator.service";
import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaIdBadge,
  FaEnvelope,
  FaPhone,
  FaCalendarCheck,
} from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  detailMaintenanceKomponenPath,
  detailMaintenanceWahanaPath,
  detailMisiPath,
} from "../routes";

const DetailOperator = () => {
  // Sample data for operator details (replace with actual data or props)
  const { uuid } = useParams(); // Get the uuid from URL parameters
  const [operatorDetails, setOperatorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        const data = await operatorService.getOperatorById(uuid);
        console.log(data); // Logging data for debugging
        setOperatorDetails(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperatorDetails();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!operatorDetails) return <p>No wahana details available.</p>;

  const truncateTextByChar = (text, charLimit) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  return (
    <div className="ml-cl7 mr-cr1 pt-1">
      <div className="flex flex-col items-center mt-ct1 mb-cb1">
        <Zoom>
          <img
            src={operatorDetails.photo_profile || image} // Fallback to a default image if photo_profile is not available
            alt="Profile"
            className="w-64 h-64 rounded-full border border-gray-300"
          />
        </Zoom>
        <h3 className="text-3xl text-new-300 pt-4">{operatorDetails.name}</h3>
      </div>
      <div className="detail-operator-container-subtitle">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaUser className="mr-2" /> Role
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.role}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    {operatorDetails.status ? (
                      <FaCheckCircle className="mr-2 text-green-600" />
                    ) : (
                      <FaTimesCircle className="mr-2 text-red-600" />
                    )}
                    Status
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.status ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaClock className="mr-2" /> Jam Terbang
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.jam_terbang}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarAlt className="mr-2" /> Tanggal Lahir
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.tanggal_lahir}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaIdBadge className="mr-2" /> NIK
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.nik}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaEnvelope className="mr-2" /> Email
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.email}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaPhone className="mr-2" /> No. Telp
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.nomor_telepon}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarCheck className="mr-2" /> Tanggal Bergabung
                  </span>
                  <span className="text-gray-900 text-xl">
                    {operatorDetails.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="misi" title="Misi">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {operatorDetails.missions.map((mission) => (
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

          <Tab eventKey="perbaikanWahana" title="Perbaikan Wahana">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {operatorDetails.user_perbaikanWahana.map((perbaikan) => (
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
                  <p className="text-sm mb-1">Kategori: {perbaikan.kategori}</p>
                  <p className="text-sm">Tanggal: {perbaikan.createdAt}</p>
                  <p className="text-sm">Biaya: {perbaikan.biaya}</p>
                </div>
                </a>
              ))}
            </div>
          </Tab>

          <Tab eventKey="perbaikanKomponen" title="Perbaikan Komponen">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {operatorDetails.user_perbaikanKomponen.map((perbaikan) => (
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
                  <p className="text-sm mb-1">Kategori: {perbaikan.kategori}</p>
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

export default DetailOperator;
