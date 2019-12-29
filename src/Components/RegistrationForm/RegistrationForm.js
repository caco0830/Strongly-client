import React, {Component} from 'react';
import './RegistrationForm.css';
import AuthApiService from '../../services/authAPI';

class RegistrationForm extends Component{

    state = {error: null}

    handleSubmit = ev => {
        ev.preventDefault();
        const {fullname, username, password} = ev.target;
        
        this.setState({error: null});

        AuthApiService.postUser({
            fullname: fullname.value,
            username: username.value,
            password: password.value
        })
        .then(user => {
            fullname.value = '';
            username.value = '';
            password.value = '';
            const { history } = this.props;
            history.push('/login');
        })
        .catch(res => {
            this.setState({error: res.error});
        });
    }
    
    render(){
        const {error} = this.state;
        return (
            <form className='RegistrationForm' onSubmit={this.handleSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div>
                    <label htmlFor="RegistrationForm_fullname">Full Name </label>
                    <input name='fullname'id='RegistrationForm_fullname' type="text" required/>
                </div>
                <div>
                    <label htmlFor="RegistrationForm_username">Username </label>
                    <input name='username' type="text" id='RegistrationForm_username' required/>
                </div>
                <div>
                    <label htmlFor="RegistrationForm_password">Password </label>
                    <input name='password' type="password" id="RegistrationForm_password" required/>
                </div>

                <button type="submit" >Register</button>
            </form>
        );
    }
}

export default RegistrationForm;