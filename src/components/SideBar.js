import React from "react";
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
  maintenancePath,
  komponenPath,
  loginPath,
  profilePath,
} from "../routes";

const SideBar = () => {
  return (
    <Card className="h-screen w-full max-w-[20rem] px-2 fixed shadow-xl shadow-blue-gray-900/5 bg-[#F1F2F7]">
      <div className="mb-2 flex items-center gap-4 p-4">
        <a href={rootPath}>
          <img
            src={logo}
            alt="brand"
            className="h-20 w-20"
          />
        </a>
        <Typography variant="h5" className="text-new-200">
          UAV Flight
        </Typography>
      </div>
      <hr className="my-2 border-black w-72 mx-auto" />
      {/* <p className="px-4 font-bold">Menu</p> */}

      <List className="flex-grow">
        <a href={dashboardPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <MdDashboard className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </a>

        <a href={misiPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaTasks className="h-5 w-5" />
            </ListItemPrefix>
            Misi
          </ListItem>
        </a>

        <a href={operatorPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaUserAlt className="h-5 w-5" />
            </ListItemPrefix>
            Operator
          </ListItem>
        </a>

        <a href={wahanaPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <TbDrone className="h-5 w-5" />
            </ListItemPrefix>
            Wahana
          </ListItem>
        </a>

        <a href={maintenancePath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <GrHostMaintenance className="h-5 w-5" />
            </ListItemPrefix>
            Perbaikan
          </ListItem>
        </a>

        <a href={komponenPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FaTools className="h-5 w-5" />
            </ListItemPrefix>
            Komponen
          </ListItem>
        </a>

        <hr className="my-2 border-black w-72 mx-auto" />

        <a href={profilePath} className="no-underline hover:no-underline text-inherit">
            <ListItem className="hover:text-new-200">
              <ListItemPrefix>
                <CgProfile className="h-5 w-5" />
              </ListItemPrefix>
            Profil
          </ListItem>
        </a>

        <a href={loginPath} className="no-underline hover:no-underline text-inherit">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
            <FiLogOut className="h-5 w-5" />
            </ListItemPrefix>
            Keluar
          </ListItem>
        </a>

      </List>


      {/* <div className="mt-auto">
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <CgProfile className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="hover:text-new-200">
            <ListItemPrefix>
              <FiLogOut className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
      </div> */}
    </Card>
  );
};

export default SideBar;
