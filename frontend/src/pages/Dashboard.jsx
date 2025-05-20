import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <p>Selamat datang di dashboard akun Anda!</p>

      {/* Placeholder */}
      <ul className="mt-4 space-y-2">
        <li className="border p-2 rounded">Appointment 1</li>
        <li className="border p-2 rounded">Appointment 2</li>
        <li className="border p-2 rounded">Appointment 3</li>
      </ul>
    </div>
  );
};

export default Dashboard;
