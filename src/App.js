import "../src/styles/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import DashboardPage from "./pages/DashboardPage";
import DetailMisiPage from "./pages/DetailMisiPage";
import DetailOperatorPage from "./pages/DetailOperatorPage";
import DetailWahanaPage from "./pages/DetailWahanaPage";
import DetailMaintenancePage from "./pages/DetailMaintenancePage";
import DetailKomponenPage from "./pages/DetailKomponenPage";
import MisiPage from "./pages/MisiPage";
import OperatorPage from "./pages/OperatorPage";
import WahanaPage from "./pages/WahanaPage";
import MaintenancePage from "./pages/MaintenancePage";
import KomponenPage from "./pages/KomponenPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { rootPath, dashboardPath, misiPath, operatorPath, wahanaPath, maintenancePath, komponenPath, detailMisiPath, detailOperatorPath, detailWahanaPath, detailMaintenancePath, detailKomponenPath, loginPath, profilePath } from "./routes";

function App() {
  const location = useLocation();
  const showSideBar = ![loginPath].includes(location.pathname);

  return (
    <div className="app">
      {showSideBar && <SideBar />}
      <main>
        <Routes>
          <Route path={loginPath} element={<LoginPage />} />
          <Route path={rootPath} element={<ProtectedRoute element={DashboardPage} />} />
          <Route path={dashboardPath} element={<ProtectedRoute element={DashboardPage} />} />
          <Route path={profilePath} element={<ProtectedRoute element={ProfilePage} />} />
          <Route path={misiPath} element={<ProtectedRoute element={MisiPage} />} />
          <Route path={operatorPath} element={<ProtectedRoute element={OperatorPage} />} />
          <Route path={wahanaPath} element={<ProtectedRoute element={WahanaPage} />} />
          <Route path={maintenancePath} element={<ProtectedRoute element={MaintenancePage} />} />
          <Route path={komponenPath} element={<ProtectedRoute element={KomponenPage} />} />
          <Route path={detailMisiPath} element={<ProtectedRoute element={DetailMisiPage} />} />
          <Route path={detailOperatorPath} element={<ProtectedRoute element={DetailOperatorPage} />} />
          <Route path={detailWahanaPath} element={<ProtectedRoute element={DetailWahanaPage} />} />
          <Route path={detailMaintenancePath} element={<ProtectedRoute element={DetailMaintenancePage} />} />
          <Route path={detailKomponenPath} element={<ProtectedRoute element={DetailKomponenPage} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
