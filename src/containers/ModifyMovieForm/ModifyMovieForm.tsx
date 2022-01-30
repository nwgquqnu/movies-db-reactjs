import * as React from 'react';
import ResetButton from '../../components/ResetButton';
import SubmitButton from '../../components/SubmitButton';
import { NewMovie, newMovieFields, NewMovieKeys, numericMovieFields } from '../../types/movieModels';
import * as css from './ModifyMovieForm.module.scss';

interface ModifyMovieFormProps<MovieType> {
    title: string;
    movie?: MovieType;
    genreList: ReadonlyArray<string>;
    emptyMovieCreator: new () => MovieType;
    submitHandler: (submittedMovie: MovieType) => void;
    closeHandler: () => void;
}

type AddMovieErrors = Partial<Record<keyof NewMovie, string>>;
interface ModifyMovieFormState<MovieType extends NewMovie> {
    errors: AddMovieErrors;
    movie: MovieType;
}

export default class ModifyMovieForm<MovieType extends NewMovie> extends React.Component<ModifyMovieFormProps<MovieType>, ModifyMovieFormState<MovieType>> {
    constructor(props: ModifyMovieFormProps<MovieType>) {
        super(props);
        this.state = {
            errors: {},
            movie: (props.movie) ? props.movie : new props.emptyMovieCreator(),
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const currentTarget = event.currentTarget;
        const fieldName: NewMovieKeys = currentTarget.name as NewMovieKeys;

        this.setState(prevState => (
            {
                movie: {
                    ...prevState.movie,
                    [fieldName]: this.parseFieldValue(fieldName, prevState.movie[fieldName], currentTarget.value)
                },
                errors: { ...prevState.errors, [fieldName]: undefined },
            }));
    };

    handleMultiSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const currentTarget = event.currentTarget;
        const fieldName: NewMovieKeys = currentTarget.name as NewMovieKeys;
        var options = Array.from(currentTarget.selectedOptions, option => option.value);;
        this.setState(prevState => (
            {
                movie: { ...prevState.movie, [fieldName]: options },
                errors: { ...prevState.errors, [fieldName]: undefined },
            }));
    };

    handleSubmit = (event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.validateForm()) {
            const movie = this.getMovieForSubmit();
            this.props.submitHandler(movie);
        }
    };

    handleReset = (event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState((_, prevProps) => ({ movie: new prevProps.emptyMovieCreator(), errors: {} }));
    };

    parseFieldValue(fieldName: string, value: any, nextValue: string): number | string {
        if (fieldName in numericMovieFields) {
            const parsedNextValue = Number(nextValue);
            return Number.isNaN(parsedNextValue) ? value : parsedNextValue;
        }
        return nextValue;
    }

    getPreviousYears(): Array<number> {
        const date = new Date();
        const release_date = date.getFullYear();

        const yearsArr = [];
        for (let i = 0; i <= 50; i++) {
            yearsArr.push(release_date - i);
        }
        return yearsArr;
    }

    getMovieForSubmit(): MovieType {
        const movie = this.state.movie;
        if (!movie.tagline) {
            movie.tagline = "This should not be empty but it is";
        }
        return movie;
    }

    validateForm(): boolean {
        let validationResult = true;
        const errors: AddMovieErrors = {};

        if (!this.state.movie.title) {
            errors.title = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.release_date) {
            errors.release_date = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.genres.length === 0) {
            errors.genres = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.poster_path) {
            errors.poster_path = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.overview) {
            errors.overview = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.vote_average <= 0) {
            errors.vote_average = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.runtime <= 0) {
            errors.runtime = "Cannot be empty";
            validationResult = false;
        }
        this.setState({ errors });

        return validationResult;
    }

    getStringValue(n: number, precicion?: number): string {
        if (n < 0) {
            return "";
        }
        if (precicion) {
            return n.toPrecision(precicion);
        }
        return "" + n;
    }

    render() {
        return (
            <article className={css.modifyMovieContainer}>
                <header>
                    <button onClick={this.props.closeHandler}>X</button>
                    <h1>{this.props.title}</h1>
                </header>
                <form className={css.modifyMovieForm} onSubmit={this.handleSubmit}>
                    <section>
                        <label>
                            <span>Title</span>
                            <input name={newMovieFields.title}
                                type="text" value={this.state.movie.title}
                                onChange={this.handleChange} />
                            <span className={css.errorMessage}>{this.state.errors.title}</span>
                        </label>
                        <label>
                            <span>Release Date</span>
                            <select name={newMovieFields.release_date} value={this.state.movie.release_date} onChange={this.handleChange} placeholder="Release Date">
                                <option value=""></option>
                                {this.getPreviousYears().map(release_date => (
                                    <option key={release_date} value={release_date}>{release_date}</option>
                                ))}
                            </select>
                            <span className={css.errorMessage}>{this.state.errors.release_date}</span>
                        </label>
                        <label>
                            <span>Movie URL</span>
                            <input name={newMovieFields.poster_path}
                                type="url" value={this.state.movie.poster_path}
                                onChange={this.handleChange} placeholder="https://" />
                            <span className={css.errorMessage}>{this.state.errors.poster_path}</span>
                        </label>
                        <label>
                            <span>VoteAverage</span>
                            <input name={newMovieFields.vote_average}
                                type="text" value={this.getStringValue(this.state.movie.vote_average, 2)}
                                onChange={this.handleChange} pattern="\d+.?(\d{0,2})?" placeholder="7.8" />
                            <span className={css.errorMessage}>{this.state.errors.vote_average}</span>
                        </label>
                        <label>
                            <span>Genre</span>
                            <select name={newMovieFields.genres} multiple={true} value={this.state.movie.genres} onChange={this.handleMultiSelectChange}>
                                {this.props.genreList.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                            <span className={css.errorMessage}>{this.state.errors.genres}</span>
                        </label>
                        <label>
                            <span>Runtime</span>
                            <input name={newMovieFields.runtime}
                                type="text" value={this.getStringValue(this.state.movie.runtime)}
                                onChange={this.handleChange} pattern="\d+" placeholder="minutes" />
                            <span className={css.errorMessage}>{this.state.errors.runtime}</span>
                        </label>
                        <label className={css.movieDescription}>
                            <span>Overview</span>
                            <textarea name={newMovieFields.overview}
                                value={this.state.movie.overview}
                                onChange={this.handleChange} />
                            <span className={css.errorMessage}>{this.state.errors.overview}</span>
                        </label>
                    </section>

                    <footer>
                        <ResetButton handler={this.handleReset} />
                        <SubmitButton handler={this.handleSubmit} />

                    </footer>
                </form>
            </article>
        );
    }
}