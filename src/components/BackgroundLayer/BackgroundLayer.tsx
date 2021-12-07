import * as React from 'react';
import * as css from './BackgroundLayer.module.scss';

export default (props: React.PropsWithChildren<{}>) => (
    <div className={css.backLayer}>
        {props.children};
    </div>
);