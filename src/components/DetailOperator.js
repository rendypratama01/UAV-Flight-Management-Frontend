import React, { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import image from '../assets/img/image.png';
import { useParams } from "react-router-dom";
import operatorService from "../services/operator.service";

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

  const missions = [
    { id: 1, judul: 'Pemetaan Krakatau', kategori: 'Pemetaan', tanggal: '15 Agustus 2023' },
    { id: 2, judul: 'Monitoring Gunung Bromo', kategori: 'Monitoring', tanggal: '26 Agustus 2023' },
    { id: 3, judul: 'Kompetisi Fotografi Semeru', kategori: 'Kompetisi', tanggal: '13 September 2023' },
    { id: 4, judul: 'Pengiriman Logistik Merapi', kategori: 'Pengiriman', tanggal: '19 Oktober 2023' },
    { id: 5, judul: 'Pemetaan Rinjani', kategori: 'Pemetaan', tanggal: '14 November 2023' },
    { id: 6, judul: 'Monitoring Gunung Agung', kategori: 'Monitoring', tanggal: '15 Desember 2023' }
  ];

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">{operatorDetails.name}</h3>
      <div className="flex justify-center items-center mt-ct1 mb-cb1"> 
        <img src={operatorDetails.photo_profile} alt="Logo Detail Operator" width="400px" />
      </div>
      <div className="detail-operator-container-subtitle">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-36">Nama</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.name}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Role</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.role}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Tanggal Lahir</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.tanggal_lahir}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">NIK</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.nik}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Email</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.email}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">No. Telp</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{operatorDetails.nomor_telepon}</span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="misi" title="Misi">
            <div className="mt-3 grid grid-cols-1 gap-6">
              {missions.map(mission => (
                <div
                  key={mission.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{mission.judul}</h4>
                  <p className="text-gray-600">{mission.kategori}</p>
                  <p className="text-gray-600">{mission.tanggal}</p>
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailOperator;
