import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from './component/Home/Home';
import ProfileForm from './component/ProfileForm/ProfileForm'
import history from './history';
import OnSubmitPage from "./component/OnSubmitPage/OnSubmitPage";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/CreateProfile/:title" exact component={ProfileForm} />
                    <Route path="/OnSubmit" exact component={OnSubmitPage} />
                </Switch>
            </Router>
        )
    }
}
