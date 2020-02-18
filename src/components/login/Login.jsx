/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import * as session from '../../session';
import '../signup/signup.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isPasswordVisible: 'password',
      password: '',
      modal: false,
      alert: false,
      isLoggedIn: false
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.isLoginOpen) {
      return { modal: true };
    }

    /*if(props.error.length > 0) {
      return { alert: true };
    }*/

    if(props.error.length || state.alert) {
      return { alert: !state.alert };
    }

    if(props.data && props.data.token) {
      props.resetLoginState();
      props.onGetUserData();
      return { modal: false};
    }
    return state;
  }

  componentDidMount() {
    this.setState({ isLoggedIn: session.isSessionValid() });
  }

  handleClose = ()  => {
    this.props.resetIsLoginOpen();
    this.setState({ modal: false });
  }

  handleShow = () => {
    this.setState({ modal: true });
  }

  handleAlertDismiss = () => {
    this.props.resetLoginState();
    this.setState({ alert: false });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onHandleLogin(email, password);
  }

  handleForgotPassword = () => {
    this.handleClose();
    this.props.handleForgotPassword();
  }

  handleOpenSignup = () => {
    this.handleClose();
    this.props.handleOpenSignup();
  }

  render() {
    return (
      <>
        <a href="#" className="set-border login-btn" onClick={this.handleShow}>Login</a>

        <Modal className="width-75" show={this.state.modal} size='lg' onHide={this.handleClose}>
          <form method="post" onSubmit={ this.handleLogin }>
            <div className="modal-padding set-login-padding pt-4 px-4">
                <div className="signup-header">
                  <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="button" className="close" onClick={ this.handleClose}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                    <div className="col-lg-12 col-md-12 col-12">
                    <div className="header-pad">
                      <h5>Login</h5>
                      <p className="pb-3">Please login with own credentials</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Alert variant="danger" show={ this.state.alert } onClose={ this.handleAlertDismiss } dismissible>
                  {this.props.error}
                </Alert>
                <div className="modal-body px-5">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="main-popup-input">
                        <label>EMAIL ADDRESS</label>
                        <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={ this.state.email }
                        required
                        />
                      </div>
                      <div className="main-popup-input mb-3">
                        <label>PASSWORD</label>
                        <input
                        type={this.state.isPasswordVisible}
                        className="form-control"
                        name="password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={ this.state.password }
                        required
                        />
                        <span className="password" onClick={() => { this.setState({isPasswordVisible: this.state.isPasswordVisible === 'input' ? 'password' : 'input'}) }}><i className={this.state.isPasswordVisible === 'input' ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                      </div>
                      <div className="main-popup-input mb-0">
                       <a href="#" onClick={this.handleForgotPassword} className="forgot-password">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12 border-0 pb-0 px-5">
                  <button type="submit" className="btn form-signup text-white w-100">Login</button>
                  <p className="account">Dont have an account? <a href="#" onClick={this.handleOpenSignup}>Sign Up</a></p>
                  <p className="secured_text"><i className="fa fa-lock"></i>All action performed in this website is secured by ssl</p>
                </div>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

export default Login;
