import * as React from "react";

interface RadioToggleProps {
    name: string;
    initialValue: string;
    values: string[];
}

export default class RadioToggle extends React.Component<RadioToggleProps> {
    private idMap: { [key: string]: string; } = {};
    state: { checkedValue: string };

    constructor(props: RadioToggleProps) {
        super(props);
        this.state = { checkedValue: this.calculateInitialValue() };
        this.handleChange = this.handleChange.bind(this);
        this.generateIdsForValues();
    }

    calculateInitialValue(): string {
        if (this.props.initialValue) {
            return this.props.initialValue;
        }
        return (this.props.values.length && this.props.values[0]) || ''
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ checkedValue: event.target.value });
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
                    checked={this.state.checkedValue === value}
                    value={value}
                    onChange={this.handleChange} />
                <label htmlFor={this.idMap[value]}>{value}</label>
            </React.Fragment>
        )
        return (
            <>
                {inputList}
            </>
        );
    }
}