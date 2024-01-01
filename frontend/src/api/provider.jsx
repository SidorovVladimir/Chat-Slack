import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from './index.js';

const AxiosInterceptor = ({ children }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const responseInterceptor = (response) => response;
    const errorInterceptor = (error) => {
      if (error.message === 'Network Error') {
        toast.error(t('errors.networkError'));
      }
      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(responseInterceptor, errorInterceptor);

    return () => api.interceptors.response.eject(interceptor);
  }, [t]);
  return children;
};

export default AxiosInterceptor;
