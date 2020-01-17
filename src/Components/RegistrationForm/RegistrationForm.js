import React, {Component} from 'react';
import './RegistrationForm.css';
import AuthApiService from '../../services/authAPI';

class RegistrationForm extends Component{

    state = {
        error: null
    }

    //created the user if all information is filled.
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
                <h2 className="RegistrationForm__Title">Register</h2>
                <div>
                    <label htmlFor="RegistrationForm_fullname">Full Name </label>
                    <input className="RegistrationForm__textBox" name='fullname'id='RegistrationForm_fullname' type="text" required/>
                </div>
                <div>
                    <label htmlFor="RegistrationForm_username">Username </label>
                    <input className="RegistrationForm__textBox" name='username' type="text" id='RegistrationForm_username' required/>
                </div>
                <div>
                    <label htmlFor="RegistrationForm_password">Password </label>
                    <input className="RegistrationForm__textBox" name='password' type="password" id="RegistrationForm_password" required/>
                </div>

                <button className="RegistrationForm__Button-blue" type="submit">Register</button>
            </form>
        );
    }
}

export default RegistrationForm;