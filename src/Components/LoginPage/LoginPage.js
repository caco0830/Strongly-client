import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../../AppContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/authAPI';
import './LoginPage.css';

class LoginPage extends Component{
    static contextType = AppContext;

    state = {error: null}

    //will create a JWT token and stores it in local storage when a user signs in.
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
            this.context.onLoginSuccess();
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
                <h2 className="Login__Title">Login</h2>


                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div>
                    <label htmlFor="username">Username </label>
                    <input className="Login__textBox" placeholder="email@example.com" type="text" name='username' />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input className="Login__textBox" placeholder="******" type="password" name="password" />
                </div>

                <button className="Login__Button-blue" type="submit">Log in</button>

                <div>
                    <p>No account yet? <Link to='/register'>Sign up</Link></p>
                </div>
            </form>
        );
    }
}

export default LoginPage;