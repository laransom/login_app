/*
 * Login page
 *
 * props:
 *  onSuccess: handler for a successful login
 */
import React from 'react';

import FakeApi from '../../FakeApi';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            emailError: undefined,
            passwordError: undefined,
            loginError: undefined
        };
    }
    doSignUp(event) {
        event.preventDefault();
        var passwordError = undefined;
        var emailError = undefined;
        var loginError = undefined;
        
        if (!this.state.email || this.state.email.length < 4) {
            emailError = 'Email of at least 4 characters required';
        } else if (!this.validEmail(this.state.email)) {
            emailError = 'Invalid email address';
        }
        if (!this.state.password || this.state.password.length < 4) {
            passwordError = 'Password of at least 4 characters required';
        }
        if (!emailError && !passwordError) {
            var signUpResult = FakeApi.signUp(this.state.email, this.state.password);
            if (signUpResult.status < 0) {
                loginError = signUpResult.message;
            } else {
                this.props.onSuccess(signUpResult);
            }
        }
        this.setState({
            emailError: emailError,
            passwordError: passwordError,
            loginError: loginError
        });
    }
    setEmail(event) {
        this.setState({ email: event.target.value });
    }
    setPassword(event) {
        this.setState({ password: event.target.value});
    }
    validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    doLogin(event) {
        event.preventDefault()
        var loginResult = FakeApi.login(this.state.email, this.state.password);
        if (loginResult.status < 0) {
            this.setState({loginError: loginResult.message});
        } else {
            this.props.onSuccess(loginResult);
        }       
    }

    render() {
        var emailClass = this.state.emailError ? 'error' : '';
        var passwordClass = this.state.passwordError ? 'error': '';
        return (
            <form>
                <div className="stretched-form">
                    <div>
                        <input className={emailClass}
                               ref="loginEmail"
                               id="login-email"
                               type="email"
                               value={this.state.email}
                               autoFocus={this.state.email.length == 0}
                               placeholder="Email"
                               onChange={this.setEmail.bind(this)} />
                               {this.renderError('email')}
                    </div>
                    <div className="padding-top-32">
                    <input className={passwordClass}
                           ref="loginPassword"
                           id="login-password"
                           type="password"
                           value={this.state.password}
                           autoFocus={this.state.password.length == 0}
                           placeholder="Password"
                           onChange={this.setPassword.bind(this)} />
                           {this.renderError('password')}
                           {this.renderError('loginError')}
                    </div>
                    <div className="padding-top-44">
                        <button id="login-button"
                                className="primary"
                                onClick={this.doLogin.bind(this)}>Login</button>
                    </div>
                    <div className="padding-top-8">
                        <button id="sign-up-button"
                                className="primary"
                                onClick={this.doSignUp.bind(this)}>Sign Up</button>
                    </div>
                </div>
            </form>
        )
    }
    renderError(field) {
        var message = undefined;
        if (field == "email") {
            message = this.state.emailError;
        } else if (field == "password") {
            message = this.state.passwordError;
        } else {
            message = this.state.loginError;
        }
        return (
            <div className="text-error" style={{position: 'absolute', padding: '4px', textAlign: 'left'}}>
                {message}
            </div>
        )
    }
}

export default LoginForm;
