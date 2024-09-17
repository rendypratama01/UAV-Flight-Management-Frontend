import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import wahanaService from "../services/wahana.service";
import { detailWahanaPath } from "../routes";
import ReactDOM from "react-dom";

function Wahana() {
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    tipe: "",
    wingspan: "",
    jumlah_rotor: "",
    length: "",
    material: "",
    propulsi: "",
    baterai: "",
    payload: "",
    durasi: "",
    cakupan: "",
    ketinggian: "",
    kapasitas: "",
    photos: [],
    status: false,
  });
  const [selectedType, setSelectedType] = useState("");
  const [wahanaData, setWahanaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [WahanaId, setWahanaId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [deleteWahanaId, setDeleteWahanaId] = useState(null);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

  useEffect(() => {
    const fetchWahana = async () => {
      try {
        const response = await wahanaService.getWahana();
        console.log(response?.msg, response);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.wahana)
        ) {
          setWahanaData(response.wahana);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'wahana'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchWahana();
  }, []);

  useEffect(() => {
    const searchWahanaData = async () => {
      try {
        if (searchQuery) {
          const response = await wahanaService.searchWahana({
            query: searchQuery,
          });
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.wahana)
          ) {
            setWahanaData(response.wahana);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await wahanaService.getWahana();
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.wahana)
          ) {
            setWahanaData(response.wahana);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    searchWahanaData();
  }, [searchQuery]);

  useEffect(() => {
    if (WahanaId) {
      const fetchWahanaById = async () => {
        try {
          const response = await wahanaService.getWahanaById(WahanaId);
          if (
            typeof response === "object" &&
            response !== null &&
            response.wahana
          ) {
            setFormData({
              nama: response.wahana.nama_wahana,
              deskripsi: response.wahana.deskripsi_wahana,
              tipe: response.wahana.tipe,
              wingspan: response.wahana.wingspan,
              jumlah_rotor: response.wahana.jumlah_rotor,
              length: response.wahana.length,
              material: response.wahana.material,
              propulsi: response.wahana.propulsi,
              baterai: response.wahana.baterai,
              payload: response.wahana.payload,
              durasi: response.wahana.durasi,
              cakupan: response.wahana.cakupan,
              ketinggian: response.wahana.ketinggian,
              kapasitas: response.wahana.kapasitas,
              photos:
                response.wahana.foto_wahanas.map((photo) => photo.foto_urls) ||
                [],
              status: response.wahana.status || false,
            });
            setSelectedType(response.wahana.tipe);
            handleShow();
          } else {
            console.error(
              "Fetched data is not an object or does not contain 'wahana'."
            );
          }
        } catch (error) {
          console.error(error.msg, error);
        }
      };

      fetchWahanaById();
    }
  }, [WahanaId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setWahanaId(null);
    setFormData({
      nama: "",
      deskripsi: "",
      tipe: "",
      wingspan: "",
      jumlah_rotor: "",
      length: "",
      material: "",
      propulsi: "",
      baterai: "",
      payload: "",
      durasi: "",
      cakupan: "",
      ketinggian: "",
      kapasitas: "",
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

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({
      ...formData,
      tipe: newType,
    });
    setSelectedType(newType);
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
        const response = await wahanaService.updateWahana(
          WahanaId,
          dataToSubmit
        );
        console.log(response.msg, response);

        // Display success update modal
        setShowSuccessUpdate(true);
      } else {
        const response = await wahanaService.addWahana(dataToSubmit);
        console.log(response.msg, response);

        // Display success add modal
        setShowSuccessAdd(true);
      }

      const updatedResponse = await wahanaService.getWahana();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.wahana)
      ) {
        setWahanaData(updatedResponse.wahana);
        console.log("Data successfully updated");
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'wahana'."
        );
      }

      handleClose();
    } catch (error) {
      console.error(
        isUpdate ? "Error updating wahana data:" : "Error posting wahana data:",
        error
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await wahanaService.deleteWahana(deleteWahanaId);
      setShowSuccessDelete(true);

      const updatedResponse = await wahanaService.getWahana();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.wahana)
      ) {
        setWahanaData(updatedResponse.wahana);
      } else {
        console.error(
          "Fetched data is not an object or does not contain an array 'wahana'."
        );
      }

      setShowConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting operator:", error);
    }
  };

  const handleEdit = (wahana) => {
    setIsUpdate(true);
    setWahanaId(wahana.uuid);
  };

  const handleDelete = (uuid) => {
    setDeleteWahanaId(uuid);
    setShowConfirmDelete(true);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#EAEAEA",
      },
    },
  };

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama_wahana,
      sortable: true,
    },
    {
      name: "Tipe",
      selector: (row) => row.tipe,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (row.status ? "Aktif" : "Nonaktif"),
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={`${detailWahanaPath}/${row.uuid}`}
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
      <h3 className="pt-10 text-3xl text-new-300">Wahana</h3>

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
        title="Data Wahana"
        columns={columns}
        data={wahanaData} // Use filtered data
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
            {isUpdate ? "Edit Wahana" : "Tambah Wahana"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="informasi" id="wahana-tabs">
              <Tab eventKey="informasi" title="Informasi">
                <Form.Group controlId="formNama">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama"
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
                    placeholder="Masukkan deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formType" className="mt-3">
                  <Form.Label>Tipe</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipe"
                    value={formData.tipe}
                    onChange={handleTypeChange}
                    required
                  >
                    <option value="">Pilih tipe...</option>
                    <option value="Fixed Wing">Fixed Wing</option>
                    <option value="Multirotor">Multirotor</option>
                    <option value="VTOL">Vtol Plane</option>
                  </Form.Control>
                </Form.Group>

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
              </Tab>

              <Tab eventKey="spesifikasi" title="Spesifikasi">
                {selectedType === "Fixed Wing" && (
                  <>
                    <Form.Group controlId="formWingspan" className="mt-3">
                      <Form.Label>Wingspan (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan wingspan"
                        name="wingspan"
                        value={formData.wingspan}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formLength" className="mt-3">
                      <Form.Label>Length (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan length"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </>
                )}

                {selectedType === "Multirotor" && (
                  <>
                    <Form.Group controlId="formRotor" className="mt-3">
                      <Form.Label>Rotor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan jumlah rotor"
                        name="jumlah_rotor"
                        value={formData.jumlah_rotor}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formLength" className="mt-3">
                      <Form.Label>Length (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan length"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </>
                )}

                {selectedType === "VTOL" && (
                  <>
                    <Form.Group controlId="formWingspan" className="mt-3">
                      <Form.Label>Wingspan (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan wingspan"
                        name="wingspan"
                        value={formData.wingspan}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRotor" className="mt-3">
                      <Form.Label>Rotor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan jumlah rotor"
                        name="jumlah_rotor"
                        value={formData.jumlah_rotor}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formLength" className="mt-3">
                      <Form.Label>Length (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan length"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </>
                )}

                <Form.Group controlId="formMaterial" className="mt-3">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPropulsi" className="mt-3">
                  <Form.Label>Propulsi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan propulsi"
                    name="propulsi"
                    value={formData.propulsi}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBaterai" className="mt-3">
                  <Form.Label>Baterai</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan baterai"
                    name="baterai"
                    value={formData.baterai}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPayload" className="mt-3">
                  <Form.Label>Payload</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan payload"
                    name="payload"
                    value={formData.payload}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDurasi" className="mt-3">
                  <Form.Label>Durasi (menit)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan durasi"
                    name="durasi"
                    value={formData.durasi}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCakupan" className="mt-3">
                  <Form.Label>Cakupan (ha)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan cakupan"
                    name="cakupan"
                    value={formData.cakupan}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formKetinggian" className="mt-3">
                  <Form.Label>Ketinggian (m)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan ketinggian"
                    name="ketinggian"
                    value={formData.ketinggian}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formKapasitas" className="mt-3">
                  <Form.Label>Kapasitas (gr)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan kapasitas"
                    name="kapasitas"
                    value={formData.kapasitas}
                    onChange={handleInputChange}
                    required
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
                      {formData.photos.map((photoUrl, index) => (
                        <div
                          key={index}
                          className="mt-4 d-flex align-items-center"
                        >
                          <img
                            key={index}
                            src={photoUrl}
                            alt={`Wahana Foto ${index + 1}`}
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
                Apakah Anda yakin ingin menghapus data wahana ini?
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
                  Data wahana telah berhasil dihapus.
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
                  Data wahana telah berhasil ditambahkan.
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
                  Data wahana telah berhasil diperbarui.
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

export default Wahana;
