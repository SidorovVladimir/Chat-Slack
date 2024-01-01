import React from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../utils/routes';
import img from '../../assets/notFound.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image src={img} className="img-fluid" alt={t('notFound.title')} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.subTitle')}
        <NavLink to={routes.chatPage()}>{t('notFound.linkMainPage')}</NavLink>
      </p>
    </div>
  );
};
export default NotFound;
