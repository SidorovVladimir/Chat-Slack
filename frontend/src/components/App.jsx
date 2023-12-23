import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth.jsx";
import routes from "../routes.js";
import AuthProvider from "../contexts/AuthContext.jsx";
import ChatProvider from "../contexts/ChatContext.jsx";
import LoginPage from "./LoginPage.jsx";
import NotFound from "./NotFound.jsx";
import SignupPage from "./SignupPage.jsx";
import MainPage from "./MainPage.jsx";
import Nav from "./Nav.jsx";

const AuthMain = ({ children }) => {
  const auth = useAuth();

  return auth.currentUser ? children : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <ChatProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routes>
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path={routes.signupPagePath()} element={<SignupPage />} />
            <Route path={routes.notPagePath()} element={<NotFound />} />
            <Route
              path="/"
              element={
                <AuthMain>
                  <MainPage />
                </AuthMain>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </ChatProvider>
  </AuthProvider>
);

export default App;
