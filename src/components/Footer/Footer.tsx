import * as React from 'react'
import MainLogo from '../MainLogo';
import * as css from './Footer.module.css';

export default () => (
    <footer className={css.appFooter}>
        <MainLogo />
    </footer>
);