import React, { useState } from "react";
import { Link } from "react-scroll";
import Button from "../layouts/Button";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Cek login status
  const isPatient = !!localStorage.getItem("patientId");
  const isDoctor = !!localStorage.getItem("doctorId");

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  const openForm = () => { setShowForm(true); setMenu(false); };
  const closeForm = () => setShowForm(false);

  const handleLogout = () => {
    localStorage.removeItem("patientId");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("userId");
    window.location.href = "/"; // redirect ke home
  };

  return (
    <div className=" fixed w-full z-10 text-white">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className=" text-2xl font-semibold">Medsync</h1>
            </Link>
          </div>

          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="home" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">Home</Link>
            <Link to="about" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">About Us</Link>
            <Link to="doctors" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">Doctors</Link>
          </nav>

          <div className="hidden lg:flex flex-row gap-4">
            {(isPatient || isDoctor) ? (
              <>
                <a
                  href={isDoctor ? "/patientslist" : "/dashboard"}
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out flex items-center justify-center"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out flex items-center justify-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out flex items-center justify-center"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out flex items-center justify-center"
                >
                  Register
                </a>
              </>
            )}
          </div>

          {showForm && <Contact closeForm={closeForm} />}

          <div className=" lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link to="home" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer" onClick={closeMenu}>Home</Link>
          <Link to="about" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer" onClick={closeMenu}>About Us</Link>
          <Link to="doctors" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer" onClick={closeMenu}>Doctors</Link>

          <div className=" lg:hidden flex flex-col gap-4 px-8">
            {(isPatient || isDoctor) ? (
              <>
                <a
                  href={isDoctor ? "/patientslist" : "/dashboard"}
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out mb-2"
                  onClick={closeMenu}
                >
                  Dashboard
                </a>
                <button
                  onClick={() => { handleLogout(); closeMenu(); }}
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out mb-2"
                  onClick={closeMenu}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
                  onClick={closeMenu}
                >
                  Register
                </a>
                <button
                  className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out mt-2"
                  onClick={openForm}
                >
                  Contact Us
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;