/**
 * @author Hasani
 * @version 0.1.0
 */
import React from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

export class Menu extends React.Component {
    render() {
        const {level, isDone, handleRestart, handleNext} = this.props;
        return <div className="menu">
            <div className="level">Level {level + 1}</div>
            <div className="buttons">
                <button className="button" disabled={!isDone} onClick={handleNext}><i className="i-next"/></button>
                <button className="button" onClick={handleRestart}><i className="i-restart"/>
                </button>
            </div>
        </div>;
    }
}


Menu.propTypes = {
    level: PropTypes.number.isRequired,
};
