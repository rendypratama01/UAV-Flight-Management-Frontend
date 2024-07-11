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
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // State untuk modal tambah
  const [statusMisi, setStatusMisi] = useState("Selesai");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formData, setFormData] = useState({
    waktuMulai: "",
    waktuSelesai: "",
    flightPlan: null,
    noticeToAirman: null,
    izinLokasiTerbang: null,
  });

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

  const [penerbanganDetails, setPenerbanganDetails] = useState({
    durasi: "",
    statusMisi: "",
    waktuMulai: "",
    waktuSelesai: "",
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
      {
        id: 4,
        nama: "Flight Security Clearance",
        url: "https://example.com/flight-security-clearance.pdf",
      },
    ],
  });

  const formatDateTime = (datetime) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    const date = new Date(datetime);
    return date.toLocaleDateString('id-ID', options).replace(',', ' WIB');
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    
    const durationHrs = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${durationHrs} Jam ${durationMins} Menit`;
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
              <button
                className="text-red-600"
                onClick={() => handleDelete(file.id)}
              >
                <MdDelete className="text-2xl" />
              </button>
              <button className="text-blue-700">
                <IoMdDownload className="text-2xl" />
              </button>
            </>
          ) : (
            <button
              className="text-green-600"
              onClick={() => handleUpload(file.id)}
            >
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
            allChecked(key)
              ? "bg-[#57D643] text-white"
              : "bg-gray-200 text-black"
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

  const handleModalClose = () => setShowModal(false);

  const handleStatusChange = (event) => setStatusMisi(event.target.value);

  const handleModalSave = () => {
    setPenerbanganDetails((prevDetails) => ({
      ...prevDetails,
      statusMisi: statusMisi,  // Update status misi
    }));
    setShowModal(false);
  };

  const handleAddModalClose = () => setShowAddModal(false);

  const handleAddModalSave = () => {
    const formattedStartTime = formatDateTime(formData.waktuMulai);
    const formattedEndTime = formatDateTime(formData.waktuSelesai);
  
    const duration = calculateDuration(formData.waktuMulai, formData.waktuSelesai);
  
    setPenerbanganDetails({
      ...penerbanganDetails,
      waktuMulai: formattedStartTime,
      waktuSelesai: formattedEndTime,
      durasi: duration,
    });
  
    setShowAddModal(false);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  const handlePhotoModalOpen = () => setShowPhotoModal(true);
  const handlePhotoModalClose = () => setShowPhotoModal(false);

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
            <div className="mt-3 px-2 flex justify-between">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={() => setShowAddModal(true)}
              >
                Tambah
              </button>
            </div>
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
                <span className="font-bold w-36">Waktu Mulai</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {penerbanganDetails.waktuMulai}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="font-bold w-36">Waktu Selesai</span>
                <span className="w-1 mx-1">:</span>
                <span className="flex-1 text-left">
                  {penerbanganDetails.waktuSelesai}
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
                className={`py-2 px-4 rounded-md bg-green-500 text-white`}
                onClick={() => setShowModal(true)}
              >
                Selesai
              </button>
            </div>
          </Tab>
          <Tab eventKey="dokumentasi" title="Dokumentasi">
            <div className="mt-3 px-2 flex justify-between">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={handlePhotoModalOpen}
              >
                Tambah Foto
              </button>
            </div>
            <div className="mt-3 px-2 py-3">
              <h4>Foto Dokumentasi</h4>
              <div className="d-flex flex-wrap">
                {uploadedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`uploaded-${index}`}
                    className="img-thumbnail mr-2 mb-2"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePhotoClick(photo)}
                  />
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Modal Popup untuk status misi */}
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

      {/* Modal Popup untuk menambah detail penerbangan */}
      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Detail Penerbangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="waktuMulai" className="form-label">
                Waktu Mulai
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="waktuMulai"
                value={formData.waktuMulai}
                onChange={(e) =>
                  setFormData({ ...formData, waktuMulai: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="waktuSelesai" className="form-label">
                Waktu Selesai
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="waktuSelesai"
                value={formData.waktuSelesai}
                onChange={(e) =>
                  setFormData({ ...formData, waktuSelesai: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleAddModalClose}>
            Tutup
          </button>
          <button className="btn btn-primary" onClick={handleAddModalSave}>
            Simpan
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPhotoModal} onHide={handlePhotoModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPhoto ? "Lihat Foto" : "Upload Foto Dokumentasi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhoto ? (
            <img
              src={selectedPhoto}
              alt="Selected"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="form-control"
              />
              <div className="mt-3">
                <h5>Foto yang Diupload</h5>
                <div className="d-flex flex-wrap">
                  {uploadedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`uploaded-preview-${index}`}
                      className="img-thumbnail mr-2 mb-2"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePhotoClick(photo)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handlePhotoModalClose}>
            Tutup
          </button>
          {!selectedPhoto && (
            <button className="btn btn-primary" onClick={handlePhotoModalClose}>
              Simpan
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailMisi;
