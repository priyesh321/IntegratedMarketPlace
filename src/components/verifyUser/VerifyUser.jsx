/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import '../signup/signup.css';
import './verifyUser.css';

class VerifyUser extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        phoneNumber: '258963147',
        otp: '',
        modal: false,
        alert: false,
        showMessage: false,
        successAlert: false
      };
    }

    static getDerivedStateFromProps = (props, state) => {
      if(props.isVerified) {
        if(props.error.length) {
          return { alert: true };
        } else if(props.showMessage.length) {
          return { showMessage: true };
        } else if(props.resendOtpMsg.length) {
          return { successAlert: true }
        } else {
          return {phoneNumber: props.data, modal: true};
        }
      }
      return state;
    }

    handleModalClose = ()  => {
      this.setState({ modal: false });
    }

    handleModalShow = () => {
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

    handleVerifyAccount = (e) => {
      e.preventDefault();
      const { phoneNumber, otp } = this.state;
      this.props.onHandleVerify({phoneNumber, otp});
    }

    goToLogin = () => {
      this.props.closeVerifyModal();
      this.props.openLoginModal();
      this.setState({ modal: false });
    }

    resendOtp = () => {
      this.handleAlertDismiss();
      this.props.resendOtp({phoneNumber: this.state.phoneNumber});
    }

    render() {
      return (
        <>
          <Modal className="width-75" show={this.state.modal} size='lg' onHide={this.handleModalClose}>
          { !this.state.showMessage &&
            <form method="post" onSubmit={ this.handleVerifyAccount }>
              <div className="modal-padding set-login-padding pt-4 px-4">
                  <div className="signup-header">
                    <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <button type="button" className="close" onClick={ this.handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                      <div className="col-lg-12 col-md-12 col-12">
                      <div className="header-pad">
                        <h5>Verify Account</h5>
                        <p className="pb-3">OTP has been sent to your register mobile number.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body px-5">
                  <Alert variant="danger" show={ this.state.alert } onClose={ this.handleAlertDismiss } dismissible>
                    {this.props.error}
                  </Alert>

                  <Alert variant="success" show={ this.state.successAlert } onClose={ this.handleSuccessAlertDismiss } dismissible>
                    {this.props.resendOtpMsg}
                  </Alert>

                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="main-popup-input">
                          <label>OTP</label>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 border-0 pb-0 px-5">
                    <button type="submit" className="btn form-signup text-white w-100">Verify Account</button>
                  </div>
              </div>
            </form>
          }
          { this.state.showMessage &&
            <div className="modal-padding p-4 w-75 mx-auto">
              <div className="pl-0 text-center pb-5">
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-12 offset-1 pr-0">
                    <div className="verify">
                      <img alt="verify user" src="/images/verify.jpg" />
                      <h5>Verify Account</h5>
                      <p>You has successfully verified your account. Click continue to
                      start browsing or listing your services with us.</p>
                      <button type="button" onClick={this.goToLogin} className="btn form-signup text-white w-100">Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </Modal>
        </>
      );
    }
  }

  export default VerifyUser;