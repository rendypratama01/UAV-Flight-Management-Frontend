import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import wahanaService from "../services/wahana.service"; // Adjust import path as needed
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
      case 'Fixed Wing':
        return (
          <>
            <div className="flex mb-2">
              <span className="font-bold w-36">Wingspan</span>
              <span className="w-1 mx-1">:</span>
              <span className="flex-1 text-left">{wahanaDetails.wingspan} mm</span>
            </div>
            {/* Other fixed wing specific fields if needed */}
          </>
        );
      case 'Multirotor':
        return (
          <>
            <div className="flex mb-2">
              <span className="font-bold w-36">Rotor</span>
              <span className="w-1 mx-1">:</span>
              <span className="flex-1 text-left">{wahanaDetails.jumlah_rotor} mm</span>
            </div>
            {/* Other multirotor specific fields if needed */}
          </>
        );
      case 'VTOL':
        return (
          <>
            <div className="flex mb-2">
              <span className="font-bold w-36">Wingspan</span>
              <span className="w-1 mx-1">:</span>
              <span className="flex-1 text-left">{wahanaDetails.wingspan} mm</span>
            </div>
            <div className="flex mb-2">
              <span className="font-bold w-36">Rotor</span>
              <span className="w-1 mx-1">:</span>
              <span className="flex-1 text-left">{wahanaDetails.jumlah_rotor} mm</span>
            </div>
            {/* Other VTOL specific fields if needed */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-cl7 mr-cr1 ">
      <h3 className="text-3xl text-new-300 pt-10">{wahanaDetails.nama_wahana}</h3>
      <p className="text-justify">{wahanaDetails.deskripsi_wahana}</p>
      <div className="detail_uav-container-subtitle">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-36">Nama</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.nama_wahana}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Status</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.status ? 'Aktif' : 'Tidak Aktif'}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Operasional</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.operasional}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Tipe</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.tipe}</span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="spesifikasi" title="Spesifikasi">
            <div className="mt-3">
            {renderSpecifications()}
              <div className="flex mb-2">
                <span className="font-bold w-36">Length</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.length}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Material</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.material}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Propulsi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.propulsi}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Baterai</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.baterai}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Payload</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.payload}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Durasi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.durasi}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Cakupan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.cakupan}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Ketinggian</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.ketinggian}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Kapasitas</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.kapasitas}</span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="misi" title="Misi">
            <div className="mt-3 grid grid-cols-1 gap-6">
            {wahanaDetails.missions.map((mission) => (
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
            {wahanaDetails.wahana_perbaikanWahana.map((perbaikan) => (
                <div
                  key={perbaikan.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {perbaikan.judul_perbaikan}
                  </h4>
                  <p className="text-gray-600">
                    kategori: {perbaikan.kategori}
                  </p>
                  <p className="text-gray-600">
                    Tanggal: {perbaikan.biaya}
                  </p>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="foto" title="Foto">
            <div className="mt-3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Foto</h4>
                <div className="grid grid-cols-3 gap-4">
                  {wahanaDetails.foto_wahanas && wahanaDetails.foto_wahanas.length > 0 ? (
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
