/**
 * @author Hasani
 * @version 0.1.0
 */
import React from 'react';
import './App.css';
import {Menu} from "./menu/Menu";
import {Board} from "./board/Board";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.levels = this.props.levels;
        this.state = {...this.levels[0], level: 0};
    }


    render() {
        setCellActive(this.levels[this.state.level]);
        console.log("rendering App");
        console.log(this.levels[this.state.level]);
        return <div className="game-container">
            <div className="game">
                <Menu level={this.state.level}/>
                <Board rows={this.state.rows} cols={this.state.cols} cells={this.state.cells}/>
            </div>
        </div>;
    }
}

let NEIGHBORS = {
    "L": [0, 3],
    "I": [1, 3],
    "T": [0, 1, 2],
    "P": [0, 1, 2, 3],
    "C": [3],
};

function getNeighbor(level, i, direction) {
    if (direction === 0)
        return i + 1;
    if (direction === 1)
        return i + level.cols;
    if (direction === 3)
        return i - level.cols;
    return i - 1;
}

function getConnectedNeighbors(level, i) {
    let list = NEIGHBORS[level.cells[i].type];
    let res = [];
    list.forEach((x) => {
        res.push(getNeighbor(level, i, (x + level.cells[i].rotate) % 4));
    });
    return res;
}


function setCellActive(level) {
    let cells = level.cells;
    let source = level.source;
    for (let i = 0; i < cells.length; i++) {
        cells[i].active = i === source;
    }
    let updated = true;
    while (updated) {
        updated = false;
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].active) {
                for (let j of getConnectedNeighbors(level, i)) {
                    if (i === 7)
                        console.log(j);
                    if (j < 0 || j >= cells.length)
                        continue;
                    if (cells[j].active && getConnectedNeighbors(level, j).includes(i)) {
                        cells[i].active = true;
                        updated = true;
                        break;
                    }
                }
            }
        }
    }
}

export default App;
