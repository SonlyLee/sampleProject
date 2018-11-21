import React, { Component } from 'react';

export default class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isToggleOn: true,
            name: 'Hello world!'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    preventPop(name,e){  //事件对象e要放在后面
        e.preventDefault();
        alert(name)
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                <p>hello</p>
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        )
    }
}