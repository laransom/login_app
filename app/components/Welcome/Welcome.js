/*
 * Welcome Page
 *
 * props:
 *  loginData: login info from user
 *  signOut: Handler for sign out
 */
import React from 'react';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loginData: props.loginData
        };
    }
    
    signOut(event) {
        this.props.signOut();
    }

    render() {
        var welcomeMessage = this.state.loginData.message + ". Your user id is: " + this.state.loginData.userId;
        return (
            <div className="stretched-form">
                <i className="material-icons">check_circle</i>
                <h2>Welcome!!</h2>
                <div>{welcomeMessage}</div>
                <div id="signout-link" className="padding-top-8">
                    <span className="link" onClick={this.signOut.bind(this)}>Sign Out</span>
                </div>
            </div>
        )
    }
}

export default Welcome;
