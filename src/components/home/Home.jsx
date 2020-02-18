/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import VerifyUser from '../../containers/VerifyUser';
import ResetPassword from '../../containers/resetPassword';
import Footer from '../../containers/footer';
import * as session from '../../session';
import { Dropdown } from 'react-bootstrap';
import FeaturedListing from '../../containers/featuredListing';
import ListedServices from '../../containers/listedServices';
import MonthTrending from '../../containers/monthTrending';
import CookieConsent from "react-cookie-consent";
import Cookie from '../../cookies';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSessionValid: false,
      currentUser: ''
    }
  }
  componentDidMount() {
    this.setState({ isSessionValid: session.isSessionValid()});
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.currentUser) {
      return { currentUser: props.currentUser, isSessionValid: session.isSessionValid() }
    }
    return state;
  }

  goToProfile = () => {
    this.props.history.push("/profile");
  }

  handleLogout = () => {
    session.clearSession();
    this.setState({ isSessionValid: false });
    this.props.onLogout();
  }

  declineCookieConsent = () => {
    Cookie.clearAllCookie();
  }

  render() {
    return (
      <>
      <VerifyUser />
      <ResetPassword />

      {/*Banner Box Start*/}
      <section className="banner-product-list">
        <div className="container custom-container">
          <nav className="navbar navbar-expand-lg pt-4">
              <a className="navbar-brand" href="/"><img alt="market place" src="/images/logo.png"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic-home">CATEGORIES</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Car and Property</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Fashion</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Home and Living</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Mobile and Electronics</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Hobbies and Games</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Home and Living</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Job and Services</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Others</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <li><a href="/subscription">PRICING</a></li>
                      <li><a href="/create-listing">LISTING</a></li>
                      { this.state.isSessionValid &&
                        <li><a href="/my-listing">My LISTING</a></li>
                      }
                      { this.state.isSessionValid &&
                        <li><a href="/product-traffic">PRODUCT TRAFFIC</a></li>
                      }
                      <li><a href="#">ABOUT US</a></li>
                      <li><a href="#">HOW TO USE</a></li>
                      { this.state.isSessionValid &&
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic-home">
                            <div className="profile-link profile-link-home float-left pl-5 pr-3">
                            <h4>Hi, {this.state.currentUser.name}</h4>
                            <p>Welcome!</p>
                        </div>
                          <img alt="" src={(this.state.currentUser.profilePicture) ? this.state.currentUser.profilePicture : '/images/default-profile.png'} className="profile-link" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item onClick={this.goToProfile}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      }
                      { !this.state.isSessionValid &&
                        <>
                        <li><Login /></li>
                        <li><Signup /></li>
                        </>
                      }

                  </ul>
              </div>
          </nav>
  
          {/* FeaturedListing */}
          <FeaturedListing {...this.props}/>
        
        </div>
      </section>
      {/*Banner Box End*/}

      {/* What are you looking Start */}
      <section className="what-are-you-looking mt-5">
        <div className="container custom-container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="looking-left">
                <img alt="search" src="images/input-left.png" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="looking-right">
                <h6>what are</h6>
                <h1>You Looking for?</h1>
                <div className="form-group mt-5 position-relative">
                  <input type="text" className="form-control health-input" name="" placeholder="" />
                  <button className="input-search"><i className="fa fa-search"></i></button>
                </div>
                <h5 className="text-center pt-3">Search your required services here! </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What are you looking End */}

      {/*Trending month Start*/}
        <MonthTrending {...this.props}/>
      {/*Trending month End*/}


      {/*Listed Service*/}
        <ListedServices {...this.props}/>
      {/* Listed Services */}

      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
      <CookieConsent
        location="bottom"
        style={{
          background: "#fff",
          color: "#605c5c",
          display: "block",
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.1)'
        }}
        buttonStyle={{
          color: "#ffffff",
          borderRadius:'3px',
          padding:'9px 12px',
          background: '#0072ce',
          fontSize: "13px",
          float: "right"
        }}
        buttonText="Accept"
        declineButtonText="Decline"
        declineButtonStyle={{
          color: '#5c5a5a',
          fontSize: "13px",
          float: "right",
          border: '2px solid #5c5a5a',
          background: 'transparent',
          borderRadius:'3px',
          padding:'7px 12px'
        }}
        expires={150}
        enableDeclineButton
        onDecline={this.declineCookieConsent}
      >
        <small>This website stores cookies on your computer.
        These cookies are used to collect information
        about how you interact with our website and allow
        us to remember you. We use this information in order
        to improve and customize your browsing experience and
        for analytics and metrics about our visitors both on
        this website and other media. To find out more about
        the cookies we use, see our Privacy Policy.</small><br/>

        <small>If you decline, your information won't be tracked when
        you visit this website. A single cookie will be used in
        your browser to remember your preference not to be tracked.</small>
      </CookieConsent>
      </>
    )
  }
}

export default Home;
