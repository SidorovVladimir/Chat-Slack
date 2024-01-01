import React from 'react';
import i18next from 'i18next';
import LeoProfanity from 'leo-profanity';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './store/index.js';

const rollbarConfig = {
  enabled: true,
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const dictionary = LeoProfanity.getDictionary('ru');
  LeoProfanity.add(dictionary);

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Provider>
        </I18nextProvider>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
