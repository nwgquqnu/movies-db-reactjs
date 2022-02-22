import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import AddButton from '.';


it("Add Button is rendered with correct text and handler is called on click", () => {
    const mockFn = jest.fn();
    render(<AddButton text="expected text" handler={mockFn} />);
    const btn = screen.queryByText(/expected text/);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn!);
    expect(mockFn).toBeCalledTimes(1);
});