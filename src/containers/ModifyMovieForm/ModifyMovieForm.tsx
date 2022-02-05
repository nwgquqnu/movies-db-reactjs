import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
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

function isValidHttpUrl(testUrl: string) {
    let url;
    
    try {
      url = new URL(testUrl);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

function validateForm(values: NewMovie): FormikErrors<NewMovie> {
    const errors: FormikErrors<NewMovie> = {};

    if (!values.title) {
        errors.title = "Cannot be empty";
    }

    if (!values.release_date) {
        errors.release_date = "Cannot be empty";
    }
    if (values.genres.length === 0) {
        errors.genres = "Cannot be empty";
    }
    if (!values.poster_path) {
        errors.poster_path = "Cannot be empty";
    } else if (!isValidHttpUrl(values.poster_path)) {
        errors.poster_path = "Is not valid url. It must start from http: or https:";
    }
    if (!values.overview) {
        errors.overview = "Cannot be empty";
    }
    if (!String(values.vote_average) || values.vote_average <= 0) {
        errors.vote_average = "Cannot be empty";
    } else if (isNaN(+String(values.vote_average))) {
        errors.vote_average = "Must be a numeric value";
    }
    if (!String(values.runtime) || values.runtime <= 0) {
        errors.runtime = "Cannot be empty";
    } else if (isNaN(+String(values.runtime))) {
        errors.vote_average = "Must be a numeric value";
    }
    if (!values.tagline) {
        errors.tagline = "Cannot be empty";
    }
    return errors;
}

function copyValuesForSubmit<MovieType extends NewMovie>(valueToChange: MovieType, modifiedValues: NewMovie): MovieType {
    const modifiedValuesWithConvertedTypes: NewMovie = {...modifiedValues};
    Object.keys(numericMovieFields).forEach((key: keyof typeof numericMovieFields) => {
        modifiedValuesWithConvertedTypes[key] = +modifiedValuesWithConvertedTypes[key];
    })
    Object.entries(modifiedValuesWithConvertedTypes).forEach(<Key extends keyof NewMovie>([key, value]: [Key, NewMovie[Key]]) => {
        (valueToChange as NewMovie)[key] = value;
    })
    return valueToChange;
}

export default <MovieType extends NewMovie> (props: ModifyMovieFormProps<MovieType>) => {
    const initialValues: MovieType = (props.movie) ? {...props.movie} : new props.emptyMovieCreator();
    return (
        <article className={css.modifyMovieContainer}>
            <header>
                <button onClick={props.closeHandler}>X</button>
                <h1>{props.title}</h1>
            </header>
            <Formik
                validate={validateForm}
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const appliedValues = copyValuesForSubmit(initialValues, values);
                    props.submitHandler(appliedValues);
                    actions.setSubmitting(false);         
                  }}
            >
                {(formikProps) => (

                    <Form className={css.modifyMovieForm}>
                        <section>
                            <label>
                                <span>Title</span>
                                <Field name={newMovieFields.title}/>
                                <ErrorMessage name={newMovieFields.title} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>Release Date</span>
                                <Field name={newMovieFields.release_date} type="date" placeholder="Release Date"/>
                                <ErrorMessage name={newMovieFields.release_date} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>Movie URL</span>
                                <Field name={newMovieFields.poster_path} type="url" placeholder="https://"/>
                                <ErrorMessage name={newMovieFields.poster_path} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>VoteAverage</span>
                                <Field name={newMovieFields.vote_average} pattern="\d+.?(\d{0,2})?" placeholder="7.8"/>
                                <ErrorMessage name={newMovieFields.vote_average} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>Genre</span>
                                <Field name={newMovieFields.genres} as="select" multiple={true}>
                                    {props.genreList.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name={newMovieFields.genres} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>Runtime</span>
                                <Field name={newMovieFields.runtime} pattern="\d+" placeholder="minutes"/>
                                <ErrorMessage name={newMovieFields.runtime} className={css.errorMessage} component="span" />
                            </label>
                            <label className={css.movieDescription}>
                                <span>Overview</span>
                                <Field name={newMovieFields.overview} as="textarea" />
                                <ErrorMessage name={newMovieFields.overview} className={css.errorMessage} component="span" />
                            </label>
                            <label>
                                <span>Tag line</span>
                                <Field name={newMovieFields.tagline}/>
                                <ErrorMessage name={newMovieFields.tagline} className={css.errorMessage} component="span" />
                            </label>
                        </section>

                        <footer>
                            <ResetButton handler={formikProps.handleReset} />
                            <SubmitButton handler={ e => formikProps.handleSubmit() } />

                        </footer>
                    </Form>
                )}

            </Formik>
        </article>
    );
}
