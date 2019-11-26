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

    handleLinkClick = () => {
        this.setState({menuOpen: false});
    }

    // determines which menu will be render depending on if the user is logged in or not
    renderMenu(){
        return TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink();
    }

    renderLoginLink() {
        return (
            <div className='Header__menu-items'>
                <Link
                    to='/register'
                    onClick={this.handleLinkClick}>
                        Register
                </Link>
                <Link
                    to='/login'
                    onClick={this.handleLinkClick}>
                        Login
                </Link>
            </div>
        );
    }

    renderLogoutLink() {
        return (
            <div className='Header__menu-items'>
                <Link
                    to='/'
                    onClick={this.handleLinkClick}>
                        Home
                </Link>
                <Link
                    to='/logout'
                    onClick={this.handleLinkClick}>
                        Log out
                </Link>
            </div>
        );
    }

    render(){
        return(
            <div>
                <nav className='Header'>
                        <Link to='/' onClick={this.handleLinkClick}>
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