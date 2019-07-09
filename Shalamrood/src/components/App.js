/**
 * @author Hasani
 * @version 0.1.0
 */
import React from 'react';
import './App.css';
import {Menu} from "./menu/Menu";
import {Board} from "./board/Board";


class App extends React.Component {
    levelsOrg;

    constructor(props) {
        super(props);
        this.levels = this.props.levels;
        for (let level of this.levels)
            level.isDone = false;
        this.state = {...this.levels[0], level: 0};
        for (let i = 0; i < this.state.cells.length; i++)
            this.state.cells[i].handleRotate = () => this.handleRotate(i);
        this.levelsOrg = JSON.parse(JSON.stringify(this.levels));
        this.handleNext = this.handleNext.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    resetState(level) {
        for (let i = 0; i < this.levels[level].cells.length; i++)
            this.levels[level].cells[i].handleRotate = () => this.handleRotate(i);
        this.setState({...this.levels[level]});
    }

    handleRotate(i) {
        let cell = this.state.cells[i];
        cell.rotate = (cell.rotate + 1) % 4;
        this.setState({"cells": this.state.cells});
    }

    handleRestart() {
        console.log("handleRestart");
        let level = this.state.level;
        this.levels[level] = JSON.parse(JSON.stringify(this.levelsOrg[level]));
        this.resetState(level);
    }

    handleNext() {
        console.log("handleNext");
        this.state.level++;
        let level = this.state.level;
        this.levels[level] = JSON.parse(JSON.stringify(this.levelsOrg[level]));
        this.resetState(level);
    }

    render() {
        console.log("rendering app");
        let level = this.levels[this.state.level];
        setCellActive(level);
        let isDone = level.isDone & this.state.level + 1 < this.levels.length;
        return <div className="game-container">
            <div className="game">
                <Menu level={this.state.level}
                      isDone={isDone}
                      handleRestart={this.handleRestart}
                      handleNext={this.handleNext}/>
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
        if (i % level.cols === level.cols - 1)
            return -1;
        else
            return i + 1;
    if (direction === 1)
        return i + level.cols;
    if (direction === 3)
        return i - level.cols;
    if (i % level.cols === 0)
        return -1;
    else
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
    level.isDone = true;
    let cells = level.cells;
    let source = level.source;
    for (let i = 0; i < cells.length; i++) {
        cells[i].active = i === source;
    }
    let updated = true;
    while (updated) {
        updated = false;
        for (let i = 0; i < cells.length; i++) {
            for (let j of getConnectedNeighbors(level, i)) {
                if (j < 0 || j >= cells.length) {
                    level.isDone = false;
                    continue;
                }
                if (getConnectedNeighbors(level, j).includes(i)) {
                    if (!cells[i].active && cells[j].active) {
                        cells[i].active = true;
                        updated = true;
                        break;
                    }
                } else
                    level.isDone = false;
            }
        }
    }
}

export default App;
