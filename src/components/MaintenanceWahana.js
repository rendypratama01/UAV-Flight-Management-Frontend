import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailMaintenanceWahanaPath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Select from "react-select";
import perbaikanWahanaService from "../services/maintenanceWahana.service";
import wahanaService from "../services/wahana.service";
import ReactDOM from "react-dom";

function MaintenanceWahana() {
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
    wahanaId: [],
  });

  const [perbaikanWahanaData, setPerbaikanWahanaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [perbaikanWahanaId, setPerbaikanWahanaId] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [deletePerbaikanWahanaId, setDeletePerbaikanWahanaId] = useState(null);
  const [wahanaOptions, setWahanaOptions] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setPerbaikanWahanaId(null);
    setFormData({
      judul: "",
      deskripsi: "",
      kategori: "",
      nama: "",
      tempat: "",
      biaya: "",
      photos: [],
      wahanaId: [],
    });
    setPhotoError("");
  };

  useEffect(() => {
    const fetchWahanaData = async () => {
      try {
        const response = await wahanaService.getWahana(); // Ganti dengan fungsi fetch API Anda
        if (response && Array.isArray(response.wahana)) {
          const options = response.wahana.map((wahana) => ({
            value: wahana.uuid,
            label: wahana.nama_wahana,
          }));
          setWahanaOptions(options);
        }
      } catch (error) {
        console.error("Error fetching wahana data:", error);
      }
    };

    fetchWahanaData();
  }, []);

  const handleSelectChange = async (selectedOption, name) => {
    const selectedValue = selectedOption ? selectedOption.value : null; // Ambil nilai dari objek yang dipilih

    setFormData({
      ...formData,
      [name]: selectedValue ? [selectedValue] : [], // Pastikan wahanaId adalah array dengan satu elemen
      wahanaId: selectedValue ? [selectedValue] : [], // Simpan ID wahana yang dipilih
    });

    if (selectedValue) {
      await fetchWahanaDetails(selectedValue);
    }
  };

  const fetchWahanaDetails = async (uuid) => {
    try {
      const response = await wahanaService.getWahanaById(uuid);
      if (response && response.wahana) {
        console.log("Detail Wahana:", response.wahana);

        // Extract id from wahana details and update formData
        setFormData((prevFormData) => ({
          ...prevFormData,
          wahanaId: [response.wahana.uuid], // Store `id` instead of `uuid`
        }));

        // You can now use other details from response.wahana if needed
      }
    } catch (error) {
      console.error("Error fetching wahana details:", error);
    }
  };

  useEffect(() => {
    const fetchPerbaikanWahana = async () => {
      try {
        const response = await perbaikanWahanaService.getPerbaikanWahana();
        console.log(response?.msg, response);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.perbaikanWahana)
        ) {
          setPerbaikanWahanaData(response.perbaikanWahana);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'Perbaikan Wahana'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchPerbaikanWahana();
  }, []);

  useEffect(() => {
    const searchPerbaikanWahanaData = async () => {
      try {
        if (searchQuery) {
          const response = await perbaikanWahanaService.searchPerbaikanWahana({
            query: searchQuery,
          });
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.perbaikanWahana)
          ) {
            setPerbaikanWahanaData(response.perbaikanWahana);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await perbaikanWahanaService.getPerbaikanWahana();
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.perbaikanWahana)
          ) {
            setPerbaikanWahanaData(response.perbaikanWahana);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    searchPerbaikanWahanaData();
  }, [searchQuery]);

  useEffect(() => {
    if (perbaikanWahanaId) {
      const fetchPerbaikanWahanaById = async () => {
        try {
          const response = await perbaikanWahanaService.getPerbaikanWahanaById(
            perbaikanWahanaId
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
              photos: response.perbaikan.foto_perbaikan.map(photo => photo.foto_urls) || [],
            });
            handleShow();
          } else {
            console.error(
              "Fetched data is not an object or does not contain 'Perbaikan wahana'."
            );
          }
        } catch (error) {
          console.error(error.msg, error);
        }
      };

      fetchPerbaikanWahanaById();
    }
  }, [perbaikanWahanaId]);

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

    const userId = localStorage.getItem("userUUID");
    console.log("userUUID from localStorage:", userId); // Tambahkan log ini

    if (!userId) {
      console.error("userUUID tidak ditemukan di localStorage");
      return;
    }

    // Buat FormData untuk data yang akan dikirim
    const dataToSubmit = new FormData();

    // Tambahkan field lainnya ke dalam FormData
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => dataToSubmit.append(key, file));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    dataToSubmit.append("userId", userId);

    try {
      if (isUpdate) {
        const response = await perbaikanWahanaService.updatePerbaikanWahana(
          perbaikanWahanaId,
          dataToSubmit
        );
        console.log(response.msg, response);
        setShowSuccessUpdate(true);
      } else {
        const response = await perbaikanWahanaService.addPerbaikanWahana(
          dataToSubmit
        );
        console.log(response.msg, response);
        setShowSuccessAdd(true);
      }

      const updatedResponse = await perbaikanWahanaService.getPerbaikanWahana();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.perbaikanWahana)
      ) {
        setPerbaikanWahanaData(updatedResponse.perbaikanWahana);
      } else {
        console.error("Invalid response format");
      }

      handleClose();
    } catch (error) {
      console.error(
        isUpdate
          ? "Error updating perbaikan wahana data:"
          : "Error posting perbaikan wahana data:",
        error.msg
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await perbaikanWahanaService.deletePerbaikanWahana(
        deletePerbaikanWahanaId
      );
      setShowSuccessDelete(true);

      const updatedResponse = await perbaikanWahanaService.getPerbaikanWahana();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.perbaikanWahana)
      ) {
        setPerbaikanWahanaData(updatedResponse.perbaikanWahana);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'Perbaikan Wahana'."
        );
      }

      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting komponen:", error);
    }
  };

  const handleEdit = (perbaikanWahana) => {
    setIsUpdate(true);
    setPerbaikanWahanaId(perbaikanWahana.uuid);
  };

  const handleDelete = (uuid) => {
    setDeletePerbaikanWahanaId(uuid);
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
              href={`${detailMaintenanceWahanaPath}/${row.uuid}`}
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
      <h3 className="pt-10 text-3xl text-new-300">Perbaikan Wahana</h3>

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
        title="Data Perbaikan Wahana"
        columns={columns}
        data={perbaikanWahanaData}
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
          <Modal.Title>
            {isUpdate ? "Edit Perbaikan Wahana" : "Tambah Perbaikan Wahana"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="informasi" id="perbaikan-tabs">
              <Tab eventKey="informasi" title="Informasi">
                <Form.Group controlId="formWahana">
                  <Form.Label>Wahana</Form.Label>
                  <Select
                    isMulti={false} // Ubah menjadi false agar hanya bisa memilih satu wahana
                    placeholder="Pilih Wahana"
                    name="wahana"
                    options={wahanaOptions}
                    className="basic-single-select" // Ubah className jika perlu
                    classNamePrefix="select"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "wahana")
                    }
                    value={wahanaOptions.find(
                      (option) => option.value === formData.wahanaId
                    )} // Menampilkan wahana yang dipilih
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
                    required
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
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formKategori" className="mt-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    as="select"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
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
                    required
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
                    required
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
                    required
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="foto" title="Foto">
                <Form.Group controlId="formFoto" className="mt-3">
                  <Form.Label>Upload Foto Perbaikan</Form.Label>
                  <Form.Control
                    type="file"
                    name="photos"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {photoError && (
                    <div className="text-danger mt-2">{photoError}</div>
                  )}
                </Form.Group>

                <div className="mt-3">
                  {formData.photos && formData.photos.length > 0 && (
                    <div className="mt-4">
                      {formData.photos.map((photoUrl, index) => (
                        <div
                          key={index}
                          className="mt-4 d-flex align-items-center"
                        >
                          <img
                            key={index}
                            src={photoUrl}
                            alt={`Perbaikan Wahana Foto ${index + 1}`}
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
              {isUpdate ? "Update" : "Submit"}
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
                Apakah Anda yakin ingin menghapus data perbaikan wahana ini?
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <FaCheckCircle className="text-green-500 text-6xl absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2" />{" "}
              {/* Ikon besar di tengah atas */}
              <div className="mt-12 text-center">
                <h2 className="text-xl font-bold mb-2">Sukses</h2>
                <p className="text-gray-600 mb-6">
                  Data perbaikan wahana telah berhasil dihapus.
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
                  Data perbaikan wahana telah berhasil ditambahkan.
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
        showSuccessUpdate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <FaCheckCircle className="text-green-500 text-6xl absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2" />{" "}
              {/* Ikon besar di tengah atas */}
              <div className="mt-12 text-center">
                <h2 className="text-xl font-bold mb-2">Sukses</h2>
                <p className="text-gray-600 mb-6">
                  Data perbaikan wahana telah berhasil diperbarui.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
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

export default MaintenanceWahana;
