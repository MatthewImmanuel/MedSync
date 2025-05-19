import React from "react";
import { Link } from "react-router-dom";

const dummyPatients = [
  { id: 1, nama: "Rani Maulida", umur: 32 },
  { id: 2, nama: "Andi Saputra", umur: 28 },
  { id: 3, nama: "Siti Zahra", umur: 45 },
];

const PatientsList = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Pasien</h1>
      <ul className="space-y-4">
        {dummyPatients.map((pasien) => (
          <li key={pasien.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{pasien.nama}</h2>
            <p>Umur: {pasien.umur}</p>
            <Link to={`/patients/${pasien.id}`} className="text-blue-500 underline">
              Lihat Detail
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsList;
