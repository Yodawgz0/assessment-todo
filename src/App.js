import "./App.css";
import RegPage from "./pages/RegPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Registration" element={<RegPage />} />
        <Route
          path="/LogIn"
          element={
            localStorage.getItem("sessionKey") ? (
              <Navigate replace to="/DashBoard" />
            ) : (
              <LogInPage />
            )
          }
        />
        <Route
          path="/DashBoard"
          element={
            localStorage.getItem("sessionKey") ? (
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
