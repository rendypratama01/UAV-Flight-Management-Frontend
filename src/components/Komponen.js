import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailKomponenPath } from "../routes";
import komponenService from "../services/komponen.service";
import ReactDOM from "react-dom";

function Komponen() {
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // State for edit mode
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    kategori: "",
    tempat_pembelian: "",
    harga: "",
    photos: [],
    status: false,
  });
  const [komponenData, setKomponenData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [photoError, setPhotoError] = useState("");
  const [komponenId, setKomponenId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [deleteKomponenId, setDeleteKomponenId] = useState(null);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

  useEffect(() => {
    const fetchKomponen = async () => {
      try {
        const response = await komponenService.getKomponen();
        console.log(response.msg);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.komponen)
        ) {
          setKomponenData(response.komponen);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'komponen'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchKomponen();
  }, []);

  useEffect(() => {
    const searchKomponenData = async () => {
      try {
        if (searchQuery) {
          const response = await komponenService.searchKomponen({
            query: searchQuery,
          });
          if (response && Array.isArray(response.komponen)) {
            setKomponenData(response.komponen);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await komponenService.getKomponen();
          if (response && Array.isArray(response.komponen)) {
            setKomponenData(response.komponen);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    searchKomponenData();
  }, [searchQuery]);

  useEffect(() => {
    if (komponenId) {
      const fetchKomponenById = async () => {
        try {
          const response = await komponenService.getKomponenById(komponenId);
          if (
            typeof response === "object" &&
            response !== null &&
            response.komponen
          ) {
            setFormData({
              nama: response.komponen.nama_komponen,
              deskripsi: response.komponen.deskripsi_komponen,
              kategori: response.komponen.kategori,
              tempat_pembelian: response.komponen.tempat_pembelian,
              harga: response.komponen.harga,
              photos:
                response.komponen.foto_komponens.map(
                  (photo) => photo.foto_urls
                ) || [],
              status: response.komponen.status || false,
            });
            handleShow();
          } else {
            console.error(
              "Fetched data is not an object or does not contain 'komponen'."
            );
          }
        } catch (error) {
          console.error(error.msg, error);
        }
      };

      fetchKomponenById();
    }
  }, [komponenId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setKomponenId(null);
    setFormData({
      nama: "",
      deskripsi: "",
      kategori: "",
      tempat_pembelian: "",
      harga: "",
      photos: [],
      status: false,
    });
    setPhotoError("");
  };

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

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value === "true",
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    if (selectedFiles.length + formData.photos.length > 1) {
      setPhotoError("You can upload a maximum of 1 photos.");
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

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => dataToSubmit.append(key, file));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      if (isUpdate) {
        const response = await komponenService.updateKomponen(
          komponenId,
          dataToSubmit
        );
        console.log(response.msg, response);

        // Display success update modal
        setShowSuccessUpdate(true);
      } else {
        const response = await komponenService.addKomponen(dataToSubmit);
        console.log(response.msg, response);

        // Display success add modal
        setShowSuccessAdd(true);
      }

      const updatedResponse = await komponenService.getKomponen();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.komponen)
      ) {
        setKomponenData(updatedResponse.komponen);
        console.log("Data successfully updated");
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'komponen'."
        );
      }

      handleClose();
    } catch (error) {
      console.error(
        isUpdate
          ? "Error updating komponen data:"
          : "Error posting komponen data:",
        error
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await komponenService.deleteKomponen(deleteKomponenId);
      setShowSuccessDelete(true);

      const updatedResponse = await komponenService.getKomponen();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.komponen)
      ) {
        setKomponenData(updatedResponse.komponen);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'Komponen'."
        );
      }

      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting komponen:", error);
    }
  };

  const handleEdit = (komponen) => {
    setIsUpdate(true);
    setKomponenId(komponen.uuid);
  };

  const handleDelete = (uuid) => {
    setDeleteKomponenId(uuid);
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
      name: "Nama",
      selector: (row) => row.nama_komponen,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "ID Komponen",
      selector: (row) => row.id_komponen,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={`${detailKomponenPath}/${row.uuid}`} // Adjust path as needed
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
            onClick={() => handleDelete(row.uuid)} // Add this line
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Komponen</h3>

      {/* Search Bar */}
      <div className="mb-4 pt-5">
        <Form inline>
          <Form.Control
            type="text"
            placeholder="Cari....."
            className="mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </div>

      <DataTable
        title="Data Komponen"
        columns={columns}
        data={komponenData}
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
            {isUpdate ? "Edit Komponen" : "Tambah Komponen"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Informasi</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDeskripsi" className="mt-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter deskripsi"
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
                <option value="Kamera">Kamera</option>
                <option value="Sensor">Sensor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formHarga" className="mt-3">
              <Form.Label>Harga (Rp)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Harga Komponen"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formToko" className="mt-3">
              <Form.Label>Toko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Toko Komponen"
                name="tempat_pembelian"
                value={formData.tempat_pembelian}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

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
                  {formData.photos.map((photoUrl, index) => (
                    <div key={index} className="mt-4 d-flex align-items-center">
                      <img
                        key={index}
                        src={photoUrl}
                        alt={`Komponen Foto ${index + 1}`}
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

            {isUpdate && (
              <Form.Group controlId="formStatus" className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status ? "true" : "false"}
                  onChange={handleStatusChange}
                >
                  <option value="true">Aktif</option>
                  <option value="false">Nonaktif</option>
                </Form.Control>
              </Form.Group>
            )}

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
                Apakah Anda yakin ingin menghapus data komponen ini?
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
                  Data komponen telah berhasil dihapus.
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
                  Data komponen telah berhasil ditambahkan.
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
                  Data komponen telah berhasil diperbarui.
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

export default Komponen;
