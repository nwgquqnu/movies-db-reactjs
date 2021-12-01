import * as React from 'react';
import * as css from './FindInput.module.scss';

interface FindInputProps {
    value: string;
    placeholder: string;
    handleChange: React.ChangeEventHandler;
}

export default (props: FindInputProps) => (
    <label className={css.findInputLabel}>
        <span>Find your movie</span>
        <input
            className={css.findInput}
            type="text" value={props.value}
            placeholder={props.placeholder}
            onChange={props.handleChange} />
    </label>
);