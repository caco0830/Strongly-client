import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.css';

export default class Footer extends React.Component{

    render(){
        return(
            <footer className="Footer">
                <div>© Carlo Coria</div>
                <div className='Footer__MailIcon'>
                    <a href='mailto:carlo.0830@gmail.com'><MailIcon/></a> 
                    <a href='https://www.linkedin.com/in/coriaca/'><LinkedInIcon/></a>
                    <a href='https://github.com/caco0830'><GitHubIcon/></a>
                </div>
            </footer>
        );
    }

}