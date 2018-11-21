import React, { Component } from 'react';
import Button from './Button';

export default class CustomTextInput extends React.PureComponent {
    constructor(props) {
        super(props);
        //创建ref存储textInput DOM元素
        this.textInput = React.createRef();
        this.focusTextinput = this.focusTextinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }))
        }
        this.state = {
            // words: ['marklar'],
            theme: themes.light,
            toggleTheme: this.toggleTheme
        }

    }
    handleSubmit(event) {
        alert('A name was submitted:' + this.input.value);
        event.preventDefault();
    }
    focusTextinput() {
        //直接使用原生的API使text输入框获得焦点
        //注意：通过“current”取得DOM节点
        // this.textInput.current.focus();
        if (this.textInput) {
            this.textInput.focus();
        }
    }
    componentDidMount() {
        this.focusTextinput();
    }
    handleClick() {
        // const words = this.state.words;
        // words.push('mark');
        // this.setState({
        //     words: words
        // });
        this.setState(preState => ({
            words: preState.words.concat(['marklar'])
        }))
    }

    render() {
        return (
            <div>
                {/* <input type="text" ref={this.textInput}/> */}
                <input type="text" ref={(node) => { this.textInput = node }} />
                <input type="button" value="Focus the text input" onClick={this.focusTextinput} />

                <form onSubmit={this.handleSubmit}>
                    <label>
                        name:
                        <input type="text" defaultValue="Bob" ref={(input) => this.input = input} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <div>
                    {/* <button onClick={this.handleClick.bind(this)}>添加</button> */}
                    {/* <ListOfWords words={this.state.words} /> */}
                </div>
                <ThemeContext.Provider value={this.state}>
                    <Toolbar />
                </ThemeContext.Provider>
                <table>
                    <tr>
                        <Columns />
                    </tr>
                </table>
            </div>
        )
    }
}

class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>
    }
}

class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        )
    }
}

const themes = {
    light: {
        foreground: '#ffffff',
        background: '#222222',
    },
    dark: {
        foreground: '#000000',
        background: '#eeeeee',
    }
}
//创建一个theme Context,默认theme的值为light
const ThemeContext = React.createContext(themes.dark);

function ThemedButton(props) {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) =>
                (
                    <button onClick={toggleTheme} style={{ backgroundColor: theme.background }}>Toggle Theme</button>
                )}
        </ThemeContext.Consumer>
    )
}

//中间件组件
function Toolbar(props) {
    return (
        <div>
            <ThemedButton>
            </ThemedButton>
        </div>
    )
}
// //获取数据源渲染评论列表
// class CommentList extends React.Component {
//     constructor() {
//         super();
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//             comments: DataSource.getComments()   //数据源
//         }
//     }
//     componentDidMount() {
//         DataSource.addChangeListener(this.handleChange);
//     }
//     componentWillUnmount() {
//         DataSource.removeChangeListener(this.handleChange);
//     }
//     handleChange() {
//         //任何时候数据发生改变就更新组件
//         this.setState({
//             comments: DataSource.getComments()
//         })
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.comments.map((comment) => (
//                     <Comment comment={comment} key={comment.id} />
//                 ))}
//             </div>
//         )
//     }
// }

// //订阅博客组件
// class BlogPost extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//             blogPost: DataSource.getBlogPost(props.id)
//         }
//     }
//     componentDidMount() {
//         DataSource.addChangeListener(this.handleChange);
//     }
//     componentWillUnmount() {
//         DataSource.removeChangeListener(this.handleChange);
//     }
//     handleChange() {
//         this.setState({
//             blogPost: DataSource.getBlogPost(this.props.id)
//         })
//     }
//     render() {
//         return <TextBlock text={this.state.blogPost} />
//     }
// }

// const CommentListWithSubscription = CommentListWithSubscription(
//     CommentList,
//     (DataSource) => DataSource.getComments()
// )

// const BlogPostWithSubscription = BlogPostWithSubscription(
//     BlogPost,
//     (DataSource, props) => DataSource.getBlogPost(props.id)
// )

// function withSubscription(WrappedComponent,selectData){
//     //返回另一个新组件
//     return class extends React.Component{
//         constructor(props){
//             super(props);
//             this.handleChange = this.handleChange.bind(this);
//             this.state = {
//                 data: selectData(DataSource,props)
//             }
//         }
//         componentDidMount(){
//             //注意订阅数据
//             DataSource.addChangeListener(this.handleChange);
//         }
//         componentWillUnmount(){
//             DataSource.removeChangeListener(this.handleChange);
//         }
//         handleChange(){
//             this.setState({
//                 data: selectData(DataSource,this.props)
//             })
//         }
//         render(){
//             return <WrappedComponent data={this.state.data} {...this.props}/>
//         }
//     }
// }