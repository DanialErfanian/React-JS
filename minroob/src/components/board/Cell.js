import React from 'react';
import {CELL_MARGIN, CELL_SIZE} from "../../constants";
import "./Cell.css";

export class Cell extends React.Component {
    render() {
        const {cell, onClick} = this.props;
        let styleClass = "cell ";
        if (cell.visible === false)
            styleClass += "unknown ";
        else if (cell.owner != null)
            styleClass += "bomb user" + cell.owner;
        else
            styleClass += "number number-" + cell.number;
        let text = cell.number;
        if (!cell.visible || cell.hasBomb)
            text = "";

        return <div className={styleClass}
                    onClick={onClick}
                    style={{width: CELL_SIZE - CELL_MARGIN, height: CELL_SIZE - CELL_MARGIN, margin: CELL_MARGIN / 2}}>
            {text}
        </div>;
    }
}
