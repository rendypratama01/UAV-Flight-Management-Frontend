import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import image from "../assets/img/image.png";

const DetailKomponen = () => {
  const komponeneDetails = {
    idKomponen: "COMP-001",
    harga: "Rp. 200.000",
    toko: "UAV Indo",
    tanggalBeli: "1 Mei 2024",
    operasional:"10 Jam",
  };

  const misi = [
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
      <h3 className="text-3xl text-new-300">Komponen</h3>
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
        <img src={image} alt="Logo Detail Misi" width="400px" />
      </div>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
          <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-40">ID Komponen</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponeneDetails.idKomponen}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Harga</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponeneDetails.harga}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Toko</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponeneDetails.toko}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tanggal Beli</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponeneDetails.tanggalBeli}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Operasional</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{komponeneDetails.operasional}</span>
              </div>
            </div>      
          </Tab>
          <Tab eventKey="misi" title="Misi">
          <div className="mt-3 grid grid-cols-1 gap-6">
              {misi.map(misi => (
                <div
                  key={misi.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{misi.judul}</h4>
                  <p className="text-gray-600">{misi.kategori}</p>
                  <p className="text-gray-600">{misi.tanggal}</p>
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
        </Tabs>
      </div>
    </div>
  )
}

export default DetailKomponen