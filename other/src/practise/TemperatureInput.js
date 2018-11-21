import React, { Component } from 'react';
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

export default class TemperatureInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const temprerature = this.props.temprerature;
        const scale = this.props.scale;
        return (
            <div>
                <legend>Enter temprerature in {scaleNames[scale]}:</legend>
                <input value={temprerature} onChange={this.handleChange} />
            </div>


        )
    }
}