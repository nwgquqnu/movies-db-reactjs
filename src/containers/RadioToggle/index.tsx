import * as React from "react";

interface RadioToggleProps {
    name: string;
    selectedValue: string;
    values: string[];
    changeHandler: (checkedValue: string) => void;
}

export default class RadioToggle extends React.Component<RadioToggleProps> {
    private idMap: { [key: string]: string; } = {};

    constructor(props: RadioToggleProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.generateIdsForValues();
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.changeHandler(event.target.value);
    }

    generateIdsForValues(): void {
        this.props.values.forEach(value => {
            if (!this.idMap[value]) {
                this.idMap[value] = `radio-toggle-${Math.ceil(Math.random() * 1000)}-${value}`;
            }
        });

    }

    render() {
        const inputList = this.props.values.map((value) =>
            <React.Fragment key={this.idMap[value]}>
                <input
                    id={this.idMap[value]}
                    className="radio-toggle"
                    name={this.props.name}
                    type="radio"
                    checked={this.props.selectedValue === value}
                    value={value}
                    onChange={this.handleChange} />
                <label htmlFor={this.idMap[value]}>{value}</label>
            </React.Fragment>
        );
        return (
            <>
                {inputList}
            </>
        );
    }
}