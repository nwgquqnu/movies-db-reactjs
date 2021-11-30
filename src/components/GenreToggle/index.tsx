import * as React from "react";
import RadioToggle from "../../containers/RadioToggle";
import * as css from './GenreToggle.module.css'

const GenreToggle = () => (
    <div className={css.genreToggle}>
        <RadioToggle values={['All', 'Documentary', 'Comedy', 'Horror', 'Crime']} name="genres" initialValue="All"/>
    </div>
);

export default GenreToggle;