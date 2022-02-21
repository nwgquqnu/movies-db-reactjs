import * as React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsButton from '.';
import { Movie } from '../../types/movieModels';
import { ActionType } from '../../types/movieActions';


describe("DetailsButton", () => {
    let movie: Movie; 

    beforeEach(() => {
        movie = {
            id: -1,
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
    it("dispatches an ShowEditMovie event when edit Button is clicked", () => {
        const mockFn = jest.fn();
        render(<DetailsButton movie={movie} dispatch={mockFn} containerClassName="some-test-class-name"/>);
        const btn = screen.queryByText(/Edit/);
        expect(btn).toBeInTheDocument();
        btn?.click();
        expect(mockFn).toHaveBeenCalledWith({ type: ActionType.ShowEditMovie, payload: movie})
    });

    it("dispatches an ShowDeleteMovie event when delete Button is clicked", () => {
        const mockFn = jest.fn();
        render(<DetailsButton movie={movie} dispatch={mockFn} containerClassName="some-test-class-name"/>);
        const btn = screen.queryByText(/Delete/);
        expect(btn).toBeInTheDocument();
        btn?.click();
        expect(mockFn).toHaveBeenCalledWith({ type: ActionType.ShowDeleteMovie, payload: movie})
    });


})