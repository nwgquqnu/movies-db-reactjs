import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import { Movie } from "./types/movieModels";
import "./mocks/setupServer";

window.scrollTo = jest.fn();

describe("Application", () => {
    it("snapshot is matched on root path", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>, { wrapper: MemoryRouter });
        expect(await screen.findByText(/movie title/)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
    it("snapshot is matched on movie details path", async () => {
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