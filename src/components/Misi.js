import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailMisiPath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Select from "react-select";
import wahanaService from "../services/wahana.service";
import misiService from "../services/misi.service";
import ReactDOM from "react-dom";
import komponenService from "../services/komponen.service";
import operatorService from "../services/operator.service";

const Misi = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    judul_misi: "",
    deskripsi_misi: "",
    kategori: "",
    telemetry: "",
    remote: "",
    video_sender: "",
    wahanaUuids: [],
    komponenUuids: [],
    userUuids: [],
  });

  const [misiData, setMisiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [misiId, setMisiId] = useState(null);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [deleteMisiId, setDeleteMisiId] = useState(null);
  const [wahanaOptions, setWahanaOptions] = useState([]);
  const [komponenOptions, setKomponenOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsUpdate(false);
    setMisiId(null);
    setFormData({
      judul_misi: "",
      deskripsi_misi: "",
      kategori: "",
      telemetry: "",
      remote: "",
      video_sender: "",
      wahanaUuids: [],
      komponenUuids: [],
      userUuids: [],
    });
  };

  useEffect(() => {
    const fetchWahanaData = async () => {
      try {
        const response = await wahanaService.getWahana();
        if (response && Array.isArray(response.wahana)) {
          const options = response.wahana.map((wahana) => ({
            value: wahana.uuid,
            label: (
              <div>
                <div>{wahana.nama_wahana}</div>
                <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>
                  {wahana.tipe}
                </div>
              </div>
            ),
            nama_wahana: wahana.nama_wahana.toLowerCase(),
            tipe: wahana.tipe.toLowerCase(),
          }));
          setWahanaOptions(options);
        }
      } catch (error) {
        console.error("Error fetching wahana data:", error);
      }
    };

    fetchWahanaData();
  }, []);

  const customFilterOptionWahana = (option, searchText) => {
    const searchTerm = searchText.toLowerCase();
    return (
      option.data.nama_wahana.includes(searchTerm) ||
      option.data.tipe.includes(searchTerm)
    );
  };

  const handleWahanaSelectChange = (selectedOptions, name) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : []; // Ambil nilai dari objek yang dipilih
    setFormData({
      ...formData,
      wahanaUuids: selectedValues, // Simpan ID wahana yang dipilih
    });
  };

  useEffect(() => {
    const fetchKomponenData = async () => {
      try {
        const response = await komponenService.getKomponen();
        if (response && Array.isArray(response.komponen)) {
          const options = response.komponen.map((komponen) => ({
            value: komponen.uuid,
            label: (
              <div>
                <div>{komponen.nama_komponen}</div>
                <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>
                  {komponen.kategori}
                </div>
              </div>
            ),
            nama_komponen: komponen.nama_komponen.toLowerCase(),
            kategori: komponen.kategori.toLowerCase(),
          }));
          setKomponenOptions(options);
        }
      } catch (error) {
        console.error("Error fetching komponen data:", error);
      }
    };

    fetchKomponenData();
  }, []);

  const customFilterOptionKomponen = (option, searchText) => {
    const searchTerm = searchText.toLowerCase();
    return (
      option.data.nama_komponen.includes(searchTerm) ||
      option.data.kategori.includes(searchTerm)
    );
  };

  const handleKomponenSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      komponenUuids: selectedValues,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await operatorService.getOperatorPilotAndGCS();
        if (response && Array.isArray(response.users)) {
          const options = response.users.map((user) => ({
            value: user.uuid,
            label: (
              <div>
                <div>{user.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>
                  {user.role}
                </div>
              </div>
            ),
            name: user.name.toLowerCase(),
            role: user.role.toLowerCase(),
          }));
          setUserOptions(options);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const customFilterOptionUser = (option, searchText) => {
    const searchTerm = searchText.toLowerCase();
    return (
      option.data.name.includes(searchTerm) ||
      option.data.role.includes(searchTerm)
    );
  };

  const handleUserSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      userUuids: selectedValues,
    });
  };

  useEffect(() => {
    const fetchMisi = async () => {
      try {
        const response = await misiService.getMisi();
        console.log(response?.msg, response);

        if (
          typeof response === "object" &&
          response !== null &&
          Array.isArray(response.missions)
        ) {
          setMisiData(response.missions);
          console.log("Data successfully");
        } else {
          console.error(
            "Fetched data is not an object or does not contain an array 'Misi'."
          );
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    fetchMisi();
  }, []);

  useEffect(() => {
    const searchMisiData = async () => {
      try {
        if (searchQuery) {
          const response = await misiService.searchMisi({
            query: searchQuery,
          });
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.missions)
          ) {
            setMisiData(response.missions);
          } else {
            console.error("Invalid search response format");
          }
        } else {
          const response = await misiService.getMisi();
          if (
            typeof response === "object" &&
            response !== null &&
            Array.isArray(response.missions)
          ) {
            setMisiData(response.missions);
          } else {
            console.error("Invalid response format");
          }
        }
      } catch (error) {
        console.error(error.msg, error);
      }
    };

    searchMisiData();
  }, [searchQuery]);

  useEffect(() => {
    if (misiId) {
      const fetchMisiById = async () => {
        try {
          const response = await misiService.getMisiById(misiId);
          if (
            typeof response === "object" &&
            response !== null &&
            response.mission
          ) {
            setFormData({
              judul_misi: response.mission.judul_misi,
              deskripsi_misi: response.mission.deskripsi_misi,
              kategori: response.mission.kategori,
              telemetry: response.mission.telemetry,
              remote: response.mission.remote,
              video_sender: response.mission.video_sender,
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

      fetchMisiById();
    }
  }, [misiId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creatorUuid = localStorage.getItem("userUUID");
    if (!creatorUuid) {
      console.error("creatorUuid tidak ditemukan di localStorage");
      return;
    }

    // Buat objek data yang akan dikirim
    const dataToSubmit = {
      ...formData,
      creatorUuid,
    };

    try {
      if (isUpdate) {
        const response = await misiService.updateMisi(misiId, dataToSubmit);
        console.log(response.msg, response);
        setShowSuccessUpdate(true);
      } else {
        const response = await misiService.addMisi(dataToSubmit);
        console.log(response.msg, response);
        setShowSuccessAdd(true);
      }

      const updatedResponse = await misiService.getMisi();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.missions)
      ) {
        setMisiData(updatedResponse.missions);
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
      await misiService.deleteMisi(deleteMisiId);
      setShowSuccessDelete(true);

      const updatedResponse = await misiService.getMisi();
      if (
        typeof updatedResponse === "object" &&
        updatedResponse !== null &&
        Array.isArray(updatedResponse.missions)
      ) {
        setMisiData(updatedResponse.missions);
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

  const handleEdit = (mission) => {
    setIsUpdate(true);
    setMisiId(mission.uuid);
  };

  const handleDelete = (uuid) => {
    setDeleteMisiId(uuid);
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
      name: "Judul",
      selector: (row) => row.judul_misi,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "Tanggal Misi",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={`${detailMisiPath}/${row.uuid}`}
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
      <h3 className="pt-10 text-3xl text-new-300">Misi</h3>

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
        title="Data Misi"
        columns={columns}
        data={misiData}
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

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tambah Misi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="informasi" id="mission-tabs">
              <Tab eventKey="informasi" title="Informasi">
                <Form.Group controlId="formJudul">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan judul"
                    name="judul_misi"
                    value={formData.judul_misi}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDeskripsi">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Masukkan deskripsi"
                    name="deskripsi_misi"
                    value={formData.deskripsi_misi}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formKategori">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    as="select"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih kategori...</option>
                    <option value="Pemetaan">Pemetaan</option>
                    <option value="Pemantauan">Pemantauan</option>
                    <option value="Pengiriman">Pengiriman</option>
                    <option value="Kompetisi">Kompetisi</option>
                  </Form.Control>
                </Form.Group>
              </Tab>

              <Tab eventKey="operator" title="Operator">
                <Form.Group controlId="formOperator">
                  <Form.Label>Pilih Operator</Form.Label>
                  <Select
                    isMulti
                    name="userUuids"
                    options={userOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleUserSelectChange}
                    filterOption={customFilterOptionUser}
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="radio" title="Radio">
                <Form.Group controlId="formTelemetry">
                  <Form.Label>Telemetry</Form.Label>
                  <Form.Control
                    as="select"
                    name="telemetry"
                    value={formData.telemetry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih telemetry...</option>
                    <option value="net1">Net ID 1</option>
                    <option value="net2">Net ID 2</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formRemoteControl">
                  <Form.Label>Remote Control</Form.Label>
                  <Form.Control
                    as="select"
                    name="remote"
                    value={formData.remote}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih remote control...</option>
                    <option value="2.4ghz">2.4 GHz</option>
                    <option value="5.8ghz">5.8 GHz</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formVideoSender">
                  <Form.Label>Video Sender</Form.Label>
                  <Form.Control
                    as="select"
                    name="video_sender"
                    value={formData.video_sender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih video sender...</option>
                    <option value="2.4ghz">2.4 GHz</option>
                    <option value="5.8ghz">5.8 GHz</option>
                  </Form.Control>
                </Form.Group>
              </Tab>

              <Tab eventKey="wahana" title="Wahana">
                <Form.Group controlId="formWahana">
                  <Form.Label>Pilih Wahana</Form.Label>
                  <Select
                    isMulti
                    name="wahanaUuids"
                    options={wahanaOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleWahanaSelectChange}
                    filterOption={customFilterOptionWahana}
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="komponen" title="Komponen">
                <Form.Group controlId="formKomponen">
                  <Form.Label>Pilih Komponen</Form.Label>
                  <Select
                    isMulti
                    name="komponenUuids"
                    options={komponenOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleKomponenSelectChange}
                    filterOption={customFilterOptionKomponen}
                  />
                </Form.Group>
              </Tab>
            </Tabs>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {ReactDOM.createPortal(
        showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-4">
                Apakah Anda yakin ingin menghapus data Misi ini?
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
};

export default Misi;
