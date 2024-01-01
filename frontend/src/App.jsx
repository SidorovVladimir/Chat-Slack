import React from 'react';
import {
  Route, Routes, BrowserRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './utils/routes.js';
import AuthProvider from './contexts/AuthContext.jsx';
import ApiChatProvider from './contexts/ApiContext.jsx';
import PrivateRoute from './containers/PrivateRoute.jsx';
import Navbar from './containers/Navbar.jsx';
import AxiosInterceptor from './api/provider.jsx';

import LoginPage from './pages/Login/LoginPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import ChatPage from './pages/Chat/ChatPage.jsx';

const App = () => (
  <AxiosInterceptor>
    <AuthProvider>
      <ApiChatProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <Routes>
              <Route path={routes.login()} element={<LoginPage />} />
              <Route path={routes.signup()} element={<SignupPage />} />
              <Route path={routes.notPage()} element={<NotFound />} />
              <Route
                path={routes.chatPage()}
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
              )}
              />
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </ApiChatProvider>
    </AuthProvider>
  </AxiosInterceptor>
);

export default App;
