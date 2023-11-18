/* eslint-disable react/jsx-no-constructed-context-values */
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./LoginPage.jsx";
import NotFound from "./NotFound.jsx";
import SignupPage from "./SignupPage.jsx";
import Header from "./Header.jsx";
import ChatPage from "./ChatPage.jsx";
import AuthContext from "../contexts/index.jsx";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
