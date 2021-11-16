import React from "react"

export default class UselessCounter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleIncrement() {
        this.setState((state, props) => ({
            value: state.value + props.changeBy
        }));
    }

    handleDecrement() {
        this.setState((state, props) => ({
            value: state.value - props.changeBy
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