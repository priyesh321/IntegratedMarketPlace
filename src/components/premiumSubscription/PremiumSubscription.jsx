/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import './premiumSubscription.css';

class PremiumSubscription extends React.Component {
  render() {
    return (
      <>
        <Header />

        <section className="service-nav py-2">
          <div className="container custom-container">
            <div className="row">
              <div className="col-lg-12 pl-0">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-chevron-right" />
                      Pricing
                    </a>
                  </li>
                </ul>
                <div className="pricing-heading pt-5 pb-2">
                    <h6>Upgrade to</h6>
                    <h1>Premium account</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service-info pricing">
            <div className="container custom-container service-info-bg">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="pricing-left-heading">
                            <p>For</p>
                            <h4>Free User</h4>
                        </div>
                        <div className="pricing-left-paragraf">
                            <h4>Limited number of listing</h4>
                            <p>You will be entitled to manage a maximum of 2 listings.</p>
                        </div>
                        <hr className="m-0" />
                        <div className="pricing-left-paragraf">
                            <h4>Limited categories for listing</h4>
                            <p>Each your listing be limited to 1 category.</p>
                        </div>
                        <hr className="m-0" />
                        <div className="pricing-left-paragraf">
                            <h4>Limited photo in each listing</h4>
                            <p>You will be entitled to upload up to 1 photos per listing.</p>
                        </div>
                        <hr className="m-0" />
                        <div className="pricing-left-paragraf">
                            <h4>Limited location assigned in each listing</h4>
                            <p>You will be allowed assign up to 2 locations for each listing service area.</p>
                        </div>
                        <hr className="m-0" />
                        <div className="pricing-left-paragraf">
                            <h4>Limited number of reviews</h4>
                            <p>Each listing entitled up to 5 reviews.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 offset-0 offset-lg-1 col-12">
                        <div className="pricing-right py-4">
                            <div className="pricing-right-heading">
                                <p>For</p>
                                <h4>Premium User</h4>
                            </div>
                            <div className="pricing-right-paragraf">
                                <h4>Double your number of listings</h4>
                                <p className="m-0">Increase your range of services variety form 2 to 4.</p>
                            </div>
                            <hr className="m-0 white-line" />
                            <div className="pricing-right-paragraf">
                                <h4>Recieve Inlimited Number of Reviews</h4>
                                <p className="m-0">Your product listing will be able to gain reputation from the unlimited reviews made by other user.</p>
                            </div>
                            <hr className="m-0 white-line" />
                            <div className="pricing-right-paragraf">
                                <h4>Embeding promotional videos</h4>
                                <p className="m-0">
                                Buyers and other users will be able to see your promotioonal videos allow theme to better understand your services by linking URL to your listing page.</p>
                            </div>
                            <hr className="m-0 white-line" />
                            <div className="pricing-right-paragraf">
                                <h4>Embeding Promotional videos</h4>
                                <p className="m-0">
                                Buyers and other users will be able to see your promotioonal videos allow theme to better understand your services.</p>
                            </div>
                            <hr className="m-0 white-line" />
                            <div className="pricing-right-paragraf">
                                <h4>Assign up 2 types of categories for each listing</h4>
                                <p className="m-0">
                                Widen your visibility by tagging up to 2 types of categories most suited to your listing service scope and it will appear in both categories.</p>
                            </div>
                             <hr className="m-0 white-line" />
                             <div className="pricing-right-list py-4">
                                 <ul>
                                     <li><span>Upload Up To 4 photos Per Listing</span></li>
                                     <li><span>View Traffic Count For Each Listing</span></li>
                                     <li><span>Unlimited Locatiobn Can be Assigned to Each Listing</span></li>
                                 </ul>
                             </div>
                             <div className="premium-btns text-center">
                                <button className="btn premium-btn">Go Premium Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
      </>
    )
  }
}
export default PremiumSubscription;