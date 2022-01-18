import * as React from 'react';
import SubmitButton from '../../components/SubmitButton';
import { deleteMovie } from '../../store/moviesThunk';
import { AppDispatch } from '../../store/store';
import { ActionType, MovieDbStateAction } from '../../types/movieActions';
import { Movie } from '../../types/movieModels';
import * as css from './DeleteMovieForm.module.scss';

interface DeleteMovieFormProps {
    movie: Movie;
    dispatch: AppDispatch;
}

export default class DeleteMovieForm extends React.Component<DeleteMovieFormProps> {
    handleSubmit = (event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.dispatch(deleteMovie(this.props.movie));
        this.props.dispatch({ type: ActionType.HideMovieUpdate });
    };

    handleReset = (event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.dispatch({ type: ActionType.HideMovieUpdate });
    };

    render() {
        return (
            <article className={css.deleteMovieContainer}>
                <header>
                    <button onClick={this.handleReset}>X</button>
                    <h1>Delete Movie</h1>
                </header>
                <form className={css.deleteMovieForm} onSubmit={this.handleSubmit}>
                    <section>
                        <p>
                        Are you sure you want to delete this movie?
                        </p>
                    </section>

                    <footer>
                        <SubmitButton handler={this.handleSubmit} text="Confirm" />
                    </footer>
                </form>
            </article>
        );
    }
}