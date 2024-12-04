import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PlayerDetails from './components/UserForm';
import PreviewPage from './components/PreviewPage';
import LoadingScreen from './components/LoadingScreen'; // Import LoadingScreen component

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate initial loading process or wait until all resources are loaded
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a short time (simulate page load)
    }, 3000); // You can adjust the timeout duration to your liking (2 seconds in this example)

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Show the LoadingScreen until isLoading is true */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<PlayerDetails />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      )}
    </>
  );
}
