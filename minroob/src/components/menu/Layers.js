/**
 * @author Alireza Tofighi Mohammadi
 * @version 1.0.0
 */
import React from 'react';
import './Layers.css';
import {Board} from "../board/Board";
import {CELL_MARGIN, CELL_SIZE} from "../../constants";

export class Layers extends React.Component {
    render() {
        const {n, board, changeLayer, activeLayer} = this.props;
        return <div className="layers" style={{paddingTop: CELL_MARGIN/2}}>
            {board.map((board2d, index) => <div key={index} style={{
                width: CELL_SIZE,
                height: CELL_SIZE ,
                overflow: 'hidden'
            }}>
                <Board activeLayer={activeLayer} board={board2d} n={n} layer={index} type={'mini'} changeLayer={changeLayer}/>
            </div>)}
        </div>;


    }
}