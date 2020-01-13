import React, {Component} from 'react';
import AppContext from '../../AppContext';
import AuthApiService from '../../services/authAPI';
import TokenService from '../../services/token-service';
import './LandingPage.css';

class LandingPage extends Component{

    static contextType = AppContext;

    state={error: null};
    
    demoLogin = ev => {
        ev.preventDefault();
        this.context.isLoading();

        this.setState({error: null});
        const username = 'admin';
        const password = 'Password123*';

        AuthApiService.postLogin({
            username: username,
            password: password
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken);
            this.context.onLoginSuccess();
            this.context.hasLoaded();
            this.props.history.push('/home');

        })
        .catch(res => {
            console.error(res.error);
        });
    }

    render(){
        return (
        <main className='LandingPage'>
            <section className='LandingPage__Hero'>
                <div className='LandingPage_HeroContainer'>
                    
                    <div className='LandingPage__HeroContent'>
                        <h1 className='LandingPage__HeroPhrase'>Track your progress to get stronger!</h1>
                        <div className='LandingPage__HeroContent-text'>
                            <p>Take the guestwork out of your training and record your workouts to properly plan the next sessions to help you improve your progress.</p>
                        </div>
                    </div>
                    <div className='LandingPage__Demo'>
                            <button className='LandingPage__DemoButton'onClick={this.demoLogin}>Click here to try it!</button>
                        </div>
                </div>
            </section>
            <section className='LandingPage__Body'>
                <div className='LandingPage__Workout LandingPage__screenshot'>
                    <p>Add Wokrouts</p>
                    <img className='LandingPage__screenshot_image' src={require('./assets/workoutIcon.png')} alt='workout screenshot'></img>
                </div>
                <div className='LandingPage__Exercise LandingPage__screenshot'>
                    <p>Add Exercises</p>
                    <img className='LandingPage__screenshot_image' src={require('./assets/exerciseIcon.png')} alt='workout screenshot'></img>
                </div>
                <div className='LandingPage__Sets LandingPage__screenshot'>
                    <p>Add Sets</p>
                    <img className='LandingPage__screenshot_image' src={require('./assets/setIcon.png')} alt='workout screenshot'></img>
                </div>
            </section>
        </main>
        );
    }
}

export default LandingPage;