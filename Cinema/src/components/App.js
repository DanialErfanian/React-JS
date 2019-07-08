import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Movies from "./Movies";
import NotFound from "./NotFound";
import MovieDetail from "./MovieDetail";


export default function App() {
    // your code here ...
    return (

        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Movies}/>
                    <Route path="/movies/:movie_id" component={MovieDetail}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
}
