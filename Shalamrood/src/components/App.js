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
        return <div className="game-container">
            <div className="game">
                <Menu level={this.state.level}/>
                <Board rows={this.state.rows} cols={this.state.cols} cells={this.state.cells}/>
            </div>
        </div>;
    }
}

export default App;
