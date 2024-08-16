import React, { useState, useEffect } from "react";
import { FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import ReactDOM from "react-dom";
import logo from "../assets/img/logo.png";
import { loginPath } from "../routes";
import operatorService from "../services/operator.service";
import authService from "../services/auth.service"; // Import authService
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  const missions = [
    {
      id: 1,
      judul: "Pemetaan Krakatau",
      kategori: "Pemetaan",
      tanggal: "15 Agustus 2023",
    },
    {
      id: 2,
      judul: "Monitoring Gunung Bromo",
      kategori: "Monitoring",
      tanggal: "26 Agustus 2023",
    },
    {
      id: 3,
      judul: "Kompetisi Fotografi Semeru",
      kategori: "Kompetisi",
      tanggal: "13 September 2023",
    },
    {
      id: 4,
      judul: "Pengiriman Logistik Merapi",
      kategori: "Pengiriman",
      tanggal: "19 Oktober 2023",
    },
    {
      id: 5,
      judul: "Pemetaan Rinjani",
      kategori: "Pemetaan",
      tanggal: "14 November 2023",
    },
    {
      id: 6,
      judul: "Monitoring Gunung Agung",
      kategori: "Monitoring",
      tanggal: "15 Desember 2023",
    },
  ];

  const perbaikan = [
    {
      id: 1,
      judul: "Perbaikan 1",
      kategori: "Pemetaan",
      tanggal: "15 Agustus 2023",
    },
    {
      id: 2,
      judul: "Perbaikan 2",
      kategori: "Monitoring",
      tanggal: "26 Agustus 2023",
    },
    {
      id: 3,
      judul: "Perbaikan 3",
      kategori: "Kompetisi",
      tanggal: "13 September 2023",
    },
    {
      id: 4,
      judul: "Perbaikan 4",
      kategori: "Pengiriman",
      tanggal: "19 Oktober 2023",
    },
    {
      id: 5,
      judul: "Perbaikan 5",
      kategori: "Pemetaan",
      tanggal: "14 November 2023",
    },
    {
      id: 6,
      judul: "Perbaikan 6",
      kategori: "Monitoring",
      tanggal: "15 Desember 2023",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uuid =
          localStorage.getItem("userUUID") ||
          sessionStorage.getItem("userUUID");
        if (!uuid) {
          throw new Error("No user ID found. Please login.");
        }

        const response = await operatorService.getOperatorById(uuid);
        setUserData(response.user);
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
    }console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);

    try {
      await authService.changePassword(oldPassword, newPassword, confirmNewPassword);
      handleChangePasswordClose(); // Close the modal on success
    } catch (error) {
      console.error("Error changing password:", error);
      setChangePasswordError("Failed to change password. Please try again.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="ml-cl7">
      <h3 className="pt-10 text-3xl text-new-300">Profil</h3>
      <div className="min-h-screen flex flex-col items-center p-6">
        {/* Tabs */}
        <div className="w-full max-w-lg mb-6">
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
                activeTab === "Perbaikan"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("Perbaikan")}
            >
              Perbaikan
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Informasi" && userData && (
          <div className="w-full max-w-lg">
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
                <button className="flex items-center space-x-4 w-full text-left p-2 hover:bg-gray-100 rounded-md">
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
          <div className="w-full max-w-lg">
            <div className="grid grid-cols-1 gap-6">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {mission.judul}
                  </h4>
                  <p className="text-gray-600">{mission.kategori}</p>
                  <p className="text-gray-600">{mission.tanggal}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Perbaikan" && (
          <div className="w-full max-w-lg">
            <div className="grid grid-cols-1 gap-6">
              {perbaikan.map((perbaikan) => (
                <div
                  key={perbaikan.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {perbaikan.judul}
                  </h4>
                  <p className="text-gray-600">{perbaikan.kategori}</p>
                  <p className="text-gray-600">{perbaikan.tanggal}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
