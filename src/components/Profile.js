import React, { useState, useEffect } from "react";
import { FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import ReactDOM from "react-dom";
import logo from "../assets/img/logo.png";
import { loginPath } from "../routes";
import operatorService from "../services/operator.service";
import authService from "../services/auth.service"; // Import authService
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Modal, Button, Form } from "react-bootstrap";
import {
  detailMaintenanceKomponenPath,
  detailMaintenanceWahanaPath,
  detailMisiPath,
} from "../routes";

function Profile() {
  const [activeTab, setActiveTab] = useState("Informasi");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); // State for change password modal
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const [photoError, setPhotoError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    nik: "",
    tanggal_lahir: "",
    nomor_telepon: "",
    photo_profile: "",
    status: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uuid = localStorage.getItem("userUUID");
        if (!uuid) {
          throw new Error("No user ID found. Please login.");
        }

        const response = await operatorService.getOperatorById(uuid);
        setUserData(response.user);

        setFormData({
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          nik: response.user.nik,
          tanggal_lahir: response.user.tanggal_lahir,
          nomor_telepon: response.user.nomor_telepon,
          photo_profile: response.user.photo_profile,
          status: response.user.status,
        });
      } catch (error) {
        setError("Failed to load user data.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoutShow = () => setShowLogoutModal(true);
  const handleLogoutClose = () => setShowLogoutModal(false);

  const handleLogoutConfirm = async () => {
    try {
      await authService.logoutUser(); // Call the logoutUser function
      navigate(loginPath); // Navigate to login page
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to log out. Please try again.");
    }
  };

  const handleChangePasswordShow = () => setShowChangePasswordModal(true);
  const handleChangePasswordClose = () => setShowChangePasswordModal(false);

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setChangePasswordError("New passwords do not match.");
      return;
    }
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);

    try {
      await authService.changePassword(
        oldPassword,
        newPassword,
        confirmNewPassword
      );
      handleChangePasswordClose(); // Close the modal on success
    } catch (error) {
      console.error("Error changing password:", error);
      setChangePasswordError("Failed to change password. Please try again.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  const truncateTextByChar = (text, charLimit) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      role: "",
      nik: "",
      tanggal_lahir: "",
      nomor_telepon: "",
      photo_profile: "",
      status: false,
    });
    setPhotoError("");
  };

  const handleDeletePhoto = () => {
    setFormData({
      ...formData,
      photo_profile: "", // Set ke string kosong jika tidak ada foto
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value === "true",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    if (selectedFiles.length > 1) {
      setPhotoError("You can upload a maximum of 1 photo.");
    } else {
      // Ambil URL objek atau nama file
      const file = selectedFiles[0];
      const fileURL = file ? URL.createObjectURL(file) : "";

      setFormData({
        ...formData,
        photo_profile: fileURL, // Simpan URL objek atau nama file
      });
      setPhotoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan logika untuk menyimpan perubahan
    try {
      const uuid = localStorage.getItem("userUUID");
      if (!uuid) {
        throw new Error("No user ID found. Please login.");
      }

      await operatorService.updateOperator(uuid, formData);
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Profil</h3>
      <div className="min-h-screen flex flex-col items-center p-6">
        {/* Tabs */}
        <div className="w-full max-w-xl mb-6">
          <div className="flex border-b border-gray-300">
            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "Informasi"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("Informasi")}
            >
              Informasi
            </button>
            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "Misi"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("Misi")}
            >
              Misi
            </button>
            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "PerbaikanWahana"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("PerbaikanWahana")}
            >
              Perbaikan Wahana
            </button>

            <button
              className={`px-4 py-2 text-lg ${
                activeTab === "PerbaikanKomponen"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("PerbaikanKomponen")}
            >
              Perbaikan Komponen
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Informasi" && userData && (
          <div className="w-full max-w-xl">
            {/* Profile Info Section */}
            <div className="bg-white border border-gray-300 rounded-lg mb-6 p-6">
              <div className="flex items-center space-x-6">
                <img
                  src={userData.photo_profile || logo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {userData.name || "John Doe"}
                  </h2>
                  <p className="text-gray-600">{userData.role || "Pilot"}</p>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white border border-gray-300 rounded-lg mb-6 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Informasi
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">NIK:</span>
                  <span className="text-gray-600">
                    {userData.nik || "1234567890"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Tanggal Lahir:
                  </span>
                  <span className="text-gray-600">
                    {userData.tanggal_lahir || "1 Januari 1990"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-600">
                    {userData.email || "johndoe@example.com"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">No. Telpon:</span>
                  <span className="text-gray-600">
                    {userData.nomor_telepon || "08123456789"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Tanggal Bergabung:
                  </span>
                  <span className="text-gray-600">
                    {userData.createdAt || "1 Januari 2022"}
                  </span>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pengaturan
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleShow}
                  className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaEdit className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg">Edit Profil</span>
                </button>
                <button
                  onClick={handleChangePasswordShow}
                  className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaLock className="text-blue-500 text-lg" />
                  <span className="text-gray-700 text-lg">Ganti Password</span>
                </button>
                <button
                  onClick={handleLogoutShow}
                  className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaSignOutAlt className="text-red-500 text-lg" />
                  <span className="text-gray-700 text-lg">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Misi" && (
          <div className="w-full max-w-xl">
            <div className="grid grid-cols-1 gap-6">
              {userData.missions.map((mission) => (
                <a
                  key={mission.id}
                  href={`${detailMisiPath}/${mission.uuid}`} // Adjust path as needed
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    key={mission.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {truncateTextByChar(mission.judul_misi, 20)}
                    </h4>
                    <p className="text-sm mb-1">Kategori: {mission.kategori}</p>
                    <p className="text-sm">Tanggal: {mission.createdAt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === "PerbaikanWahana" && (
          <div className="w-full max-w-xl">
            <div className="grid grid-cols-1 gap-6">
              {userData.user_perbaikanWahana.map((perbaikan) => (
                <a
                  key={perbaikan.id}
                  href={`${detailMaintenanceWahanaPath}/${perbaikan.uuid}`} // Adjust path as needed
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    key={perbaikan.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {perbaikan.judul_perbaikan}
                    </h4>
                    <p className="text-sm mb-1">
                      Kategori: {perbaikan.kategori}
                    </p>
                    <p className="text-sm">Tanggal: {perbaikan.createdAt}</p>
                    <p className="text-sm">Biaya: {perbaikan.biaya}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === "PerbaikanKomponen" && (
          <div className="w-full max-w-xl">
            <div className="grid grid-cols-1 gap-6">
              {userData.user_perbaikanKomponen.map((perbaikan) => (
                <a
                  key={perbaikan.id}
                  href={`${detailMaintenanceKomponenPath}/${perbaikan.uuid}`} // Adjust path as needed
                  className="no-underline hover:no-underline text-inherit"
                >
                  <div
                    key={perbaikan.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {perbaikan.judul_perbaikan}
                    </h4>
                    <p className="text-sm mb-1">
                      Kategori: {perbaikan.kategori}
                    </p>
                    <p className="text-sm">Tanggal: {perbaikan.createdAt}</p>
                    <p className="text-sm">Biaya: {perbaikan.biaya}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
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
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih role...</option>
                <option value="Mission Manager">Mission Manager</option>
                <option value="Pilot">Pilot</option>
                <option value="GCS Operator">GCS Operator</option>
                <option value="Teknisi">Teknisi</option>
                <option value="Guest">Guest</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNIK" className="mt-3">
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan NIK"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTanggalLahir" className="mt-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTelpon" className="mt-3">
              <Form.Label>No. Telpon</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Masukkan no. telpon"
                name="nomor_telepon"
                value={formData.nomor_telepon}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFoto" className="mt-3">
              <Form.Label>Upload Foto operator</Form.Label>
              <Form.Control
                type="file"
                name="photo_profile"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
              {photoError && (
                <div className="text-danger mt-2">{photoError}</div>
              )}
            </Form.Group>

            <div className="mt-3">
              {formData.photo_profile && (
                <div className="mt-4">
                  <img
                    src={formData.photo_profile} // Gunakan URL objek untuk menampilkan gambar
                    alt="Foto Profil"
                    className="img-fluid"
                    style={{ maxWidth: "350px", margin: "10px" }}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleDeletePhoto()}
                    className="ms-2"
                  >
                    Hapus
                  </Button>
                </div>
              )}
            </div>

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

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for logout confirmation */}
      {showLogoutModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Konfirmasi Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin keluar?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleLogoutClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Modal for changing password */}
      {showChangePasswordModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ganti Password
              </h2>
              <form onSubmit={handleChangePasswordSubmit}>
                {changePasswordError && (
                  <p className="text-red-500 mb-4">{changePasswordError}</p>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleChangePasswordClose}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Ganti Password
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Profile;
