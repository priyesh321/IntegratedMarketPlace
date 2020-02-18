/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Modal, Alert, Tooltip, OverlayTrigger, ButtonToolbar } from 'react-bootstrap';
import { required, email, isEqual } from '../../formValidation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import './signup.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  dob: '',
  businessPhoneNumber: '',
  phoneNumber: '',
  primaryContact: 'email',
  serviceProvider: 'freelancer',
  status: '',
  uen: '',
  isAgree: false,
  isSuspended: false,
  modal: false,
  isPasswordVisible: 'password',
  isConfirmPasswordVisible: 'password',
  alert: false,
  showToolTip: false,
  target: '',
  role: 'Non Premium'
};

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  componentDidUpdate() {
    if (this.props.error.length && !this.state.alert) {
      this.setState({ alert: true });
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.isOpenSignup) {
      return { modal: true }
    }
    if (props.success.length) {
      props.resetSignupState();
      return { modal: false }
    }
    return state;
  }

  handleModalClose = () => {
    this.props.handleOpenSignup();
    this.setState({ modal: false, alert: false });
  }

  handleModalShow = () => {
    this.setState({ ...initialState, modal: true });
  }

  handleAlertDismiss = () => {
    this.props.resetSignupState();
    this.setState({ alert: false });
  }

  handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, gender, dob, phoneNumber, primaryContact, isAgree, isSuspended, uen, role, businessPhoneNumber, serviceProvider } = this.state;
    const data = { name, email, password, gender, dob, phoneNumber, primaryContact, isAgree, isSuspended, uen, role, businessPhoneNumber, serviceProvider };
    this.props.onHandleSignup(data);
  }

  handleDobChange = (date) => {
    this.setState({
      dob: date
    });
  }

  render() {
    let tooltip = <Tooltip id="overlay-example">Mobile number is required to prevent duplicate account, a Sign-up One-Time Pin (OTP) will be sent to you mobile number.</Tooltip>;
    return (
      <>
        <a href="#" className="signup-btn text-white" onClick={this.handleModalShow}>SIGNUP</a>
        <Modal show={this.state.modal} size='lg' onHide={this.handleModalClose}>
          <Form ref={c => { this.form = c }} onSubmit={this.handleSignup}>
            <div className="modal-padding">
              <div className="signup-header">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5>Sign up</h5>
                    <p>Please sign up with unique credentials</p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <button type="button" className="close" onClick={this.handleModalClose}>
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              </div>
              <Alert variant="danger" show={this.state.alert} onClose={this.handleAlertDismiss} dismissible>
                {this.props.error}
              </Alert>
              <div className="modal-body pl-0">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input">
                      <label>FULL NAME</label>
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={(e) => this.setState({ name: e.target.value })}
                        value={this.state.name}
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input mb-0">
                      <label>EMAIL ADDRESS</label>
                      <Input
                        name="email"
                        className="form-control"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email}
                        validations={[required, email]}
                      />
                    </div>
                    <span className="input-text ">Email address will be used as your login id</span>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">

                    <div className="main-popup-input mb-0">
                      <label>MOBILE NUMBER</label>
                      <Input type="text"
                        name="phoneNumber"
                        className="form-control"
                        onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                        value={this.state.phoneNumber}
                        validations={[required]}
                      />
                      <ButtonToolbar>
                        <OverlayTrigger placement="top" overlay={tooltip}>
                          <span className="password"><i className="fa fa-info-circle"></i></span>
                        </OverlayTrigger>
                      </ButtonToolbar>
                    </div>
                    <span className="input-text">Please include your country code before your mobile number(e.g. +6591234567 for Singapore phone number)</span>
                  </div>


                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="main-popup-input">
                      <label>GENDER</label>
                      <Select
                        className="form-control select-box"
                        name="gender"
                        onChange={(e) => this.setState({ gender: e.target.value })}
                        value={this.state.gender}
                        validations={[required]}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-12">
                    <div id="datepicker" className="input-group date main-popup-input" data-date-format="mm-dd-yyyy">
                      <label>DATE OF BIRTH</label>
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        selected={this.state.dob}
                        onChange={this.handleDobChange}
                        className="form-control bg-white"
                        dateFormat="dd/MM/yyyy"
                        required={true}
                        maxDate={new Date()}
                      />
                      <span className="input-group-addon"><i className="fa fa-calendar-plus-o"></i></span>
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input">
                      <label>CREATE PASSWORD</label>
                      <Input
                        type={this.state.isPasswordVisible}
                        className="form-control"
                        name="password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password}
                        validations={[required, isEqual]}
                      />
                      <span className="password" onClick={() => { this.setState({ isPasswordVisible: this.state.isPasswordVisible === 'input' ? 'password' : 'input' }) }}><i className={this.state.isPasswordVisible === 'input' ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input">
                      <label>CONFIRM PASSWORD</label>
                      <Input
                        type={this.state.isConfirmPasswordVisible}
                        className="form-control"
                        name="confirmPassword"
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        value={this.state.confirmPassword}
                        validations={[required, isEqual]}
                      />
                      <span className="password" onClick={() => { this.setState({ isConfirmPasswordVisible: this.state.isConfirmPasswordVisible === 'input' ? 'password' : 'input' }) }}><i className={this.state.isConfirmPasswordVisible === 'input' ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input">
                      <label>USER TYPE</label>
                      <select
                        className="form-control select-box"
                        name="serviceProvider"
                        onChange={(e) => this.setState({ serviceProvider: e.target.value })}
                        value={this.state.serviceProvider}
                        validations={[required]}
                      >
                        <option value="freelancer">Freelancer</option>
                        <option value="consumer">Consumer</option>
                        <option value="businessProvider">Business Provider</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="main-popup-input mb-0">
                      <label>PRIMARY CONTACT</label>
                      <select className="form-control select-box" name="primaryContact" onChange={(e) => this.setState({ primaryContact: e.target.value })} value={this.state.primaryContact} validations={[required]}>
                        <option value="phone_number">Mobile Number</option>
                        <option value="email">Email Address</option>
                        <option value="mobile_number_and_email">Mobile Number and Email Address</option>
                        <option value="not_display">Do Not Display</option>
                      </select>
                    </div>
                    <span className="input-text">Primary contact will be displayed in your listing page.</span>
                  </div>



                  {this.state.serviceProvider === 'businessProvider' && <div className="col-lg-12 col-md-12 col-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="main-popup-input">
                          <label>UEN</label>
                          <input
                            type="text"
                            className="form-control"
                            name="uen"
                            onChange={(e) => this.setState({ uen: e.target.value })}
                            value={this.state.uen}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="main-popup-input">
                          <label>BUSINESS PHONE NUMBER</label>
                          <input
                            type="text"
                            className="form-control"
                            name="uen"
                            onChange={(e) => this.setState({ businessPhoneNumber: e.target.value })}
                            value={this.state.businessPhoneNumber}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>}


                  <div className="custom-control custom-checkbox ml-3">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      name="isAgree"
                      id="isAgreeCheckbox"
                      value={this.state.isAgree}
                      onChange={(e) => this.setState({ isAgree: e.target.checked })}
                      required
                    />
                    <label htmlFor="isAgreeCheckbox" className="custom-control-label check-text">By signing, I agree to <a href="/" className="font-weight-bold">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pb-0">
                <Button type="submit" className="btn form-signup text-white">Sign up</Button>
              </div>
            </div>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Signup;