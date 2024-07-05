// import React from 'react'
// import DataTable from "react-data-table-component";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { TbListDetails } from "react-icons/tb";
// import { FaPlus } from "react-icons/fa";
// import Button from 'react-bootstrap/Button';
// import { detailWahanaPath } from '../routes';

// function Wahana() {
//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: "#EAEAEA", // Change to your desired color
//       },
//     },
//   };

//     const columns = [
//         {
//           name: "Nama",
//           selector: (row) => row.nama,
//           sortable: true,
//         },
//         {
//           name: "Deskripsi",
//           selector: (row) => row.deskripsi,
//           sortable: true,
//         },
//         {
//           name: "Jam Terbang",
//           selector: (row) => row.jam_terbang,
//           sortable: true,
//         },
//         {
//             name: "Status",
//             cell: row => (
//               row.status ? "Aktif" : "Mati"
//             ),
//             sortable: true,
//           },
//         {
//           name: "",
//           cell: (row) =>(
//             <div className="flex gap-3">
//             <button className="text-gray-700"> <a href={detailWahanaPath} className="no-underline hover:no-underline text-inherit"><TbListDetails className="text-2xl"/></a></button>
//             <button className="text-blue-900"><FaEdit className="text-2xl"/></button>
//             <button className="text-red-600"><MdDelete className="text-2xl"/></button>
//             </div>
//           ),
//         },
//       ];

//       const data = [
// {
//     "id": 1,
//     "nama": "Phantom 4 Pro",
//     "deskripsi": "Lorem ipsum dolor sit amet",
//     "jam_terbang": "120 jam",
//     "status": true
//   },
//   {
//     "id": 2,
//     "nama": "Mavic Air 2",
//     "deskripsi": "Consectetur adipiscing elit",
//     "jam_terbang": "80 jam",
//     "status": true
//   },
//   {
//     "id": 3,
//     "nama": "Spark",
//     "deskripsi": "Sed do eiusmod tempor incididunt",
//     "jam_terbang": "50 jam",
//     "status": false
//   },
//   {
//     "id": 4,
//     "nama": "Inspire 2",
//     "deskripsi": "Ut labore et dolore magna aliqua",
//     "jam_terbang": "200 jam",
//     "status": true
//   },
//   {
//     "id": 5,
//     "nama": "Phantom 3 Standard",
//     "deskripsi": "Ut enim ad minim veniam",
//     "jam_terbang": "150 jam",
//     "status": true
//   },
//   {
//     "id": 6,
//     "nama": "Mavic Mini",
//     "deskripsi": "Quis nostrud exercitation ullamco",
//     "jam_terbang": "30 jam",
//     "status": false
//   },
//   {
//     "id": 7,
//     "nama": "Phantom 4 Advanced",
//     "deskripsi": "Laboris nisi ut aliquip ex ea commodo consequat",
//     "jam_terbang": "180 jam",
//     "status": true
//   },
//   {
//     "id": 8,
//     "nama": "Mavic 2 Pro",
//     "deskripsi": "Duis aute irure dolor in reprehenderit",
//     "jam_terbang": "100 jam",
//     "status": true
//   },
//   {
//     "id": 9,
//     "nama": "Phantom 4",
//     "deskripsi": "Excepteur sint occaecat cupidatat non proident",
//     "jam_terbang": "160 jam",
//     "status": false
//   },
//   {
//     "id": 10,
//     "nama": "Mavic Air",
//     "deskripsi": "Sunt in culpa qui officia deserunt mollit anim id est laborum",
//     "jam_terbang": "90 jam",
//     "status": true
//   }

//       ];

//       const handleChange = ({ selectedRows }) => {
//         console.log("Selected Rows: ", selectedRows);
//       };
//   return (
//     <div className="ml-cl7">
//       <h3 className="pt-10 text-3xl text-new-300">Wahana</h3>
//       <DataTable
//         title="Data Wahana"
//         columns={columns}
//         data={data}
//         fixedHeader
//         fixedHeaderScrollHeight="530px"
//         pagination
//         highlightOnHover
//         onSelectedRowsChange={handleChange}
//         actions={<Button style={{ backgroundColor: '#5A6ACF', color: '#ffffff' }} className="d-flex align-items-center"> Tambah <FaPlus className="text-sm"/> </Button> }
//         customStyles={customStyles}
//       />
//     </div>
//   )
// }

// export default Wahana

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
    jam_terbang: "",
    status: true,
    foto: null,
    type: "",
    wingspan: "",
    length: "",
    material: "",
    propulsi: "",
    baterai: "",
    payload: "",
    telemetry: "",
    durasi: "",
    cakupan: "",
    ketinggian: "",
    kapasitas: "",
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
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file,
    });
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
      jam_terbang: "120 jam",
      status: true,
    },
    {
      id: 2,
      nama: "Mavic Air 2",
      deskripsi: "Consectetur adipiscing elit",
      jam_terbang: "80 jam",
      status: true,
    },
    {
      id: 3,
      nama: "Spark",
      deskripsi: "Sed do eiusmod tempor incididunt",
      jam_terbang: "50 jam",
      status: false,
    },
    {
      id: 4,
      nama: "Inspire 2",
      deskripsi: "Ut labore et dolore magna aliqua",
      jam_terbang: "200 jam",
      status: true,
    },
    {
      id: 5,
      nama: "Phantom 3 Standard",
      deskripsi: "Ut enim ad minim veniam",
      jam_terbang: "150 jam",
      status: true,
    },
    {
      id: 6,
      nama: "Mavic Mini",
      deskripsi: "Quis nostrud exercitation ullamco",
      jam_terbang: "30 jam",
      status: false,
    },
    {
      id: 7,
      nama: "Phantom 4 Advanced",
      deskripsi: "Laboris nisi ut aliquip ex ea commodo consequat",
      jam_terbang: "180 jam",
      status: true,
    },
    {
      id: 8,
      nama: "Mavic 2 Pro",
      deskripsi: "Duis aute irure dolor in reprehenderit",
      jam_terbang: "100 jam",
      status: true,
    },
    {
      id: 9,
      nama: "Phantom 4",
      deskripsi: "Excepteur sint occaecat cupidatat non proident",
      jam_terbang: "160 jam",
      status: false,
    },
    {
      id: 10,
      nama: "Mavic Air",
      deskripsi:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum",
      jam_terbang: "90 jam",
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
          <Tabs defaultActiveKey="informasi" id="mission-tabs">
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

            <Form.Group controlId="formJamTerbang" className="mt-3">
              <Form.Label>Jam Terbang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan jam terbang"
                name="jam_terbang"
                value={formData.jam_terbang}
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

            <Form.Group controlId="formFoto" className="mt-3">
              <Form.Label>Upload Foto</Form.Label>
              <Form.Control
                type="file"
                name="foto"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group controlId="formType" className="mt-3">
              <Form.Label>Tipe</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Pilih tipe...</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </Form.Control>
            </Form.Group>
            </Tab>

            <Tab eventKey="spesifikasi" title="Spesifikasi">
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

            <Form.Group controlId="formTelemetry" className="mt-3">
              <Form.Label>Telemetry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan telemetry"
                name="telemetry"
                value={formData.telemetry}
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
