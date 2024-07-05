import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { IoMdDownload } from "react-icons/io";
import { MdUpload, MdDelete } from "react-icons/md";
import image from "../assets/img/image.png";
import { FaWind } from "react-icons/fa"; // Import icon untuk cuaca

const DetailMisi = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [checklistStatus, setChecklistStatus] = useState({
    "Before Start": [false, false, false],
    "Push/Start": [false, false],
    "After Start": [false, false, false],
    "Before Takeoff": [false, false],
    "After Takeoff": [false, false],
    Mission: [false, false, false],
    "Before Landing": [false, false],
    "After Landing": [false, false, false],
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("Mulai"); // Status tombol
  const [showModal, setShowModal] = useState(false);
  const [statusMisi, setStatusMisi] = useState("Selesai");

  const handleToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleCheckboxChange = (category, index) => {
    const newStatus = { ...checklistStatus };
    newStatus[category][index] = !newStatus[category][index];
    setChecklistStatus(newStatus);
  };

  const handleSaveChecklist = (category) => {
    console.log(`Checklist for ${category} saved:`, checklistStatus[category]);
    // Add your save logic here, e.g., sending data to the server
  };

  const allChecked = (category) => {
    return checklistStatus[category].every((status) => status);
  };

  const handleUpload = (fileId) => {
    setUploadedFiles([...uploadedFiles, fileId]);
  };

  const handleDelete = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((id) => id !== fileId));
  };

  const misiDetails = {
    wahana: "Wahana 1",
    operator: "Operator 1",
    tanggalMisi: "2023-06-25",
    kategori: "Pemetaan",
    telemetry: "Net ID 1",
    remoteControl: "2.4 Ghz",
    videoSender: "2.4 Ghz",
  };

  const penerbanganDetails = {
    durasi: "1 Jam",
    statusMisi: "Selesai",
    waktuMulai: "12.00 WIB, 1 Juni 2024",
    berkas: [
      {
        id: 1,
        nama: "Notice to Airman",
        url: "https://example.com/notice-to-airman.pdf",
      },
      {
        id: 2,
        nama: "Izin Lokasi Terbang",
        url: "https://example.com/izin-lokasi-terbang.pdf",
      },
      {
        id: 3,
        nama: "Flight Plan",
        url: "https://example.com/flight-plan.pdf",
      },
    ],
  };

  const weatherData = [
    { time: "12:00 WIB", windSpeed: "100 m/s" },
    { time: "12:30 WIB", windSpeed: "120 m/s" },
    { time: "13:00 WIB", windSpeed: "140 m/s" },
    { time: "13:30 WIB", windSpeed: "160 m/s" },
  ];

  const renderWeatherData = () => {
    return weatherData.map((data, index) => (
      <div key={index} className="border border-gray-300 rounded-lg p-4 mb-2">
        <div className="flex items-center mb-2">
          <FaWind className="text-blue-500 text-2xl mr-2" />
          <span className="font-bold text-gray-700">{data.time}</span>
        </div>
        <div className="text-gray-600">{data.windSpeed}</div>
      </div>
    ));
  };

  const renderFiles = () => {
    return penerbanganDetails.berkas.map((file) => (
      <Row key={file.id} className="align-items-center mb-1">
        <Col sm={5}>
          <a
            className="no-underline hover:no-underline text-inherit"
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.nama}
          </a>
        </Col>
        <Col sm={3}>
          {uploadedFiles.includes(file.id) ? (
            <>
              <button className="text-red-600" onClick={() => handleDelete(file.id)}>
                <MdDelete className="text-2xl" />
              </button>
              <button className="text-blue-700">
                <IoMdDownload className="text-2xl" />
              </button>
            </>
          ) : (
            <button className="text-green-600" onClick={() => handleUpload(file.id)}>
              <MdUpload className="text-2xl" />
            </button>
          )}
        </Col>
      </Row>
    ));
  };

  const checklistItems = {
    "Before Start": ["Item 1", "Item 2", "Item 3"],
    "Push/Start": ["Item 4", "Item 5"],
    "After Start": ["Item 6", "Item 7", "Item 8"],
    "Before Takeoff": ["Item 9", "Item 10"],
    "After Takeoff": ["Item 11", "Item 12"],
    Mission: ["Item 13", "Item 14", "Item 15"],
    "Before Landing": ["Item 16", "Item 17"],
    "After Landing": ["Item 18", "Item 19", "Item 20"],
  };

  const renderChecklist = () => {
    return Object.entries(checklistItems).map(([key, value], index) => (
      <div key={key} className="mb-3">
        <div
          className={`cursor-pointer p-4 ${
            allChecked(key) ? "bg-[#57D643] text-white" : "bg-gray-200 text-black"
          } rounded-md`}
          onClick={() => handleToggle(index)}
        >
          <h5>{key}</h5>
        </div>
        <div
          className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
            openAccordion === index ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="p-4 bg-white border rounded-md">
            {value.map((item, idx) => (
              <li key={idx} className="py-1 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={checklistStatus[key][idx]}
                  onChange={() => handleCheckboxChange(key, idx)}
                />
                {item}
              </li>
            ))}
            {openAccordion === index && (
              <div className="py-3">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handleSaveChecklist(key)}
                >
                  Simpan
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    ));
  };

  const handleButtonClick = () => {
    if (buttonStatus === "Selesai") {
      setShowModal(true);
    } else {
      setButtonStatus("Selesai");
    }
  };

  const handleModalClose = () => setShowModal(false);

  const handleStatusChange = (event) => setStatusMisi(event.target.value);

  const handleModalSave = () => {
    setButtonStatus(statusMisi);
    setShowModal(false);
  };

  return (
    <div className="absolute ml-cl7 mr-cr1 mt-ct1">
      <h3 className="text-3xl text-new-300">Misi</h3>
      <p className="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div className="detail-misi-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail-misi" title="Detail Misi">
            <div className="mt-3">
              <div className="flex mb-2">
                <span className="font-bold w-36">Wahana</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{misiDetails.wahana}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Operator</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{misiDetails.operator}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Tanggal Misi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {misiDetails.tanggalMisi}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Kategori</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">{misiDetails.kategori}</span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Telemetry</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {misiDetails.telemetry}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Remote Control</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {misiDetails.remoteControl}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Video Sender</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {misiDetails.videoSender}
                </span>
              </div>
            </div>
          </Tab>

          <Tab eventKey="detail-penerbangan" title="Detail Penerbangan">
            <div className="mt-3 px-2 py-3">
              <h4>Informasi</h4>
              <div className="flex mb-2">
                <span className="font-bold w-36">Durasi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {penerbanganDetails.durasi}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Status Misi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {penerbanganDetails.statusMisi}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Waktu Misi</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {penerbanganDetails.waktuMulai}
                </span>
              </div>
            </div>

            <div className="px-2 py-3">
              <h4>Flight Plan</h4>
              <div className="flex justify-center items-center">
                <img src={image} alt="Flight Plan" width="400px" />
              </div>
            </div>

            <Container className="px-2 py-3">
              <h4>Cuaca</h4>
              {renderWeatherData()}
            </Container>

            <Container className="px-2 py-3">
              <h4>Berkas</h4>
              {renderFiles()}
            </Container>

            <Container className="px-2 py-3">
              <h4>Checklist</h4>
              {renderChecklist()}
            </Container>

            <div className="px-2 py-3 flex justify-start">
              <button
                className={`py-2 px-4 rounded-md ${
                  buttonStatus === "Mulai" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}
                onClick={handleButtonClick}
              >
                {buttonStatus}
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Status Misi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusMisi"
                id="selesai"
                value="Selesai"
                checked={statusMisi === "Selesai"}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" htmlFor="selesai">
                Selesai
              </label>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="statusMisi"
                id="blm-selesai"
                value="Belum Selesai"
                checked={statusMisi === "Belum Selesai"}
                onChange={handleStatusChange}
              />
              <label className="form-check-label" htmlFor="blm-selesai">
                Belum Selesai
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleModalClose}>
            Tutup
          </button>
          <button className="btn btn-primary" onClick={handleModalSave}>
            Simpan
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailMisi;

