
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Complaint from "./components/Complaint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/complaints" element={<StudentDashboard />} />
        <Route path="/submit-complaint" element={<Complaint />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
