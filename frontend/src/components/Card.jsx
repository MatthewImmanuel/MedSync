import React from "react";

const Card = ({
    patientName,
    appointmentDate,
    appointmentTime,
    doctorName,
    location,
    onClick,
}) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-5 mb-4 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-700">{patientName}</h3>
                <span className="text-sm text-gray-500">{appointmentDate}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-md text-gray-700">{appointmentTime}</span>
                <span className="text-sm text-blue-600">{doctorName}</span>
            </div>
            <div className="text-sm text-gray-400">{location}</div>
        </div>
    );
};

export default Card;