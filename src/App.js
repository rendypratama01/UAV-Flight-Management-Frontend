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
import { rootPath, dashboardPath, misiPath, operatorPath, wahanaPath, maintenancePath, komponenPath, detailMisiPath, detailOperatorPath, detailWahanaPath, detailMaintenancePath, detailKomponenPath, loginPath, profilePath } from "./routes";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const location = useLocation();
  const showSideBar = ![loginPath].includes(location.pathname);

  return (
    <div className="app">
      {showSideBar && <SideBar />}
      <main>
        <Routes>
          {[rootPath, dashboardPath].map((path, index) => (
            <Route path={path} element={<DashboardPage />} key={index} />
          ))}
          <Route path={loginPath} element={<LoginPage />} />
          <Route path={profilePath} element={<ProfilePage />} />
          <Route path={misiPath} element={<MisiPage />} />
          <Route path={operatorPath} element={<OperatorPage />} />
          <Route path={wahanaPath} element={<WahanaPage />} />
          <Route path={maintenancePath} element={<MaintenancePage />} />
          <Route path={komponenPath} element={<KomponenPage />} />
          <Route path={detailMisiPath} element={<DetailMisiPage />} />
          <Route path={detailOperatorPath} element={<DetailOperatorPage />} />
          <Route path={detailWahanaPath} element={<DetailWahanaPage />} />
          <Route path={detailMaintenancePath} element={<DetailMaintenancePage />} />
          <Route path={detailKomponenPath} element={<DetailKomponenPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
