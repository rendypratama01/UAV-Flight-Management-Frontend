import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import perbaikanKomponenService from "../services/maintenanceKomponen.service";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  FaUserTie,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBill,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

function DetailMaintenanceKomponen() {
  // Sample data for maintenance details (replace with actual data or props)
  const { uuid } = useParams(); // Get the uuid from URL parameters
  const [perbaikanKomponenDetails, setPerbaikanKomponenDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerbaikanKomponenDetails = async () => {
      try {
        const data = await perbaikanKomponenService.getPerbaikanKomponenById(uuid);
        console.log(data); // Logging data for debugging
        setPerbaikanKomponenDetails(data.perbaikan);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerbaikanKomponenDetails();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!perbaikanKomponenDetails) return <p>No Komponen details available.</p>;

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">{perbaikanKomponenDetails.judul_perbaikan}</h3>
      <p className="text-lg text-gray-700 mt-4 mb-8 leading-relaxed">
      {perbaikanKomponenDetails.deskripsi_perbaikan}
      </p>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
        <Tab eventKey="detail" title="Detail">
            <div className="mt-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaUserTie className="mr-2" /> Teknisi
                  </span>
                  <span className="text-gray-900 text-xl">
                    {perbaikanKomponenDetails.nama_teknisi}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaMapMarkerAlt className="mr-2" /> Tempat Perbaikan
                  </span>
                  <span className="text-gray-900 text-xl">
                    {perbaikanKomponenDetails.tempat_perbaikan}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaTag className="mr-2" /> Kategori
                  </span>
                  <span className="text-gray-900 text-xl">
                    {perbaikanKomponenDetails.kategori}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaMoneyBill className="mr-2" /> Biaya
                  </span>
                  <span className="text-gray-900 text-xl">
                    Rp. {perbaikanKomponenDetails.biaya}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarAlt className="mr-2" /> Perbaikan
                  </span>
                  <span className="text-gray-900 text-xl">
                    {perbaikanKomponenDetails.createdAt}
                  </span>
                </div>
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaClock className="mr-2" /> Diperbarui
                  </span>
                  <span className="text-gray-900 text-xl">
                    {perbaikanKomponenDetails.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="foto" title="Foto">
            <div className="mt-3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Foto</h4>
                <div className="grid grid-cols-3 gap-4">
                  {perbaikanKomponenDetails.foto_perbaikan && perbaikanKomponenDetails.foto_perbaikan.length > 0 ? (
                    perbaikanKomponenDetails.foto_perbaikan.map((foto, index) => (
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
}

export default DetailMaintenanceKomponen