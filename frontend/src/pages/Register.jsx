import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [mode, setMode] = useState("patient"); // "patient" atau "doctor"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
    specialization: "",
    hospitalId: "",
    photo: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({
        ...prev,
        photo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (mode === "patient") {
        // Register pasien
        const userRes = await axios.post("/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        const user = userRes.data.payload || userRes.data;
        await axios.post("/api/patients/create", {
          user_id: user.id,
          name: formData.name,
          age: formData.age,
          address: formData.address,
        });
        alert("Registrasi pasien berhasil!");
      } else {
        // Register dokter dengan foto
        const userRes = await axios.post("/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        const user = userRes.data.payload || userRes.data;
        const data = new FormData();
        data.append("user_id", user.id);
        data.append("name", formData.name);
        data.append("specialization", formData.specialization);
        data.append("hospital_id", formData.hospitalId);
        if (formData.photo) data.append("photo", formData.photo);

        await axios.post("/api/doctors/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Registrasi dokter berhasil!");
      }
      navigate("/");
    } catch (err) {
      alert("Registrasi gagal! " + (err.response?.data?.message || err.message));
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#b2dfdb]">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Tombol X di pojok kanan atas */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-400 hover:text-green-600"
          aria-label="Close"
        >
          ×
        </button>
        {/* Option Toggle */}
        <div className="flex justify-center mb-6 gap-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-l font-semibold transition ${
              mode === "patient"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
            onClick={() => setMode("patient")}
          >
            Register Pasien
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r font-semibold transition ${
              mode === "doctor"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
            onClick={() => setMode("doctor")}
          >
            Register Dokter
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
          {mode === "patient" ? "Register Pasien" : "Register Dokter"}
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Nama"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={handleChange}
            required
          />
          {mode === "patient" ? (
            <>
              <input
                name="age"
                type="number"
                placeholder="Umur"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                required
              />
              <input
                name="address"
                type="text"
                placeholder="Alamat"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                name="specialization"
                type="text"
                placeholder="Spesialisasi"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                required
              />
              <input
                name="hospitalId"
                type="text"
                placeholder="ID Rumah Sakit"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                required
              />
              <input
                name="photo"
                type="file"
                accept="image/*"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                required
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;