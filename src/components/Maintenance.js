import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailMaintenancePath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Maintenance() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    kategori: "",
    tanggal: "",
    namaTeknisi: "",
    biaya: "",
    fotoSebelum: [],
    fotoSesudah: [],
  });

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
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], ...fileArray],
    }));
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
      name: "Judul",
      selector: (row) => row.judul,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "Tanggal Perbaikan",
      selector: (row) => row.tanggal,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={detailMaintenancePath}
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
      judul: "Perbaikan Struktur Rangka UAV",
      deskripsi: "Lorem ipsum dolor sit amet",
      kategori: "Airframe",
      tanggal: "10 Januari 2023",
    },
    {
      id: 2,
      judul: "Upgrade Sistem Navigasi UAV",
      deskripsi: "Consectetur adipiscing elit",
      kategori: "Elektronik",
      tanggal: "15 Februari 2023",
    },
    {
      id: 3,
      judul: "Penggantian Baterai UAV",
      deskripsi: "Sed do eiusmod tempor incididunt",
      kategori: "Elektronik",
      tanggal: "20 Maret 2023",
    },
    {
      id: 4,
      judul: "Pemeliharaan Rutin Struktur UAV",
      deskripsi: "Ut labore et dolore magna aliqua",
      kategori: "Airframe",
      tanggal: "5 April 2023",
    },
    {
      id: 5,
      judul: "Optimisasi Sistem Kamera UAV",
      deskripsi: "Ut enim ad minim veniam",
      kategori: "Elektronik",
      tanggal: "12 Mei 2023",
    },
    {
      id: 6,
      judul: "Perbaikan Sayap UAV",
      deskripsi: "Quis nostrud exercitation ullamco",
      kategori: "Airframe",
      tanggal: "25 Juni 2023",
    },
    {
      id: 7,
      judul: "Upgrade Sistem Pengendalian UAV",
      deskripsi: "Laboris nisi ut aliquip ex ea commodo consequat",
      kategori: "Elektronik",
      tanggal: "10 Juli 2023",
    },
    {
      id: 8,
      judul: "Perbaikan Motor UAV",
      deskripsi: "Duis aute irure dolor in reprehenderit",
      kategori: "Airframe",
      tanggal: "18 Agustus 2023",
    },
    {
      id: 9,
      judul: "Optimisasi Sistem Transmisi Data UAV",
      deskripsi: "Excepteur sint occaecat cupidatat non proident",
      kategori: "Elektronik",
      tanggal: "5 September 2023",
    },
    {
      id: 10,
      judul: "Penggantian Propeler UAV",
      deskripsi:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum",
      kategori: "Airframe",
      tanggal: "20 Oktober 2023",
    },
    {
      id: 11,
      judul: "Perbaikan Sistem Pendaratan UAV",
      deskripsi: "Lorem ipsum dolor sit amet",
      kategori: "Airframe",
      tanggal: "15 November 2023",
    },
    {
      id: 12,
      judul: "Upgrade Sistem Komunikasi UAV",
      deskripsi: "Consectetur adipiscing elit",
      kategori: "Elektronik",
      tanggal: "10 Desember 2023",
    },
    {
      id: 13,
      judul: "Pemeliharaan Komputer Pengendali UAV",
      deskripsi: "Sed do eiusmod tempor incididunt",
      kategori: "Elektronik",
      tanggal: "5 Januari 2024",
    },
    {
      id: 14,
      judul: "Perbaikan Struktur Landasan Terbang UAV",
      deskripsi: "Ut labore et dolore magna aliqua",
      kategori: "Airframe",
      tanggal: "12 Februari 2024",
    },
    {
      id: 15,
      judul: "Optimisasi Sistem Energi UAV",
      deskripsi: "Ut enim ad minim veniam",
      kategori: "Elektronik",
      tanggal: "20 Maret 2024",
    },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Perbaikan</h3>
      <DataTable
        title="Data Perbaikan"
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
          <Modal.Title>Tambah Perbaikan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="informasi" id="perbaikan-tabs">
              <Tab eventKey="informasi" title="Informasi">
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
                    <option value="airframe">Airframe</option>
                    <option value="elektronik">Elektronik</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTanggal" className="mt-3">
                  <Form.Label>Tanggal Perbaikan</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formNamaTeknisi" className="mt-3">
                  <Form.Label>Nama Teknisi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama teknisi"
                    name="namaTeknisi"
                    value={formData.namaTeknisi}
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
                <Form.Group controlId="formFotoSebelum" className="mt-3">
                  <Form.Label>Upload Foto Sebelum Perbaikan</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoSebelum"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-3">
                  {formData.fotoSebelum.length > 0 &&
                    formData.fotoSebelum.map((foto, index) => (
                      <img
                        key={index}
                        src={foto}
                        alt={`Sebelum ${index + 1}`}
                        className="img-thumbnail mr-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
                </div>

                <Form.Group controlId="formFotoSesudah" className="mt-3">
                  <Form.Label>Upload Foto Sesudah Perbaikan</Form.Label>
                  <Form.Control
                    type="file"
                    name="fotoSesudah"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-3">
                  {formData.fotoSesudah.length > 0 &&
                    formData.fotoSesudah.map((foto, index) => (
                      <img
                        key={index}
                        src={foto}
                        alt={`Sesudah ${index + 1}`}
                        className="img-thumbnail mr-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
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

export default Maintenance;

