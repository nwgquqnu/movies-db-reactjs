import * as React from 'react';
import * as css from './AddButton.module.css'

interface ButtonProps {
    handler: <T extends React.SyntheticEvent<HTMLButtonElement>>(event: T) => void;
    text: string;
};

export default (props: ButtonProps) => (
    <button className={css.addButton} onClick={props.handler}>{props.text}</button>
);