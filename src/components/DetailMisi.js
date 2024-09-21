import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import misiService from "../services/misi.service";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactDOM from "react-dom";
import { FaTrashAlt, FaDownload, FaCheckCircle } from "react-icons/fa";
import { penerbanganPath } from "../routes";
import {
  FaHourglassHalf,
  FaUser,
  FaPlane,
  FaToolbox,
  FaClipboard,
  FaCalendarAlt,
  FaSatellite,
  FaGamepad,
  FaVideo,
} from "react-icons/fa";

const DetailMisi = () => {
  const { uuid } = useParams(); // Get the uuid from URL parameters
  const [missionDetails, setMissionDetails] = useState(null);
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    photos: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [dokumenFotos, setDokumenFotos] = useState([]); // State for documentation photos
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [deletePhotoUuid, setDeletePhotoUuid] = useState(null);
  const [showConfirmDeletePhoto, setShowConfirmDeletePhoto] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [downloadPhotoUuid, setDownloadPhotoUuid] = useState(null);
  const [showConfirmDownload, setShowConfirmDownload] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("misiUUID", uuid);

    const fetchMissionDetails = async () => {
      try {
        const data = await misiService.getMisiById(uuid);
        console.log(data); // Logging data for debugging
        setMissionDetails(data.mission);
        setFlightDetails(data.penerbangan);
        setDokumenFotos(data.mission.dokumentasi_misis); // Set documentation photos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionDetails();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!missionDetails) return <p>No Mission details available.</p>;

  const handleDeletePhotoDokumentasi = (uuid) => {
    setDeletePhotoUuid(uuid);
    setShowConfirmDeletePhoto(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await misiService.deleteDokumentasi(deletePhotoUuid); // Call API to delete the photo
      await refreshMissionDetails(); // Refresh mission details after deletion
      setShowConfirmDeletePhoto(false);
      setShowSuccessDelete(true);
    } catch (error) {
      console.error("Error deleting documentation:", error);
    }
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    if (selectedFiles.length + formData.photos.length > 20) {
      setPhotoError("You can upload a maximum of 20 photos.");
    } else {
      setFormData({
        ...formData,
        photos: [...formData.photos, ...selectedFiles],
      });
      setPhotoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    formData.photos.forEach((file) => {
      dataToSubmit.append("photos", file);
    });

    try {
      const response = await misiService.addDokumentasi(dataToSubmit, uuid);
      console.log(response.msg, response);

      // Display success modal
      setShowSuccessAdd(true);

      await refreshMissionDetails();
      handleClose();
    } catch (error) {
      console.error("Error adding documentation:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    setShowConfirmDeletePhoto(false);
  };

  const refreshMissionDetails = async () => {
    try {
      const data = await misiService.getMisiById(uuid);
      setMissionDetails(data.mission);
      setDokumenFotos(data.mission.dokumentasi_misis);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirm = async () => {
    try {
      await misiService.updateMissionStatus(uuid, { status: true });
      await refreshMissionDetails(); // Refresh mission details after confirmation
      setShowConfirm(false);
    } catch (error) {
      console.error("Error updating mission status:", error);
    }
  };

  const handleDownload = (uuid) => {
    setDownloadPhotoUuid(uuid);
    setShowConfirmDownload(true);
  };

  const handleConfirmDownload = async () => {
    try {
      const photo = dokumenFotos.find(
        (foto) => foto.uuid === downloadPhotoUuid
      );
      if (photo && photo.foto_urls) {
        // Mendapatkan data gambar dari URL
        const response = await fetch(photo.foto_urls);

        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `photo_${downloadPhotoUuid}.jpeg`; // Atur ekstensi file sesuai kebutuhan
          link.click();
          // Cleanup
          window.URL.revokeObjectURL(link.href);
        } else {
          throw new Error("Gagal mengunduh gambar.");
        }
      }
    } catch (error) {
      console.error("Error downloading photo:", error);
    } finally {
      setShowConfirmDownload(false);
    }
  };

  return (
    <div className="ml-cl7 mr-cr1">
      <h3 className="text-3xl text-new-300 pt-10">
        {missionDetails.judul_misi}
      </h3>
      <p className="text-justify">{missionDetails.deskripsi_misi}</p>
      <div className="detail-misi-container-sub_title">
        <Tabs defaultActiveKey="detail" id="tab" className="mb-3">
          <Tab eventKey="detail-misi" title="Detail Misi">
            <div className="mt-3 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    {missionDetails.status ? (
                      <FaCheckCircle className="mr-2 text-green-600" />
                    ) : (
                      <FaHourglassHalf className="mr-2 text-yellow-600 " />
                    )}
                    Status
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.status ? "Selesai" : "Proses"}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaUser className="mr-2" /> Pembuat Misi
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.creator}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaPlane className="mr-2" /> Wahana
                  </span>
                  <div className="text-gray-900 text-xl">
                    {missionDetails.wahanas.map((wahana, index) => (
                      <div key={index}>
                        {wahana.nama_wahana} - {wahana.tipe}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaUser className="mr-2" /> Operator
                  </span>
                  <div className="text-gray-900 text-xl">
                    {missionDetails.userMisi.map((operator, index) => (
                      <div key={index}>
                        {operator.name} - {operator.role}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaToolbox className="mr-2" /> Komponen
                  </span>
                  <div className="text-gray-900 text-xl">
                    {missionDetails.komponens.map((komponen, index) => (
                      <div key={index}>
                        {komponen.nama_komponen} - {komponen.kategori}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaCalendarAlt className="mr-2" /> Tanggal Misi
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.createdAt}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaClipboard className="mr-2" /> Kategori
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.kategori}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaSatellite className="mr-2" /> Telemetry
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.telemetry}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaGamepad className="mr-2" /> Remote Control
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.remote}
                  </span>
                </div>

                <div className="flex flex-col items-start p-4 border-l-4 border-blue-700">
                  <span className="flex items-center font-bold text-blue-900 text-lg">
                    <FaVideo className="mr-2" /> Video Sender
                  </span>
                  <span className="text-gray-900 text-xl">
                    {missionDetails.video_sender}
                  </span>
                </div>
              </div>

              <div className="mt-3 py-1 flex justify-between">
                <button
                  className="py-2 px-4 shadow-md font-bold bg-blue-500 w-full h-14 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={() => setShowConfirm(true)}
                >
                  Konfirmasi Misi
                </button>
              </div>
            </div>
          </Tab>

          <Tab eventKey="detail-penerbangan" title="Detail Penerbangan">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flightDetails.map((flight) => (
                <a
                  key={flight.uuid}
                  href={`${penerbanganPath}/${flight.uuid}`}
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    className={`bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer ${
                      flight.status_penerbangan
                        ? "border-l-4 border-green-500"
                        : "border-l-4 border-orange-500"
                    }`}
                  >
                    <h4 className="text-xl font-bold mb-2">
                      <span className="text-blue-600">Durasi:</span>{" "}
                      {flight.durasi} menit
                    </h4>
                    <p className="text-sm mb-1">
                      <span className="font-semibold flex items-center">
                        {flight.status_penerbangan ? (
                          <FaCheckCircle className="mr-2 text-green-600" />
                        ) : (
                          <FaHourglassHalf className="mr-2 text-orange-500" />
                        )}
                        Status Penerbangan:
                      </span>{" "}
                      {flight.status_penerbangan ? "Selesai" : "Proses"}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Mulai:</span>{" "}
                      {flight.mulai}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Tab>

          <Tab eventKey="dokumentasi" title="Dokumentasi">
            <div className="mt-3 flex justify-between">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={() => setShowModal(true)}
              >
                Tambah Foto
              </button>
            </div>
            <div className="mt-3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">
                  Foto Dokumentasi
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {dokumenFotos.length > 0 ? (
                    dokumenFotos.map((foto, index) => (
                      <div key={index} className="relative">
                        <Zoom>
                          <img
                            src={foto.foto_urls} // Accessing the image URL
                            alt={`Foto ${index}`}
                            className="w-full h-auto cursor-pointer"
                          />
                        </Zoom>
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <FaTrashAlt
                            className="text-red-500 cursor-pointer h-5 w-5"
                            onClick={() =>
                              handleDeletePhotoDokumentasi(foto.uuid)
                            }
                          />
                          <FaDownload
                            className="text-blue-500 cursor-pointer h-5 w-5"
                            onClick={() => handleDownload(foto.uuid)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No photos available.</p>
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Informasi</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFoto" className="mt-3">
                <Form.Label>Upload Foto komponen</Form.Label>
                <Form.Control
                  type="file"
                  name="photos"
                  multiple
                  onChange={handleFileChange}
                />
                {photoError && (
                  <div className="text-danger mt-2">{photoError}</div>
                )}
              </Form.Group>

              <div className="mt-3">
                {formData.photos && formData.photos.length > 0 && (
                  <div className="mt-4">
                    {formData.photos.map((file, index) => (
                      <div
                        key={index}
                        className="mt-4 d-flex align-items-center"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Foto ${index}`}
                          className="img-fluid"
                          style={{ maxWidth: "350px", margin: "10px" }}
                        />
                        <Button
                          variant="danger"
                          onClick={() => handleDeletePhoto(index)}
                          className="ms-2"
                        >
                          Hapus
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
                <p className="mb-4">Apakah Anda ingin download foto ini?</p>
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
          showConfirmDeletePhoto && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Konfirmasi Hapus Foto
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
                    Foto dokumentasi telah berhasil dihapus.
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
                <FaCheckCircle className="text-green-500 text-6xl absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2" />{" "}
                {/* Ikon besar di tengah atas */}
                <div className="mt-12 text-center">
                  <h2 className="text-xl font-bold mb-2">Sukses</h2>
                  <p className="text-gray-600 mb-6">
                    Foto dokumentasi telah berhasil ditambahkan.
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

        {ReactDOM.createPortal(
          showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Konfirmasi Selesai
                </h2>
                <p className="mb-4">
                  Apakah Anda yakin ingin mengkonfirmasi bahwa misi ini selesai?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleConfirmClose}
                  >
                    Batal
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleConfirm}
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          ),
          document.body
        )}
      </div>
    </div>
  );
};

export default DetailMisi;
