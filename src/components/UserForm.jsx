import { useEffect, useState } from "react";
import { Calendar, ChevronDownIcon, Mail, Phone, User } from "lucide-react"; // Importing the calendar icon
import { ImageUpload } from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { string } from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { usePhoto } from "./PhotoContext";
import './Custom.css'
export default function PlayerDetails() {



  const navigate = useNavigate();
  const getPhoto = localStorage.getItem('photo')
  const [file, setFile] = useState(null);
  console.log(file, 'fileee');
  const getData = localStorage.getItem("formData")
  const getParseDate = JSON.parse(getData);
  console.log(getParseDate, 'getParseDate');
  const { photo, setPhoto } = usePhoto();


  const [formData, setFormData] = useState({
    fullName: getParseDate?.fullName,
    dob: getParseDate?.dob ? dayjs(getParseDate.dob) : null,
    contact: getParseDate?.contact,
    email: getParseDate?.email,
    photo: photo || null,
    preferredRole: getParseDate?.preferredRole,
    bowlingType: getParseDate?.bowlingType,
    jerseySize: getParseDate?.jerseySize,
    medicalCondition: getParseDate?.medicalCondition,
    medicalConditionDetails: getParseDate?.medicalConditionDetails,
    emergencyContactName: getParseDate?.emergencyContactName,
    emergencyContact: getParseDate?.emergencyContact,
    favoriteCricketer: getParseDate?.favoriteCricketer,
  });
  console.log(formData, 'formData');


  const [error, setError] = useState({});
  const validationSchema = Yup.object({
    fullName: string().required("full name is Required"),
    dob: string().required("date of birth is Required"),
    contact: string().required("Phone number is Required").matches(/^\d{10}$/, "phone number must be 10 digit"),
    email: string().email("invalid email format").required("email is required"),
    photo: Yup.mixed()
      .required("The photo must be less than 3MB.")
    ,

    preferredRole: Yup.string().required("Preferred role is required"),
    bowlingType: Yup.string().required("Bowling type is required"),
    jerseySize: Yup.string().required("Jersey size is required"),
    medicalConditionDetails: Yup.string().when('please select an option', {
      is: 'Yes',
      then: Yup.string().required("Please specify your medical condition")
    }),
    emergencyContactName: Yup.string().required("Emergency contact name is required"),
    emergencyContact: Yup.string().required("Emergency contact number is required").matches(/^\d{10}$/, "Emergency contact number must be 10 digits"),
    favoriteCricketer: Yup.string().required("favoriteCricketer Name is required"),
  })
  // Handle input change
  const handleChange = (file) => {

    const { id, value } = file.target;
    setFormData({ ...formData, [id]: value });

  };




  const handleFileChange = (file) => {
    // setPhoto(file.target.files[0])
    // localStorage.setItem('Photo',photo)
    console.log('soehreiojreorg');

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prevData => ({ ...prevData, photo: reader.result }));
      setPhoto(reader.result)
    };
    reader.readAsDataURL(file); // Convert image to Base64
  };



  // const handlePreview = () => {
  //   if (true) {
  //     console.log(formData); 
  //   }
  // }; 


  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleFormSubmit = async () => {
    console.log(formData, 'formData');
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Store formData in localStorage (convert dob to ISO string)
      localStorage.setItem('formData', JSON.stringify({
        ...formData,
        dob: formData.dob ? formData.dob.toISOString() : null,  // Save as ISO string
      }));
      navigate('/preview', { state: { file } });
    } catch (err) {
      console.error("Validation Error:", err);
      const newErrors = err.inner.reduce((acc, currentErr) => {
        acc[currentErr.path] = currentErr.message;
        return acc;
      }, {});
      setError(newErrors);
    }
  };

  const handleButtonClick = () => {

    navigate('/admin')
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed header image */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="relative w-full h-[200px]">
          <img
            src="/ground.jpg"
            alt="Cricket Stadium"
            className="object-cover  w-full h-full"
          />
        </div>
        <div className="p-3 bg-black flex items-center justify-between relative">      
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
            Player Details
          </h1>
          <div className="ml-auto">
            <button
              type="button"
              onClick={handleButtonClick}
              className="flex justify-end text-end text-black"
            >
              Admin Access
            </button>
          </div>
        </div>

      </div>

      {/* Scrollable content */}
      <div className="relative pt-[240px] min-h-screen">
        <div className="px-4 py-6 space-y-6">
          <form className="relative space-y-6" >
            <div className="relative space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}


                onChange={handleChange}
                className="w-full p-2  border border-gray-800 text-white rounded"
              />
              {error?.fullName && <p className="text-red-400">{error?.fullName}</p>}
              <User className="absolute right-3 top-8  text-gray-400 h-5 w-5" />
            </div>


            <div className="relative space-y-2">
              <label htmlFor="dob" className="block text-sm font-medium">
                Date of Birth
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  id="dob"
                  className="bg-[#171717C4]"

                  value={formData.dob ? dayjs(formData.dob, 'DD/MM/YYYY') : null}
                  onChange={handleDateChange}
                  renderInput={(props) => <TextField {...props} fullWidth />}
                />
              </LocalizationProvider>
              {error?.dob && <p className="text-red-400">{error?.dob}</p>}
              <Calendar className="absolute right-3 top-10 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative space-y-2">
              <label htmlFor="contact" className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                value={formData.contact}
                required
                onChange={handleChange}
                className="w-full p-2  border border-gray-800 text-white rounded"
              />
              {formData.contact && !/^\d{10}$/.test(formData.contact) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number.</p>
              )}
              {error?.contact && <p className="text-red-400">{error?.contact}</p>}
              <Phone className="absolute right-3 top-8 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2  border border-gray-800 text-white rounded"
              />
              {error?.email && <p className="text-red-400">{error?.email}</p>}
              <Mail className="absolute right-3 top-8 h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-2">
              <label>Attach Recent Photo</label>
              <ImageUpload onChange={handleFileChange} file={file} setFile={setFile} />
              {error?.photo && <p className="text-red-400">{error?.photo}</p>}
            </div>

            <div className="relative space-y-2">
              <label htmlFor="preferredRole" className="block text-sm font-medium">
                Preferred Role
              </label>
              <div className="relative">
                <select
                  id="preferredRole"
                  required
                  value={formData.preferredRole}
                  onChange={handleChange}
                  className="w-full p-2  border border-gray-800 text-white rounded appearance-none pr-10"
                >
                  <option value="">Select Role</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="Wicket Keeper">Wicket Keeper</option>
                  <option value="All Rounder">All Rounder</option>
                </select>
                {error?.preferredRole && <p className="text-red-400">{error?.preferredRole}</p>}
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>

            </div>

            <div className="relative space-y-2">
              <label htmlFor="bowlingType" className="block text-sm font-medium">
                Bowling Type
              </label>
              <div className="relative">
                <select
                  id="bowlingType"
                  required
                  value={formData.bowlingType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-800 text-white rounded appearance-none pr-10"
                >
                  <option value="">Select Bowling Type</option>
                  <option value="Fast Bowler">Fast Bowler</option>
                  <option value="Medium Pace Bowler">Medium Pace Bowler</option>
                  <option value="Off Spin">Off Spin</option>
                  <option value="Leg Spin">Leg Spin</option>
                </select>
                {error?.bowlingType && <p className="text-red-400">{error?.bowlingType}</p>}
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>

            <div className="relative space-y-2">
              <label htmlFor="jerseySize" className="block text-sm font-medium">
                Jersey Size
              </label>
              <div className="relative">
                <input
                  required
                  id="jerseySize"
                  type="text"
                  value={formData.jerseySize}
                  onChange={handleChange}
                  list="jerseySizes"
                  className="w-full p-2  border border-gray-800 text-white rounded"
                  placeholder="Select or type size"
                />
                <datalist id="jerseySizes">
                  <option value="S" />
                  <option value="M" />
                  <option value="L" />
                  <option value="XL" />
                  <option value="XXL" />
                </datalist>
                {error?.jerseySize && <p className="text-red-400">{error?.jerseySize}</p>}
              </div>
            </div>

            <div className="relative space-y-2">
              <label className="block text-sm font-medium">
                Any Medical Condition
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="medicalCondition"
                    name="medicalCondition"
                    value="No"
                    required
                    checked={formData.medicalCondition === "No"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white">No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="medicalCondition"
                    name="medicalCondition"
                    required
                    value="Yes"
                    checked={formData.medicalCondition === "Yes"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white">Yes</span>
                </label>
              </div>

              {error?.medicalCondition && <p className="text-red-400">{error?.medicalCondition}</p>}

              {/* Conditionally render input field if "Yes" is selected */}
              {formData.medicalCondition === "Yes" && (
                <div className="mt-2">
                  <label htmlFor="medicalConditionDetails" className="block text-sm font-medium">
                    Specify Medical Condition
                  </label>
                  <input
                    id="medicalConditionDetails"
                    type="text"
                    required
                    value={formData.medicalConditionDetails}
                    onChange={handleChange}
                    className="w-full p-2  border border-gray-800 text-white rounded"
                    placeholder="Enter your medical condition"
                  />
                  {error?.medicalConditionDetails && <p className="text-red-500">{error?.medicalConditionDetails}</p>}
                </div>
              )}
            </div>

            <div className="relative space-y-2">
              <label htmlFor="emergencyContactName" className="block text-sm font-medium">
                Emergency Contact Name
              </label>
              <div className="relative ">
                <input
                  id="emergencyContactName"
                  required
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="w-full p-2  border border-gray-800 text-white rounded"
                  placeholder="Enter emergency contact name"
                />
              </div>
            </div>


            <div className="relative space-y-2">
              <label htmlFor="emergencyContact" className="block text-sm font-medium">
                Emergency Contact Number
              </label>
              <div className="relative">
                <input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full p-2  border border-gray-800 text-white rounded"
                  placeholder="Enter emergency contact number"
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                  maxLength="10"
                  required
                />
                {/* Optional error message display */}
                {formData.emergencyContact && !/^\d{10}$/.test(formData.emergencyContact) && (
                  <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number.</p>
                )}
                {error?.emergencyContact && <p className="text-red-500">{error?.emergencyContact}</p>}
              </div>
            </div>



            <div className="relative space-y-2">
              <label htmlFor="favoriteCricketer" className="block text-sm font-medium">
                Favourite Cricketer
              </label>
              <div className="relative">
                <input
                  id="favoriteCricketer"
                  type="text"
                  value={formData.favoriteCricketer}
                  onChange={handleChange}
                  className="w-full p-2  border border-gray-800 text-white rounded"
                  placeholder="Enter your favorite cricketer"
                />
                {error?.favoriteCricketer && <p className="text-red-500">{error?.favoriteCricketer}</p>}
              </div>
            </div>


            <button
              type="button"
              className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded"
              onClick={handleFormSubmit}
            >
              Preview
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

