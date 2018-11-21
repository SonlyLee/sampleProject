import React, { Component } from 'react';
import Clock from './Clock';
import Toggle from './Toggle';
import LoginControl from './LoginControl';
import NameForm from './NameForm';
import Calculator from './Calculator';
import CustomTextInput from './CustomTextInput';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }
    render() {
        return (
            <div>
                <h1>Hello,{formatName(user)}</h1>
                {/* <h2>{getGreeting(user)}</h2> */}
                <Welcome name="Sara" />
                <Welcome name="sonlylee" />
                <Comment date={comment.date} text={comment.text} author={comment.author} />
                <Clock/>
                <Toggle/>
                <LoginControl/>
                <NameForm/>
                <Calculator/>
                <CustomTextInput/>
            </div>
        )
    }
}

//props
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: 'Harper',
    lastName: 'Perez'
}

function getGreeting(user) {
    if (user) {
        return <h1>Hello,{formatName(user)}!</h1>
    }
    return <h1>Hello,Stranger.</h1>
}

function Welcome(props) {
    return <h1>Hello,{props.name}</h1>
}

const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'http://placekitten.com/g/64/64'
    }
}

function formatDate(date) {
    return date.toLocaleDateString();
}

function Comment(props) {
    return (
        <div>
            <div>
                <img src={props.author.avatarUrl} alt={props.author.name} />
                <div>
                    {props.author.name}
                </div>
            </div>
            <div>
                {props.text}
            </div>
            <div>
                {formatDate(props.date)}
            </div>
        </div>
    )
}
