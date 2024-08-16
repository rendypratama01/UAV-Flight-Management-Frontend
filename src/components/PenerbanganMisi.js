import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { IoMdDownload } from "react-icons/io";
import { MdUpload, MdDelete } from "react-icons/md";
import image from "../assets/img/image.png";
import { FaWind } from "react-icons/fa"; // Import icon untuk cuaca
import Select from "react-select";

function PenerbanganMisi() {
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
  const [formData, setFormData] = useState({
    waktuMulai: "",
    waktuSelesai: "",
    flightPlan: null,
    noticeToAirman: null,
    izinLokasiTerbang: null,
  });
  const [pilot, setPilot] = useState(null);
  const [gcs, setGcs] = useState(null);
  const [wahana, setWahana] = useState(null);
  const [penerbanganTabs, setPenerbanganTabs] = useState([
    { key: "penerbangan-1", title: "Penerbangan 1", details: {} },
  ]);
  const [activeTab, setActiveTab] = useState("penerbangan-1");
  const [tabDetails, setTabDetails] = useState({
    "penerbangan-1": {
      durasi: "",
      statusMisi: "",
      waktuMulai: "",
      waktuSelesai: "",
      pilot: null,
      gcs: null,
      wahana: null,
    },
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

  const pilotOptions = [
    { value: "pilot1", label: "Pilot 1" },
    { value: "pilot2", label: "Pilot 2" },
    { value: "pilot3", label: "Pilot 3" },
  ];

  const gcsOptions = [
    { value: "gcs1", label: "GCS 1" },
    { value: "gcs2", label: "GCS 2" },
    { value: "gcs3", label: "GCS 3" },
  ];

  const wahanaOptions = [
    { value: "wahana1", label: "Wahana 1" },
    { value: "wahana2", label: "Wahana 2" },
    { value: "wahana3", label: "Wahana 3" },
  ];

  const formatDateTime = (datetime) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    const date = new Date(datetime);
    return date.toLocaleDateString("id-ID", options).replace(",", " WIB");
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;

    const durationHrs = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMins = Math.floor(
      (durationMs % (1000 * 60 * 60)) / (1000 * 60)
    );

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
      statusMisi: statusMisi,
    }));

    if (statusMisi === "Belum Selesai") {
      const newTabKey = `penerbangan-${penerbanganTabs.length + 1}`;
      setPenerbanganTabs((prevTabs) => [
        ...prevTabs,
        {
          key: newTabKey,
          title: `Penerbangan ${penerbanganTabs.length + 1}`,
          details: {},
        },
      ]);
      setTabDetails((prevTabDetails) => ({
        ...prevTabDetails,
        [newTabKey]: {
          durasi: "",
          statusMisi: "",
          waktuMulai: "",
          waktuSelesai: "",
          pilot: null,
          gcs: null,
          wahana: null,
        },
      }));
      setActiveTab(newTabKey);
    } else {
      // Update the statusMisi for the current active tab
      setTabDetails((prevTabDetails) => ({
        ...prevTabDetails,
        [activeTab]: {
          ...prevTabDetails[activeTab],
          statusMisi: statusMisi,
        },
      }));
    }

    setShowModal(false);
  };

  const handleAddModalClose = () => setShowAddModal(false);

  const handleAddModalSave = () => {
    const formattedStartTime = formatDateTime(formData.waktuMulai);
    const formattedEndTime = formatDateTime(formData.waktuSelesai);

    const duration = calculateDuration(
      formData.waktuMulai,
      formData.waktuSelesai
    );

    setTabDetails((prevTabDetails) => ({
      ...prevTabDetails,
      [activeTab]: {
        ...prevTabDetails[activeTab],
        waktuMulai: formattedStartTime,
        waktuSelesai: formattedEndTime,
        durasi: duration,
        pilot: pilot ? pilot.label : null,
        gcs: gcs ? gcs.label : null,
        wahana: wahana ? wahana.label : null,
      },
    }));

    setShowAddModal(false);
  };

  return (
    <div>
        <Tabs
              id="detail-penerbangan-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
              fill
            >
              {penerbanganTabs.map((tab) => (
                <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
                  <div className="mt-3 px-2 flex justify-between">
                    <button
                      className="py-2 px-4 bg-blue-500 text-white rounded-md"
                      onClick={() => setShowAddModal(true)}
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="mt-3 px-2 py-2">
                    <div className="bg-white border shadow-md rounded-lg p-4">
                      <h4 className="text-lg font-bold mb-3">
                        Informasi Penerbangan
                      </h4>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Durasi</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.durasi || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Status Misi</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.statusMisi || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Waktu Mulai</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.waktuMulai || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Waktu Selesai</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.waktuSelesai || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Pilot</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.pilot || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">GCS</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.gcs || "N/A"}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <span className="font-bold w-36">Wahana</span>
                        <span className="w-1 mx-1">:</span>
                        <span className="flex-1 text-left">
                          {tabDetails[activeTab]?.wahana || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Other sections */}
                  <hr className="my-2 border-black w-full mx-auto" />
                  <Container className="px-2 py-3">
                    <h4>Flight Plan</h4>
                    <div className="p-4 flex justify-center items-center">
                      <img
                        src={image}
                        alt="Flight Plan"
                        width="100%"
                        style={{ maxWidth: "400px" }}
                      />
                    </div>
                  </Container>
                  <Container className="px-2 py-3">
                    <h4>Cuaca</h4>
                    <div className="p-4">{renderWeatherData()}</div>
                  </Container>
                  <Container className="px-2 py-3">
                    <h4>Berkas</h4>
                    <div className="p-4">{renderFiles()}</div>
                  </Container>
                  <Container className="px-2 py-3">
                    <h4>Checklist</h4>
                    <div className="p-4">{renderChecklist()}</div>
                  </Container>
                  <div className="px-2 py-1 pb-5 flex justify-start">
                    <button
                      className="py-2 px-4 rounded-lg font-bold shadow-md bg-green-500 text-white w-full h-14"
                      onClick={() => setShowModal(true)}
                    >
                      Selesai
                    </button>
                  </div>
                </Tab>
              ))}
            </Tabs>

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
            <div className="mb-3">
              <label htmlFor="pilot" className="form-label">
                Pilot
              </label>
              <Select
                id="pilot"
                options={pilotOptions}
                value={pilot}
                onChange={setPilot}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gcs" className="form-label">
                GCS
              </label>
              <Select
                id="gcs"
                options={gcsOptions}
                value={gcs}
                onChange={setGcs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="wahana" className="form-label">
                Wahana
              </label>
              <Select
                id="wahana"
                options={wahanaOptions}
                value={wahana}
                onChange={setWahana}
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
    </div>
  )
}

export default PenerbanganMisi