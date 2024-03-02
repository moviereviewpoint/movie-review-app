import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(0);

  const setProgress = (process) => {
    setLoading(process);
  };

  return (
    <LoadingContext.Provider value={{ loading, setProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
