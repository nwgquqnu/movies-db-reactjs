import React from "react";

export default class RadioToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkedValue: this.calculateInitialValue() };
        this.handleChange = this.handleChange.bind(this);
        this.idMap = {};
        this.generateIdsForValues();
    }

    calculateInitialValue() {
        if (this.props.initialValue) {
            return this.props.initialValue;
        }
        return (this.props.values.length && this.props.values[0]) || ''
    }

    handleChange(event) {
        this.setState({ checkedValue: event.target.value });
    }

    generateIdsForValues() {
        this.props.values.forEach(value => {
            if (!this.idMap[value]) {
                this.idMap[value] = `radio-toggle-${Math.ceil(Math.random() * 1000)}-${value}`;
            }
        });

    }

    render() {
        const inputList = this.props.values.map((value) =>
            <>
                <input 
                    id={this.idMap[value]}
                    className="radio-toggle"
                    name={this.props.name} 
                    type="radio" 
                    checked={this.state.checkedValue === value} 
                    value={value} 
                    onChange={this.handleChange} />
                <label htmlFor={this.idMap[value]}>{value}</label>
            </>
        )
        return (
            <>
                {inputList}
            </>
        );
    }
}