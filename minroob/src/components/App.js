import React from 'react';
import './App.css';
import {Layers} from "./menu/Layers";
import {Board} from "./board/Board";
import {State} from "./menu/State";


class App extends React.Component {
    totalBombs = 0;

    constructor(props) {
        super(props);
        this.handleChangeLayer = this.handleChangeLayer.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.getWinner = this.getWinner.bind(this);
        let board = JSON.parse(JSON.stringify(this.props.board));
        let n = this.props.n;
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n * n; j++) {
                board[i][j].number = App.getNearBombs(board, n, i, j);
                if (board[i][j].hasBomb)
                    this.totalBombs++;
            }
        this.state = {
            n: this.props.n,
            board: board,
            currentLayer: 0,
            turn: 1, // turn is 1 or 2
            scores: [0, 0],
        };
        console.log(this.state);
    }

    static check(n, i) {
        return i >= 0 && i < n;
    }

    static getAdj(board, n, x, j) {
        let y = Math.ceil(j / n);
        let z = j % n;
        let res = [];
        for (let dx = -1; dx <= 1; dx++)
            for (let dy = -1; dy <= 1; dy++)
                for (let dz = -1; dz <= 1; dz++)
                    if (dx !== 0 || dy !== 0 || dz !== 0)
                        if (App.check(n, x + dx) && App.check(n, y + dy) && App.check(n, z + dz)) {
                            res.push([x + dx, (dy + y) * n + z + dz]);
                        }
        return res;
    }

    static getNearBombs(board, n, x, j) {
        let res = 0;
        let adj = App.getAdj(board, n, x, j);
        adj.forEach(value => {
            if (board[value[0]][value[1]].hasBomb === true)
                res++;
        });
        return res;
    }

    handleChangeLayer(newLayer) {
        this.setState({
            currentLayer: newLayer
        })
    }

    handleCellClick(x, j) {
        let n = this.state.n;
        let board = this.state.board;
        console.log("bikhi", x, j, this);
        let cell = board[x][j];
        let scores = this.state.scores;
        let turn = this.state.turn - 1;
        if (cell.visible)
            return;
        if (this.totalBombs === parseInt(scores[0]) + parseInt(scores[1]))
            return;
        cell.visible = true;
        if (cell.hasBomb) {
            scores[turn]++;
            cell.owner = turn + 1;
        } else if (cell.number === 0) {
            let adj = App.getAdj(board, n, x, j);
            adj.forEach(value => {
                this.handleCellClick(board, n, value[0], value[1]);
            });
        }
        this.setState({
            turn: 3 - this.state.turn,
            scores
        })
    }

    render() {
        return <div className="game-container">
            <div className="game">
                <h1>MinRoob</h1>
                <State turn={this.state.turn} winner={this.getWinner()}/>
                <Layers activeLayer={this.state.currentLayer} n={this.state.n} board={this.state.board}
                        changeLayer={this.handleChangeLayer}/>
                <Board onCellClick={this.handleCellClick} n={this.state.n}
                       board={this.state.board[this.state.currentLayer]} type={'main'} layer={this.state.currentLayer}/>
            </div>
        </div>;
    }

    getWinner() {
        let score1 = this.state.scores[0];
        let score2 = this.state.scores[1];

        if (score1 + score2 === this.totalBombs)
            if (score1 === score2)
                return 0;
            else if (score1 > score2)
                return 1;
            else
                return 2;
        return null;
    }
}

export default App;
