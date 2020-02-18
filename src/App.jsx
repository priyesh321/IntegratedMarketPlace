import * as React from 'react';
import Home from './containers/home';
import UserProfile from './containers/userProfile';
import CreateListing from './containers/createListing';
import EditListing from './containers/editListing';
import MyListing from './containers/myListing';
import ProductTraffic from './containers/productTraffic';
import CreateFeatureListing from './containers/createFeatureListing';
import PremiumSubscription from './containers/premiumSubscription';
import SellerProfile from './containers/sellerProfile';
import ServiceDetail from './containers/serviceDetail';
import  CategoryHome  from "./containers/categoryWiseFeaturedListing";
import {  Router, Route, Redirect, Switch } from 'react-router-dom';
import * as session from './session';
import Cookie from './cookies';
import history from './history';
require('dotenv').config();

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
      ? (
         <Component {...props} />
      )
      : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
    )}
  />
  );

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSessionValid: session.isSessionValid
    }
  }
  componentDidMount() {
    Cookie.setCookie();
    if(session.isSessionValid()) {
      this.props.onGetUserData();
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact={true}
            path='/'
            render={(props) => <Home {...props} />}
          />
          <Route
            exact={true}
            path='/subscription'
            render={(props) => <PremiumSubscription {...props} />}
          />
          <Route
            exact={true}
            path='/seller-profile/:sellerId'
            render={(props) => <SellerProfile {...props} />}
          />

          <Route
            exact={true}
            path='/service-detail/:listingId'
            render={(props) => <ServiceDetail {...props} />}
          />

          <Route
            exact={true}
            path='/all-featured'
            render={(props) => <CategoryHome {...props} />}
          />

          <PrivateRoute path="/profile" component={UserProfile} isAuthenticated={this.props.isLoggedIn} />

          <PrivateRoute path="/create-listing" component={CreateListing} isAuthenticated={this.props.isLoggedIn} />

          <PrivateRoute path="/my-listing" component={MyListing} isAuthenticated={this.props.isLoggedIn} />

          <PrivateRoute path="/product-traffic" component={ProductTraffic} isAuthenticated={this.props.isLoggedIn} />

          <PrivateRoute path="/:listingId/featurelisting" component={CreateFeatureListing} isAuthenticated={this.props.isLoggedIn} />
          
          <PrivateRoute path="/:listingId/edit" component={EditListing} isAuthenticated={this.props.isLoggedIn} />
        </Switch>
      </Router>
    );
  }
}

export default App;
