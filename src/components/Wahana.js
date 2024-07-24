import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import wahanaService from "../services/wahana.service";

function Wahana() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    operasional: "",
    photos: [],
    tipe: "",
    wingspan: "",
    length: "",
    material: "",
    propulsi: "",
    baterai: "",
    payload: "",
    durasi: "",
    cangkupan: "",
    ketinggian: "",
    kapasitas: "",
    rotor: "",
  });
  const [selectedType, setSelectedType] = useState("");
  const [wahanaData, setWahanaData] = useState([]);

  useEffect(() => {
    const fetchWahana = async () => {
      try {
        const response = await wahanaService.getWahana();
        console.log("Fetched Wahana Response:", response);

        // Cek jika respons adalah objek dan memiliki properti 'wahana'
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
        console.error("Error fetching wahana data:", error);
      }
    };

    fetchWahana();
  }, []);

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
      [name]: Array.from(files), // Handle multiple files
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
      const response = await wahanaService.addWahana(dataToSubmit);
      console.log("Wahana data successfully posted:", response);
      handleClose(); // Close the modal
      // Optionally, show a success message or update the data table
    } catch (error) {
      console.error("Error posting wahana data:", error);
      // Optionally, show an error message to the user
    }
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
      selector: (row) => row.nama_wahana,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi_wahana,
      sortable: true,
    },
    {
      name: "Tipe",
      selector: (row) => row.tipe,
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
              href={`/wahana/${row.uuid}`} // Adjust path as needed
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

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Wahana</h3>
      <DataTable
        title="Data Wahana"
        columns={columns}
        data={wahanaData}
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

                <Form.Group controlId="formType" className="mt-3">
                  <Form.Label>Tipe</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipe"
                    value={formData.tipe}
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

                <Form.Group controlId="formCangkupan" className="mt-3">
                  <Form.Label>Cangkupan (ha)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan cangkupan"
                    name="cangkupan"
                    value={formData.cangkupan}
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
                <Form.Group controlId="formFoto" className="mt-3">
                  <Form.Label>Upload Foto</Form.Label>
                  <Form.Control
                    type="file"
                    name="photos" // Adjusted name to match formData key
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="mt-3">
                  {formData.photos && formData.photos.length > 0 && (
                    <div className="mt-4">
                      {formData.photos.map((file, index) => (
                        <div key={index} className="mt-4">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Foto ${index}`}
                            className="img-fluid"
                            style={{ maxWidth: "200px", margin: "10px" }}
                          />
                        </div>
                      ))}
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
