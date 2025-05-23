import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    axios.get("/api/doctors/getAll")
      .then(res => setDoctors(res.data.payload || res.data))
      .catch(() => setDoctors([]));
  }, []);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Doctors
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Meet our professional and experienced healthcare specialists.
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {doctors.length === 0 ? (
            <div className="h-[350px] flex items-center justify-center text-gray-500">
              Tidak ada dokter tersedia.
            </div>
          ) : (
            doctors.map((d, index) => (
              <div
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
                key={d.id || index}
              >
                <div>
                  <img
                    src={d.photo_url || "/src/assets/img/doc1.jpg"}
                    alt={d.name}
                    className="h-56 rounded-t-xl w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl pt-4">{d.name}</h1>
                  <h3 className="pt-2">{d.specialization}</h3>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Doctors;