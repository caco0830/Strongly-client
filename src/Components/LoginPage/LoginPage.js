import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component{

    render(){
        return (
            <form>
                <div>
                    <label htmlFor="username">Email/Username</label>
                    <input placeholder="email@example.com" type="text" name='username' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input placeholder="******" type="password" name="password" />
                </div>

                <button type="submit" >Log in</button>

                <div>
                    <p>No account yet? <Link to='/register'>Sign up</Link></p>
                </div>
            </form>
        );
    }
}

export default LoginPage;