import "../src/styles/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import DetailMisiPage from "./pages/DetailMisiPage";
import DetailOperatorPage from "./pages/DetailOperatorPage";
import DetailWahanaPage from "./pages/DetailWahanaPage";
import DetailMaintenanceWahanaPage from "./pages/DetailMaintenanceWahanaPage";
import DetailMaintenanceKomponenPage from "./pages/DetailMaintenanceKomponenPage";
import DetailKomponenPage from "./pages/DetailKomponenPage";
import MisiPage from "./pages/MisiPage";
import OperatorPage from "./pages/OperatorPage";
import WahanaPage from "./pages/WahanaPage";
import MaintenanceWahanaPage from "./pages/MaintenanceWahanaPage";
import MaintenanceKomponenPage from "./pages/MaintenanceKomponenPage";
import KomponenPage from "./pages/KomponenPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { rootPath, dashboardPath, misiPath, operatorPath, wahanaPath, maintenanceWahanaPath, maintenanceKomponenPath, komponenPath, detailMisiPath, detailOperatorPath, detailWahanaPath, detailMaintenanceWahanaPath, detailMaintenanceKomponenPath, detailKomponenPath, loginPath, profilePath } from "./routes";

function App() {
  const location = useLocation();
  const showSidebar = ![loginPath].includes(location.pathname);

  return (
    <div className="app">
      {showSidebar && <Sidebar />}
      <main>
        <Routes>
          <Route path={loginPath} element={<LoginPage />} />
          <Route path={rootPath} element={<ProtectedRoute element={DashboardPage} />} />
          <Route path={dashboardPath} element={<ProtectedRoute element={DashboardPage} />} />
          <Route path={profilePath} element={<ProtectedRoute element={ProfilePage} />} />
          <Route path={misiPath} element={<ProtectedRoute element={MisiPage} />} />
          <Route path={operatorPath} element={<ProtectedRoute element={OperatorPage} />} />
          <Route path={wahanaPath} element={<ProtectedRoute element={WahanaPage} />} />
          <Route path={maintenanceWahanaPath} element={<ProtectedRoute element={MaintenanceWahanaPage} />} />
          <Route path={maintenanceKomponenPath} element={<ProtectedRoute element={MaintenanceKomponenPage} />} />
          <Route path={komponenPath} element={<ProtectedRoute element={KomponenPage} />} />
          <Route path={`${detailMisiPath}/:uuid`} element={<ProtectedRoute element={DetailMisiPage} />} />
          <Route path={`${detailOperatorPath}/:uuid`} element={<ProtectedRoute element={DetailOperatorPage} />} />
          <Route path={`${detailWahanaPath}/:uuid`} element={<ProtectedRoute element={DetailWahanaPage} />} />
          <Route path={`${detailMaintenanceWahanaPath}/:uuid`} element={<ProtectedRoute element={DetailMaintenanceWahanaPage} />} />
          <Route path={`${detailMaintenanceKomponenPath}/:uuid`} element={<ProtectedRoute element={DetailMaintenanceKomponenPage} />} />
          <Route path={`${detailKomponenPath}/:uuid`} element={<ProtectedRoute element={DetailKomponenPage} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
