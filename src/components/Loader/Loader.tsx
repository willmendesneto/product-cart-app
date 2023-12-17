import { FunctionComponent } from 'react';

import classes from '@/components/Loader/Loader.module.scss';

export const Loader: FunctionComponent = () => (
  <div className={classes.loaderWrapper} data-testid="app-loader">
    <div className={classes.spinner}></div>
  </div>
);
