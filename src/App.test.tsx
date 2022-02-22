import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "./mocks/setupServer";
import { store } from "./store/store";

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
        userEvent.click(title);

        expect(await screen.findByText(/movie overview/)).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();

    });

});