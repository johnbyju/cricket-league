import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context to store the photo globally
const PhotoContext = createContext();

export const usePhoto = () => {
  return useContext(PhotoContext);
};

export const PhotoProvider = ({ children }) => {
  const [photo, setPhoto] = useState(null);

  // Load photo from localStorage if it exists
  useEffect(() => {
    const storedPhoto = localStorage.getItem('userPhoto');
    if (storedPhoto) {
      setPhoto(storedPhoto); // Restore the photo from localStorage
    }
  }, []);

  // Save the photo to localStorage whenever it changes
  useEffect(() => {
    if (photo) {
      localStorage.setItem('userPhoto', photo);
    }
  }, [photo]);

  return (
    <PhotoContext.Provider value={{ photo, setPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
