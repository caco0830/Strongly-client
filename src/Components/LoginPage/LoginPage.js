import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/authAPI';
import './LoginPage.css';

class LoginPage extends Component{

    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = {error: null}

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({error: null});
        const {username, password} = ev.target;

        AuthApiService.postLogin({
            username: username.value,
            password: password.value
        })
        .then(res => {
            username.value = '';
            password.value = '';
            TokenService.saveAuthToken(res.authToken);
            this.props.onLoginSuccess();
            this.props.history.push('/home')
        })
        .catch(res => {
            this.setState({error: res.error});
        });
    }

    render(){
        const {error} = this.state;
        return (
            <form onSubmit={this.handleSubmitJwtAuth}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
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