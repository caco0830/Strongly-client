import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';
import './LoginPage.css';

class LoginPage extends Component{

    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = {error: null}

    handleSubmitBasicAuth = ev => {
        ev.preventDefault();
        const {username, password} = ev.target;
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(username.value, password.value)
        );

        username.value ='';
        password.value = '';

        this.props.history.push('/home')

    }

    render(){
        return (
            <form onSubmit={this.handleSubmitBasicAuth}>
                <div>
                    <label htmlFor="username">Email/Username</label>
                    <input placeholder="email@example.com" type="text" name='username' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input placeholder="******" type="password" name="password" />
                </div>

                <button type="submit">Log in</button>

                <div>
                    <p>No account yet? <Link to='/register'>Sign up</Link></p>
                </div>
            </form>
        );
    }
}

export default LoginPage;