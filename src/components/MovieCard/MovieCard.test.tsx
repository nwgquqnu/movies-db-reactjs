import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";
import { MemoryRouter, Route, Routes, useSearchParams } from "react-router-dom";
import MovieCard from ".";
import { Movie } from "../../types/movieModels";

describe("MovieCard", () => {
    let movie: Movie;

    beforeEach(() => {
        movie = {
            id: 123,
            title: "title",
            tagline: "tagline",
            vote_average: 0,
            vote_count: 1,
            release_date: "release_date",
            poster_path: "poster_path",
            overview: "overview",
            budget: 2,
            revenue: 3,
            runtime: 4,
            genres: ["genres"],
        };

    });

    it("corresponds to a snapshot", () => {
        const { asFragment } = render(
            <MovieCard movie={movie} dispatch={jest.fn()} />, { wrapper: MemoryRouter }
        );
        expect(asFragment()).toMatchSnapshot();
    });
    it("sets query params on click", () => {
        let testLocation: string | null = null;

        const LocationRetriever = () => {
            const [searchParams] = useSearchParams();
            testLocation = searchParams.toString();
            return <></>;
        };
        render(
            <MemoryRouter>
                <MovieCard movie={movie} dispatch={jest.fn()} />
                <Routes>
                    <Route
                        path="*"
                        element={<LocationRetriever />}
                    />
                </Routes>
            </MemoryRouter>
        );
        const article = screen.queryByRole("article");
        expect(article).toBeInTheDocument();
        userEvent.click(article!);

        expect(testLocation).toEqual("movie=123");
    });
});