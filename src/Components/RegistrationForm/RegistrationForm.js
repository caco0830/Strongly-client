import React, {Component} from 'react';
import './RegistrationForm.css';

class RegistrationForm extends Component{

    render(){
        return (
            <form>
                <div>
                <label htmlFor="firstname">First Name</label>
                <input placeholder="" type="text" name='firstname' />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input placeholder="" type="text" name='lastname' />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input placeholder="" type="text" name='email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input placeholder="******" type="password" name="password" />
                </div>
                <div>
                    <label htmlFor="re-password">Re-type Password</label>
                    <input placeholder="******" type="password" name="re-password" />
                </div>

                <button type="submit" >Create Account</button>
            </form>
        );
    }
}

export default RegistrationForm;