import React, { useState } from 'react';
import { Eye, Camera, User, Phone, Mail, Calendar } from 'lucide-react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        contactNumber: '',
        email: '',
        photo: null,
        preferredRole: '',
        bowlingType: '',
        specialSkills: '',
        jerseySize: '',
        medicalConditions: '',
        emergencyContactName: '',
        emergencyContactInfo: '',
        favouriteCricketer: '',
        acknowledgement: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleDateChange = (newValue) => {
        // Update the date field in Redux state
        dispatch({ type: 'form/updateField', payload: { field: 'date', value: newValue } })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);




    };


    const getRoleIcon = (role) => {
        switch (role) {
          case "Batsman":
            return <SportsCricketIcon className="text-gray-400 h-5 w-5" />;
          case "Bowler":
            return <SportsCricketIcon className="text-gray-400 h-5 w-5" />;
          case "All-rounder":
            return <SportsCricketIcon className="text-gray-400 h-5 w-5" />;
          case "Wicketkeeper":
            return <SportsCricketIcon className="text-gray-400 h-5 w-5" />;
          default:
            return <SportsCricketIcon className="text-gray-400 h-5 w-5" />;
        }

};

return (
<>

<div className='min-h-screen bg-black text-white'>

    {/* Fixed Header image */}

    <div className='fixed top-0 left-0 right-0 z-10'>
        <div className='relative w-full h-[200px]'>
            <img src="/ground.jpg" alt="Stadium-img" 
            className='object-cover brightness-75'/>
        </div>
        <div>
            <h1 className='text-center'>PLAYER DETAILS</h1>
        </div>
    </div>

    {/* Scrollable Content */}
    <div className=' realtive pt-[200px] min-h-screen'>
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
                <div className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                        <h3 className="pb-2">Full Name</h3>
                        <User className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="relative">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Calendar className="absolute right-3 top-10 transform -translate-y-1/6 text-white h-5 w-5" />
                            <DatePicker
                                value={formData.date ? dayjs(formData.date) : null}
                                onChange={handleDateChange}
                                className="w-full text-white placeholder:text-white"
                                format="Date of birth"
                            />
                        </LocalizationProvider>
                    </div>

                    {/* Contact Number */}
                    <div className="relative">
                        <h3 className="pb-2">Contact Number</h3>
                        <Phone className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
                        <input
                            type="tel"
                            name="contactNumber"

                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* E-mail Address */}
                    <div className="relative">
                        <h3 className="pb-2">E-mail Address</h3>
                        <Mail className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl- text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* Preferred Role */}
                    <div className="relative">
                        <h3 className="pb-2">Preferred Role</h3>
                        {/* Conditionally render icon based on selected role */}
                        <div className="absolute left-3 top-10 transform -translate-y-1/6">
                            {getRoleIcon(formData.preferredRole)}
                        </div>
                        <select
                            name="preferredRole"
                            value={formData.preferredRole}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        >
                            <option value="" disabled>
                                Select a Role
                            </option>
                            <option value="Batsman">Batsman</option>
                            <option value="Bowler">Bowler</option>
                            <option value="All-rounder">All-rounder</option>
                            <option value="Wicketkeeper">Wicketkeeper</option>
                        </select>
                    </div>


                    {/* Attach Recent Photograph */}
                    {/* <div className="relative">
                        <h3 className="pb-2">Attach Recent Photograph</h3>
                        <Camera className="absolute left-28 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 focus:outline-none focus:border-red-600"
                        />
                    </div> */}

                    {/* Additional Fields: Same structure as above */}
                    <div className="relative">
                        <h3 className="pb-2">Bowling Type</h3>
                        <input
                            type="text"
                            name="bowlingType"
                            value={formData.bowlingType}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    <div className="relative">
                        <h3 className="pb-2">Special Skills</h3>
                        <input
                            type="text"
                            name="specialSkills"
                            value={formData.specialSkills}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* Emergency Contact */}
                    <div className="relative">
                        <h3 className="pb-2">Emergency Contact Name</h3>
                        <input
                            type="text"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    <div className="relative">
                        <h3 className="pb-2">Emergency Contact Information</h3>
                        <input
                            type="text"
                            name="emergencyContactInfo"
                            value={formData.emergencyContactInfo}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* Acknowledgement */}
                    <div className="relative">
                        <h3 className="pb-2">Acknowledgement</h3>
                        <textarea
                            name="acknowledgement"
                            value={formData.acknowledgement}
                            onChange={handleChange}
                            className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white rounded-lg p-3 font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Eye className="h-5 w-5" />
                        Preview
                    </button>
                </div>
            </form>
    </div>

</div>
</>
    // <div className="bg-black text-white relative">
    //     <div className="max-w-md mx-auto space-y-8 relative z-0">
    //         <form onSubmit={handleSubmit} className="space-y-6 p-4">
    //             <div className="space-y-4">
    //                 {/* Full Name */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Full Name</h3>
    //                     <User className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
    //                     <input
    //                         type="text"
    //                         name="fullName"
    //                         value={formData.fullName}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* Date of Birth */}
    //                 <div className="relative">
    //                     <LocalizationProvider dateAdapter={AdapterDayjs} >
    //                         <Calendar className="absolute right-3 top-10 transform -translate-y-1/6 text-white h-5 w-5" />
    //                         <DatePicker
    //                             value={formData.date ? dayjs(formData.date) : null}
    //                             onChange={handleDateChange}
    //                             className="w-full text-white placeholder:text-white"
    //                             format="Date of birth"
    //                         />
    //                     </LocalizationProvider>
    //                 </div>

    //                 {/* Contact Number */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Contact Number</h3>
    //                     <Phone className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
    //                     <input
    //                         type="tel"
    //                         name="contactNumber"

    //                         value={formData.contactNumber}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* E-mail Address */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">E-mail Address</h3>
    //                     <Mail className="absolute right-3 top-10 transform -translate-y-1/6 text-gray-400 h-5 w-5" />
    //                     <input
    //                         type="email"
    //                         name="email"
    //                         placeholder="E-mail Address"
    //                         value={formData.email}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl- text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* Preferred Role */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Preferred Role</h3>
    //                     {/* Conditionally render icon based on selected role */}
    //                     <div className="absolute left-3 top-10 transform -translate-y-1/6">
    //                         {getRoleIcon(formData.preferredRole)}
    //                     </div>
    //                     <select
    //                         name="preferredRole"
    //                         value={formData.preferredRole}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     >
    //                         <option value="" disabled>
    //                             Select a Role
    //                         </option>
    //                         <option value="Batsman">Batsman</option>
    //                         <option value="Bowler">Bowler</option>
    //                         <option value="All-rounder">All-rounder</option>
    //                         <option value="Wicketkeeper">Wicketkeeper</option>
    //                     </select>
    //                 </div>


    //                 {/* Attach Recent Photograph */}
    //                 {/* <div className="relative">
    //                     <h3 className="pb-2">Attach Recent Photograph</h3>
    //                     <Camera className="absolute left-28 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    //                     <input
    //                         type="file"
    //                         name="photo"
    //                         onChange={handleFileChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div> */}

    //                 {/* Additional Fields: Same structure as above */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Bowling Type</h3>
    //                     <input
    //                         type="text"
    //                         name="bowlingType"
    //                         value={formData.bowlingType}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 <div className="relative">
    //                     <h3 className="pb-2">Special Skills</h3>
    //                     <input
    //                         type="text"
    //                         name="specialSkills"
    //                         value={formData.specialSkills}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* Emergency Contact */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Emergency Contact Name</h3>
    //                     <input
    //                         type="text"
    //                         name="emergencyContactName"
    //                         value={formData.emergencyContactName}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 <div className="relative">
    //                     <h3 className="pb-2">Emergency Contact Information</h3>
    //                     <input
    //                         type="text"
    //                         name="emergencyContactInfo"
    //                         value={formData.emergencyContactInfo}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* Acknowledgement */}
    //                 <div className="relative">
    //                     <h3 className="pb-2">Acknowledgement</h3>
    //                     <textarea
    //                         name="acknowledgement"
    //                         value={formData.acknowledgement}
    //                         onChange={handleChange}
    //                         className="w-full bg-black bg-opacity-60 border border-gray-800 rounded-lg py-2 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    //                     />
    //                 </div>

    //                 {/* Submit Button */}
    //                 <button
    //                     type="submit"
    //                     className="w-full bg-red-600 text-white rounded-lg p-3 font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
    //                 >
    //                     <Eye className="h-5 w-5" />
    //                     Preview
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
);
};

export default Form;
