import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BackgroundLayer from './BackgroundLayer';


it("background layer renders children", () => {
    render(
        <BackgroundLayer>
            <div data-testid="custom-element" />
        </BackgroundLayer>
    );
    expect(screen.queryByTestId("custom-element")).toBeInTheDocument();
});