import React, { useState } from "react";

const Appointment = () => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    doctorId: "",
    hospital: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment data:", form);
    // panggil POST /appointment
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Buat Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="date" type="date" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="startTime" type="time" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="endTime" type="time" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="doctorId" type="text" placeholder="ID Dokter" className="w-full border px-3 py-2" onChange={handleChange} />
        <input name="hospital" type="text" placeholder="Rumah Sakit" className="w-full border px-3 py-2" onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded">
          Buat Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
