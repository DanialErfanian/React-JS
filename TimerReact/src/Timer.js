import React, {Component} from 'react';
import './Timer.css';

export class Timer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { seconds: 0 };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        this.componentWillUnmount();
        this.setState({
            seconds: 0
        });
        this.componentDidMount()
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            seconds: this.state.seconds + 1
        });
    }

    render() {
        return <div className="container">
            <div className="timer">
                {this.state.seconds}
            </div>
            <button id="resetButton" onClick={this.handleClick}>Reset Timer</button>
        </div>;
    }
}
