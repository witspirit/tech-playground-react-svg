import React, {Component} from 'react';
import {Alert, Button} from "@blueprintjs/core";

type MyTestComponentState = {
    showOverlay: boolean
}

export class MyTestComponent extends Component<{}, MyTestComponentState> {
    constructor(props : any) {
        super(props)
        this.state = {
            showOverlay: false
        };
    }

    // https://www.voitanos.io/blog/deal-with-undefined-this-react-event-handler-performant-way/
    private launchTestAction = () => {
        console.log('Opening alert...');
        this.setState({
            showOverlay: true
        });
    }

    private handleOverlayClose = () => {
        console.log('Closing alert...');
        this.setState({
            showOverlay: false
        })
    }

    render() {
        return <>
            <Button text="Press Me !" onClick={this.launchTestAction}/>
            <Alert isOpen={this.state.showOverlay} onClose={this.handleOverlayClose} canEscapeKeyCancel={true} canOutsideClickCancel={true}>
                    <p>You pressed the button. Well done.</p>
            </Alert>
        </>
    }
}