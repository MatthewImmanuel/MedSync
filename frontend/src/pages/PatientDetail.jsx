import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [openDetailId, setOpenDetailId] = useState(null);
  const loggedInDoctorId = localStorage.getItem("doctorId");
  const [editDetailId, setEditDetailId] = useState(null);
  const [editDetailValue, setEditDetailValue] = useState("");

  useEffect(() => {
    axios.get(`/api/patients/${id}`)
      .then(res => setPatient(res.data.payload || res.data))
      .catch(() => setPatient(null));

    axios.get(`/api/appointments/patient/${id}`)
      .then(res => setAppointments(res.data.payload || res.data))
      .catch(() => setAppointments([]));

    axios.get("/api/doctors/getAll")
      .then(res => setDoctors(res.data.payload || res.data))
      .catch(() => setDoctors([]));

    axios.get("/api/hospitals/getAll")
      .then(res => setHospitals(res.data.payload || res.data))
      .catch(() => setHospitals([]));
  }, [id]);

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsObj = {};
      for (const appt of appointments) {
        try {
          const res = await axios.get(`/api/appointmentDetails/byAppointment/${appt.id}`);
          detailsObj[appt.id] = res.data.payload || res.data;
        } catch {
          detailsObj[appt.id] = null;
        }
      }
      setAppointmentDetails(detailsObj);
    };
    if (appointments.length > 0) fetchDetails();
  }, [appointments]);

  const getDoctorName = (id) =>
    doctors.find((d) => String(d.id) === String(id))?.name || id;

  const getHospitalName = (id) =>
    hospitals.find((h) => String(h.id) === String(id))?.name || id;

  if (!patient) return <div className="p-6">Pasien tidak ditemukan</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#e8f5e9] to-[#b2dfdb]">
      {/* Tombol X keluar */}
      <button
        type="button"
        onClick={() => navigate("/patientslist")}
        className="absolute top-3 right-3 text-xl font-bold text-gray-400 hover:text-green-600"
        aria-label="Close"
      >
        ×
      </button>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Detail Pasien</h1>
        <div className="mb-6">
          <p><strong>Nama:</strong> {patient.name}</p>
          <p><strong>Umur:</strong> {patient.age}</p>
          <p><strong>Alamat:</strong> {patient.address}</p>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-green-600">Riwayat Appointment</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600">Belum ada appointment</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className={`border rounded p-4 bg-gray-50 cursor-pointer transition ${openDetailId === appt.id ? "border-green-500 shadow-lg" : ""}`}
                onClick={() => setOpenDetailId(openDetailId === appt.id ? null : appt.id)}
                title="Klik untuk lihat/sembunyikan detail"
              >
                <p><strong>Tanggal:</strong> {appt.appointment_date}</p>
                <p><strong>Waktu:</strong> {appt.start_time}</p>
                <p><strong>Rumah Sakit:</strong> {getHospitalName(appt.hospital_id)}</p>
                <p><strong>Dokter:</strong> {getDoctorName(appt.doctor_id)}</p>
                {/* Appointment Detail jika ada dan sedang dibuka */}
        {openDetailId === appt.id && appointmentDetails[appt.id] && (
          <div
            className="mt-2 p-2 bg-white border rounded"
            onClick={e => e.stopPropagation()} // Tambahkan ini!
          >
            <p className="font-semibold text-green-700">Detail Konsultasi:</p>
            {editDetailId === appt.id ? (
              <div>
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  value={editDetailValue}
                  onChange={e => setEditDetailValue(e.target.value)}
                  rows={3}
                  onClick={e => e.stopPropagation()} // Tambahkan ini!
                />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={async (e) => {
                    e.stopPropagation(); // Tambahkan ini!
                    await axios.put("/api/appointmentDetails", {
                      id: appointmentDetails[appt.id].id,
                      appointment_id: appt.id,
                      detail: editDetailValue,
                    });
                    setAppointmentDetails({
                      ...appointmentDetails,
                      [appt.id]: { ...appointmentDetails[appt.id], detail: editDetailValue }
                    });
                    setEditDetailId(null);
                  }}
                >
                  Simpan
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                  onClick={e => {
                    e.stopPropagation(); // Tambahkan ini!
                    setEditDetailId(null);
                  }}
                >
                  Batal
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p style={{ whiteSpace: "pre-line" }}>
                  {appointmentDetails[appt.id].detail || <span className="italic text-gray-400">Belum ada detail</span>}
                </p>
                {String(appt.doctor_id) === String(loggedInDoctorId) && (
                  <button
                    className="ml-2 text-blue-600 underline text-sm"
                    onClick={e => {
                      e.stopPropagation(); // Tambahkan ini!
                      setEditDetailId(appt.id);
                      setEditDetailValue(appointmentDetails[appt.id].detail || "");
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        )}
              </div>
            ))}
          </div>
        )}
        {/* Tombol kembali ke daftar pasien */}
        <button
          type="button" 
          onClick={() => navigate("/patientslist")}
          className="mt-8 w-full bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          Kembali ke Daftar Pasien
        </button>
      </div>
    </div>
  );
};

export default PatientDetail;