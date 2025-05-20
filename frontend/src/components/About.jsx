import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className="w-full lg:w-3/4 space-y-4">
        <h1 className="text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className="text-justify lg:text-start">
          <b>MedSync</b> adalah platform digital yang didedikasikan untuk membantu pasien dalam menyimpan, mengelola, dan membagikan rekam medis secara aman dan mudah. Dengan MedSync, seluruh riwayat kesehatan Anda tersimpan rapi dan selalu siap untuk diakses kapan pun dibutuhkan.
        </p>
        <p className="text-justify lg:text-start">
          Kami memahami betapa pentingnya informasi medis yang akurat dan terkini bagi penanganan kesehatan Anda. Karena itu, MedSync memungkinkan dokter memberikan diagnosis yang terhubung langsung dengan riwayat medis pasien, sehingga proses konsultasi menjadi lebih efisien dan terintegrasi. Fitur berbagi rekam medis dengan dokter atau rumah sakit pun didesain dengan sistem keamanan data yang ketat untuk menjaga privasi Anda.
        </p>
        <p className="text-justify lg:text-start">
          Misi kami adalah menciptakan ekosistem kesehatan yang modern, transparan, dan terhubung, di mana pasien memiliki kendali penuh atas data medis mereka. Bersama MedSync, Anda tidak perlu lagi khawatir kehilangan data penting atau harus mengulang pemeriksaan akibat informasi yang terputus. Semua riwayat kesehatan Anda, dalam satu genggaman.
        </p>
      </div>
      <div className="w-full lg:w-3/4">
        <img className="rounded-lg" src={img} alt="About MedSync" />
      </div>
    </div>
  );
};

export default About;
