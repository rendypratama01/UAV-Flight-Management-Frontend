import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { detailKomponenPath } from '../routes';
import komponenService from "../services/komponen.service";

function Komponen() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    idkomponen: '',
    harga: '',
    toko: '',
    operasional: '',
    tanggalBeli: '',
    foto: null
  });
  const [komponenData, setKomponenData] = useState([]);

  useEffect(() => {
    const fetchKomponen = async () => {
      try {
        const response = await komponenService.getKomponen();
        console.log("Fetched Komponen Response:", response);

        // Cek jika respons adalah objek dan memiliki properti 'Komponen'
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
        console.error("Error fetching wahana data:", error);
      }
    };

    fetchKomponen();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData instance
    const dataToSubmit = new FormData();

    // Append form data fields
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => dataToSubmit.append(key, file));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await komponenService.addKomponen(dataToSubmit);
      console.log("Komponen data successfully posted:", response);
      handleClose(); // Close the modal
      // Optionally, show a success message or update the data table
    } catch (error) {
      console.error("Error posting komponen data:", error);
      // Optionally, show an error message to the user
    }
  };

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama_komponen,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi_komponen,
      sortable: true,
    },
    {
      name: "ID Komponen",
      selector: (row) => row.idkomponen,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a href={detailKomponenPath} className="no-underline hover:no-underline text-inherit">
              <TbListDetails className="text-2xl"/>
            </a>
          </button>
          <button className="text-blue-900"><FaEdit className="text-2xl"/></button>
          <button className="text-red-600"><MdDelete className="text-2xl"/></button>
        </div>
      ),
    },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Komponen</h3>
      <DataTable
        title="Data Komponen"
        columns={columns}
        data={komponenData}
        fixedHeader 
        fixedHeaderScrollHeight="530px"
        pagination
        highlightOnHover
        actions={
          <Button
            style={{ backgroundColor: '#5A6ACF', color: '#ffffff' }}
            className="d-flex align-items-center"
            onClick={handleShow}
          >
            Tambah <FaPlus className="text-sm"/>
          </Button>
        }
      />
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Komponen</Modal.Title>
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
              />
            </Form.Group>

            <Form.Group controlId="formIdKomponen" className="mt-3">
              <Form.Label>ID Komponen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID Komponen"
                name="idkomponen"
                value={formData.idkomponen}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formHarga" className="mt-3">
              <Form.Label>Harga (Rp)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Harga Komponen"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formToko" className="mt-3">
              <Form.Label>Toko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Toko Komponen"
                name="toko"
                value={formData.toko}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formOperasional" className="mt-3">
              <Form.Label>Operasional (Rp)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Operasional Komponen"
                name="operasional"
                value={formData.operasional}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTanggalBeli" className="mt-3">
              <Form.Label>Tanggal Beli</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Tanggal Beli Komponen"
                name="tanggalBeli"
                value={formData.tanggalBeli}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formFoto" className="mt-3">
              <Form.Label>Upload Foto</Form.Label>
              <Form.Control
                type="file"
                name="foto"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Komponen;
