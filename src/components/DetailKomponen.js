import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import komponenService from "../services/komponen.service"; // Sesuaikan path import
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">{komponenDetails.nama_komponen}</h3>
      <p className="text-justify">
        {komponenDetails.deskripsi_komponen}
      </p>
      <div className="flex justify-center items-center mt-ct1 mb-cb1">
        {komponenDetails.foto_komponens.map((foto, index) => (
          <Zoom key={index}>
            <img src={foto.foto_urls} alt={`Komponen ${index + 1}`} width="300px" />
          </Zoom>
        ))}
      </div>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-40">ID Komponen</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponenDetails.id_komponen}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Harga</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponenDetails.harga}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Toko</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponenDetails.tempat_pembelian}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tanggal Beli</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponenDetails.createdAt}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Operasional</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponenDetails.operasional}</span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="misi" title="Misi">
            <div className="mt-3 grid grid-cols-1 gap-6">
            {komponenDetails.missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{mission.judul_misi}</h4>
                  <p className="text-gray-600">kategori: {mission.kategori}</p>
                  <p className="text-gray-600">Tanggal: {mission.createdAt}</p>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="perbaikan" title="Perbaikan">
            <div className="mt-3 grid grid-cols-1 gap-6">
            {komponenDetails.komponen_perbaikanKomponen.map((perbaikan) => (
                <div
                  key={perbaikan.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{perbaikan.judul_perbaikan}</h4>
                  <p className="text-gray-600">kategori: {perbaikan.kategori}</p>
                  <p className="text-gray-600">Tanggal: {perbaikan.biaya}</p>
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailKomponen;

