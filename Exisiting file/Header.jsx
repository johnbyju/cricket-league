import React from 'react'

function Header() {
    return (
        <div className="z-10 this-is-header fixed flex flex-col justify-center w-full">
            <div className="z-10  w-full">
                <img src="/ground.jpg" alt="Background" className="z-10" />
            </div>
            <div className="text-center text-white bg-black ">
                <h1 className="text-2xl font-semibold py-4">Player Details</h1>
            </div>
        </div>
    )
}

export default Header