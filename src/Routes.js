import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from './component/Home/Home';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Router>
        )
    }
}