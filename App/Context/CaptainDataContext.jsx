 import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainDataProvider = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);

  const updateCaptainData = (data) => {
    setCaptainData(data);
  };

  return (
    <CaptainDataContext.Provider value={{ captainData, updateCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
