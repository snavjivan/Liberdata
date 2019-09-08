import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import GoogleLogin from 'react-google-login';

class Login extends Component {

  render() {

    const responseGoogle = (response) => {
      console.log(response);
      this.props.history.push('/collect')
    }

    return (
        <div className="Login">
        <header className="Login-header">
            <h1 className="main">
            Welcome to Liberdata
            </h1>
            <div className="accent">
            We're here to democratize your personal data.
            </div>
            <br/>
            <GoogleLogin
              clientId="313865159596-tmjml77f6098ep4pndkecd313iot30ev.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
              buttonText="Login to get started"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            <br/>
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        </div>
    );
  }

}

export default Login;
