import React from 'react';
import AppContext from '../../AppContext';
import {Link, Router} from 'react-router-dom';
import TokenService from '../../services/token-service';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import './Nav.css';

export default class Nav extends React.Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {
            menuOpen:false,
            mobileMenu: false
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    resize(){
        this.setState({mobileMenu: window.innerWidth < 1080});
    }

    //sets the openMenu state to true or false to display the drop down menu
    handleMenuClick() {
        const open = this.state.menuOpen ? false:true;
        this.setState({menuOpen: open});
    }
    //closes the side menu on mobile when login is clicked.
    handleLinkClick = () => {
        this.setState({menuOpen: false});
    }

    //clears the token from storage and closes the side menu
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        this.context.onLogoutSuccess();
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
                    className="menu-item" 
                    to='/home'
                    onClick={this.handleLinkClick}>
                        <HomeIcon/> Home
                </Link>
                <Link
                    className="menu-item" 
                    to='/register'
                    onClick={this.handleLinkClick}>
                        <NoteAddIcon/> Register
                </Link>
                <Link
                    className="menu-item" 
                    to='/login'
                    onClick={this.handleLinkClick}>
                        <VpnKeyIcon/> Login
                </Link>
            </div>
        );
    }

    renderLogoutLink() {
        return (
                <div className='Header__menu'>
                    <div className='Header__menu-items'>
                        <Link
                            className="menu-item" 
                            to='/home'
                            onClick={this.handleLinkClick}>
                                <HomeIcon/> Home
                        </Link>
                        <Link
                            className="menu-item" 
                            to='/'
                            onClick={this.handleLogoutClick}>
                                <ExitToAppIcon/> Logout
                        </Link>
                    </div>
                    <div className='Header__menu-items-background'></div>
                </div>
        );
    }

    render(){
        //let width = this.context.windowSize;
        if(this.state.mobileMenu){
            return(
                <div>
                    <nav className='Header'>
                        
                        <MenuIcon onClick={() => this.handleMenuClick()} className='menu-icon Header__child'/>
                        <Link className='Header__child' to='/' onClick={this.handleLinkClick}>
                            <p>Strongly</p>
                        </Link>
                    </nav>
                    {this.state.menuOpen ? this.renderMenu() : ''}
                </div>
            );
        }else{
            return(
                <div>
                    <nav className='Header'>
                        <Link className='Header__child' to='/' onClick={this.handleLinkClick}>
                            <p>Strongly</p>
                        </Link>
                        {this.renderMenu()}
                    </nav>
                </div>
                );
        }
    }
}