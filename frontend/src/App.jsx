import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Landing Page sections
import Home from "./components/Home";
import About from "./components/About";
import Doctors from "./components/Doctors";

// Pages untuk MedSync
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PatientsList from "./pages/PatientsList";
import Appointment from "./pages/Appointment";
import PatientDetail from "./pages/PatientDetail";

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="doctors"><Doctors /></div>
    </main>
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patientslist" element={<PatientsList />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
