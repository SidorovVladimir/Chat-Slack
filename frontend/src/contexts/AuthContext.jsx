/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logIn = (response) => {
    const userName = response.data.username;
    setCurrentUser(userName);
    localStorage.setItem("userId", JSON.stringify(response.data));
  };
  const logOut = () => {
    localStorage.removeItem("userId");
    setCurrentUser(null);
  };
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };
  const value = {
    currentUser,
    logIn,
    logOut,
    getAuthHeader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
