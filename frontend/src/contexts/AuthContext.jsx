/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userId'));
  const [currentUser, setCurrentUser] = useState(user?.username ?? null);

  const logIn = (response) => {
    const userName = response.data.username;
    setCurrentUser(userName);
    localStorage.setItem('userId', JSON.stringify(response.data));
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setCurrentUser(null);
  };
  const value = {
    currentUser,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
