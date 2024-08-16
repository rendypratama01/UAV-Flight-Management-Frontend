import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TbListDetails } from "react-icons/tb";
import { detailOperatorPath } from "../routes";
import operatorService from "../services/operator.service";
import ReactDOM from "react-dom";

function Operator() {
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // State for edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    nik: "",
    tanggal_lahir: "",
    nomor_telepon: "",
    photo_profile: "",
  });

  const [operatorData, setOperatorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [photoError, setPhotoError] = useState("");
  const [operatorId, setOperatorId] = useState(null);
  const [deleteOperatorId, setDeleteOperatorId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const response = await operatorService.getOperator();
        console.log(response?.msg, response);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.users)
        ) {
          setOperatorData(response.users);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'users'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchOperator();
  }, []);

  useEffect(() => {
    const searchOperatorData = async () => {
      try {
        if (searchQuery) {
          const response = await operatorService.searchOperator({
            query: searchQuery,
          });
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.users)
          ) {
            setOperatorData(response.users);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await operatorService.getOperator();
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.users)
          ) {
            setOperatorData(response.users);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    searchOperatorData();
  }, [searchQuery]);

  useEffect(() => {
    if (operatorId) {
      const fetchOperatorById = async () => {
        try {
          const response = await operatorService.getOperatorById(operatorId);
          if (
            typeof response === "object" &&
            response !== null &&
            response.user
          ) {
            setFormData({
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
              nik: response.user.nik,
              tanggal_lahir: response.user.tanggal_lahir,
              nomor_telepon: response.user.nomor_telepon,
              photo_profile: response.user.photo_profile,
            });
            handleShow();
          } else {
            console.error(
              "Fetched data is not an object or does not contain 'operator'."
            );
          }
        } catch (error) {
          console.error(error.msg, error);
        }
      };

      fetchOperatorById();
    }
  }, [operatorId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setOperatorId(null);
    setFormData({
      name: "",
      email: "",
      role: "",
      nik: "",
      tanggal_lahir: "",
      nomor_telepon: "",
      photo_profile: "",
    });
    setPhotoError("");
  };

  const handleDeletePhoto = () => {
    setFormData({
      ...formData,
      photo_profile: "", // Set ke string kosong jika tidak ada foto
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

    if (selectedFiles.length > 1) {
      setPhotoError("You can upload a maximum of 1 photo.");
    } else {
      // Ambil URL objek atau nama file
      const file = selectedFiles[0];
      const fileURL = file ? URL.createObjectURL(file) : "";

      setFormData({
        ...formData,
        photo_profile: fileURL, // Simpan URL objek atau nama file
      });
      setPhotoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "photo_profile" && formData[key]) {
        const fileInput = document.querySelector('input[name="photo_profile"]');
        if (fileInput && fileInput.files[0]) {
          dataToSubmit.append(key, fileInput.files[0]);
        }
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      if (isUpdate) {
        await operatorService.updateOperator(operatorId, dataToSubmit);
        setShowSuccessUpdate(true);
      } else {
        await operatorService.addOperator(dataToSubmit);
        setShowSuccessAdd(true);
      }

      const updatedResponse = await operatorService.getOperator();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.users)
      ) {
        setOperatorData(updatedResponse.users);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'users'."
        );
      }

      handleClose();
    } catch (error) {
      console.error(
        isUpdate
          ? "Error updating operator data:"
          : "Error posting operator data:",
        error
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await operatorService.deleteOperator(deleteOperatorId);
      setShowSuccessDelete(true);

      const updatedResponse = await operatorService.getOperator();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.users)
      ) {
        setOperatorData(updatedResponse.users);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'users'."
        );
      }

      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting operator:", error);
    }
  };

  const handleEdit = (users) => {
    setIsUpdate(true);
    setOperatorId(users.uuid);
  };

  const handleDelete = (uuid) => {
    setDeleteOperatorId(uuid);
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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={`${detailOperatorPath}/${row.uuid}`} // Adjust path as needed
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
      <h3 className="pt-10 text-3xl text-new-300">Operator</h3>
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
        title="Data Operator"
        columns={columns}
        data={operatorData}
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
            {isUpdate ? "Edit operator" : "Tambah operator"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih role...</option>
                <option value="Mission Manager">Mission Manager</option>
                <option value="Pilot">Pilot</option>
                <option value="GCS Operator">GCS Operator</option>
                <option value="Teknisi">Teknisi</option>
                <option value="Guest">Guest</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNIK" className="mt-3">
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan NIK"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTanggalLahir" className="mt-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTelpon" className="mt-3">
              <Form.Label>No. Telpon</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Masukkan no. telpon"
                name="nomor_telepon"
                value={formData.nomor_telepon}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFoto" className="mt-3">
              <Form.Label>Upload Foto operator</Form.Label>
              <Form.Control
                type="file"
                name="photo_profile"
                multiple
                onChange={handleFileChange}
                required
              />
              {photoError && (
                <div className="text-danger mt-2">{photoError}</div>
              )}
            </Form.Group>

            <div className="mt-3">
              {formData.photo_profile && (
                <div className="mt-4">
                  <img
                    src={formData.photo_profile} // Gunakan URL objek untuk menampilkan gambar
                    alt="Foto Profil"
                    className="img-fluid"
                    style={{ maxWidth: "350px", margin: "10px" }}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleDeletePhoto()}
                    className="ms-2"
                  >
                    Hapus
                  </Button>
                </div>
              )}
            </div>

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
                Apakah Anda yakin ingin menghapus data operator ini?
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
                  Data operator telah berhasil dihapus.
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
                  Data operator telah berhasil ditambahkan.
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
                  Data operator telah berhasil diperbarui.
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

export default Operator;
