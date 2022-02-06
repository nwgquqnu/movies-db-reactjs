import * as React from "react";
import RadioToggle from "../../containers/RadioToggle";
import * as css from './GenreToggle.module.scss';

interface GenreToggleProps {
    activeGenre?: string | null;
    genres: ReadonlyArray<string>;
    selectedHandler: (genre: string | null) => void;
}

const GenreToggle = (props: GenreToggleProps) => {
    const changeHandler = (checkedValue: string) => {
        props.selectedHandler(checkedValue === "All" ? null : checkedValue);
    };
    return (
    <div className={css.genreToggle}>
        <RadioToggle values={['All', ...props.genres]} name="genres" selectedValue={props.activeGenre ?? "All"} changeHandler={changeHandler}/>
    </div>
)};

export default GenreToggle;