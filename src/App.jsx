import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PlayerDetails from './components/UserForm';
import PreviewPage from './components/PreviewPage';
import LoadingScreen from './components/LoadingScreen';
import { PhotoProvider } from './components/PhotoContext';
import Admin from './components/Admin';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
   
  }, []);

  
  return (
    <PhotoProvider> {/* Wrap your app in the ImageProvider */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<PlayerDetails />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      )}
    </PhotoProvider>
  );
}
