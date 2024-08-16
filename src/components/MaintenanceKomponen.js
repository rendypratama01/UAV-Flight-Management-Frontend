import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailMaintenanceKomponenPath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Select from "react-select";
import maintenanceKomponenService from "../services/maintenanceKomponen.service";
import komponenService from "../services/komponen.service";
import ReactDOM from "react-dom";

function MaintenanceKomponen() {
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    kategori: "",
    nama: "",
    tempat: "",
    biaya: "",
    photos: [],
    komponenId: [],
  });

  const [perbaikanKomponenData, setPerbaikanKomponenData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [perbaikanKomponenId, setPerbaikanKomponenId] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [deletePerbaikanKomponenId, setDeletePerbaikanKomponenId] = useState(null);
  const [komponenOptions, setKomponenOptions] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setPerbaikanKomponenId(null);
    setFormData({
      judul: "",
      deskripsi: "",
      kategori: "",
      nama: "",
      tempat: "",
      biaya: "",
      photos: [],
      komponenId: [],
    });
    setPhotoError("");
  };

  useEffect(() => {
    const fetchKomponenData = async () => {
      try {
        const response = await komponenService.getKomponen(); // Ganti dengan fungsi fetch API Anda
        if (response && Array.isArray(response.komponen)) {
          const options = response.komponen.map((komponen) => ({
            value: komponen.uuid,
            label: komponen.nama_komponen,
          }));
          setKomponenOptions(options);
        }
      } catch (error) {
        console.error("Error fetching komponen data:", error);
      }
    };

    fetchKomponenData();
  }, []);

  const handleSelectChange = async (selectedOption, name) => {
    const selectedValue = selectedOption ? selectedOption.value : null; // Ambil nilai dari objek yang dipilih

    setFormData({
      ...formData,
      [name]: selectedValue ? [selectedValue] : [], // Pastikan komponenId adalah array dengan satu elemen
      komponenId: selectedValue ? [selectedValue] : [], // Simpan ID komponen yang dipilih
    });

    if (selectedValue) {
      await fetchKomponenDetails(selectedValue);
    }
  };

  const fetchKomponenDetails = async (uuid) => {
    try {
      const response = await komponenService.getKomponenById(uuid);
      if (response && response.komponen) {
        console.log("Detail komponen:", response.komponen);

        // Extract id from komponen details and update formData
        setFormData((prevFormData) => ({
          ...prevFormData,
          komponenId: [response.komponen.id], // Store `id` instead of `uuid`
        }));

        // You can now use other details from response.komponen if needed
      }
    } catch (error) {
      console.error("Error fetching komponen details:", error);
    }
  };

  useEffect(() => {
    const fetchPerbaikanKomponen = async () => {
      try {
        const response = await maintenanceKomponenService.getPerbaikanKomponen();
        console.log(response?.msg, response);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.perbaikanKomponen)
        ) {
          setPerbaikanKomponenData(response.perbaikanKomponen);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'Perbaikan komponen'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchPerbaikanKomponen();
  }, []);

  useEffect(() => {
    const searchPerbaikanKomponenData = async () => {
      try {
        if (searchQuery) {
          const response = await maintenanceKomponenService.searchPerbaikanKomponen({
            query: searchQuery,
          });
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.perbaikanKomponen)
          ) {
            setPerbaikanKomponenData(response.perbaikanKomponen);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await maintenanceKomponenService.getPerbaikanKomponen();
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.perbaikanKomponen)
          ) {
            setPerbaikanKomponenData(response.perbaikanKomponen);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    searchPerbaikanKomponenData();
  }, [searchQuery]);

  useEffect(() => {
    if (perbaikanKomponenId) {
      const fetchPerbaikanKomponenById = async () => {
        try {
          const response = await maintenanceKomponenService.getPerbaikanKomponenById(
            perbaikanKomponenId
          );
          if (
            typeof response === "object" &&
            response !== null &&
            response.perbaikan
          ) {
            setFormData({
              judul: response.perbaikan.judul_perbaikan,
              deskripsi: response.perbaikan.deskripsi_perbaikan,
              kategori: response.perbaikan.kategori,
              nama: response.perbaikan.nama_teknisi,
              tempat: response.perbaikan.tempat_perbaikan,
              biaya: response.perbaikan.biaya,
              photos: response.perbaikan.photos || [],
            });
            handleShow();
          } else {
            console.error(
              "Fetched data is not an object or does not contain 'Perbaikan Komponen'."
            );
          }
        } catch (error) {
          console.error(error.msg, error);
        }
      };

      fetchPerbaikanKomponenById();
    }
  }, [perbaikanKomponenId]);

  const handleDeletePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    if (selectedFiles.length + formData.photos.length > 6) {
      setPhotoError("You can upload a maximum of 6 photos.");
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

    const userId = localStorage.getItem("userID");
    console.log("userID from localStorage:", userId); // Tambahkan log ini

    if (!userId) {
      console.error("userID tidak ditemukan di localStorage");
      return;
    }

    // Buat FormData untuk data yang akan dikirim
    const dataToSubmit = new FormData();

    // Tambahkan komponenId ke dalam FormData jika ada
    formData.komponenId.forEach((id) => dataToSubmit.append("komponenId", id));
    dataToSubmit.append("userId", userId);
    console.log("formData.komponenId:", formData.komponenId);

    // Tambahkan field lainnya ke dalam FormData
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => dataToSubmit.append(key, file));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      if (isUpdate) {
        const response = await maintenanceKomponenService.updatePerbaikanKomponen(
          perbaikanKomponenId,
          dataToSubmit
        );
        console.log(response.msg, response);
        setShowSuccessUpdate(true);
      } else {
        const response = await maintenanceKomponenService.addPerbaikanKomponen(
          dataToSubmit
        );
        console.log(response.msg, response);
        setShowSuccessAdd(true);
      }

      const updatedResponse = await maintenanceKomponenService.getPerbaikanKomponen();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.perbaikanKomponen)
      ) {
        setPerbaikanKomponenData(updatedResponse.perbaikanKomponen);
      } else {
        console.error("Invalid response format");
      }

      handleClose();
    } catch (error) {
      console.error(
        isUpdate
          ? "Error updating perbaikan komponen data:"
          : "Error posting perbaikan komponen data:",
        error.msg
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await maintenanceKomponenService.deletePerbaikanKomponen(deletePerbaikanKomponenId);
      setShowSuccessDelete(true);

      const updatedResponse = await maintenanceKomponenService.getPerbaikanKomponen();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.perbaikanKomponen)
      ) {
        setPerbaikanKomponenData(updatedResponse.perbaikanKomponen);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'Perbaikan Komponen'."
        );
      }

      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting komponen:", error);
    }
  };

  const handleEdit = (perbaikanKomponen) => {
    setIsUpdate(true);
    setPerbaikanKomponenId(perbaikanKomponen.uuid);
  };

  const handleDelete = (uuid) => {
    setDeletePerbaikanKomponenId(uuid);
    setShowConfirmDelete(true);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#EAEAEA", // Change to your desired color
      },
    },
  };

  const columns = [
    {
      name: "Judul",
      selector: (row) => row.judul_perbaikan,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "Tanggal Perbaikan",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={`${detailMaintenanceKomponenPath}/${row.uuid}`}
              className="no-underline hover:no-underline text-inherit"
            >
              <TbListDetails className="text-2xl" />
            </a>
          </button>
          <button className="text-blue-900" onClick={() => handleEdit(row)}>
            <FaEdit className="text-2xl" />
          </button>
          <button
            className="text-red-600"
            onClick={() => handleDelete(row.uuid)}
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Perbaikan Komponen</h3>

      {/* Search Bar */}
      <div className="mb-4 pt-5">
        <Form inline>
          <Form.Control
            type="text"
            placeholder="Cari nama, status, atau tipe..."
            className="mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </div>

      <DataTable
        title="Data Perbaikan Komponen"
        columns={columns}
        data={perbaikanKomponenData}
        fixedHeader
        fixedHeaderScrollHeight="530px"
        pagination
        highlightOnHover
        customStyles={customStyles}
        actions={
          <Button
            style={{ backgroundColor: "#5A6ACF", color: "#ffffff" }}
            className="d-flex align-items-center"
            onClick={handleShow}
          >
            Tambah <FaPlus className="text-sm" />
          </Button>
        }
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Perbaikan Komponen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="informasi" id="perbaikan-tabs">
              <Tab eventKey="informasi" title="Informasi">
              <Form.Group controlId="formKomponen">
                  <Form.Label>Komponen</Form.Label>
                  <Select
                    isMulti={false} // Ubah menjadi false agar hanya bisa memilih satu komponen
                    placeholder="Pilih Komponen"
                    name="komponen"
                    options={komponenOptions}
                    className="basic-single-select" // Ubah className jika perlu
                    classNamePrefix="select"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "komponen")
                    }
                    value={komponenOptions.find(
                      (option) => option.value === formData.komponenId
                    )} // Menampilkan komponen yang dipilih
                  />
                </Form.Group>

                <Form.Group controlId="formJudul">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan judul"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDeskripsi" className="mt-3">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Masukkan deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formKategori" className="mt-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    as="select"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                  >
                    <option value="">Pilih kategori...</option>
                    <option value="Airframe">Airframe</option>
                    <option value="Elektronik">Elektronik</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formNamaTeknisi" className="mt-3">
                  <Form.Label>Nama Teknisi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama teknisi"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTempatPerbaikan" className="mt-3">
                  <Form.Label>Tempat Perbaikan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan tempat perbaikan"
                    name="tempat"
                    value={formData.tempat}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBiaya" className="mt-3">
                  <Form.Label>Biaya (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan biaya perbaikan"
                    name="biaya"
                    value={formData.biaya}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="foto" title="Foto">
                <Form.Group controlId="formFoto" className="mt-3">
                  <Form.Label>Upload Foto</Form.Label>
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
              </Tab>
            </Tabs>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {ReactDOM.createPortal(
        showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-4">
                Apakah Anda yakin ingin menghapus data perbaikan komponen ini?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Batal
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeleteConfirm}
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Berhasil Dihapus</h2>
              <p className="mb-4">perbaikan komponen telah berhasil dihapus.</p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Berhasil Tambah Data
              </h2>
              <p className="mb-4">Data perbaikan komponen telah berhasil ditambahkan.</p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
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
        showSuccessUpdate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Berhasil Update Data
              </h2>
              <p className="mb-4">Data perbaikan komponen telah berhasil diperbarui.</p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setShowSuccessUpdate(false)}
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

export default MaintenanceKomponen;
