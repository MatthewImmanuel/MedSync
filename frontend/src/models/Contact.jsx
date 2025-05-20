import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // panggil endpoint POST register pasien
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register Pasien</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Nama" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="age" type="number" placeholder="Umur" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="address" type="text" placeholder="Alamat" className="w-full border px-3 py-2" onChange={handleChange} />
        <button type="submit" className="w-full bg-green-500 text-white px-3 py-2 rounded">
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;
