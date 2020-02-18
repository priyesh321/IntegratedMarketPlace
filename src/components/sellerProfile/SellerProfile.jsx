/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import './sellerProfile.css';
import Moment from 'react-moment';
import SellerListing from '../../containers/sellerListing';
import ReportUser from '../../containers/reportUser';

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: null
    };
  }

  componentDidMount() {
    const { sellerId } = this.props.match.params;
    this.setState({ sellerId: sellerId});
    this.props.getSellerData(sellerId);
    this.props.getSellerListing(sellerId);
  }

  render() {
    const user = this.props.sellerData;
    return (
      <>
        <Header />

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

        <section className="service-info">
          <div className="container custom-container service-info-bg pt-4">
            { user &&
              <div className="row">
                { this.props.isLoggedIn && this.state.sellerId &&
                  <div className="user-link w-100 text-right pb-3">
                    <ReportUser userId={this.state.sellerId} />
                  </div>
                }

                <div className="seller-user text-center w-100">
                  <img alt="" src={(user.profilePicture) ? user.profilePicture : 'images/default-profile.png'} className="rounded-circle" width="215" height="215" />
                  <h1>{user.name}</h1>
                  <h6>Joined since &nbsp;<Moment format="MM/YYYY">{user.createdAt}</Moment>
                  </h6>
                  <p><a href={`mailto:${user.email}`}>{user.email}</a><a href={`tel:${user.phoneNumber}`}><i className="fa fa-whatsapp"></i><span>{user.phoneNumber}</span></a></p>
                </div>
              </div>
            }
          </div>
        </section>

        { user && this.state.sellerId &&
          <SellerListing sellerId={this.state.sellerId} {...this.props} />
        }
        <Footer />
      </>
    )
  }
}
export default SellerProfile;
