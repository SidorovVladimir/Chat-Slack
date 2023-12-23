import React from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import SocketContext from './contexts/SocketContext.jsx';

const rollbarConfig = {
  enabled: true,
  accessToken: process.env.rollbar_token,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SocketContext.Provider value={socket}>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </SocketContext.Provider>
          </Provider>
        </I18nextProvider>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
