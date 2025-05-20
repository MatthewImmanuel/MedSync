import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorSearch from "../components/DoctorSearch";

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [userName, setUserName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState({
    tanggal: "",
    waktu: "",
    hospitalId: "",
    dokterId: "",
    lokasi: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const patientId = localStorage.getItem("patientId");

    axios.get(`/api/users/${userId}`)
      .then((res) => setUserName(res.data.payload?.name || res.data.name || ""))
      .catch(() => setUserName(""));

    axios.get(`/api/appointments/patient/${patientId}`)
      .then((res) => setAppointments(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch appointment:", err));

    axios.get("/api/doctors/getAll")
      .then((res) => setDoctors(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch dokter:", err));

    axios.get("/api/hospitals/getAll")
      .then((res) => setHospitals(res.data.payload || res.data))
      .catch((err) => console.error("Gagal fetch rumah sakit:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalId") {
      const selectedHospital = hospitals.find((h) => String(h.id) === String(value));
      setForm({
        ...form,
        hospitalId: value,
        dokterId: "",
        lokasi: selectedHospital ? selectedHospital.address : "",
      });
      setSelectedDoctor(null); // reset dokter jika ganti RS
    } else if (name === "dokterId") {
      setForm({
        ...form,
        dokterId: value,
      });
      const doc = doctors.find((d) => String(d.id) === String(value));
      setSelectedDoctor(doc || null); // set dokter yang dipilih
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem("patientId");
    if (editId) {
      axios.put("/api/appointments", {
        id: editId,
        appointment_date: form.tanggal,
        start_time: form.waktu,
        doctor_id: form.dokterId,
        hospital_id: form.hospitalId,
        patient_id: patientId,
      })
        .then((res) => {
          setAppointments(appointments.map(a => a.id === editId ? res.data.payload || res.data : a));
          setEditId(null);
          setForm({ tanggal: "", waktu: "", hospitalId: "", dokterId: "", lokasi: "" });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 1500);
        })
        .catch(() => alert("Gagal update appointment"));
    } else {
      // CREATE
      axios.post("/api/appointments/create", {
        appointment_date: form.tanggal,
        start_time: form.waktu,
        end_time: null,
        doctor_id: form.dokterId,
        hospital_id: form.hospitalId,
        patient_id: patientId,
      })
        .then((res) => {
          setAppointments([...appointments, res.data.payload || res.data]);
          setForm({ tanggal: "", waktu: "", hospitalId: "", dokterId: "", lokasi: "" });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 1500);
        })
        .catch(() => alert("Gagal membuat appointment"));
    }
  };

  // Handler untuk klik appointment
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowOptions(true);
  };

  // Handler untuk hapus appointment
  const handleDelete = async () => {
    if (!selectedAppointment) return;
    if (!window.confirm("Yakin ingin menghapus appointment ini?")) return;
    try {
      await axios.delete(`/api/appointments/${selectedAppointment.id}`);
      setAppointments(appointments.filter((a) => a.id !== selectedAppointment.id));
      setShowOptions(false);
      setSelectedAppointment(null);
    } catch {
      alert("Gagal menghapus appointment");
    }
  };

  // Handler untuk edit appointment (contoh: isi form dengan data appointment)
  const handleEdit = () => {
    if (!selectedAppointment) return;
    setForm({
      tanggal: selectedAppointment.appointment_date,
      waktu: selectedAppointment.start_time,
      hospitalId: selectedAppointment.hospital_id,
      dokterId: selectedAppointment.doctor_id,
      lokasi: hospitals.find((h) => String(h.id) === String(selectedAppointment.hospital_id))?.address || "",
    });
    setEditId(selectedAppointment.id); // simpan id appointment yang diedit
    setShowOptions(false);
    setSelectedAppointment(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

return (
  <div className="p-4 min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e0f7fa]">
    {showSuccess && (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50 transition">
        Appointment berhasil diajukan!
      </div>
    )}
    <button
      onClick={() => navigate("/")}
      className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition"
    >
      &larr; Kembali ke Menu Awal
    </button>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Kiri: Search & List & Form */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Search Dokter */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">Cari Dokter</h2>
          <DoctorSearch
            doctors={doctors}
            hospitals={hospitals}
            onSelect={(doc) => {
              setSelectedDoctor(doc);
              setForm({
                ...form,
                dokterId: doc.id,
                hospitalId: doc.hospital_id,
                lokasi:
                  hospitals.find((h) => String(h.id) === String(doc.hospital_id))?.address || "",
              });
            }}
          />
        </div>
        {/* List Appointment */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">Appointment Anda</h2>
          <ul className="space-y-4">
            {appointments.length === 0 ? (
              <li className="text-gray-500 italic text-center">Belum ada appointment.</li>
            ) : (
              appointments.map((a) => (
                <li
                  key={a.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md hover:border-blue-400 transition-all duration-200"
                  onClick={() => handleAppointmentClick(a)}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <span className="font-semibold text-gray-700">Tanggal:</span> {a.appointment_date}
                      <span className="ml-4 font-semibold text-gray-700">Waktu:</span> {a.start_time}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Dokter:</span>{" "}
                      <span className="text-green-700">
                        {doctors.find((d) => String(d.id) === String(a.doctor_id))?.name || a.doctor_id}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Lokasi:</span>{" "}
                      <span className="text-gray-600">
                        {hospitals.find((h) => String(h.id) === String(a.hospital_id))?.address || a.hospital_id}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Form Buat Appointment */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4 text-xl text-green-700">
            {editId ? "Mengubah Appointment" : "Buat Appointment Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <select
              name="waktu"
              value={form.waktu}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Pilih Jam</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 7;
                const label = hour.toString().padStart(2, "0") + ":00";
                return (
                  <option key={hour} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
            <select
              name="hospitalId"
              value={form.hospitalId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            <textarea
              name="lokasi"
              placeholder="Lokasi"
              value={form.lokasi}
              className="w-full border px-3 py-2 bg-gray-100 rounded resize-none"
              readOnly
              rows={2}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
            >
              {editId ? "Simpan Perubahan" : "Buat Appointment"}
            </button>
            {editId && (
              <button
                type="button"
                className="w-full mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition"
                onClick={() => {
                  setEditId(null);
                  setForm({ tanggal: "", waktu: "", hospitalId: "", dokterId: "", lokasi: "" });
                }}
              >
                Batal Edit
              </button>
            )}
          </form>
        </div>
      </div>
      {/* Kanan: Profil Dokter */}
      {selectedDoctor && (
        <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-green-200 h-fit self-start">
          <img
            src={selectedDoctor.photo_url || "/src/assets/img/doc1.jpg"}
            alt="Foto Dokter"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-200 shadow mb-4"
          />
          <h2 className="text-xl font-bold text-green-700 mb-1">{selectedDoctor.name}</h2>
          <p className="text-lg text-gray-700 mb-1">{selectedDoctor.specialization}</p>
          <p className="text-gray-600 mb-1">
            {hospitals.find((h) => String(h.id) === String(selectedDoctor.hospital_id))?.name || selectedDoctor.hospital_id}
          </p>
          <p className="text-sm text-gray-400 mt-2">ID: {selectedDoctor.id}</p>
        </div>
      )}
    </div>
    {/* Modal/Popup Opsi */}
    {showOptions && selectedAppointment && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[280px]">
          <h3 className="font-semibold mb-6 text-lg text-center">Opsi Appointment</h3>
          <button
            className="w-full mb-3 bg-yellow-400 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="w-full mb-3 bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition"
            onClick={() => setShowOptions(false)}
          >
            Batal
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Dashboard;