import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    tanggal: "",
    waktu: "",
    hospitalId: "",
    dokterId: "",
    lokasi: "",
  });

  useEffect(() => {
    axios.get("/api/hospitals/getAll")
      .then((res) => setHospitals(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch rumah sakit:", err));

    axios.get("/api/doctors/getAll")
      .then((res) => setDoctors(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch dokter:", err));

    axios.get("/api/appointments/getAll")
      .then((res) => setAppointments(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch appointment:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalId") {
      const selectedHospital = hospitals.find((h) => String(h.id) === String(value));
      setForm({
        ...form,
        hospitalId: value,
        dokterId: "",
        lokasi: selectedHospital ? selectedHospital.name : "",
      });
    } else if (name === "dokterId") {
      setForm({
        ...form,
        dokterId: value,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/appointments/create", {
      appointment_date: form.tanggal,
      start_time: form.waktu,
      doctor_id: form.dokterId,
      hospital_id: form.hospitalId,
    })
      .then((res) => {
        setAppointments([...appointments, res.data.payload || res.data]);
        setForm({ tanggal: "", waktu: "", hospitalId: "", dokterId: "", lokasi: "" });
      })
      .catch(() => alert("Gagal membuat appointment"));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <p>Selamat datang di dashboard akun Anda!</p>

      {/* List Appointment */}
      <h2 className="text-lg font-semibold mt-6 mb-2">Appointment Anda</h2>
      <ul className="space-y-2 mb-6">
        {appointments.map((a) => (
          <li key={a.id} className="border p-2 rounded">
            <div>
              <b>Tanggal:</b> {a.appointment_date} <b>Waktu:</b> {a.start_time}
            </div>
            <div>
              <b>Dokter:</b> {doctors.find((d) => String(d.id) === String(a.doctor_id))?.name || a.doctor_id}
            </div>
            <div>
              <b>Lokasi:</b> {hospitals.find((h) => String(h.id) === String(a.hospital_id))?.name || a.hospital_id}
            </div>
          </li>
        ))}
      </ul>

      {/* Form Buat Appointment */}
      <div className="border rounded p-4 bg-gray-50 max-w-md">
        <h2 className="font-semibold mb-2">Buat Appointment Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
          <input
            type="time"
            name="waktu"
            value={form.waktu}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
          <select
            name="hospitalId"
            value={form.hospitalId}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          >
            <option value="">Pilih Rumah Sakit</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <select
            name="dokterId"
            value={form.dokterId}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
            disabled={!form.hospitalId}
          >
            <option value="">Pilih Dokter</option>
            {doctors
              .filter((d) => String(d.hospital_id) === String(form.hospitalId))
              .map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
          </select>
          <input
            type="text"
            name="lokasi"
            placeholder="Lokasi"
            value={form.lokasi}
            className="w-full border px-2 py-1 bg-gray-100"
            readOnly
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Buat Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;