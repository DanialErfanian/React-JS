import React from 'react';
import {Link} from "react-router-dom";

export default class MovieCard extends React.Component {
    render() {
        return (
            <div className='movie-card'>
                <img className="card-img" src={this.props.movie.imageUrl} alt=""/>
                <div className="card-body">
                    <Link className="card-title" to={{
                        pathname: "movies/" + this.props.movie.id,
                    }}>{this.props.movie.title}</Link>
                    <p className='card-description'>{this.props.movie.short_description}</p>
                </div>
            </div>
        )
    }
}