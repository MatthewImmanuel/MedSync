import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (res.data && res.data.success) {
        localStorage.setItem("userId", res.data.payload.id);
        const userId = res.data.payload.id;

        // Cek apakah user adalah pasien
        try {
          const patientRes = await axios.get(`/api/patients/user/${userId}`);
          const patientId = patientRes.data.payload.id;
          localStorage.setItem("patientId", patientId);
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/dashboard");
          }, 1200);
        } catch {
          try {
            const doctorRes = await axios.get(`/api/doctors/user/${userId}`);
            const doctorId = doctorRes.data.payload.id;
            localStorage.setItem("doctorId", doctorId);
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              navigate("/patientslist");
            }, 1200);
          } catch {
            alert("Akun tidak ditemukan sebagai pasien maupun dokter.");
          }
        }
      } else {
        alert(res.data.message || "Login gagal");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login gagal. Pastikan email dan password benar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#b2dfdb]">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Tombol kembali ke menu awal */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-xl font-bold text-gray-400 hover:text-green-600"
          aria-label="Close"
        >
          ×
        </button>
        {showSuccess && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50 transition">
            Login successful!
          </div>
        )}
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;