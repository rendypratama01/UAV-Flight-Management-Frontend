import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import penerbanganMisiService from "../services/penerbanganMisi.service";
import misiService from "../services/misi.service";
import Slider from "react-slick";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { FaWind, FaThermometerHalf, FaTint } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash, FaDownload } from "react-icons/fa";

function PenerbanganMisi() {
  const { uuid } = useParams();
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    mulai: "",
    selesai: "",
    wahanaId: "",
    komponenId: [],
    gcsId: "",
    pilotId: "",
    status_misi: false,
    latitude: "",
    longitude: "",
    notice_to_airman: "",
    flight_security_clearense: "",
    izin_lokasi_terbang: "",
    flight_plan: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [pilots, setPilots] = useState([]);
  const [gcsOperators, setGcsOperators] = useState([]);
  const [wahanas, setWahanas] = useState([]);
  const [komponens, setKomponens] = useState([]);
  const [missionData, setMissionData] = useState(null);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showModalFile, setShowModalFile] = useState(false);
  const [deleteFileUuid, setDeleteFileUuid] = useState(null);
  const [showConfirmDeleteFile, setShowConfirmDeleteFile] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const [downloadFileUuid, setDownloadFileUuid] = useState(null);
  const [showConfirmDownload, setShowConfirmDownload] = useState(false);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const data = await penerbanganMisiService.getFlightById(uuid);
        setFlightData(data);
        console.log(data);
        setCheckedItems({
          "Before Start": { "Item 1": data.before_start, "Item 2": data.before_start, "Item 3": data.before_start },
          "Push/Start": { "Item 4": data.push_start, "Item 5": data.push_start },
          "After Start": { "Item 6": data.after_start, "Item 7": data.after_start, "Item 8": data.after_start },
          "Before Takeoff": { "Item 9": data.before_takeoff, "Item 10": data.before_takeoff },
          "After Takeoff": { "Item 11": data.after_takeoff, "Item 12": data.after_takeoff },
          Mission: { "Item 13": data.mission, "Item 14": data.mission, "Item 15": data.mission },
          "Before Landing": { "Item 16": data.before_landing, "Item 17": data.before_landing },
          "After Landing": { "Item 18": data.after_landing, "Item 19": data.after_landing, "Item 20": data.after_landing },
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [uuid]);

  useEffect(() => {
    const uuid = sessionStorage.getItem("misiUUID");

    if (!uuid) {
      setError("UUID not found in session storage.");
      setLoading(false);
      return;
    }

    const fetchMissionDetails = async () => {
      try {
        const { mission } = await misiService.getMisiById(uuid);

        const extractUsersByRole = (role) =>
          mission.userMisi
            .filter((user) => user.role === role)
            .map((user) => ({ value: user.uuid, label: user.name }));

        setMissionData(mission);
        setPilots(extractUsersByRole("Pilot"));
        setGcsOperators(extractUsersByRole("GCS Operator"));
        setWahanas(
          mission.wahanas.map(({ uuid, nama_wahana }) => ({
            value: uuid,
            label: nama_wahana,
          }))
        );
        setKomponens(
          mission.komponens.map(({ uuid, nama_komponen }) => ({
            value: uuid,
            label: nama_komponen,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionDetails();
  }, [uuid]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowModalFile = () => setShowModalFile(true);
  const handleCloseModalFile = () => setShowModalFile(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value === "true",
    });
  };

  const calculateDuration = (mulai, selesai) => {
    const startTime = new Date(mulai);
    const endTime = new Date(selesai);
    const durasi = (endTime - startTime) / 60000; // Duration in minutes
    return Math.round(durasi); // Rounding to the nearest minute
  };

  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
              resolve({
                latitude: coords.latitude,
                longitude: coords.longitude,
              }),
            (error) => reject(error.message)
          )
        : reject("Geolocation is not supported by this browser.");
    });

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const refreshMissionDetails = async () => {
    try {
      const data = await penerbanganMisiService.getFlightById(uuid);
      setFlightData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const location = await getCurrentLocation();

      const dataToSubmit = {
        ...formData,
        mulai: formatDate(formData.mulai),
        selesai: formatDate(formData.selesai),
        durasi: calculateDuration(formData.mulai, formData.selesai),
        ...location,
      };

      console.log("Form Data to Submit:", dataToSubmit);

      const response = await penerbanganMisiService.createFlight(
        uuid,
        dataToSubmit
      );
      console.log(response.msg, response);

      setShowSuccessAdd(true);
      await refreshMissionDetails();
    } catch (err) {
      setError(`Error creating flight: ${err}`);
      console.error("Error creating flight:", err);
    } finally {
      handleCloseModal();
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    dataToSubmit.append("notice_to_airman", formData.notice_to_airman);
    dataToSubmit.append(
      "flight_security_clearense",
      formData.flight_security_clearense
    );
    dataToSubmit.append("izin_lokasi_terbang", formData.izin_lokasi_terbang);
    dataToSubmit.append("flight_plan", formData.flight_plan);

    try {
      const response = await penerbanganMisiService.uploadFlightFile(
        uuid,
        dataToSubmit
      );
      console.log(response.msg, response);
      handleCloseModalFile();
      await refreshMissionDetails();
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading files.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!flightData) return <p>No flight data available.</p>;
  if (!missionData) return <p>No Mission data available.</p>;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { berkas } = flightData;

  // Categorize files
  const fileCategories = {
    notice_to_airman: berkas.filter((file) => file.tipe === "notice_to_airman"),
    izin_lokasi_terbang: berkas.filter(
      (file) => file.tipe === "izin_lokasi_terbang"
    ),
    flight_security_clearense: berkas.filter(
      (file) => file.tipe === "flight_security_clearense"
    ),
    flight_plan: berkas.filter((file) => file.tipe === "flight_plan"),
  };

  const handleDeleteFileBerkas = (uuid) => {
    setDeleteFileUuid(uuid);
    setShowConfirmDeleteFile(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await penerbanganMisiService.deleteFlightFile(deleteFileUuid); // Call API to delete the photo
      await refreshMissionDetails(); // Refresh mission details after deletion
      setShowConfirmDeleteFile(false);
      setShowSuccessDelete(true);
    } catch (error) {
      console.error("Error deleting documentation:", error);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDeleteFile(false);
  };

  const handleDownload = (uuid) => {
    setDownloadFileUuid(uuid);
    setShowConfirmDownload(true);
  };

  const handleConfirmDownload = async () => {
    try {
      const file = berkas.find((file) => file.uuid === downloadFileUuid);
      if (file && file.berkas_urls) {
        // Mendapatkan data file dari URL
        const response = await fetch(file.berkas_urls);

        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `file_${downloadFileUuid}`; // Nama file dapat disesuaikan
          link.click();
          // Cleanup
          window.URL.revokeObjectURL(link.href);
        } else {
          throw new Error('Gagal mengunduh file.');
        }
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setShowConfirmDownload(false);
    }
  };

  const checklistData = {
    "Before Start": ["Item 1", "Item 2", "Item 3"],
    "Push/Start": ["Item 4", "Item 5"],
    "After Start": ["Item 6", "Item 7", "Item 8"],
    "Before Takeoff": ["Item 9", "Item 10"],
    "After Takeoff": ["Item 11", "Item 12"],
    "Mission": ["Item 13", "Item 14", "Item 15"],
    "Before Landing": ["Item 16", "Item 17"],
    "After Landing": ["Item 18", "Item 19", "Item 20"],
  };

  const handleCheckboxChange = (section, item) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [section]: {
        ...prevCheckedItems[section],
        [item]: !prevCheckedItems[section]?.[item],
      },
    }));
  };

  const handleAccordionClick = (index) => {
    // Toggle the accordion open or closed
    setOpenIndex(openIndex === index ? null : index);
  };

  const allChecked = (section) => {
    const items = checklistData[section];
    const checked = checkedItems[section] || {};
    return items.every(item => checked[item] === true);
  };

  const handleSave = async (section) => {
    const checklistMap = {
      "Before Start": "before_start",
      "Push/Start": "push_start",
      "After Start": "after_start",
      "Before Takeoff": "before_takeoff",
      "After Takeoff": "after_takeoff",
      Mission: "mission",
      "Before Landing": "before_landing",
      "After Landing": "after_landing",
    };

    const listChecklist = checklistMap[section];

    if (listChecklist) {
      try {
        await penerbanganMisiService.updateChecklist(uuid, listChecklist);
        alert(`Checklist for ${section} has been saved.`);
      } catch (error) {
        alert(`Failed to save checklist for ${section}.`);
      }
    }
  };

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">Detail Penerbangan</h3>
      <div className="mt-3">
        <div className="flex mb-2">
          <span className="font-bold w-40">Waktu Mulai</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.mulai}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Waktu Selesai</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.selesai}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Durasi</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.durasi} menit</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Status Misi</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">
            {flightData.status_misi ? "Selesai" : "Proses"}
          </span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Status Penerbangan</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">
            {flightData.status_penerbangan ? "Selesai" : "Proses"}
          </span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Pilot</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.pilot}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">GCS Operator</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.gcs}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Wahana</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">{flightData.wahana}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-40">Komponen</span>
          <span className="w-1 mx-1">:</span>
          <span className="flex-1 text-left">
            {flightData.komponen_penerbangans.map((komponen) => (
              <div key={komponen.id}>{komponen.nama_komponen}</div>
            ))}
          </span>
        </div>
      </div>

      <div>
        <h4 className="mt-5 text-2xl font-bold">Cuaca</h4>
        <Slider {...sliderSettings} className="mt-3">
          {flightData.cuacas.map((cuaca) => (
            <div key={cuaca.id} className="px-2">
              <div className="bg-white shadow-md rounded-lg p-5 text-center">
                <h5 className="text-lg font-bold mb-2">{cuaca.time}</h5>

                {/* Wind Speed Icon */}
                <div className="flex flex-col items-center mb-2">
                  <FaWind className="text-blue-900 text-6xl mb-2" />
                  <p className="text-blue-900 text-2xl">
                    {cuaca.windspeed} m/s
                  </p>
                </div>

                {/* Temperature and Humidity */}
                <div className="flex justify-around items-center">
                  <div className="flex items-center space-x-1 space-y-0.5">
                    <FaThermometerHalf className="text-blue-500 text-3xl" />
                    <p className="text-gray-700 text-xl">
                      {cuaca.temperature}°C
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 space-y-0.5">
                    <FaTint className="text-blue-500 text-3xl" />
                    <p className="text-gray-700 text-xl">{cuaca.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Files Section */}
      <div className="mt-5">
        <h4 className="text-2xl font-bold mb-4">Berkas</h4>
        <div className="mt-2 flex justify-between">
          <Button
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={handleShowModalFile}
          >
            Tambah
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {Object.entries(fileCategories).map(([category, files]) => (
            <div key={category}>
              <h5 className="text-xl font-semibold">
                {category.replace(/_/g, " ").toUpperCase()}
              </h5>
              {files.length > 0 ? (
                <ul className="list-disc pl-5">
                  {files.map((file) => (
                    <li key={file.id} className="flex items-center space-x-2">
                      <a
                        href={file.berkas_urls}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" no-underline text-inherit hover:no-underline flex items-center space-x-2"
                      >
                        <span>
                          {file.tipe.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </a>
                      <FaDownload className="mr-2 text-blue-500 cursor-pointer h-5 w-5" onClick={() => handleDownload(file.uuid)} />
                      <FaTrash
                          className="mr-2 text-red-500 cursor-pointer h-5 w-5"
                          onClick={() => handleDeleteFileBerkas(file.uuid)}
                        />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Belum ada file</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
      <h4 className="text-2xl font-bold mb-4">Checklist</h4>
      <div>
          {Object.keys(checklistData).map((section, index) => (
            <div key={section} className="border border-gray-300 mb-2 rounded-md">
              <div
                className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                  allChecked(section) ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => handleAccordionClick(index)}
              >
                <span>{section}</span>
              </div>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="p-4 flex flex-col">
                  {checklistData[section].map((item) => (
                    <label key={item} className="block mb-2">
                      <input
                        type="checkbox"
                        checked={checkedItems[section]?.[item] || false}
                        onChange={() => handleCheckboxChange(section, item)}
                        className="mr-2"
                      />
                      {item}
                    </label>
                  ))}
                  <div className="flex justify-end mt-4">
                    <button
                      className={`px-4 py-2 text-white font-semibold rounded-md ${
                        allChecked(section) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => handleSave(section)}
                      disabled={!allChecked(section)}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mt-5 text-2xl font-bold">Form Penerbangan</h4>
        <p>Isi Form Dibawah</p>
        <div className="mt-3 pb-5 flex justify-between">
          <Button
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={handleShowModal}
          >
            Tambah
          </Button>
        </div>
      </div>

      <Modal show={showModalFile} onHide={handleCloseModalFile}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Berkas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFile}>
            <Form.Group controlId="formNoticeToAirman">
              <Form.Label>Notice To Airman (PDF)</Form.Label>
              <Form.Control
                type="file"
                name="notice_to_airman"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group
              controlId="formFlightSecurityClearance"
              className="mt-3"
            >
              <Form.Label>Flight Security Clearance (PDF)</Form.Label>
              <Form.Control
                type="file"
                name="flight_security_clearense"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group controlId="formIzinLokasiTerbang" className="mt-3">
              <Form.Label>Izin Lokasi Terbang (PDF)</Form.Label>
              <Form.Control
                type="file"
                name="izin_lokasi_terbang"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group controlId="formFlightPlan" className="mt-3">
              <Form.Label>Flight Plan (Image)</Form.Label>
              <Form.Control
                type="file"
                name="flight_plan"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button type="submit" className="mt-3" variant="primary">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Penerbangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMulai">
              <Form.Label>Waktu Mulai</Form.Label>
              <Form.Control
                type="datetime-local"
                name="mulai"
                value={formData.mulai}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSelesai" className="mt-3">
              <Form.Label>Waktu Selesai</Form.Label>
              <Form.Control
                type="datetime-local"
                name="selesai"
                value={formData.selesai}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formWahana" className="mt-3">
              <Form.Label>Pilih Wahana</Form.Label>
              <Select
                options={wahanas}
                name="wahanaId"
                value={wahanas.find(
                  (option) => option.value === formData.wahanaId
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    wahanaId: selectedOption ? selectedOption.value : "",
                  })
                }
                placeholder="Pilih Wahana"
                isClearable
              />
            </Form.Group>

            <Form.Group controlId="formPilot" className="mt-3">
              <Form.Label>Pilih Pilot</Form.Label>
              <Select
                options={pilots}
                name="pilotId"
                value={pilots.find(
                  (option) => option.value === formData.pilotId
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    pilotId: selectedOption ? selectedOption.value : "",
                  })
                }
                placeholder="Pilih Pilot"
                isClearable
              />
            </Form.Group>

            <Form.Group controlId="formGcs" className="mt-3">
              <Form.Label>Pilih GCS</Form.Label>
              <Select
                options={gcsOperators}
                name="gcsId"
                value={gcsOperators.find(
                  (option) => option.value === formData.gcsId
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    gcsId: selectedOption ? selectedOption.value : "",
                  })
                }
                placeholder="Pilih GCS"
                isClearable
              />
            </Form.Group>

            <Form.Group controlId="formKomponen" className="mt-3">
              <Form.Label>Pilih Komponen</Form.Label>
              <Select
                options={komponens}
                name="komponenId"
                value={komponens.filter((option) =>
                  formData.komponenId.includes(option.value)
                )}
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    komponenId: selectedOptions.map((option) => option.value),
                  })
                }
                placeholder="Pilih Komponen"
                isMulti
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status ? "true" : "false"}
                onChange={handleStatusChange}
              >
                <option value="false">Proses</option>
                <option value="true">Selesai</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {ReactDOM.createPortal(
          showConfirmDownload && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Konfirmasi Download
                </h2>
                <p className="mb-4">
                  Apakah Anda ingin download file ini?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowConfirmDownload(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleConfirmDownload}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ),
          document.body
        )}

      {ReactDOM.createPortal(
        showConfirmDeleteFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Konfirmasi Hapus Berkas
              </h2>
              <p className="mb-4">
                Apakah Anda yakin ingin menghapus foto ini?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={handleConfirmClose}
                >
                  Batal
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleConfirmDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ),
        document.body
      )}

      {ReactDOM.createPortal(
        showSuccessDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <FaCheckCircle className="text-green-500 text-6xl absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2" />{" "}
              {/* Ikon besar di tengah atas */}
              <div className="mt-12 text-center">
                <h2 className="text-xl font-bold mb-2">Sukses</h2>
                <p className="text-gray-600 mb-6">
                  Berkas telah berhasil dihapus.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => setShowSuccessDelete(false)}
                >
                  Oke
                </button>
              </div>
            </div>
          </div>
        ),
        document.body
      )}

      {ReactDOM.createPortal(
        showSuccessAdd && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <FaCheckCircle className="text-green-500 text-6xl absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2" />
              <div className="mt-12 text-center">
                <h2 className="text-xl font-bold mb-2">Sukses</h2>
                <p className="text-gray-600 mb-6">
                  Data penerbangan telah berhasil ditambahkan.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => setShowSuccessAdd(false)}
                >
                  Oke
                </button>
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </div>
  );
}

export default PenerbanganMisi;
