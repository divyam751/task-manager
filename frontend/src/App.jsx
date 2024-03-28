import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Home from "./pages/Home";

function App() {
  const { token } = useSelector((state) => state.user.userData || state.user);

  const isAuthenticated = token !== "" ? true : false;

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/task" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/task"
          element={isAuthenticated ? <Task /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
