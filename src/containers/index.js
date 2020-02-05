import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/app";
import {registerUser, loginUser } from "../actions";
import {
  buttonValue
} from "../actions/helper";
import Button from "../components/shared/button";
import Login from "../components/social/login";
import Register from '../components/social/register'



class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  renderAlert() {
    if ( this.props.errorMessage ) {
      return (
      <div style={{color: '#722f37',fontSize: '1.6vw',
    fontFamily: 'kambli2', marginBottom : '3%'}} className="">
        <span><strong>Error!</strong> { this.props.errorMessage }</span>
      </div>
      );
    }
 }


  handleButton = () => {
   this.setState({login : !this.state.login})
   localStorage.setItem('login', !this.state.login);
  };


  loginUserFUnc = (values) => {
    this.props.loginUser(values, this.props.history)
}

registerUserFUnc = (values) => {
  this.props.registerUser(values, this.props.history)
}



  render() {
    const { login } = this.state;
    return (
      <App>
        <div className='row'>
          <div className='col-md-6'>
        <Button
                  onClickFunction={this.handleButton}
                  label={buttonValue(login , 'Login', 'Create Account')}
                />
 {login ? 
                <div>
                <h3>Create Account</h3>
                {this.renderAlert()}
                <Register  clickFunction={this.registerUserFUnc} login={login}  />
                </div>
                 : 
                 <div>
                <h3>Login</h3>
                {this.renderAlert()}
                <Login clickFunction={this.loginUserFUnc}  login={login}  />
                </div>
                }
          
          </div>
          <div className='col-md-6'>
              <img alt='bg' className='img-responsive' src='bg.png' />
          </div>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(
  mapStateToProps,
  {
    loginUser,
    registerUser
  }
)(MainPage);
