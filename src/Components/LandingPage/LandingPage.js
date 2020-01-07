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
            this.props.history.push('/home');

        })
        // .catch(res => {
        //     this.setState({error: res.error});
        // })
        .catch(res => {
            console.error(res.error);
        });
    }

    render(){
        return (
        <main className='mainpage'>
            <h2>Get Stronger!</h2>
            <button onClick={this.demoLogin}>Demo</button>
            <section>
                <header className='banner'><h3>Keep a workout log</h3></header>
                <p>[placeholder for screenshot of home page]</p>
                <p>Workout tracker and log for strength training.</p>
            </section>
            <section>
                <header className='banner'><h3>Plan ahead</h3></header>
                <p>[placeholder for screenshot of screen to create workout]</p>
                <p>Plan your workouts to prevent any guessing in the gym.</p>
            </section>
            <section>
                <header className='banner'><h3>Set up routines</h3></header>
                <p>[placeholder for screenshot of screen to create routines]</p>
                <p>Create routines and spicify the weight and set increments from one workout to another.</p>
            </section>
        </main>
        );
    }

}

export default LandingPage;