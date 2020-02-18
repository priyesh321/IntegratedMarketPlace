/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Header from '../../containers/header';
import Footer from '../../containers/footer';
import './userProfile.css'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import { required, isEqual } from '../../formValidation';
import DatePicker from "react-datepicker";
import * as session from '../../session';
import { Modal, Alert } from 'react-bootstrap';
import axios from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';

const apiUrl = process.env.REACT_APP_API_URI;

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  phoneNumber: '',
  primaryContact: '',
  serviceProvider: '',
  uen: '',
  isPasswordVisible: 'password',
  isConfirmPasswordVisible: 'password',
  alert: false,
  isLoggedIn: false,
  userId: '',
  updateEmailModal: false,
  updateEmailAlert: false,
  newEmail: '',
  otp: '',
  showError: false,
  contactUpdateDone: false,
  updatePhoneNumberModal: false,
  newPhoneNumber: '',
  updatePhoneNumberAlert: false,
  changePasswordModal: false,
  changePasswordSuccess: false,
  profilePicture: '/images/default-profile.png',
  emailUpdateStep: 1,
  PhoneUpdateStep: 1,
  option: '',
  
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({ isLoggedIn: session.isSessionValid() });
    this.props.onGetUserProfileDate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.personal_info_success && nextProps.personal_info_success.length > 0) {
      this.setState({ alert: true });
    }

    if (nextProps.success && nextProps.success.length > 0) {
      if (this.state.updateEmailModal) {
        this.setState({ updateEmailAlert: true, emailUpdateStep: 2 });
      } else if (this.state.updatePhoneNumberModal) {
        this.setState({ updatePhoneNumberAlert: true, PhoneUpdateStep: 2 });
      }
    }

    if (nextProps.error)
      this.setState({ showError: true });

    if (nextProps.contactUpdateMsg) {
      this.setState({ contactUpdateDone: true });
      if (this.state.updateEmailModal) {
        this.setState({ emailUpdateStep: 3 });
      } else if (this.state.updatePhoneNumberModal) {
        this.setState({ PhoneUpdateStep: 3 });
      }
      this.handleSuccessAlertDismiss();
    }

    if (nextProps.resetPasswordSuccess && nextProps.resetPasswordSuccess.length) {
      this.setState({ changePasswordSuccess: true });
    }
    this.setState({
      name: nextProps.userProfileData.name,
      email: nextProps.userProfileData.email,
      phoneNumber: nextProps.userProfileData.phoneNumber,
      gender: nextProps.userProfileData.gender,
      dob: new Date(nextProps.userProfileData.dob),
      primaryContact: nextProps.userProfileData.primaryContact,
      serviceProvider: nextProps.userProfileData.serviceProvider || '',
      uen: nextProps.userProfileData.uen || '',
      userId: nextProps.userProfileData._id,
      profilePicture: (nextProps.userProfileData.profilePicture) ? nextProps.userProfileData.profilePicture : this.state.profilePicture
    });
  }

  handleDobChange = (date) => {
    this.setState({
      dob: date
    });
  }

  handleProfileUpdate = (e) => {
    e.preventDefault();
    const { name, dob, gender, primaryContact, serviceProvider, uen } = this.state;
    const data = { name, dob, gender, primaryContact, serviceProvider, uen };
    this.props.onUpdateUserProfile(data, this.state.userId);
    this.props.onGetUserProfileDate();
    this.props.onGetUserData();
  }

  handleAlertDismiss = () => {
    this.setState({ alert: false });
    this.props.onResetPersonalInfoSuccess();
  }

  handleErrorAlertDismiss = () => {
    this.setState({ showError: false });
    this.props.onResetError();
  }

  handleSuccessAlertDismiss = () => {
    if (this.state.updateEmailModal) {
      this.setState({ updateEmailAlert: false });
    } else if (this.state.updatePhoneNumberModal) {
      this.setState({ updatePhoneNumberAlert: false });
    }
    this.props.onResetSuccess();
  }

  handleContactUpdateAlertDismiss = () => {
    this.props.onResetContactUpdateMsg();
    this.setState({ contactUpdateDone: false, newEmail: '', newPhoneNumber: '' });
  }

  handleEmailModal = (val) => {
    if (!val) {
      this.setState({ updateEmailModal: false, updateEmailAlert: false, newEmail: '', otp: '', showError: false, contactUpdateDone: false, emailUpdateStep: 1 });
      this.handleContactUpdateAlertDismiss();
    }
    this.setState({ updateEmailModal: val });
  }

  handleSendOtpToEmail = (e) => {
    e.preventDefault();
    this.props.sendOtp(this.state.newEmail,this.state.option, 'email');
  }

  onHandleUpdateEmail = (e) => {
    e.preventDefault();
    this.props.onHandleUpdateContactDetail(this.state.newEmail, this.state.otp, 'email');
    this.props.onGetUserProfileDate();
  }

  handlePhoneNumberModal = (val) => {
    if (!val) {
      this.setState({ updatePhoneNumberModal: false, updatePhoneNumberAlert: false, newPhoneNumber: '', otp: '', showError: false, contactUpdateDone: false, PhoneUpdateStep: 1 });
      this.handleContactUpdateAlertDismiss();
    }
    this.setState({ updatePhoneNumberModal: val });
  }

  handleSendOtpToPhoneNumber = (e) => {
    e.preventDefault();
    this.props.sendOtp(this.state.newPhoneNumber,this.state.option, 'phoneNumber');
  }

  onHandleUpdatePhoneNumber = (e) => {
    e.preventDefault();
    this.props.onHandleUpdateContactDetail(this.state.newPhoneNumber, this.state.otp, 'phoneNumber');
    this.props.onGetUserProfileDate();
  }

  handleChangePasswordModal = (val) => {
    if (!val) {
      this.setState({ password: '', confirmPassword: '', isPasswordVisible: 'password', isConfirmPasswordVisible: 'password', changePasswordSuccess: false })
    }
    this.setState({ changePasswordModal: val });
  }

  handleUpdatePassword = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    this.props.handleResetPassword(password, confirmPassword, this.props.userProfileData._id);
  }

  handlePasswordSuccessAlertDismiss = () => {
    this.props.onResetPasswordSuccess();
    this.setState({ changePasswordSuccess: false });
  }

  uploadFile = async (event: any): Promise<void> => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userId', this.state.userId);
    formData.append('file', event.target.files[0]);
    axios.post(apiUrl + '/api/images/user-profile-picture-upload', formData, { headers: session.getAuthHeaders() })
      .then((response) => {
        this.props.setUserProfileData(response.data);
        this.props.onGetUserData();

      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Service info nav Start */}
        <section className="service-nav py-2">
          <div className="container custom-container">
            <div className="row">
              <div className="col-lg-12">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="#"><i className="fa fa-chevron-right"></i>Profile</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Service info nav End */}

        {/* Main page container Start */}
        <section className="service-info">
          <div className="container custom-container service-info-bg">
            <div className="row">
              <div className="col-12 text-center pb-4 file-btn">
                <img alt="" src={this.state.profilePicture} width="200" className="profile-image" /><br />
                <label id="#bb" className="mt-3"> Choose Profile Picture
                <input label='Choose Profile Picture' id="File" type="file" onChange={this.uploadFile} />
                </label>
              </div>
              <div className="col-12 text-center profile-paragraf">
                <p>{this.state.email} <button className="btn btn-link" onClick={() => this.handleEmailModal(true)}>Update Email</button></p>
                <p>{this.state.phoneNumber} <button className="btn btn-link" onClick={() => this.handlePhoneNumberModal(true)}>Update Phone Number</button></p>
                <p><button className="btn btn-link" onClick={() => this.handleChangePasswordModal(true)}>Change Password</button></p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6 offset-3">
                <Alert variant="success" show={this.state.alert} onClose={this.handleAlertDismiss} dismissible>
                  {this.props.personal_info_success}
                </Alert>

                <h4>Personal Information</h4>

                <Form ref={c => { this.form = c }} onSubmit={this.handleProfileUpdate}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                      validations={[required]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
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
                  <div className="form-group">
                    <label>Date of Birth</label><br />
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
                  </div>

                  <div className="form-group">
                    <label>Primary Contact</label>
                    <Select className="form-control select-box" name="primaryContact" onChange={(e) => this.setState({ primaryContact: e.target.value })} value={this.state.primaryContact} validations={[required]}>
                      <option value="phone_number">Mobile Number</option>
                      <option value="email">Email Address</option>
                      <option value="mobile_number_and_email">Mobile Number and Email Address</option>
                      <option value="not_display">Do Not Display</option>
                    </Select>
                  </div>

                  <div className="form-group">
                    <label>Service Provider</label>
                    <Select
                      className="form-control select-box"
                      name="serviceProvider"
                      onChange={(e) => this.setState({ serviceProvider: e.target.value })}
                      value={this.state.serviceProvider}
                      validations={[required]}
                    >
                      <option value="freelancer">Freelancer</option>
                      <option value="businessProvider">Business Provider</option>
                    </Select>
                  </div>

                  {this.state.serviceProvider === 'businessProvider' &&
                    <div className="form-group">
                      <label>UEN</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="uen"
                        onChange={(e) => this.setState({ uen: e.target.value })}
                        value={this.state.uen}
                        validations={[required]}
                      />
                    </div>
                  }
                  <Button type="submit" className="btn form-signup text-white mt-3">Update Profile</Button>

                </Form>
              </div>
            </div>
          </div>
        </section>
        {/* Main page container end */}
        <Footer />

        <Modal show={this.state.updateEmailModal} onHide={() => this.handleEmailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-5">
              <div className="col-10 offset-1">
                <Alert variant="success" show={this.state.updateEmailAlert} onClose={this.handleSuccessAlertDismiss} dismissible>
                  {this.props.success}
                </Alert>
                <Alert variant="danger" show={this.state.showError} onClose={this.handleErrorAlertDismiss} dismissible>
                  {this.props.error}
                </Alert>
                <Alert variant="success" show={this.state.contactUpdateDone} onClose={this.handleContactUpdateAlertDismiss} dismissible>
                  {this.props.contactUpdateMsg}
                </Alert>

                {this.state.emailUpdateStep === 2 &&
                  <Form ref={c => { this.form = c }} onSubmit={this.onHandleUpdateEmail}>
                    <div className="form-group">
                      <label >Enter Verification Code</label>
                      <Input
                        type="text"
                        name="otp"
                        className="form-control"
                        onChange={(e) => this.setState({ otp: +e.target.value })}
                        value={this.state.otp}
                        validations={[required]}
                      />
                    </div>
                    <Button type="submit" className="btn form-signup text-white">Update Email</Button>
                  </Form>
                }
                {this.state.emailUpdateStep === 1 &&
                  <Form ref={c => { this.form = c }} onSubmit={this.handleSendOtpToEmail}>
                    <div className="form-group">
                      <label>New Email</label>
                      <Input
                        type="text"
                        name="newEmail"
                        className="form-control"
                        onChange={(e) => this.setState({ newEmail: e.target.value })}
                        value={this.state.newEmail}
                        validations={[required]}
                      />
                      <br />


                      <label>Where should the OTP be sent to?</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          value='email'
                          onChange={(e) => this.setState({ option: e.target.value })}
                        />
                        <label className="form-check-label" >Existing Email</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          value='phoneNumber'
                          onChange={(e) => this.setState({ option: e.target.value })}
                        />
                        <label className="form-check-label">Existing Phone Number</label>
                      </div>

                    </div>
                    <Button type="submit" className="btn form-signup text-white">Send verification Code</Button>
                  </Form>
                }

              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.updatePhoneNumberModal} onHide={() => this.handlePhoneNumberModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Phone Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-5">
              <div className="col-10 offset-1">
                <Alert variant="success" show={this.state.updatePhoneNumberAlert} onClose={this.handleSuccessAlertDismiss} dismissible>
                  {this.props.success}
                </Alert>
                <Alert variant="danger" show={this.state.showError} onClose={this.handleErrorAlertDismiss} dismissible>
                  {this.props.error}
                </Alert>
                <Alert variant="success" show={this.state.contactUpdateDone} onClose={this.handleContactUpdateAlertDismiss} dismissible>
                  {this.props.contactUpdateMsg}
                </Alert>

                {this.state.PhoneUpdateStep === 2 &&
                  <Form ref={c => { this.form = c }} onSubmit={this.onHandleUpdatePhoneNumber}>
                    <div className="form-group">
                      <label>Enter Verification Code</label>
                      <Input
                        type="text"
                        name="otp"
                        className="form-control"
                        onChange={(e) => this.setState({ otp: +e.target.value })}
                        value={this.state.otp}
                        validations={[required]}
                      />

                    </div>
                    <Button type="submit" className="btn form-signup text-white">Update Phone Number</Button>
                  </Form>
                }
                {this.state.PhoneUpdateStep === 1 &&
                  <Form ref={c => { this.form = c }} onSubmit={this.handleSendOtpToPhoneNumber}>
                    <div className="form-group">
                      <label >New Phone Number</label>
                      <Input
                        type="text"
                        name="newPhoneNumber"
                        className="form-control"
                        onChange={(e) => this.setState({ newPhoneNumber: e.target.value })}
                        value={this.state.newPhoneNumber}
                        validations={[required]}
                      />
                       <br />
                      <label>Where should the OTP be sent to?</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          value='email'
                          onChange={(e) => this.setState({ option: e.target.value })}
                        />
                       
                        <label className="form-check-label" >Existing Email</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          value='phoneNumber'
                          onChange={(e) => this.setState({ option: e.target.value })}
                        />
                        <label className="form-check-label" >Existing Phone Number</label>
                      </div>
                    </div>
                    <Button type="submit" className="btn form-signup text-white">Send verification Code</Button>
                  </Form>
                }
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.changePasswordModal} onHide={() => this.handleChangePasswordModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={c => { this.form = c }} onSubmit={this.handleUpdatePassword}>

              <Alert variant="success" show={this.state.changePasswordSuccess} onClose={this.handlePasswordSuccessAlertDismiss} dismissible>
                {this.props.resetPasswordSuccess}
              </Alert>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-12 offset-2 mt-3">
                  <div className="main-popup-input">
                    <label>NEW PASSWORD</label>
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

                  <Button type="submit" className="btn form-signup text-white">Submit</Button>

                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

      </>
    )
  }
}

export default UserProfile;
