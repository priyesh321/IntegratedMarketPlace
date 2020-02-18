/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import './header.css';
import { Link } from 'react-router-dom'
import * as session from '../../session';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';

class Header extends React.Component {

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

  handleLogout = () => {
    session.clearSession();
    this.setState({ isSessionValid: false });
    this.props.onLogout();
  }

  goToProfile = () => {
    this.props.history.push("/profile");
  }

  render() {
    return (
      <>
      { /*Header Start*/ }
      <header className="service-info-header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg service-info-nav">
            <Link className="navbar-brand" to="/"><img src="/images/logo.png" alt="" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto align-items-center">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">CATEGORIES</Dropdown.Toggle>
                  <Dropdown.Menu className="custom-dropdown-menu">
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
                <li className="active"><a href="/subscription">PRICING</a></li>
                <li><a href="/create-listing">LISTING</a></li>
                { this.state.isSessionValid &&
                  <li><a href="/my-listing">My LISTING</a></li>
                }
                { this.state.isSessionValid &&
                  <li><a href="/product-traffic">PRODUCT TRAFFIC</a></li>
                }
                <li><a href="#">ABOUT US</a></li>
                <li><a href="#" className="ml-0">HOW TO USE</a></li>
                <li><i className="fa fa-search" aria-hidden="true"></i>
                     <div className="search-box">
                        <input type="text" placeholder=""/>
                        <input type="button" value="Search"/>
                    </div>
                </li>
                { this.state.isSessionValid &&
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="profile-link float-left pl-5 pr-3">
                      <h4>Hi, {this.state.currentUser.name}</h4>
                      <p>Welcome!</p>
                  </div>
                      <img src={(this.state.currentUser.profilePicture) ? this.state.currentUser.profilePicture : 'images/default-profile.png'} alt="" className="profile-link" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu">
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
                { !this.state.isSessionValid &&
                  <>
                  <li className="mt-0"><Login /></li>
                  <li><Signup /></li>
                  </>
                }
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/*Header End*/}
      </>
    );
  }
}

export default Header;