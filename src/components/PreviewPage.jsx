import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; // To generate PDF
import Swal from 'sweetalert2'; // Import SweetAlert2 for success notification


export default function PreviewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false); // To track checkbox state
  const [isSubmitted, setIsSubmitted] = useState(false); // To prevent multiple submissions
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  useEffect(() => {
    // Retrieve formData from localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // If no form data, show an error message
  if (!formData) {

    return (
      <>
        <div className='text-white'>No data found. Please fill out the form first.</div>
        <button
          className="p-3 m-4 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </>
    );
  }

  // Handle the "Agree to Terms" checkbox
  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const location = useLocation();
  const file = location.state?.file;
  console.log(file);

  // Submit the data and generate PDF
  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions
    setIsSubmitted(true);
    setIsLoading(true); // Start loading when the submit button is clicked

    const Photo = localStorage.getItem('Photo');

    try {
      // Post data to the API
      const formDatas = new FormData();

      // Append form fields
      formDatas.append('fullName', formData?.fullName);
      formDatas.append('dateOfBirth', formData?.dob);
      formDatas.append('contactNumber', formData?.contact);
      formDatas.append('email', formData?.email);
      formDatas.append('preferredRole', formData?.preferredRole);
      formDatas.append('playerInformation', null);
      formDatas.append('bowlingType', formData?.bowlingType);
      formDatas.append('specialSkills', null);
      formDatas.append('jerseySize', formData?.jerseySize);
      formDatas.append('medicalConditions', formData?.medicalCondition === "Yes" ? formData?.medicalConditionDetails : formData?.medicalCondition);
      formDatas.append('emergencyContactName', formData?.emergencyContactName);
      formDatas.append('favoriteCricketer', formData?.favoriteCricketer);
      formDatas.append('acknowledgement', "Yes");
      formDatas.append('emergencyContactInfo', formData?.emergencyContact);
      formDatas.append('date', '12-10-2024');

      if (formData?.photo) {
        formDatas.append('photo', file);
      }

      // Sending data to backend
      await axios.post('https://marmaregisterformbe.onrender.com/users', formDatas, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Generate PDF
      const doc = new jsPDF();

      // Get current date and time
      const now = new Date();

      // Format the date as DD/MM/YYYY
      const day = String(now.getDate()).padStart(2, '0');  // Add leading zero if day < 10
      const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
      const year = now.getFullYear();
      const dateOfApplication = `${day}/${month}/${year}`;

      // Format the time as HH:mm:ss
      const timeOfApplication = now.toLocaleTimeString(); // Format: HH:mm:ss

      // Get page width to position text on the right
      const pageWidth = doc.internal.pageSize.width;

      // Add the date and time at the top-right corner
      doc.text(`Date of Application: ${dateOfApplication}`, pageWidth - 14, 10, null, null, 'right');  // Right-aligned
      doc.text(`Time of Application: ${timeOfApplication}`, pageWidth - 14, 20, null, null, 'right'); // Right-aligned

      // Add the player details below
      doc.text('Player Details Preview', 14, 10);
      doc.text(`Full Name: ${formData.fullName}`, 14, 30);
      const formattedDate = new Date(formData.dob).toLocaleDateString('en-GB');
      doc.text(`Date of Birth: ${formattedDate}`, 14, 50);
      doc.text(`Contact Number: ${formData.contact}`, 14, 70);
      doc.text(`Email: ${formData.email}`, 14, 90);
      doc.text(`Preferred Role: ${formData.preferredRole}`, 14, 110);
      doc.text(`Bowling Type: ${formData.bowlingType}`, 14, 130);
      doc.text(`Jersey Size: ${formData.jerseySize}`, 14, 150);
      doc.text(`Medical Condition: ${formData.medicalCondition === 'Yes' ? formData.medicalConditionDetails : 'No'}`, 14, 170);
      doc.text(`Emergency Contact Person Name & Number: ${formData.emergencyContactName} - ${formData.emergencyContact}`, 14, 190);
      doc.text(`Favorite Cricketer: ${formData.favoriteCricketer}`, 14, 220);




      if (formData.photo) {
        // Add photo to the PDF (ensure the image is on the right side)
        const img = new Image();
        img.src = formData.photo;
        img.onload = () => {
          doc.addImage(img, 'JPEG', 150, 30, 50, 50);
          doc.save('player-details.pdf'); // Download the PDF

          localStorage.clear(); // Clear local storage after submission
          Swal.fire({
            title: 'Success!',
            text: 'Player details submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/loading'); // Navigate after successful submission
          });
        };
      } else {
        doc.save('player-details.pdf'); // Download the PDF without image
        Swal.fire({
          title: 'Success!',
          text: 'Player details submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          localStorage.clear();
          navigate('/loading');
        });
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false); // Stop loading after submission attempt
    }
  };

  return (
    <div className=" bg-white text-black">
      <div className="max-w-[210mm] mx-auto px-2  border border-gray-300 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Player Details Preview</h1>

        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold">Submitting your details...</h2>
              <p>Please wait while we process your information...</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div className="flex-1">
            {formData.photo && (
              <div className="mb-4">
                <h3>Uploaded Photo:</h3>
                <img src={formData.photo} alt="Uploaded" width="200" />
              </div>
            )}
            <div className="mb-4">
              <h2 className="font-medium">Full Name</h2>
              <p>{formData.fullName}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Date of Birth</h2>

              <p>{new Date(formData.dob).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Contact Number</h2>
              <p>{formData.contact}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">E-mail Address</h2>
              <p>{formData.email}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Preferred Role</h2>
              <p>{formData.preferredRole}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Bowling Type</h2>
              <p>{formData.bowlingType}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Jersey Size</h2>
              <p>{formData.jerseySize}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Medical Condition</h2>
              <p>{formData.medicalCondition === "Yes" ? formData.medicalConditionDetails : "No"}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Emergency Contact</h2>
              <p>{formData.emergencyContactName} - {formData.emergencyContact}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-medium">Favourite Cricketer</h2>
              <p>{formData.favoriteCricketer}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label>
              <input type="checkbox" checked={isAgreed} onChange={handleAgreeChange} />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
            {handleAgreeChange && !isAgreed && (
              <p className="text-red-600 text-sm mt-2">Please select the "I agree to the terms and conditions" checkbox.</p>
            )}
          </div>

          <div className="flex gap-5 justify-center">
            <button
              className="p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>

            <button
              className={`p-2 rounded-lg text-white  ${isAgreed ? 'bg-green-500' : 'bg-red-400'}`}
              onClick={handleSubmit}
              disabled={!isAgreed}
            >
              Submit & Download PDF
            </button>


          </div>

        </div>
      </div>
    </div>
  );
}

{/* <div>
          <div className="mb-4">
            <label>
              <input type="checkbox" checked={isAgreed} onChange={handleAgreeChange} />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!isAgreed || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit & Generate PDF'}
          </button>
        </div>
      </div>
    </div>
  );
} */}
