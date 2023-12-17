import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import classes from '@/pages/NotFound/NotFound.module.scss';

export const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <section className={classes.notFoundSection}>
      <h1>{t('common:titleNotFound')}</h1>
    </section>
  );
};
