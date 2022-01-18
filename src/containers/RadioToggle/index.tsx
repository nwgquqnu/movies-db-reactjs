import * as React from "react";

interface RadioToggleProps {
    name: string;
    selectedValue: string;
    values: string[];
    changeHandler: (checkedValue: string) => void;
}

export default class RadioToggle extends React.Component<RadioToggleProps, { [key: string]: string; }> {
    constructor(props: RadioToggleProps) {
        super(props);
        this.state = {}
    }
 
    static getDerivedStateFromProps(props: RadioToggleProps) {
        const newState: { [key: string]: string; } = {};
        props.values.forEach(value => {
            if (!newState[value]) {
                newState[value] = `radio-toggle-${Math.ceil(Math.random() * 1000)}-${value.replaceAll(' ', '-')}`;
            }
        });
        return newState;
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.changeHandler(event.target.value);
    };

    render() {
        const inputList = this.props.values.map((value) =>
            <React.Fragment key={this.state[value]}>
                <input
                    id={this.state[value]}
                    className="radio-toggle"
                    name={this.props.name}
                    type="radio"
                    checked={this.props.selectedValue === value}
                    value={value}
                    onChange={this.handleChange} />
                <label htmlFor={this.state[value]}>{value}</label>
            </React.Fragment>
        );
        return (
            <>
                {inputList}
            </>
        );
    }
}