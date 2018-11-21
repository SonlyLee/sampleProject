import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Roster from './Roster';
import Schedule from './Schedule';
import Prize from './Prize'
export default class Main extends Component {
    static defaultProps = {
        //1、加载默认属性
        names: 'sls',
        age: 23
    }
    constructor(props) {
        super(props);
        this.state = {
            name: 'joe',
            value: '',
            item: 0,
            index: 0,
            number: 0
        }
    }
    componentWillMount() {
        console.log('3、父组件挂载之前');
    }
    componentDidMount() {
        console.log('5、父组件挂载完成');
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('6、父组件是否需要更新');
        if (newState.number < 15) return true;
        return false;
    }
    componentWillUpdate(){
        console.log('7、父组件将要更新');
    }
    componentDidUpdate(){
        console.log('8、父组件更新完成----------------------------------');
    }
    handleClickAdd(){
        this.setState({
            number: this.state.number + 1
        })
    }

    handleClick() {
        //this.refs.subcomponents可以访问子组件的方法
        this.refs.subcomponents.subHandleClick();
    }
    refresh() {
        return () => {
            this.setState({ value: '这里是子组件调用的方法' })
        }
    }
    _addValue() {
        this.setState((preState, props) => ({
            item: preState.item + 1
        }))

        this.setState((preState, props) => ({
            item: preState.item + 1
        }))
    }
    // componentDidMount() {
    //     this.setState({ item: this.state.item + 1 })
    //     console.log(this.state.item)
    //     this.setState({ item: this.state.item + 1 })
    //     console.log(this.state.item)
    //     setTimeout(() => {
    //         this.setState({ item: this.state.item + 1 })
    //         console.log(this.state.item)
    //         this.setState({ item: this.state.item + 1 })
    //         console.log(this.state.item)
    //     }, 0)
    //     this.refs.button.addEventListener('click', this.click);
    // }
    click = () => {
        this.setState({ item: this.state.index + 1 })
        this.setState({ item: this.state.index + 1 })
        let someOne = {};
        console.log(Object.defineProperty(someOne, 'name', {
            value: 'cover'
        }))
    }
    render() {
        const data = [{ name: 'Lee' }, { name: 'Sonlylee' }, { name: 'shenghuo' }];
        console.log('4、render（父组件挂载）');
        return (
            <main>
                <h1>I`m {this.state.name}</h1>
                <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <SubComponent ref="subcomponents" refresh={this.refresh()} />
                <input type="button" value="点我调用子组件方法" onClick={this.handleClick.bind(this)} />
                <p>{this.state.value}</p>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/prize" component={Prize} />
                    <Route path="/roster" component={Roster} />
                    <Route path="/schedule" component={Schedule} />
                </Switch>
                <div>
                    <div>this Value: {this.state.item}</div>
                    <button onClick={this._addValue.bind(this)}>add item</button>
                </div>
                <div>
                    <span>item:{this.state.item}index:{this.state.index}</span>
                    <button ref="button" onClick={this.click}>点击</button>
                </div>
                <LoadingList isLoading={false} data={data} />
                <HOCComponent isLoading={true} data={data} />
                <MyComponentWithPersistentData2 />
                <MyComponentWithPersistentData3 />
                <div>
                    <p>{this.state.number}</p>
                    <button onClick={this.handleClickAdd.bind(this)}>+</button>
                    {this.state.number < 10 ? <SubCounter number={this.state.number} /> : null}
                </div>
            </main>
        )
    }
}

class SubCounter extends Component{
    componentWillReceiveProps(){
        console.log('9、子组件将要接受到新的属性');
    }
    shouldComponentUpdate(newProps,newState){
        console.log('10、子组件是否需要更新');
        if(newProps.number < 5) return true;
        return false
    }
    componentWillUpdate(){
        console.log('11、子组件将要更新');
    }
    componentDidUpdate(){
        console.log('13、子组件更新完成');
    }
    componentWillUnmount(){
        console.log('14、子组件将要卸载');
    }
    render(){
        console.log('12、子组件挂载中');
        return(
            <p>{this.props.number}</p>
        )
    }
}

class SubComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '这里是初始文本'
        }
    }
    subHandleClick() {
        this.setState({
            text: '文本被改变了！'
        })
    }
    render() {
        return (
            <div>
                查看: {this.state.text}
                <button onClick={this.props.refresh}>更新父组件</button>
            </div>
        )
    }
}

//高阶组件加loading
const withLoading = BaseComponent => ({ isLoading, ...otherProps }) => (
    isLoading ?
        <div>我正在加载...</div>
        : <BaseComponent {...otherProps} />
)

const List = ({ data }) => (
    <ul>
        {data.map(item => <li key={item.name}>{item.name}</li>)}
    </ul>
)
const LoadingList = withLoading(List)

//高阶组件
const HOC = (WrappedComponent) => (
    class WrapperComponent extends Component {
        constructor(props) {
            super(props)
        }
        render() {
            const newProps = {
                name: 'HOC'
            }
            return (
                this.props.isLoading
                    ? <div>我正在加载...</div>
                    : <WrappedComponent {...this.props} {...newProps} />
            )
        }
    }
)
//普通组件
class WrappedComponent extends Component {
    render() {
        return (
            <div>
                <h1>你还好吗？</h1>
                {this.props.name}
            </div>
        )
    }
}

const HOCComponent = HOC(List);


//高阶组件。获取localstorage
function withPersistentData(WrappedComponent, key) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: '',
                name: ''
            }
        }
        componentWillMount() {
            let data = localStorage.getItem(key);
            this.setState({ data })
        }
        render() {
            // 通过{...this.props}把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }
}

class MyComponent2 extends Component {
    render() {
        return <div>{this.props.data}</div>
    }
}

class MyComponent3 extends Component {
    render() {
        return <div>{this.props.data}</div>
    }
}

const MyComponentWithPersistentData2 = withPersistentData(MyComponent2, 'data')
const MyComponentWithPersistentData3 = withPersistentData(MyComponent3, 'name')