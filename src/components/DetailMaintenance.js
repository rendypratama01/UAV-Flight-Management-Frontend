import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import image from "../assets/img/image.png";

const DetailMaintenance = () => {
  // Sample data for maintenance details (replace with actual data or props)
  const maintenanceDetails = {
    teknisi: "Jane Smith",
    kategori: "Electrical",
    tanggalPerbaikan: "2024-06-25",
    tempatPerbaikan: "Unila",
    biaya: "Rp 500000",
  };

  const imagesBefore = [image, image, image]; // Replace with actual images
  const imagesAfter = [image, image, image]; // Replace with actual images

  return (
    <div className="absolute ml-cl7 mr-cr1 mt-ct1">
      <h3 className="text-3xl text-new-300">Perbaikan</h3>
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
        <img src={image} alt="Logo Detail Perbaikan" width="400px" />
      </div>
      <div className="detail_maintenance-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail" title="Detail">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-40">Teknisi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {maintenanceDetails.teknisi}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Kategori</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {maintenanceDetails.kategori}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tanggal Perbaikan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {maintenanceDetails.tanggalPerbaikan}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Tempat Perbaikan</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {maintenanceDetails.tempatPerbaikan}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-40">Biaya</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {maintenanceDetails.biaya}
                </span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="dokumentasi" title="Dokumentasi">
            <div className="mt-3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Before</h4>
                <div className="grid grid-cols-3 gap-4">
                  {imagesBefore.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Before ${index + 1}`}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">After</h4>
                <div className="grid grid-cols-3 gap-4">
                  {imagesAfter.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`After ${index + 1}`}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailMaintenance;
