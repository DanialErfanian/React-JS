import React from 'react';
import {Cell} from "./Cell";
import {CELL_MARGIN, CELL_SIZE} from "../../constants";
import "./Board.css";

export class Board extends React.Component {
    render() {
        const {n, board, type, layer, changeLayer, activeLayer, onCellClick} = this.props;

        const style = {width: n * CELL_SIZE, height: n * CELL_SIZE, padding: CELL_MARGIN / 2};
        let styleClass = "board";
        if (type === 'mini') {
            style.transform = `scale(${(CELL_SIZE - CELL_MARGIN) / (CELL_SIZE * n)})`;
            style.marginLeft = -(n - 1) / 2 * CELL_SIZE - CELL_MARGIN / 2;
            style.marginTop = -(n - 1) / 2 * CELL_SIZE - CELL_MARGIN / 2;
            if (layer === activeLayer)
                styleClass += " current";
        }
        return <div className={styleClass} style={style}>
            {(type === 'mini') ? <div className={'layerMask'} onClick={() => changeLayer(layer)}>{layer}</div> : <></>}
            {board.map((cell, index) => <Cell key={index} cell={cell} onClick={() => {
                console.log(this);
                if (onCellClick !== undefined)
                    onCellClick(layer, index);
            }}/>)}
        </div>;
    }
}
