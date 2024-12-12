import React from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-start mt-3 ml-2">
                    <button
                        onClick={() => navigate(-1) || navigate('/default-path')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Go Back to Form
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-start mb-4">
                        <label className="mb-2">
                            Admin Access Point
                        </label>
                        <input type="text" className="border rounded px-2 py-1" />
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default Admin
