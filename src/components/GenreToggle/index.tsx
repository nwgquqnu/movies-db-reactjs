import * as React from "react";
import RadioToggle from "../../containers/RadioToggle";
import { fetchMovies } from "../../store/moviesThunk";
import { AppDispatch } from "../../store/store";
import { ActionType, MovieDbStateAction } from "../../types/movieActions";
import * as css from './GenreToggle.module.scss'

interface GenreToggleProps {
    activeGenre?: string;
    genres: ReadonlyArray<string>;
    dispatch: AppDispatch;
}

const GenreToggle = (props: GenreToggleProps) => {
    const changeHandler = (checkedValue: string) => {
        props.dispatch(fetchMovies({ activeGenre: (checkedValue === "All" ? null : checkedValue) }));
    };
    return (
    <div className={css.genreToggle}>
        <RadioToggle values={['All', ...props.genres]} name="genres" selectedValue={props.activeGenre ?? "All"} changeHandler={changeHandler}/>
    </div>
)};

export default GenreToggle;