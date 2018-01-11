/*
 * Home Page. Container for all components
 */
import React from 'react';
import ShadowedCard from '../components/ShadowedCard/ShadowedCard';
import LoginForm from '../components/LoginForm/LoginForm';
import Welcome from '../components/Welcome/Welcome';


import '../assets/login_app.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: undefined,
            loggedIn: false
        }
    }
    handleSuccess(loginData) {
        this.setState({
            loggedIn: true,
            loginData: loginData
        })    
    }
    logOut() {
        this.setState({
            loggedIn: false
        })
    }
    
    render() {
        var loginBody = <LoginForm onSuccess={this.handleSuccess.bind(this)}/>
        if (this.state.loggedIn) {
            loginBody = <Welcome loginData={this.state.loginData} signOut={this.logOut.bind(this)}/>
        }
        return (
            <div id="login-content" className="stand-alone-content kitchen-bg">
                <ShadowedCard className="form-card" width={420}>
                    <div className="logo">
                        <h2>Sign In Machine</h2>
                    </div>
                    <div className="padding-44 padding-top-32">
                        {loginBody}
                    </div>
                </ShadowedCard>
                <div id="airbrush" className="airbrush"/>
            </div>
        )
    }
}
export default Login;
