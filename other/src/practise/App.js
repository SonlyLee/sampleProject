import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Topic = ({match}) => <h3>Requested Param:{match.params.id}</h3>
const Topics = ({match}) => {
  return(<div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>
    <Route path={`${match.path}/:id`} component={Topic}/>
    <Route exact path={match.path} render={()=><h3>Please select a topic.</h3>}/>
  </div>)
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  )

}

const Header = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>
  )
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
//判断赢家
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }
  handClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true   //第一个是X，第二个是O，偶数是O,为fasle
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game Start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <AppRouter />
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
