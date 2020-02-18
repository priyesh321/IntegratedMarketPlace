/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import '../verifyUser/verifyUser.css';
import './ResetPassword.css';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';
import { required, isEqual } from '../../formValidation';

const initialState = {
  email: '',
  otp: '',
  modal: false,
  alert: false,
  successAlert: false,
  step: 1,
  password: '',
  confirmPassword: '',
  isPasswordVisible: 'password',
  isConfirmPasswordVisible: 'password'
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.isOpenResetPassword) {
      if(props.error.length) {
        return { alert: true }
      } else if(props.resendOtpMsg.length) {
        return { successAlert: true, step: 2 }
      } else if(props.showMessage.length) {
        return { step: 3 };
      } else if(props.resetPasswordSuccess.length > 0) {
        return { step: 4 }
      } else {
        /*return { modal: true}*/
        return { modal: true, alert: false, step: 1 }
      }
    }

    return state;
  }

  handleClose = ()  => {
    this.props.handleForgotPassword();
    this.setState({ modal: false });
  }

  handleShow = () => {
    this.setState({ modal: true });
  }

  handleAlertDismiss = () => {
    this.props.resetVerifyState();
    this.setState({ alert: false });
  }

  handleSuccessAlertDismiss = () => {
    this.props.resetOtpMsg();
    this.setState({ successAlert: false });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onHandleLogin(email, password);
  }

  sendVerificationCode = (e) => {
    e.preventDefault();
    this.props.handleSendVerificationCode({email: this.state.email});
  }

  handleVerifyAccount = (e) => {
    e.preventDefault();
    const { email, otp } = this.state;
    this.props.onHandleVerify({email, otp});
  }

  resendOtp = () => {
    this.handleAlertDismiss();
    this.props.resendOtp({email:this.state.email});
  }

  updatePassword = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    this.props.handleResetPassword(password, confirmPassword, this.props.data);
  }

  goToLogin = () => {
    this.props.handleForgotPassword();
    this.props.openLoginModal();
    this.setState({ modal: false });
  }

  render() {
    return (
      <>
        <Modal className="width-75" show={this.state.modal} size='lg' onHide={this.handleClose}>
          <div className="modal-padding p-4">
            <div className="forgot-password-header text-center">
              <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                      <button type="button" className="close" onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
              </div>
            </div>
            <div className="modal-body pl-0 text-center">
              { this.state.step === 1 &&
                <form onSubmit={this.sendVerificationCode}>

                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-12 offset-2">
                      <div className="col-lg-12 col-md-12 col-12">
                        <h5>Forgot Your Password</h5>
                        <p>Enter your register email</p>
                      </div>
                      <Alert variant="danger" show={ this.state.alert } onClose={ this.handleAlertDismiss } dismissible>
                        {this.props.error}
                      </Alert>
                      <div className="main-popup-input">
                        <label>Email</label>
                        <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={ this.state.email }
                        required
                        />
                      </div>
                      <button type="submit" className="btn form-signup text-white">Send Verification Code</button>
                    </div>
                  </div>
                </form>
              }
              { this.state.step === 2 &&
                <form onSubmit={this.handleVerifyAccount}>
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-12 offset-2">
                      <div className="header-pad">
                        <h5>Verify Account</h5>
                      </div>

                      <Alert variant="danger" show={ this.state.alert } onClose={   this.handleAlertDismiss } dismissible>
                      {this.props.error}
                      </Alert>

                      <Alert variant="success" show={ this.state.successAlert } onClose={ this.handleSuccessAlertDismiss } dismissible>
                        {this.props.resendOtpMsg}
                      </Alert>

                      <div className="main-popup-input">
                        <label>Verification Code</label>
                        <input
                        type="text"
                        name="otp"
                        className="form-control"
                        onChange={(e) => this.setState({ otp: e.target.value })}
                        value={ this.state.otp }
                        required
                        />
                      </div>
                      <div className="main-popup-input mb-0">
                       <a href="#" onClick={this.resendOtp} className="forgot-password">Resend OTP</a>
                      </div><br/>
                      <button type="submit" className="btn form-signup text-white">Verify Account</button>
                    </div>
                  </div>
                </form>
              }
              { this.state.step === 3 &&
                <Form ref={c => { this.form = c }} onSubmit={this.updatePassword}>
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-12 offset-2 mt-3">
                      <div className="header-pad">
                        <h5>Reset Password</h5>
                      </div>
                      <div className="main-popup-input">
                        <label>NEW PASSWORD</label>
                        <Input
                          type={this.state.isPasswordVisible}
                          className="form-control"
                          name="password"
                          onChange={(e) => this.setState({ password: e.target.value })}
                          value={ this.state.password }
                          validations={[required, isEqual]}
                        />
                        <span className="password" onClick={() => { this.setState({isPasswordVisible: this.state.isPasswordVisible === 'input' ? 'password' : 'input'}) }}><i className={this.state.isPasswordVisible === 'input' ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                      </div>

                      <div className="main-popup-input">
                        <label>CONFIRM PASSWORD</label>
                        <Input
                          type={this.state.isConfirmPasswordVisible}
                          className="form-control"
                          name="confirmPassword"
                          onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                          value={ this.state.confirmPassword }
                          validations={[required, isEqual]}
                        />
                        <span className="password" onClick={() => { this.setState({isConfirmPasswordVisible: this.state.isConfirmPasswordVisible === 'input' ? 'password' : 'input'}) }}><i className={this.state.isConfirmPasswordVisible === 'input' ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                      </div>

                      <Button type="submit" className="btn form-signup text-white">Submit</Button>

                    </div>
                  </div>
                </Form>
              }
              { this.state.step === 4 &&
                <div className="modal-padding p-4 w-75 mx-auto">
                  <div className="pl-0 text-center pb-5">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-12 offset-1 pr-0">
                        <div className="verify">
                          <p>Your account password has been successfully reset.Continue to Login with new password.</p>
                          <button type="button" onClick={this.goToLogin} className="btn form-signup text-white w-100">Login</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ResetPassword;

