import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; // To generate PDF

export default function PreviewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false); // To track checkbox state
  const [isSubmitted, setIsSubmitted] = useState(false); // To prevent multiple submissions

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



  // Handle the "Agree to Terms" checkbox
  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked);
  };
  const location = useLocation();
  const file = location.state?.file;

  // useEffect(() => {
  //   if (file) {
  //     sendFileToBackend(file); // Send the file to the backend
  //   }
  // }, [file]);

  // Submit the data and generate PDF
  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions
    setIsSubmitted(true);
   const Photo = localStorage.getItem('Photo')

    try {
      // Post data to the API
      const formDatas = new FormData();
  
      // Append form fields
      formDatas.append('fullName', formData?.fullName)
      formDatas.append('dateOfBirth', formData?.dob)
      formDatas.append('contactNumber', formData?.contact)
      formDatas.append('email', formData?.email);
      formDatas.append('preferredRole', formData?.preferredRole);
       formDatas.append('playerInformation', 'd');
       formDatas.append('bowlingType', formData?.bowlingType);
       formDatas.append('specialSkills', 'd');
       formDatas.append('jerseySize', formData?.jerseySize);
       formDatas.append('medicalConditions',formData?.medicalCondition=="Yes"? formData?.medicalConditionDetails:formData?.medicalCondition);
       formDatas.append('emergencyContactName', formData?.emergencyContactName);
       formDatas.append('favoriteCricketer', formData?.favoriteCricketer);
       formDatas.append('acknowledgement', "Yes");
       
       formDatas.append('emergencyContactInfo', formData?.emergencyContact);

       formDatas.append('date', '12-10-2024');
       if (formData?.photo) {
        formDatas.append('photo',file);
      }
   


      await axios.post('https://marmaregisterformbe.onrender.com/users', formDatas,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Generate PDF
      const doc = new jsPDF();
      doc.text('Player Details Preview', 14, 20);
      doc.text(`Full Name: ${formData.fullName}`, 14, 30);
      doc.text(`Date of Birth: ${formData.dob}`, 14, 40);
      doc.text(`Contact Number: ${formData.contact}`, 14, 50);
      doc.text(`Email: ${formData.email}`, 14, 60);
      doc.text(`Preferred Role: ${formData.preferredRole}`, 14, 70);
      doc.text(`Bowling Type: ${formData.bowlingType}`, 14, 80);
      doc.text(`Jersey Size: ${formData.jerseySize}`, 14, 90);
      doc.text(`Medical Condition: ${formData.medicalCondition === 'Yes' ? formData.medicalConditionDetails : 'No'}`, 14, 100);
      doc.text(`Emergency Contact: ${formData.emergencyContactName} - ${formData.emergencyContact}`, 14, 110);
      doc.text(`Favorite Cricketer: ${formData.favoriteCricketer}`, 14, 120);

      if (formData.photo) {
        // Add photo to the PDF (ensure the image is on the right side)
        const img = new Image();
        img.src = formData.photo;
        img.onload = () => {
          doc.addImage(img, 'JPEG', 150, 30, 50, 50);
          doc.save('player-details.pdf'); // Download the PDF
        };
      } else {
        doc.save('player-details.pdf'); // Download the PDF
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[210mm] mx-auto p-4 border border-gray-300 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Player Details Preview</h1>

        <div className="flex justify-between items-start">
          {/* Left section */}
          <div className="flex-1">
            {formData.photo && (
              <div className="mb-4">
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
          </div>

          {/* Right section */}
          {/* <div className="flex-none ml-6">
            {formData.photo && (
              <img src={formData.photo} alt="Uploaded" width="200" />
            )}
          </div> */}
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="mb-4">
            <label>
              <input type="checkbox" checked={isAgreed} onChange={handleAgreeChange} />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div>
          <div className="flex gap-5 justify-center">
            <button
              className="p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>

            <button
              className={`p-2  rounded-lg text-white  ${isAgreed ? 'bg-lightgreen hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={handleSubmit} 
              disabled={!setIsAgreed}   
            >
              Submit & Download PDF
            </button>


          </div>

        </div>
      </div>
    </div>
  );
}
