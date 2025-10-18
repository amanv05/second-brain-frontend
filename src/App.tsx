import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
          }
        />
        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
