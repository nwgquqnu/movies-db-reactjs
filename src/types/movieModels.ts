export interface NewMovie {
    title: string;
    year: string;
    genre: string[];
    posterUrl: string;
    description: string;
    runtime: number;
    rating: number;
}

export type NewMovieKeys = keyof NewMovie;

type SameKeyAndValue<T> = {
    [Key in keyof T as Extract<Key, string>]: `${Extract<Key, string>}`;
};

export type NewMovieFields = SameKeyAndValue<NewMovie>;

type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
  }

export const newMovieFields = Object.freeze<NewMovieFields>({
    title: "title",
    year: "year",
    genre: "genre",
    posterUrl: "posterUrl",
    description: "description",
    runtime: "runtime",
    rating: "rating",
});

export const numericMovieFields = Object.freeze<SameKeyAndValue<PickByType<NewMovie, number>>>({
    runtime: "runtime",
    rating: "rating",
})

export interface Movie extends NewMovie {
    id: string;
}

export enum SortOrder {
    ByNameAsc = "BY_NAME_ASC",
    ByNameDesc = "BY_NAME_DESC",
    ByReleaseAsc = "BY_RELEASE_ASC",
    ByReleaseDesc = "BY_RELEASE_DESC",
}

export enum UpdateActivity {
    addActivity = "ADD_ACTIVITY",
    editActivity = "EDIT_ACTIVITY",
    deleteActivity = "DELETE_ACTIVITY",
}

export interface MovieDbState {
    readonly moviesList: ReadonlyArray<Movie>;
    readonly filteredMoviesList: ReadonlyArray<Movie>;
    readonly genres: ReadonlyArray<string>;
    readonly activeGenre?: string;
    readonly selectedMovie?: Readonly<Movie>;
    readonly sortOrder: SortOrder;
    readonly movieUnderUpdateActivity?: Readonly<Movie>;
    readonly currentUpdateActivity?: UpdateActivity;
}
