import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import perbaikanKomponenService from "../services/maintenanceKomponen.service"; // Sesuaikan path import
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
      <p className="text-justify">
      {perbaikanKomponenDetails.deskripsi_perbaikan}
      </p>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-40">Teknisi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {perbaikanKomponenDetails.nama_teknisi}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Kategori</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {perbaikanKomponenDetails.kategori}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tanggal Perbaikan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {perbaikanKomponenDetails.createdAt}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tempat Perbaikan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {perbaikanKomponenDetails.tempat_perbaikan}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Biaya</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {perbaikanKomponenDetails.biaya}
                </span>
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