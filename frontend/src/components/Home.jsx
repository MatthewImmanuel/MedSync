import React from "react";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/home.png')] bg-no-repeat bg-cover opacity-90">
      <div className="w-full lg:w-4/5 space-y-5 mt-10">
        <h1 className="text-5xl font-bold leading-tight">
          Empowering Health Services
        </h1>
        <p>
          Membantu Anda untuk menyimpan, mengelola, dan membagikan riwayat medis antara pasien dan dokter secara aman.
        </p>
        <Button title="See Services" />
      </div>
    </div>
  );
};

export default Home;
