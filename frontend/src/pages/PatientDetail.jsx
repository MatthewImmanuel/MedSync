import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyDetails = {
  1: {
    nama: "Rani Maulida",
    riwayat: [
      {
        tanggal: "2024-12-01",
        diagnosa: "Hipertensi",
        obat: "Amlodipine"
      },
      {
        tanggal: "2025-01-12",
        diagnosa: "Demam Berdarah",
        obat: "Paracetamol, Cairan Infus"
      }
    ]
  },
  2: {
    nama: "Andi Saputra",
    riwayat: []
  },
  3: {
    nama: "Siti Zahra",
    riwayat: [
      {
        tanggal: "2025-03-22",
        diagnosa: "Diabetes",
        obat: "Metformin"
      }
    ]
  }
};

const PatientDetail = () => {
  const { id } = useParams();
  const pasien = dummyDetails[id];

  if (!pasien) return <p>Pasien tidak ditemukan</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Detail Pasien: {pasien.nama}</h1>
      {pasien.riwayat.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat kesehatan</p>
      ) : (
        <div className="space-y-4">
          {pasien.riwayat.map((entry, idx) => (
            <div key={idx} className="border p-4 rounded">
              <p><strong>Tanggal:</strong> {entry.tanggal}</p>
              <p><strong>Diagnosa:</strong> {entry.diagnosa}</p>
              <p><strong>Obat:</strong> {entry.obat}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
