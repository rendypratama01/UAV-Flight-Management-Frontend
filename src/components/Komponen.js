// import React from 'react'
// import DataTable from "react-data-table-component";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { TbListDetails } from "react-icons/tb";
// import { FaPlus } from "react-icons/fa";
// import Button from 'react-bootstrap/Button';
// import { detailKomponenPath } from '../routes';

// function Komponen() {
//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#EAEAEA',  // Change to your desired color
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
//           name: "ID Komponen",
//           selector: (row) => row.idkomponen,
//           sortable: true,
//         },
//         {
//           name: "",
//           cell: (row) =>(
//             <div className="flex gap-3">
//             <button className="text-gray-700"> <a href={detailKomponenPath} className="no-underline hover:no-underline text-inherit"><TbListDetails className="text-2xl"/></a></button>
//             <button className="text-blue-900"><FaEdit className="text-2xl"/></button>
//             <button className="text-red-600"><MdDelete className="text-2xl"/></button>
//             </div>
//           ),
//         },
//       ];
    
      // const data = [
      //   {
      //       "id": 1,
      //       "nama": "Baterai UAV",
      //       "deskripsi": "Lorem ipsum dolor sit amet",
      //       "idkomponen": "COMP-001"
      //     },
      //     {
      //       "id": 2,
      //       "nama": "Motor Brushless UAV",
      //       "deskripsi": "Consectetur adipiscing elit",
      //       "idkomponen": "COMP-002"
      //     },
      //     {
      //       "id": 3,
      //       "nama": "Sistem Navigasi Inertial UAV",
      //       "deskripsi": "Sed do eiusmod tempor incididunt",
      //       "idkomponen": "COMP-003"
      //     },
      //     {
      //       "id": 4,
      //       "nama": "Kamera Gimbal UAV",
      //       "deskripsi": "Ut labore et dolore magna aliqua",
      //       "idkomponen": "COMP-004"
      //     },
      //     {
      //       "id": 5,
      //       "nama": "Sensor Ultrasonik UAV",
      //       "deskripsi": "Ut enim ad minim veniam",
      //       "idkomponen": "COMP-005"
      //     },
      //     {
      //       "id": 6,
      //       "nama": "Propeler UAV",
      //       "deskripsi": "Quis nostrud exercitation ullamco",
      //       "idkomponen": "COMP-006"
      //     },
      //     {
      //       "id": 7,
      //       "nama": "Sistem Kontrol Penerbangan UAV",
      //       "deskripsi": "Laboris nisi ut aliquip ex ea commodo consequat",
      //       "idkomponen": "COMP-007"
      //     },
      //     {
      //       "id": 8,
      //       "nama": "Antena Komunikasi UAV",
      //       "deskripsi": "Duis aute irure dolor in reprehenderit",
      //       "idkomponen": "COMP-008"
      //     },
      //     {
      //       "id": 9,
      //       "nama": "Modul GPS UAV",
      //       "deskripsi": "Excepteur sint occaecat cupidatat non proident",
      //       "idkomponen": "COMP-009"
      //     },
      //     {
      //       "id": 10,
      //       "nama": "Sistem Kelistrikan UAV",
      //       "deskripsi": "Sunt in culpa qui officia deserunt mollit anim id est laborum",
      //       "idkomponen": "COMP-010"
      //     },
      //     {
      //       "id": 11,
      //       "nama": "Sistem Pengendali UAV",
      //       "deskripsi": "Lorem ipsum dolor sit amet",
      //       "idkomponen": "COMP-011"
      //     },
      //     {
      //       "id": 12,
      //       "nama": "Sistem Pendingin UAV",
      //       "deskripsi": "Consectetur adipiscing elit",
      //       "idkomponen": "COMP-012"
      //     },
      //     {
      //       "id": 13,
      //       "nama": "Sensor Lidar UAV",
      //       "deskripsi": "Sed do eiusmod tempor incididunt",
      //       "idkomponen": "COMP-013"
      //     },
      //     {
      //       "id": 14,
      //       "nama": "Sistem Penerbangan Otonom UAV",
      //       "deskripsi": "Ut labore et dolore magna aliqua",
      //       "idkomponen": "COMP-014"
      //     },
      //     {
      //       "id": 15,
      //       "nama": "Pengontrol Motor UAV",
      //       "deskripsi": "Ut enim ad minim veniam",
      //       "idkomponen": "COMP-015"
      //     },
      //     {
      //       "id": 16,
      //       "nama": "Komputer Penerbangan UAV",
      //       "deskripsi": "Quis nostrud exercitation ullamco",
      //       "idkomponen": "COMP-016"
      //     },
      //     {
      //       "id": 17,
      //       "nama": "Sistem Telemetri UAV",
      //       "deskripsi": "Laboris nisi ut aliquip ex ea commodo consequat",
      //       "idkomponen": "COMP-017"
      //     },
      //     {
      //       "id": 18,
      //       "nama": "Sensor Termal UAV",
      //       "deskripsi": "Duis aute irure dolor in reprehenderit",
      //       "idkomponen": "COMP-018"
      //     },
      //     {
      //       "id": 19,
      //       "nama": "Sistem Pengisian Baterai UAV",
      //       "deskripsi": "Excepteur sint occaecat cupidatat non proident",
      //       "idkomponen": "COMP-019"
      //     },
      //     {
      //       "id": 20,
      //       "nama": "Sistem Penginderaan Jarak Jauh UAV",
      //       "deskripsi": "Sunt in culpa qui officia deserunt mollit anim id est laborum",
      //       "idkomponen": "COMP-020"
      //     }
    
      // ];
    
//       const handleChange = ({ selectedRows }) => {
//         console.log("Selected Rows: ", selectedRows);
//       };

//   return (
//     <div className="ml-cl7">
//       <h3 className="pt-10 text-3xl text-new-300">Komponen</h3>
//       <DataTable
//         title="Data Komponen"
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

// export default Komponen

import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { detailKomponenPath } from '../routes';

function Komponen() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    idkomponen: '',
    foto: null
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Here, you can handle the form submission, e.g., sending data to the backend
    handleClose();
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
      name: "ID Komponen",
      selector: (row) => row.idkomponen,
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

  const data = [
    {
        "id": 1,
        "nama": "Baterai UAV",
        "deskripsi": "Lorem ipsum dolor sit amet",
        "idkomponen": "COMP-001"
      },
      {
        "id": 2,
        "nama": "Motor Brushless UAV",
        "deskripsi": "Consectetur adipiscing elit",
        "idkomponen": "COMP-002"
      },
      {
        "id": 3,
        "nama": "Sistem Navigasi Inertial UAV",
        "deskripsi": "Sed do eiusmod tempor incididunt",
        "idkomponen": "COMP-003"
      },
      {
        "id": 4,
        "nama": "Kamera Gimbal UAV",
        "deskripsi": "Ut labore et dolore magna aliqua",
        "idkomponen": "COMP-004"
      },
      {
        "id": 5,
        "nama": "Sensor Ultrasonik UAV",
        "deskripsi": "Ut enim ad minim veniam",
        "idkomponen": "COMP-005"
      },
      {
        "id": 6,
        "nama": "Propeler UAV",
        "deskripsi": "Quis nostrud exercitation ullamco",
        "idkomponen": "COMP-006"
      },
      {
        "id": 7,
        "nama": "Sistem Kontrol Penerbangan UAV",
        "deskripsi": "Laboris nisi ut aliquip ex ea commodo consequat",
        "idkomponen": "COMP-007"
      },
      {
        "id": 8,
        "nama": "Antena Komunikasi UAV",
        "deskripsi": "Duis aute irure dolor in reprehenderit",
        "idkomponen": "COMP-008"
      },
      {
        "id": 9,
        "nama": "Modul GPS UAV",
        "deskripsi": "Excepteur sint occaecat cupidatat non proident",
        "idkomponen": "COMP-009"
      },
      {
        "id": 10,
        "nama": "Sistem Kelistrikan UAV",
        "deskripsi": "Sunt in culpa qui officia deserunt mollit anim id est laborum",
        "idkomponen": "COMP-010"
      },
      {
        "id": 11,
        "nama": "Sistem Pengendali UAV",
        "deskripsi": "Lorem ipsum dolor sit amet",
        "idkomponen": "COMP-011"
      },
      {
        "id": 12,
        "nama": "Sistem Pendingin UAV",
        "deskripsi": "Consectetur adipiscing elit",
        "idkomponen": "COMP-012"
      },
      {
        "id": 13,
        "nama": "Sensor Lidar UAV",
        "deskripsi": "Sed do eiusmod tempor incididunt",
        "idkomponen": "COMP-013"
      },
      {
        "id": 14,
        "nama": "Sistem Penerbangan Otonom UAV",
        "deskripsi": "Ut labore et dolore magna aliqua",
        "idkomponen": "COMP-014"
      },
      {
        "id": 15,
        "nama": "Pengontrol Motor UAV",
        "deskripsi": "Ut enim ad minim veniam",
        "idkomponen": "COMP-015"
      },
      {
        "id": 16,
        "nama": "Komputer Penerbangan UAV",
        "deskripsi": "Quis nostrud exercitation ullamco",
        "idkomponen": "COMP-016"
      },
      {
        "id": 17,
        "nama": "Sistem Telemetri UAV",
        "deskripsi": "Laboris nisi ut aliquip ex ea commodo consequat",
        "idkomponen": "COMP-017"
      },
      {
        "id": 18,
        "nama": "Sensor Termal UAV",
        "deskripsi": "Duis aute irure dolor in reprehenderit",
        "idkomponen": "COMP-018"
      },
      {
        "id": 19,
        "nama": "Sistem Pengisian Baterai UAV",
        "deskripsi": "Excepteur sint occaecat cupidatat non proident",
        "idkomponen": "COMP-019"
      },
      {
        "id": 20,
        "nama": "Sistem Penginderaan Jarak Jauh UAV",
        "deskripsi": "Sunt in culpa qui officia deserunt mollit anim id est laborum",
        "idkomponen": "COMP-020"
      }

  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Komponen</h3>
      <DataTable
        title="Data Komponen"
        columns={columns}
        data={data}
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
