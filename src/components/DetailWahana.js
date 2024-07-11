import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import image from "../assets/img/image.png";

const DetailWahana = () => {
  // Sample data for wahana details (replace with actual data or props)
  const wahanaDetails = {
    nama: 'Wahana Alpha',
    status: 'Aktif',
    operasional: '1200 jam',
    tipe: 'Fixed Wing'
  };

  const wahanaSpecs = {
    wingspan: "3000 mm",
    rotor : "4",
    length: "1500 mm",
    material: "Fiber",
    propulsi: "Modified brushless electric motor",
    baterai: "Li-Ion 30000 mAH",
    payload: "Camera RGB",
    telemetry: "P2P Radio 433/921 MHz; 4G-LTE; LoRA ",
    durasi: "180 Menit",
    cakupan: "2000 Ha",
    ketinggian: "1500 m",
    kapasitas: "5000 gr"
  };

  // Sample mission data
  const missions = [
    { id: 1, judul: 'Pemetaan Krakatau', kategori: 'Pemetaan', tanggal: '15 Agustus 2023' },
    { id: 2, judul: 'Monitoring Gunung Bromo', kategori: 'Monitoring', tanggal: '26 Agustus 2023' },
    { id: 3, judul: 'Kompetisi Fotografi Semeru', kategori: 'Kompetisi', tanggal: '13 September 2023' },
    { id: 4, judul: 'Pengiriman Logistik Merapi', kategori: 'Pengiriman', tanggal: '19 Oktober 2023' },
    { id: 5, judul: 'Pemetaan Rinjani', kategori: 'Pemetaan', tanggal: '14 November 2023' },
    { id: 6, judul: 'Monitoring Gunung Agung', kategori: 'Monitoring', tanggal: '15 Desember 2023' }
  ];

  const perbaikan = [
    { id: 1, judul: 'Perbaikan Struktur Rangka UAV', kategori: 'Airframe', tanggal: '10 Januari 2023' },
    { id: 2, judul: 'Upgrade Sistem Navigasi UAV', kategori: 'Elektronik', tanggal: '15 Februari 2023' },
    { id: 3, judul: 'Penggantian Baterai UAV', kategori: 'Elektronik', tanggal: '20 Maret 2023' },
    { id: 4, judul: 'Optimisasi Sistem Kamera UAV', kategori: 'Elektronik', tanggal: '12 Mei 2023' },
    { id: 5, judul: 'Perbaikan Sayap UAV', kategori: 'Airframe', tanggal: '25 Juni 2023' },
    { id: 6, judul: 'Perbaikan Motor UAV', kategori: 'Elektronik', tanggal: '18 Agustus 2023' }
  ];

  return (
    <div className="absolute ml-cl7 mr-cr1 mt-ct1">
      <h3 className="text-3xl text-new-300">Wahana</h3>
      <p className="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="flex justify-center items-center mt-ct1 mb-cb1">
        <img src={image} alt="Logo Detail Wahana" width="400px" />
      </div>
      <div className="detail_uav-container-subtitle">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-36">Nama</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.nama}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Status</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaDetails.status}</span>
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
              <div className="flex mb-2">
                <span className="font-bold w-36">Wingspan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.wingspan}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Length</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.length}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Material</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.material}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Propulsi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.propulsi}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Baterai</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.baterai}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Payload</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.payload}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Telemetry</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.telemetry}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Durasi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.durasi}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Cakupan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.cakupan}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Ketinggian</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.ketinggian}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Kapasitas</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{wahanaSpecs.kapasitas}</span>
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
          <Tab eventKey="perbaikan" title="Perbaikan">
          <div className="mt-3 grid grid-cols-1 gap-6">
              {perbaikan.map(perbaikan => (
                <div
                  key={perbaikan.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{perbaikan.judul}</h4>
                  <p className="text-gray-600">{perbaikan.kategori}</p>
                  <p className="text-gray-600">{perbaikan.tanggal}</p>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="foto" title="Foto">
            <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Depan</h5>
                <img src={image} alt="Depan" className="w-64 h-64 object-cover"/>
              </div>
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Belakang</h5>
                <img src={image} alt="Belakang" className="w-64 h-64 object-cover"/>
              </div>
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Kanan</h5>
                <img src={image} alt="Kanan" className="w-64 h-64 object-cover"/>
              </div>
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Kiri</h5>
                <img src={image} alt="Kiri" className="w-64 h-64 object-cover"/>
              </div>
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Atas</h5>
                <img src={image} alt="Atas" className="w-64 h-64 object-cover"/>
              </div>
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-semibold mb-2">Bawah</h5>
                <img src={image} alt="Bawah" className="w-64 h-64 object-cover"/>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailWahana;
