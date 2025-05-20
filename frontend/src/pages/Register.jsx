import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. Register user dulu (agar dapat user_id)
      const userRes = await axios.post("/api/users/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const user = userRes.data.payload || userRes.data;
      // 2. Register patient dengan user_id dari user yang baru dibuat
      await axios.post("/api/patients/create", {
        user_id: user.id,
        name: formData.name,
        age: formData.age,
        address: formData.address,
      });
      alert("Registrasi berhasil!");
      navigate("/"); // Redirect ke halaman awal
    } catch (err) {
      alert("Registrasi gagal! " + (err.response?.data?.message || err.message));
    }
  };

  const handleClose = () => {
    navigate("/"); // Kembali ke halaman awal
  };

  return (
    <div className="p-4 max-w-md mx-auto relative">
      {/* Tombol X di pojok kanan atas */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-500"
        aria-label="Close"
      >
        ×
      </button>
      <h1 className="text-xl font-bold mb-4">Register Pasien</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Nama" className="w-full border px-3 py-2" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full border px-3 py-2" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full border px-3 py-2" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Umur" className="w-full border px-3 py-2" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Alamat" className="w-full border px-3 py-2" onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-500 text-white px-3 py-2 rounded">
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;