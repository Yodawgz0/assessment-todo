import "./App.scss";
import RegPage from "./pages/RegPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import DashboardPage from "./pages/DashboardPage";
import TaskMainPage from "./pages/TaskMainPage";

function App() {
  const isAuthencated = sessionStorage.getItem("sessionkey");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/Registration"
          element={
            isAuthencated ? <Navigate replace to="/DashBoard" /> : <RegPage />
          }
        />
        <Route
          path="/LogIn"
          element={
            isAuthencated ? <Navigate replace to="/DashBoard" /> : <LogInPage />
          }
        />
        <Route
          path="/DashBoard"
          element={
            isAuthencated ? <DashboardPage /> : <Navigate replace to="/LogIn" />
          }
        />
        <Route
          path="/taskPage"
          element={
            isAuthencated ? <TaskMainPage /> : <Navigate replace to="/LogIn" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
