import React from 'react';
import "./State.css";

export class State extends React.Component {
    render() {
        const {turn, winner} = this.props;
        let styleClass = "";
        if (winner == null)
            styleClass = "state turn-" + turn;
        else
            styleClass = "state win-" + winner;
        return <div class={styleClass}></div>;
    }
}
