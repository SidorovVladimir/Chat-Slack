import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.subTitle')}
        <a href="/">{t('notFound.linkMainPage')}</a>
      </p>
    </div>
  );
};
export default NotFound;
