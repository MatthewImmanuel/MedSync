import React, { useState } from "react";

const DoctorSearch = ({ doctors, onSelect, hospitals = [] }) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(doctors);

  // Update hasil pencarian setiap query berubah
  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    setFiltered(
      doctors.filter((d) =>
        d.specialization.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  // Jika doctors berubah (misal fetch ulang), reset hasil filter
  React.useEffect(() => {
    setFiltered(doctors);
  }, [doctors]);

  // Helper untuk dapatkan nama RS dari hospital_id
  const getHospitalName = (id) =>
    hospitals.find((h) => String(h.id) === String(id))?.name || "Rumah Sakit Tidak Diketahui";

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari dokter berdasarkan spesialisasi..."
        value={query}
        onChange={handleSearch}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-3"
      />
      <div className="max-h-56 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-gray-500 italic text-center">Tidak ada dokter ditemukan.</div>
        ) : (
          <ul>
            {filtered.map((d) => (
              <li
                key={d.id}
                className="p-2 border-b hover:bg-blue-50 cursor-pointer flex flex-col"
                onClick={() => onSelect(d)}
              >
                <span>
                  <span className="font-semibold text-green-700">{d.name}</span>
                  <span className="ml-2 text-gray-600 text-sm">{d.specialization}</span>
                </span>
                <span className="text-xs text-gray-500">
                  {getHospitalName(d.hospital_id)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;