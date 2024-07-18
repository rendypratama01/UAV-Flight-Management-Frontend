import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { detailMisiPath } from "../routes";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Select from "react-select";

const Misi = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    kategori: "",
    tanggalMisi: "",
    pilots: [],
    gcs: [],
    telemetry: "",
    remoteControl: "",
    videoSender: "",
    wahana: [],
    komponen: [],
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOptions, name) => {
    setFormData({
      ...formData,
      [name]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    handleClose();
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
      name: "Tanggal Misi",
      selector: (row) => row.tanggal,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-gray-700">
            <a
              href={detailMisiPath}
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
      judul: "Pemetaan Krakatau",
      deskripsi: "Lorem ipsum dolor sit amet",
      kategori: "Pemetaan",
      tanggal: "15 Agustus 2023",
    },
    {
      id: 2,
      judul: "Monitoring Gunung Bromo",
      deskripsi: "Consectetur adipiscing elit",
      kategori: "Monitoring",
      tanggal: "26 Agustus 2023",
    },
    {
      id: 3,
      judul: "Kompetisi Fotografi Semeru",
      deskripsi: "Sed do eiusmod tempor incididunt",
      kategori: "Kompetisi",
      tanggal: "13 September 2023",
    },
    {
      id: 4,
      judul: "Pengiriman Logistik Merapi",
      deskripsi: "Ut labore et dolore magna aliqua",
      kategori: "Pengiriman",
      tanggal: "19 Oktober 2023",
    },
    {
      id: 5,
      judul: "Pemetaan Rinjani",
      deskripsi: "Ut enim ad minim veniam",
      kategori: "Pemetaan",
      tanggal: "14 November 2023",
    },
    {
      id: 6,
      judul: "Monitoring Gunung Agung",
      deskripsi: "Quis nostrud exercitation ullamco",
      kategori: "Monitoring",
      tanggal: "15 Desember 2023",
    },
    {
      id: 7,
      judul: "Kompetisi Mendaki Kerinci",
      deskripsi: "Laboris nisi ut aliquip ex ea commodo",
      kategori: "Kompetisi",
      tanggal: "28 Desember 2023",
    },
    {
      id: 8,
      judul: "Pengiriman Bantuan Slamet",
      deskripsi: "Duis aute irure dolor in reprehenderit",
      kategori: "Pengiriman",
      tanggal: "17 Januari 2024",
    },
    {
      id: 9,
      judul: "Pemetaan Tambora",
      deskripsi: "In voluptate velit esse cillum dolore",
      kategori: "Pemetaan",
      tanggal: "18 Februari 2024",
    },
    {
      id: 10,
      judul: "Monitoring Gunung Lawu",
      deskripsi: "Eu fugiat nulla pariatur",
      kategori: "Monitoring",
      tanggal: "9 Maret 2024",
    },
    {
      id: 11,
      judul: "Kompetisi Mendaki Gede",
      deskripsi: "Excepteur sint occaecat cupidatat non proident",
      kategori: "Kompetisi",
      tanggal: "20 Maret 2024",
    },
    {
      id: 12,
      judul: "Pengiriman Barang Gunung Merbabu",
      deskripsi: "Sunt in culpa qui officia deserunt mollit anim",
      kategori: "Pengiriman",
      tanggal: "1 April 2024",
    },
    {
      id: 13,
      judul: "Pemetaan Gunung Ijen",
      deskripsi: "Laboris nisi ut aliquip ex ea commodo",
      kategori: "Pemetaan",
      tanggal: "14 April 2024",
    },
    {
      id: 14,
      judul: "Monitoring Gunung Raung",
      deskripsi: "Duis aute irure dolor in reprehenderit",
      kategori: "Monitoring",
      tanggal: "23 April 2024",
    },
    {
      id: 15,
      judul: "Kompetisi Jelajah Gunung Sindoro",
      deskripsi: "Ut enim ad minim veniam",
      kategori: "Kompetisi",
      tanggal: "24 Mei 2024",
    },
    {
      id: 16,
      judul: "Pengiriman Bantuan Gunung Welirang",
      deskripsi: "Excepteur sint occaecat cupidatat non proident",
      kategori: "Pengiriman",
      tanggal: "2 Juni 2024",
    },
    {
      id: 17,
      judul: "Pemetaan Gunung Papandayan",
      deskripsi: "Sunt in culpa qui officia deserunt mollit anim",
      kategori: "Pemetaan",
      tanggal: "10 Juni 2024",
    },
    {
      id: 18,
      judul: "Monitoring Gunung Ciremai",
      deskripsi: "Lorem ipsum dolor sit amet",
      kategori: "Monitoring",
      tanggal: "18 Juni 2024",
    },
    {
      id: 19,
      judul: "Kompetisi Fotografi Gunung Salak",
      deskripsi: "Consectetur adipiscing elit",
      kategori: "Kompetisi",
      tanggal: "28 Juni 2024",
    },
    {
      id: 20,
      judul: "Pengiriman Barang Gunung Sumbing",
      deskripsi: "Sed do eiusmod tempor incididunt",
      kategori: "Pengiriman",
      tanggal: "9 Juli 2024",
    },
  ];

  const pilotOptions = [
    { value: "pilot1", label: "Pilot 1" },
    { value: "pilot2", label: "Pilot 2" },
    { value: "pilot3", label: "Pilot 3" },
  ];

  const gcsOptions = [
    { value: "gcs", label: "GCS 1" },
    { value: "gcs2", label: "GCS 2" },
    { value: "gcs3", label: "GCS 3" },
  ];

  const wahanaOptions = [
    { value: "wahana1", label: "Wahana 1" },
    { value: "wahana2", label: "Wahana 2" },
    { value: "wahana3", label: "Wahana 3" },
  ];

  const komponenOptions = [
    { value: "komponen1", label: "Komponen 1" },
    { value: "komponen2", label: "Komponen 2" },
    { value: "komponen3", label: "Komponen 3" },
  ];

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Misi</h3>
      <DataTable
        title="Data Misi"
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
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDeskripsi">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Masukkan deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formKategori">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    as="select"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                  >
                    <option value="">Pilih kategori...</option>
                    <option value="pemetaan">Pemetaan</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="pengiriman">Pengiriman</option>
                    <option value="kompetisi">Kompetisi</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTanggalMisi">
                  <Form.Label>Tanggal Misi</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggalMisi"
                    value={formData.tanggalMisi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="pilots" title="Pilot">
                <Form.Group controlId="formPilots">
                  <Form.Label>Pilot</Form.Label>
                  <Select
                    isMulti
                    name="pilots"
                    options={pilotOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => handleSelectChange(selectedOptions, "pilots")}
                  />
                </Form.Group>
              </Tab>

              <Tab eventKey="gcs" title="GCS">
                <Form.Group controlId="formPilots">
                  <Form.Label>GCS Operator</Form.Label>
                  <Select
                    isMulti
                    name="gcs"
                    options={gcsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => handleSelectChange(selectedOptions, "gcs")}
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
                    name="remoteControl"
                    value={formData.remoteControl}
                    onChange={handleInputChange}
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
                    name="videoSender"
                    value={formData.videoSender}
                    onChange={handleInputChange}
                  >
                    <option value="">Pilih video sender...</option>
                    <option value="2.4ghz">2.4 GHz</option>
                    <option value="5.8ghz">5.8 GHz</option>
                  </Form.Control>
                </Form.Group>
              </Tab>

              <Tab eventKey="wahana" title="Wahana">
                   <Form.Group controlId="formWahana">
                     <Form.Label>Wahana</Form.Label>
                     <Select
                       isMulti
                       name="wahana"
                       options={wahanaOptions}
                       className="basic-multi-select"
                       classNamePrefix="select"
                       onChange={(selectedOptions) => handleSelectChange(selectedOptions, "wahana")}
                     />
                   </Form.Group>
                 </Tab>

                 <Tab eventKey="komponen" title="Komponen">
                   <Form.Group controlId="formKomponen">
                     <Form.Label>Komponen</Form.Label>
                     <Select
                       isMulti
                       name="komponen"
                       options={komponenOptions}
                       className="basic-multi-select"
                       classNamePrefix="select"
                       onChange={(selectedOptions) => handleSelectChange(selectedOptions, "komponen")}
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
       </div>
     );
   };

   export default Misi;

