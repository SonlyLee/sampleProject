import React, { Component } from 'react'

export default class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: 'coconut',
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    handleSubmit(e) {
        alert('A name was submitted:' + this.state.value);
        e.preventDefault();
        this.setState({ value: "" });
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite ：
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>                  
                </label>
                <br/>
                <label>
                    Is going:
                    <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Number of guests:
                    <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}