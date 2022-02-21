import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import { Movie } from "./types/movieModels";

function getMockedResolvedPromise(obj: object) {
    return Promise.resolve({
        json: () => Promise.resolve(obj),
    });
}
const mockedFetch = jest.fn(() =>
    getMockedResolvedPromise({ test: 100 }),
) as jest.Mock;

global.fetch = mockedFetch;
window.scrollTo = jest.fn();

beforeEach(() => {
    mockedFetch.mockClear();
});

describe("Application", () => {
    let movie: Movie | null = null;
    beforeEach(() => {
        movie = {
            id: 123,
            title: "movie title",
            tagline: "movie tagline",
            vote_average: 0,
            vote_count: 1,
            release_date: "movie release_date",
            poster_path: "movie poster_path",
            overview: "movie overview",
            budget: 2,
            revenue: 3,
            runtime: 4,
            genres: ["Action"],
        };
    });

    it("snapshot is matched on root path", async () => {
        mockedFetch.mockReturnValue(getMockedResolvedPromise({
            data: [movie]
        }));
        const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>, { wrapper: MemoryRouter });
        expect(await screen.findByText(/movie title/)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
    it("snapshot is matched on movie details path", async () => {
        mockedFetch.mockImplementation((urlStr: string) => {
            const url = new URL(urlStr);
            if (url.pathname.endsWith("/movies")) {
                return getMockedResolvedPromise({
                    data: [movie]
                });
            } else if (url.pathname.endsWith("/movies/123") && movie) {
                return getMockedResolvedPromise(movie);
            }
            return Promise.reject("Unexpected call");
        });
        const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>, { wrapper: MemoryRouter });
        const title = await screen.findByText(/movie title/);
        expect(title).toBeInTheDocument();
        fireEvent.click(title);

        expect(await screen.findByText(/movie overview/)).toBeInTheDocument();
        
        expect(asFragment()).toMatchSnapshot();

    });

});