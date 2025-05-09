import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const setLocalStorage = () => {
    localStorage.setItem("History", JSON.stringify([]));
  };

  const getLocalStorage = () => {
    const item = localStorage.getItem("History");
    return item ? JSON.parse(item) : [];
  };

  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("History")) {
      setLocalStorage();
    }

    const history = getLocalStorage();
    

    const uniqueHistory = history.filter((value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
    );
    setUserHistory(uniqueHistory);
  }, []);

  return (
    <AuthContext.Provider value={userHistory}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;