import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PatientsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = localStorage.getItem("doctorId");
    if (!doctorId) return;

    // Fetch profil dokter
    axios.get(`/api/doctors/${doctorId}`)
      .then(res => {
        setDoctor(res.data.payload || res.data);
        // Fetch nama rumah sakit dokter
        const hospitalId = res.data.payload?.hospital_id || res.data.hospital_id;
        if (hospitalId) {
          axios.get(`/api/hospitals/${hospitalId}`)
            .then(hres => setHospitalName(hres.data.payload?.name || hres.data.name || ""))
            .catch(() => setHospitalName(""));
        }
      })
      .catch(() => setDoctor(null));

    // Fetch appointments milik dokter ini
    axios.get(`/api/appointments/doctor/${doctorId}`)
      .then(res => setAppointments(res.data.payload || res.data))
      .catch(() => setAppointments([]));

    // Fetch semua pasien
    axios.get("/api/patients/getAll")
      .then(res => setPatients(res.data.payload || res.data))
      .catch(() => setPatients([]));

    // Fetch semua rumah sakit
    axios.get("/api/hospitals/getAll")
      .then(res => setHospitals(res.data.payload || res.data))
      .catch(() => setHospitals([]));
  }, []);

  const getPatientName = (id) =>
    patients.find((p) => String(p.id) === String(id))?.name || id;

  const getHospitalName = (id) =>
    hospitals.find((h) => String(h.id) === String(id))?.name || id;

  return (

    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#b2dfdb]">
        {/* Tombol kembali ke menu awal */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-3 left-3 bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition"
        >
          &larr; Kembali ke Menu Awal
        </button>
      
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        {/* Profil Dokter */}
        {doctor && (
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b pb-6">
            <img
              src={doctor.photo_url || "/src/assets/img/doc1.jpg"}
              alt="Foto Dokter"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-200 shadow"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-green-700 mb-1">{doctor.name}</h2>
              <p className="text-lg text-gray-700 mb-1">{doctor.specialization}</p>
              <p className="text-gray-600">{hospitalName || getHospitalName(doctor.hospital_id)}</p>
              <p className="text-sm text-gray-400 mt-2">ID: {doctor.id}</p>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Daftar Appointment Pasien Anda
        </h1>
        <ul className="space-y-4">
          {appointments.length === 0 ? (
            <li className="text-gray-600 text-center">Belum ada appointment dengan pasien.</li>
          ) : (
            appointments.map((a) => (
              <li
                key={a.id}
                className="bg-white border border-green-200 rounded-lg shadow-md p-4 hover:shadow-lg hover:border-green-400 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <span className="font-semibold text-gray-700">Tanggal:</span> {a.appointment_date}
                    <span className="ml-4 font-semibold text-gray-700">Waktu:</span> {a.start_time}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Pasien:</span>{" "}
                    <span className="text-green-700">
                      {getPatientName(a.patient_id)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Rumah Sakit:</span>{" "}
                    <span className="text-gray-600">
                      {getHospitalName(a.hospital_id)}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/patients/${a.patient_id}`}
                      className="text-green-600 underline font-semibold"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PatientsList;