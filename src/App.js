import TitleBar from "./components/TitleBar/TitleBar"
import { LayoutStyles } from './global styles/Layout.styled';
import MainNavbar from './components/MainNavbar/MainNavbar';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import { FormsStyles } from './global styles/Forms.styled';
import { Route, Routes, useNavigate } from "react-router-dom"
import MaterialsPage from './pages/MaterialsPage';
import MainFooter from "./components/MainFooter/MainFooter";
import OutlayTypesPage from "./pages/OutlayTypesPage";
import React, { useEffect, useState } from "react"
import OutlaysPage from "./pages/OutlaysPage";
import { UtilitiesStyles } from "./global styles/Utilities";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import SquareSpinner from "./components/Spinner/SquareSpinner/SquareSpinner";

export const UserContext = React.createContext();
export const LoadingCounterContext = React.createContext();

function App() {
  const [user, setUser] = useState();
  const [loadingCounter, setLoadingCounter] = useState(0);
  const navigate = useNavigate();

  function loadingStart() {
    setLoadingCounter((prevLoadingCounter) => prevLoadingCounter + 1);
  }
  function loadingFinished() {
    setLoadingCounter((prevLoadingCounter) => prevLoadingCounter - 1);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user])

  let body = null;
  if (!user) {
    body = (
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </main>
    )
  } else if (user.accoutnType == 0) {
    body = (
      <>
        <MainNavbar />
        <main>
          <Routes>
            <Route path="reports" element={<ReportsPage />} />
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="outlay-types" element={<OutlayTypesPage />} />
            <Route path="outlays" element={<OutlaysPage />} />
            <Route path="users" element={<UsersPage />} />
          </Routes>
        </main>
      </>
    )
  } else {
    body = (
      <>
        <MainNavbar />
        <main>
          <Routes>
            <Route path="outlays" element={<OutlaysPage />} />
          </Routes>
        </main>
      </>
    )
  }
  return (
    <>
      <LayoutStyles />
      <FormsStyles />
      <UtilitiesStyles />
      <ReactNotifications />

      <UserContext.Provider value={user}>
        <LoadingCounterContext.Provider value={{ loadingStart, loadingFinished }}>
          <TitleBar setUser={setUser} />
          {loadingCounter > 0 &&
            <SquareSpinner caption="Loading..." />
          }
          {body}
        </LoadingCounterContext.Provider>
      </UserContext.Provider>

      <MainFooter />
    </>
  );
}

export default App;
