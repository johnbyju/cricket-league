import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PreviewPage() {
  const location = useLocation(); // Access formData passed from the form page
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
//   const formData = location.state;
  console.log(location,'location');



  useEffect(() => {
    // Retrieve formData from localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // If no form data, show an error message
  if (!formData) { 
    return <div className='text-white'>No data found. Please fill out the form first.</div>;
  }

const GoBack=()=>{
    navigate('/');
}
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[210mm] mx-auto p-8 border border-gray-300 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Player Details Preview</h1>
        {formData.photo && (
        <div>
          <h3>Uploaded Photo:</h3>
          <img src={formData.photo} alt="Uploaded" width="200" />
        </div>
      )}

        {/* Full Name */}
        <div className="mb-4">
          <h2 className="font-medium">Full Name</h2>
          <p>{formData.fullName}</p>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <h2 className="font-medium">Date of Birth</h2>
          <p>{formData.dob}</p>
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <h2 className="font-medium">Contact Number</h2>
          <p>{formData.contact}</p>
        </div>

        {/* E-mail Address */}
        <div className="mb-4">
          <h2 className="font-medium">E-mail Address</h2>
          <p>{formData.email}</p>
        </div>

        {/* Preferred Role */}
        <div className="mb-4">
          <h2 className="font-medium">Preferred Role</h2>
          <p>{formData.preferredRole}</p>
        </div>

        {/* Bowling Type */}
        <div className="mb-4">
          <h2 className="font-medium">Bowling Type</h2>
          <p>{formData.bowlingType}</p>
        </div>

        {/* Jersey Size */}
        <div className="mb-4">
          <h2 className="font-medium">Jersey Size</h2>
          <p>{formData.jerseySize}</p>
        </div>

        {/* Medical Condition */}
        <div className="mb-4">
          <h2 className="font-medium">Medical Condition</h2>
          <p>{formData.medicalCondition === "Yes" ? formData.medicalConditionDetails : "No"}</p>
        </div>

        {/* Emergency Contact */}
        <div className="mb-4">
          <h2 className="font-medium">Emergency Contact</h2>
          <p>
            {formData.emergencyContactName} - {formData.emergencyContact}
          </p>
        </div>

        {/* Favourite Cricketer */}
        <div className="mb-4">
          <h2 className="font-medium">Favourite Cricketer</h2>
          <p>{formData.favoriteCricketer}</p>
        </div>

        {/* Back Button */}
        <button
          className="mt-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
