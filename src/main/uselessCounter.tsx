import * as React from "react";

interface UselessCounterProps {
    changeBy: number;
}

interface UselessCounterState {
    value: number;
}

export default class UselessCounter extends React.PureComponent<UselessCounterProps, UselessCounterState> {
    constructor(props: UselessCounterProps) {
        super(props);
        this.state = { value: 0 };
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleIncrement() {
        this.setState((prevState, prevProps) => ({
            value: prevState.value + prevProps.changeBy
        }));
    }

    handleDecrement() {
        this.setState((prevState, prevProps) => ({
            value: prevState.value - prevProps.changeBy
        }));
    }

    render() {
        return (
            <div className="useless-counter">
                <span>{this.state.value}</span>
                <button onClick={this.handleIncrement}>+{this.props.changeBy}</button>
                <button onClick={this.handleDecrement}>-{this.props.changeBy}</button>

            </div>
        );
    }
}