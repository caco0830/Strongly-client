import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TokenService from '../../services/token-service';
import './Nav.css';

export default class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            menuOpen:false,
        }
    }

    //sets the openMenu state to true or false to display the drop down menu
    handleMenuClick() {
        const open = this.state.menuOpen ? false:true;
        this.setState({menuOpen: open});
    }

    // determines which menu will be render depending on if the user is logged in or not
    renderMenu(){
        return TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink();
    }

    renderLoginLink() {
        return (
            <div className='Header__menu-items'>
                <Link
                    to='/register'>
                        Register
                </Link>
                <Link
                    to='/login'>
                        Login
                </Link>
            </div>
        );
    }

    renderLogoutLink() {
        return (
            <div className='Header__menu-items'>
                <Link
                    to='/'>
                        Home
                </Link>
                <Link
                    to='/logout'>
                        Log out
                </Link>
            </div>
        );
    }

    render(){
        return(
            <div>
                <nav className='Header'>
                        <Link to='/'>
                            <h1>Strongly</h1>
                        </Link>
                    
                    <button type="button" onClick={() => this.handleMenuClick()}>
                        <FontAwesomeIcon className='green' icon='bars'/>
                    </button>
                </nav>
                {this.state.menuOpen ? this.renderMenu() : ''}
            </div>
        );
    }
}