export interface NewMovie {
    // Movie title
    // example: La La Land
    title: string;
    // Movie tagline
    // example: Here's to the fools who dream.
    tagline: string;
    // Movie average raiting
    // example: 7.9
    vote_average: number;
    
    // Total count of votes for the movie
    // example: 6782
    vote_count:	number;
    
    // Movie release date
    // example: 2016-12-29
    release_date: string;
    
    // Url to the poster image
    // example: https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg
    poster_path: string;
    
    // Short description of the movie
    // example: Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.
    overview: string;
    
    // Movie production budget
    // minimum: 0
    // example: 30000000
    budget:	number;
    
    // Movie revenue
    // example: 445435700
    // minimum: 0
    revenue: bigint;
    
    // Movie duration time
    // example: 128
    // minimum: 0
    runtime: number;
    
    genres: string[];
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
    tagline: "tagline",
    vote_average: "vote_average",
    vote_count: "vote_count",
    release_date: "release_date",
    poster_path: "poster_path",
    overview: "overview",
    budget: "budget",
    revenue: "revenue",
    runtime: "runtime",
    genres: "genres",
});

export const numericMovieFields = Object.freeze<SameKeyAndValue<PickByType<NewMovie, number> & PickByType<NewMovie, bigint>>>({
    vote_average: "vote_average",
    vote_count: "vote_count",
    budget: "budget",
    revenue: "revenue",
    runtime: "runtime",
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
