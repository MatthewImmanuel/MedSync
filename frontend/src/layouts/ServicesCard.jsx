import React from "react";

const ServicesCard = ({ icon, title, description, ctaText = "Learn more" }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-4 w-full lg:w-1/3 p-6 
                    shadow-lg rounded-xl cursor-pointer hover:shadow-xl 
                    lg:hover:-translate-y-3 transition-all duration-300 ease-in-out
                    border border-gray-100 hover:border-[#ade9dc] bg-white">
      {/* Icon with animated background */}
      <div className="bg-[#d5f2ec] p-4 rounded-full transition-all duration-300 
                      group-hover:bg-[#ade9dc] group-hover:scale-110">
        {icon}
      </div>

      {/* Title & Description */}
      <h1 className="font-semibold text-xl text-gray-800">{title}</h1>
      <p className="text-gray-600 min-h-[60px]">
        {description || "Professional service tailored to your health needs."}
      </p>

      {/* CTA with arrow icon */}
      <button className="flex items-center gap-1 text-[#1DB5A4] font-medium 
                        hover:text-[#0e8f7e] transition-colors duration-200">
        {ctaText}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ServicesCard;