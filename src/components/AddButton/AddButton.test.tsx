import * as React from 'react';
import { render, screen } from '@testing-library/react';
import AddButton from '.';


it("Add Button is rendered with correct text and handler is called on click", () => {
    const mockFn = jest.fn();
    render(<AddButton text="expected text" handler={mockFn}/>);
    const btn = screen.queryByText(/expected text/);
    expect(btn).toBeInTheDocument();
    btn?.click();
    expect(mockFn).toBeCalledTimes(1);
});