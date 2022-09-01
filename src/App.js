import "./App.scss";
import RegPage from "./pages/RegPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/Registration"
          element={
            sessionStorage.getItem("sessionkey") ? (
              <Navigate replace to="/DashBoard" />
            ) : (
              <RegPage />
            )
          }
        />
        <Route
          path="/LogIn"
          element={
            sessionStorage.getItem("sessionkey") ? (
              <Navigate replace to="/DashBoard" />
            ) : (
              <LogInPage />
            )
          }
        />
        <Route
          path="/DashBoard"
          element={
            sessionStorage.getItem("sessionkey") ? (
              <DashboardPage />
            ) : (
              <Navigate replace to="/LogIn" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
