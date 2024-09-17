import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { TbDrone } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { FaUserAlt, FaTasks, FaTools } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/img/logo.png";
import {
  rootPath,
  dashboardPath,
  misiPath,
  operatorPath,
  wahanaPath,
  maintenanceWahanaPath,
  maintenanceKomponenPath,
  komponenPath,
  loginPath,
  profilePath,
} from "../routes";
import authService from "../services/auth.service"; // Import authService

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogoutShow = () => setShowLogoutModal(true);
  const handleLogoutClose = () => setShowLogoutModal(false);

  const handleLogoutConfirm = async () => {
    try {
      await authService.logoutUser(); // Call the logoutUser function
      navigate(loginPath); // Navigate to login page
    } catch (error) {
      console.error("Error logging out:", error);
      // You can add additional error handling here, like showing a notification
    }
  };

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <Card className="min-h-screen w-full max-w-[20rem] px-2 fixed shadow-xl shadow-blue-gray-900/5 bg-[#F1F2F7]">
      <div className="mb-2 flex items-center gap-4 p-4">
        <a href={rootPath}>
          <img src={logo} alt="brand" className="h-20 w-20" />
        </a>
        <Typography variant="h5" className="text-new-200">
          UAV Flight
        </Typography>
      </div>
      <hr className="my-2 border-black w-72 mx-auto" />
      <List className="flex-grow">
        <a
          href={dashboardPath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <MdDashboard className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </a>

        <a
          href={misiPath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaTasks className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Misi
          </ListItem>
        </a>

        <a
          href={operatorPath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaUserAlt className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Operator
          </ListItem>
        </a>

        <a
          href={wahanaPath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <TbDrone className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Wahana
          </ListItem>
        </a>

        {/* Dropdown for Perbaikan */}
        <div>
          <button
            className="w-full flex items-center pl-3 py-3 hover:bg-gray-200 rounded"
            onClick={handleDropdownToggle}
          >
            <GrHostMaintenance className="h-5 w-5 text-blue-700" />
            <span className="pl-4">Perbaikan</span>
            <svg
              className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="pl-8 mt-2 space-y-1">
              <a
                href={maintenanceWahanaPath}
                className="block no-underline hover:no-underline text-inherit"
              >
                <ListItem className="hover:text-new-200">
                  <ListItemPrefix>
                    {/* <GrHostMaintenance className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  Perbaikan Wahana
                </ListItem>
              </a>
              <a
                href={maintenanceKomponenPath}
                className="block no-underline hover:no-underline text-inherit"
              >
                <ListItem className="hover:text-new-200">
                  <ListItemPrefix>
                    {/* <GrHostMaintenance className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  Perbaikan komponen
                </ListItem>
              </a>
            </div>
          )}
        </div>

        <a
          href={komponenPath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaTools className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Komponen
          </ListItem>
        </a>

        <hr className="my-2 border-black w-72 mx-auto" />

        <a
          href={profilePath}
          className="no-underline hover:no-underline text-inherit"
        >
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <CgProfile className="h-5 w-5 text-blue-700" />
            </ListItemPrefix>
            Profil
          </ListItem>
        </a>

        <ListItem
          className="hover:text-new-200 cursor-pointer"
          onClick={handleLogoutShow}
        >
          <ListItemPrefix>
            <FiLogOut className="h-5 w-5 text-red-700" />
          </ListItemPrefix>
          Keluar
        </ListItem>
      </List>

      {/* Modal for logout confirmation */}
      {showLogoutModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Keluar</h2>
              <p className="mb-4">Apakah Anda yakin ingin keluar?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={handleLogoutClose}
                >
                  Batal
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleLogoutConfirm}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Card>
  );
};

export default Sidebar;
