import React, { Component } from 'react';
import evetProxy from './eventProxy';
import eventProxy from './eventProxy';

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            name: 'joe'
        }
    }
    componentDidMount() {
        //    setTimeout(()=>{
        //        this.setState({
        //            name:'sonlyLee'
        //        })
        //    },3000)
    }
    transferMsg(msg) {
        this.setState({
            name: msg
        })
    }
    render() {
        return (
            <div>
                <h1>Welcome to the web!</h1>
                {/* <Child_1 name={this.state.name} transferMsg={msg=>{this.transferMsg(msg)}}/> */}
                {/* <Child_2 name={this.state.name}/> */}
                {/* <Child_1 /> */}
                {/* <Child_2 /> */}
            </div>
        )
    }
}
class Child_1 extends Component {
    // componentDidMount(){
    //     setTimeout(()=>{
    //         this.props.transferMsg('end')
    //     },6000);
    // }
    componentDidMount() {
        setTimeout(() => {
            //发布msg事件
            evetProxy.trigger('msg', 'end')
        }, 6000);
    }
    componentDidUpdate() {
        console.log('Child_1 update')
    }
    render() {
        return (
            <div>
                <p>child_1 component:{this.props.name}</p>
                <Child_1_1 {...this.props} />
            </div>
        )
    }
}

class Child_2 extends Component {
    state = {
        msg: 'start'
    }
    componentDidUpdate() {
        console.log('Child_2 update');
    }
    componentDidMount() {
        eventProxy.on('msg', (msg) => {
            this.setState({
                msg: msg
            })
        })
    }
    render() {
        return (
            <div>
                <p>Child_2 component:{this.state.msg}</p>
                <Child_2_1 />
            </div>
        )
    }
}

class Child_1_1 extends Component {
    render() {
        return <p>{this.props.name}</p>
    }
}

class Child_2_1 extends Component {
    componentDidUpdate() {
        console.log('Child_2_1 update');
    }
    render() {
        return <div>
            <p>Child_2_1 component</p>
        </div>
    }
}
export default Home;