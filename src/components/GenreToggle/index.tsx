import * as React from "react";
import RadioToggle from "../../containers/RadioToggle";
import { ActionType, MovieDbStateAction } from "../../types/movieActions";
import * as css from './GenreToggle.module.scss'

interface GenreToggleProps {
    activeGenre?: string;
    genres: ReadonlyArray<string>;
    dispatch: React.Dispatch<MovieDbStateAction>;
}

const GenreToggle = (props: GenreToggleProps) => {
    const changeHandler = React.useCallback(
        (checkedValue) => {
            props.dispatch({ type: ActionType.ActiveGenreChange, payload: (checkedValue === "All" ? undefined : checkedValue) });
        },
        [props.dispatch],
    )
    return (
    <div className={css.genreToggle}>
        <RadioToggle values={['All', ...props.genres]} name="genres" selectedValue={props.activeGenre ?? "All"} changeHandler={changeHandler}/>
    </div>
)};

export default GenreToggle;