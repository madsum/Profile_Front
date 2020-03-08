import React, { Component } from 'react'
import {Alert} from 'react-bootstrap'
import "./OnSubmitPage.css"

export class OnSubmitPage extends Component {
    render() {
        return (
            <div className="centerDiv">
                <Alert variant={this.props.location.state.msgVariant}>
                <Alert.Heading>{this.props.location.state? this.props.location.state.response : 'Please create a new profile or edit an existing profile' }</Alert.Heading>
                </Alert>
            </div>
        )
    }
}

export default OnSubmitPage
