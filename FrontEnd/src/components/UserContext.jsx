import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  });

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || '';
    const storedLastName = localStorage.getItem('lastName') || '';
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setUser({ firstName: storedFirstName, lastName: storedLastName, isAuthenticated });
  }, []);

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    if (updatedFields.firstName) localStorage.setItem('firstName', updatedFields.firstName);
    if (updatedFields.lastName) localStorage.setItem('lastName', updatedFields.lastName);
    if (typeof updatedFields.isAuthenticated === 'boolean') {
      localStorage.setItem('isAuthenticated', updatedFields.isAuthenticated.toString());
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};