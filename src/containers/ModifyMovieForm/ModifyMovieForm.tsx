import * as React from 'react';
import ResetButton from '../../components/ResetButton';
import SubmitButton from '../../components/SubmitButton';
import { NewMovie, newMovieFields, NewMovieKeys } from '../../types/movieModels';
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
        
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
        event.preventDefault();
        event.stopPropagation();
        const currentTarget = event.currentTarget;
        const fieldName: NewMovieKeys = currentTarget.name as NewMovieKeys;
        console.log(`change event name ${currentTarget.name} and value ${currentTarget.value}`)

        this.setState(prevState =>(
            {
                movie: {...prevState.movie, [fieldName]: currentTarget.value },
                errors: {...prevState.errors, [fieldName]: undefined },
            }));
    }

    handleMultiSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        event.stopPropagation();
        const currentTarget = event.currentTarget;
        const fieldName: NewMovieKeys = currentTarget.name as NewMovieKeys;
        var options = Array.from(currentTarget.selectedOptions, option => option.value);;
        this.setState(prevState =>(
            {
                movie: {...prevState.movie, [fieldName]: options },
                errors: {...prevState.errors, [fieldName]: undefined },
            }));
      }
    handleSubmit(event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        if (this.validateForm()) {
            this.props.submitHandler(this.state.movie);
        }
    }
    handleReset(event: React.SyntheticEvent<HTMLFormElement> | React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.setState((_, prevProps) => ({ movie: new prevProps.emptyMovieCreator(), errors: {}}));
    }

    getPreviousYears(): Array<number> {
        const date = new Date();
        const year = date.getFullYear();

        const yearsArr = [];
        for(let i = 0; i <= 50; i++) {
            yearsArr.push(year-i);
        }
        return yearsArr;
    }

    validateForm(): boolean {
        let validationResult = true;
        console.log(`validate form movie ${JSON.stringify(this.state.movie)}`)
        const errors: AddMovieErrors = {};

        if (!this.state.movie.title) {
            errors.title = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.year) {
            errors.year = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.genre.length === 0) {
            errors.genre = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.posterUrl) {
            errors.posterUrl = "Cannot be empty";
            validationResult = false;
        }
        if (!this.state.movie.description) {
            errors.description = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.rating <= 0) {
            errors.rating = "Cannot be empty";
            validationResult = false;
        }
        if (this.state.movie.runtime <= 0) {
            errors.runtime = "Cannot be empty";
            validationResult = false;
        }
        this.setState({ errors });

        return validationResult;
    }

    getStringValue(n: number): string{
        return n < 0 ? "" : "" + n;
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
                            <select name={newMovieFields.year} value={this.state.movie.year} onChange={this.handleChange} placeholder="Release Date">
                                <option value=""></option>
                                {this.getPreviousYears().map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <span className={css.errorMessage}>{this.state.errors.year}</span>
                        </label>
                        <label>
                            <span>Movie URL</span>
                            <input name={newMovieFields.posterUrl}
                                type="url" value={this.state.movie.posterUrl}
                                onChange={this.handleChange} placeholder="https://"/>
                            <span className={css.errorMessage}>{this.state.errors.posterUrl}</span>
                        </label>
                        <label>
                            <span>Rating</span>
                            <input name={newMovieFields.rating}
                                type="text" value={this.getStringValue(this.state.movie.rating)}
                                onChange={this.handleChange} pattern="\d+.?(\d{0,2})?" placeholder="7.8"/>
                            <span className={css.errorMessage}>{this.state.errors.rating}</span>
                        </label>
                        <label>
                            <span>Genre</span>
                            <select name={newMovieFields.genre} multiple={true} value={this.state.movie.genre} onChange={this.handleMultiSelectChange}>
                                {this.props.genreList.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                            <span className={css.errorMessage}>{this.state.errors.genre}</span>
                        </label>
                        <label>
                            <span>Runtime</span>
                            <input name={newMovieFields.runtime}
                                type="text" value={this.getStringValue(this.state.movie.runtime)}
                                onChange={this.handleChange} pattern="\d+" placeholder="minutes"/>
                            <span className={css.errorMessage}>{this.state.errors.runtime}</span>
                        </label>
                        <label className={css.movieDescription}>
                            <span>Overview</span>
                            <textarea name={newMovieFields.description}
                                value={this.state.movie.description}
                                onChange={this.handleChange}/>
                            <span className={css.errorMessage}>{this.state.errors.description}</span>
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