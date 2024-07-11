import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailWahanaPath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Wahana() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    operasional: "",
    status: true,
    fotoDepan: null,
    fotoBelakang: null,
    fotoKanan: null,
    fotoKiri: null,
    fotoAtas: null,
    fotoBawah: null,
    type: "",
    wingspan: "",
    length: "",
    material: "",
    propulsi: "",
    baterai: "",
    payload: "",
    durasi: "",
    cakupan: "",
    ketinggian: "",
    kapasitas: "",
    rotor: "",
  });
  const [selectedType, setSelectedType] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({
      ...formData,
      type: newType,
    });
    setSelectedType(newType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Handle form submission logic here, e.g., send data to backend
    handleClose();
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
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Jam Terbang",
      selector: (row) => row.jam_terbang,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (row.status ? "Aktif" : "Mati"),
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={detailWahanaPath}
              className="no-underline hover:no-underline text-inherit"
            >
              <TbListDetails className="text-2xl" />
            </a>
          </button>
          <button className="text-blue-900">
            <FaEdit className="text-2xl" />
          </button>
          <button className="text-red-600">
            <MdDelete className="text-2xl" />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      nama: "Phantom 4 Pro",
      deskripsi: "Lorem ipsum dolor sit amet",
      operasional: "120 jam",
      status: true,
    },
    {
      id: 2,
      nama: "Mavic Air 2",
      deskripsi: "Consectetur adipiscing elit",
      operasional: "80 jam",
      status: true,
    },
    {
      id: 3,
      nama: "Spark",
      deskripsi: "Sed do eiusmod tempor incididunt",
      operasional: "50 jam",
      status: false,
    },
    {
      id: 4,
      nama: "Inspire 2",
      deskripsi: "Ut labore et dolore magna aliqua",
      operasional: "200 jam",
      status: true,
    },
    {
      id: 5,
      nama: "Phantom 3 Standard",
      deskripsi: "Ut enim ad minim veniam",
      operasional: "150 jam",
      status: true,
    },
    {
      id: 6,
      nama: "Mavic Mini",
      deskripsi: "Quis nostrud exercitation ullamco",
      operasional: "30 jam",
      status: false,
    },
    {
      id: 7,
      nama: "Phantom 4 Advanced",
      deskripsi: "Laboris nisi ut aliquip ex ea commodo consequat",
      operasional: "180 jam",
      status: true,
    },
    {
      id: 8,
      nama: "Mavic 2 Pro",
      deskripsi: "Duis aute irure dolor in reprehenderit",
      operasional: "100 jam",
      status: true,
    },
    {
      id: 9,
      nama: "Phantom 4",
      deskripsi: "Excepteur sint occaecat cupidatat non proident",
      operasional: "160 jam",
      status: false,
    },
    {
      id: 10,
      nama: "Mavic Air",
      deskripsi:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum",
      operasional: "90 jam",
      status: true,
    },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Wahana</h3>
      <DataTable
        title="Data Wahana"
        columns={columns}
        data={data}
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
          <Modal.Title>Tambah Wahana</Modal.Title>
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

                <Form.Group controlId="formOperasional" className="mt-3">
                  <Form.Label>Operasional</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan jam operasional"
                    name="operasional"
                    value={formData.operasional}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formStatus" className="mt-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value={true}>Aktif</option>
                    <option value={false}>Mati</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formType" className="mt-3">
                  <Form.Label>Tipe</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={formData.type}
                    onChange={handleTypeChange}
                  >
                    <option value="">Pilih tipe...</option>
                    <option value="fixed">Fixed Wing</option>
                    <option value="multirotor">Multirotor</option>
                    <option value="vtol">Vtol Plane</option>
                  </Form.Control>
                </Form.Group>
              </Tab>

              <Tab eventKey="spesifikasi" title="Spesifikasi">
                {selectedType === "fixed" && (
                  <>
                    <Form.Group controlId="formWingspan" className="mt-3">
                      <Form.Label>Wingspan (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan wingspan"
                        name="wingspan"
                        value={formData.wingspan}
                        onChange={handleInputChange}
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
                      />
                    </Form.Group>
                  </>
                )}

                {selectedType === "multirotor" && (
                  <>
                    <Form.Group controlId="formRotor" className="mt-3">
                      <Form.Label>Rotor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan jumlah rotor"
                        name="rotor"
                        value={formData.rotor}
                        onChange={handleInputChange}
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
                      />
                    </Form.Group>
                  </>
                )}

                {selectedType === "vtol" && (
                  <>
                    <Form.Group controlId="formWingspan" className="mt-3">
                      <Form.Label>Wingspan (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan wingspan"
                        name="wingspan"
                        value={formData.wingspan}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formRotor" className="mt-3">
                      <Form.Label>Rotor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan jumlah rotor"
                        name="rotor"
                        value={formData.rotor}
                        onChange={handleInputChange}
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
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="foto" title="Foto">
                <Form.Group controlId="formFotoDepan" className="mt-3">
                  <Form.Label>Upload Foto Depan</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoDepan"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-3">
                  {formData.fotoDepan && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoDepan)}
                        alt="Foto Depan"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <Form.Group controlId="formFotoBelakang" className="mt-3">
                  <Form.Label>Upload Foto Belakang</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoBelakang"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-4">
                  {formData.fotoBelakang && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoBelakang)}
                        alt="Foto Belakang"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <Form.Group controlId="formFotoKanan" className="mt-3">
                  <Form.Label>Upload Foto Kanan</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoKanan"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-4">
                  {formData.fotoKanan && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoKanan)}
                        alt="Foto Kanan"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <Form.Group controlId="formFotoKiri" className="mt-3">
                  <Form.Label>Upload Foto Kiri</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoKiri"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-4">
                  {formData.fotoKiri && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoKiri)}
                        alt="Foto Kiri"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <Form.Group controlId="formFotoAtas" className="mt-3">
                  <Form.Label>Upload Foto Atas</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoAtas"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-4">
                  {formData.fotoAtas && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoAtas)}
                        alt="Foto Atas"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
                    </div>
                  )}
                </div>

                <Form.Group controlId="formFotoBawah" className="mt-3">
                  <Form.Label>Upload Foto Bawah</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoBawah"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-4">
                  {formData.fotoBawah && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.fotoBawah)}
                        alt="Foto Bawah"
                        className="img-fluid"
                        style={{ maxWidth: "200px", margin: "10px" }}
                      />
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
    </div>
  );
}

export default Wahana;
