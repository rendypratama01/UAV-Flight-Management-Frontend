// import React from 'react'
// import DataTable from "react-data-table-component";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { TbListDetails } from "react-icons/tb";
// import { FaPlus } from "react-icons/fa";
// import Button from 'react-bootstrap/Button';
// import { detailOperatorPath } from '../routes';

// function Operator() {
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
//           name: "Email",
//           selector: (row) => row.email,
//           sortable: true,
//         },
//         {
//           name: "Role",
//           selector: (row) => row.role,
//           sortable: true,
//         },
//         {
//           name: "No. Telp",
//           selector: (row) => row.telpon,
//           sortable: true,
//         },
//         {
//           name: "",
//           cell: (row) =>(
//             <div className="flex gap-3">
//             <button className="text-gray-700"> <a href={detailOperatorPath} className="no-underline hover:no-underline text-inherit"><TbListDetails className="text-2xl"/></a></button>
//             <button className="text-blue-900"><FaEdit className="text-2xl"/></button>
//             <button className="text-red-600"><MdDelete className="text-2xl"/></button>
//             </div>
//           ),
//         },
//       ];
    
//       const data = [
        // {
        //     "id": 1,
        //     "nama": "Jade",
        //     "email": "Jade@gmail.com",
        //     "role": "Admin",
        //     "telpon": "081221247589"
        //   },
        //   {
        //     "id": 2,
        //     "nama": "Febri",
        //     "email": "feb@gmail.com",
        //     "role": "Pilot",
        //     "telpon": "081365129099"
        //   },
        //   {
        //     "id": 3,
        //     "nama": "Max",
        //     "email": "max@gmail.com",
        //     "role": "Teknisi",
        //     "telpon": "089642537656"
        //   },
        //   {
        //     "id": 4,
        //     "nama": "Julian",
        //     "email": "julian@gmail.com",
        //     "role": "Pilot",
        //     "telpon": "081262816103"
        //   },
        //   {
        //     "id": 5,
        //     "nama": "Agus",
        //     "email": "agus@gmail.com",
        //     "role": "Admin",
        //     "telpon": "089612413286"
        //   },
        //   {
        //     "id": 6,
        //     "nama": "Septa",
        //     "email": "septa@gmail.com",
        //     "role": "Teknisi",
        //     "telpon": "08136682456"
        //   },
        //   {
        //     "id": 7,
        //     "nama": "Rina",
        //     "email": "rina@gmail.com",
        //     "role": "Admin",
        //     "telpon": "081234567890"
        //   },
        //   {
        //     "id": 8,
        //     "nama": "Budi",
        //     "email": "budi@gmail.com",
        //     "role": "Pilot",
        //     "telpon": "081298765432"
        //   },
        //   {
        //     "id": 9,
        //     "nama": "Sinta",
        //     "email": "sinta@gmail.com",
        //     "role": "Teknisi",
        //     "telpon": "089678543210"
        //   },
        //   {
        //     "id": 10,
        //     "nama": "Wawan",
        //     "email": "wawan@gmail.com",
        //     "role": "Admin",
        //     "telpon": "081312345678"
        //   }
    
//       ];
    
//       const handleChange = ({ selectedRows }) => {
//         console.log("Selected Rows: ", selectedRows);
//       };

//   return (
//     <div className="ml-cl7">
//       <h3 className="pt-10 text-3xl text-new-300">Operator</h3>
//       <DataTable
//         title="Data Operator"
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

// export default Operator

import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TbListDetails } from "react-icons/tb";
import { detailOperatorPath } from '../routes';

function Operator() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    role: '',
    tanggalLahir: '',
    telpon: '',
    jamTerbang: '',
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
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file
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
      name: "No. Telp",
      selector: (row) => row.telpon,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a href={detailOperatorPath} className="no-underline hover:no-underline text-inherit">
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
      "nama": "Jade",
      "email": "Jade@gmail.com",
      "role": "Admin",
      "telpon": "081221247589"
    },
    {
      "id": 2,
      "nama": "Febri",
      "email": "feb@gmail.com",
      "role": "Pilot",
      "telpon": "081365129099"
    },
    {
      "id": 3,
      "nama": "Max",
      "email": "max@gmail.com",
      "role": "Teknisi",
      "telpon": "089642537656"
    },
    {
      "id": 4,
      "nama": "Julian",
      "email": "julian@gmail.com",
      "role": "Pilot",
      "telpon": "081262816103"
    },
    {
      "id": 5,
      "nama": "Agus",
      "email": "agus@gmail.com",
      "role": "Admin",
      "telpon": "089612413286"
    },
    {
      "id": 6,
      "nama": "Septa",
      "email": "septa@gmail.com",
      "role": "Teknisi",
      "telpon": "08136682456"
    },
    {
      "id": 7,
      "nama": "Rina",
      "email": "rina@gmail.com",
      "role": "Admin",
      "telpon": "081234567890"
    },
    {
      "id": 8,
      "nama": "Budi",
      "email": "budi@gmail.com",
      "role": "Pilot",
      "telpon": "081298765432"
    },
    {
      "id": 9,
      "nama": "Sinta",
      "email": "sinta@gmail.com",
      "role": "Teknisi",
      "telpon": "089678543210"
    },
    {
      "id": 10,
      "nama": "Wawan",
      "email": "wawan@gmail.com",
      "role": "Admin",
      "telpon": "081312345678"
    }
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Operator</h3>
      <DataTable
        title="Data Operator"
        columns={columns}
        data={data}
        fixedHeader 
        fixedHeaderScrollHeight="530px"
        pagination
        highlightOnHover
        customStyles={customStyles}
        actions={
          <Button style={{ backgroundColor: '#5A6ACF', color: '#ffffff' }} className="d-flex align-items-center" onClick={handleShow}>
            Tambah <FaPlus className="text-sm"/>
          </Button>
        }
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Operator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Pilih role...</option>
                <option value="admin">Admin</option>
                <option value="pilot">Pilot</option>
                <option value="teknisi">Teknisi</option>
                <option value="tamu">Tamu</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTanggalLahir" className="mt-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTelpon" className="mt-3">
              <Form.Label>No. Telpon</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Masukkan no. telpon"
                name="telpon"
                value={formData.telpon}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formJamTerbang" className="mt-3">
              <Form.Label>Jam Terbang</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan jam terbang"
                name="jamTerbang"
                value={formData.jamTerbang}
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

export default Operator;
