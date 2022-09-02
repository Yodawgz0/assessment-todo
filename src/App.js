import "./App.scss";
import RegPage from "./pages/RegPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import DashboardPage from "./pages/DashboardPage";
import TaskMainPage from "./pages/TaskMainPage";

function App() {
  const isAuthenticated = sessionStorage.getItem("sessionkey");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/Registration"
          element={
            isAuthenticated ? <Navigate replace to="/DashBoard" /> : <RegPage />
          }
        />
        <Route
          path="/LogIn"
          element={
            isAuthenticated ? (
              <Navigate replace to="/DashBoard" />
            ) : (
              <LogInPage />
            )
          }
        />
        <Route
          path="/DashBoard"
          element={
            isAuthenticated ? (
              <DashboardPage />
            ) : (
              <Navigate replace to="/LogIn" />
            )
          }
        />
        <Route
          path="/taskPage"
          element={
            isAuthenticated ? (
              <TaskMainPage />
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
