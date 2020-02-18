/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import "./serviceDetail.css";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import CurrencyFormat from 'react-currency-format';
import Moment from 'react-moment';
// import YouTube from 'react-youtube';
import ReportUser from '../../containers/reportUser';
import Review from '../../containers/review';
import Cookie from '../../cookies';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class ServiceDetail extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      index: 0,
      direction: null,
    };
  }

  componentDidMount() {
    const { listingId } = this.props.match.params;
    const { serviceViewArr, CookieConsent } = Cookie.getCookie();
    if (!serviceViewArr.includes(listingId)) {
      if (CookieConsent === "true") {
        Cookie.setCookie(listingId);
      }
      this.props.setPageViews(listingId);
    }
    this.props.getListingData(listingId);
    this.props.getReviewsData(listingId);
  }

  componentDidUpdate(prevProps) {
    const { listingId } = this.props.match.params;
    if (listingId !== prevProps.match.params.listingId) {
      const serviceViewList = Cookie.getCookie();
      if (!serviceViewList.includes(listingId)) {
        Cookie.setCookie(listingId);
        this.props.setPageViews(listingId);
      }
    }
  }
  goToSellerProfile = (sellerId) => {
    this.props.history.push('/seller-profile/' + sellerId);
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const service = this.props.listingData;
    const { reviews, avgRating } = this.props.reviewsData;
    let categories_list = [];
    if (service.productCategory) {
      const categories = service.productCategory
      categories_list = categories.map((item, idx) => {
        const badgeStyle = {
          color: '#fff',
          backgroundColor: item.value.themeColor,
        };
        return <li key={item.value._id}><a href="#" className="badge badge-pill" style={badgeStyle}>{item.value.title}</a></li>
      })
    }
    if (service.productImages) {
      const data = service.productImages
      data.forEach(function (item, i) {
        if (item.primary === true) {
          data.splice(i, 1);
          data.unshift(item);
        }
      });
    }

    return (
      <>
        <Header />

        <section className="service-nav py-2">
          <div className="container custom-container">
            <div className="row">
              <div className="col-lg-12">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="#"><i className="fa fa-chevron-right"></i>{service.title}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {service &&
          <section className="service-info">
            <div className="container custom-container service-info-bg">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-12" id="slider">
                  <h6 className="font-500">Categories</h6>
                  <ul className="categories_list">
                    {categories_list}
                  </ul>

                  <div className="product_slider">

                    <Carousel
                      showArrows={false}
                      showIndicators={false}
                      showStatus={false}
                    >
                      {
                        service.productImages.map((item, pidx) => (
                          <div key={pidx}>
                            <img src={item.file}
                              alt=""
                              height="400"
                            />
                          </div>
                        ))
                      }
                    </Carousel>
                  </div>
                  <div className="info-slider-list mt-3">
                    <ul>
                      <li><CurrencyFormat value={service.peakPeriod.peakPricing} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} /> /{service.chargingModel}
                        <p>Peak period</p> <hr />
                        <Moment format="DD/MM/YYYY">{service.peakPeriod.startDate}</Moment>
                        <p>Peak period start date</p> <hr />
                        <Moment format="DD/MM/YYYY">{service.peakPeriod.endDate}</Moment>
                        <p>Peak period end date</p>
                      </li>
                      <li><CurrencyFormat value={service.nonPeakPricing} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} /> /{service.chargingModel}<p>Non Peak period</p></li>

                      <li>
                        {service.location.map((loc, lidx) => (
                          <span className="mr-2" key={lidx}>{loc.label}</span>
                        ))
                        }
                        <p>Location of services</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 offset-0 offset-lg-1 col-12">
                  <div className="service-info-right">
                    {reviews &&
                      <h1>{service.title} <span><span className="info-rating"><i className="fa fa-star"></i> {avgRating}</span><span className="grey-info">{reviews.length}</span></span></h1>
                    }
                    <p className="my-2">Listed on <Moment format="MM/YYYY">{service.createdAt}</Moment></p>
                    <p>{service.description}</p>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="info-client-name">
                        <div className="product-client media">
                          <img onClick={() => this.goToSellerProfile(service.sellerId._id)} alt="" src={(service.sellerId.profilePicture) ? service.sellerId.profilePicture : 'images/default-profile.png'} className="d-flex align-self-start mr-3" />
                          <div className="media-body">
                            <h5 className="mt-0 mb-1">{service.sellerId.name}</h5>
                            <p>Joined since <Moment format="MM/YYYY">{service.sellerId.createdAt}</Moment></p>
                            {
                              service.sellerId.uen &&
                              <p>UEN - <span className="number-color">{service.sellerId.uen}</span> </p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      {this.props.isLoggedIn &&
                        <div className="info-client-detail text-right">
                          {
                            service.sellerId.primaryContact === 'email' ?
                              <a className="seller-email-link" href={`mailto:${service.sellerId.email}`}>{service.sellerId.email}</a>
                              :
                              <a href={`tel:${service.sellerId.phoneNumber}`}><i className="fa fa-whatsapp"></i>{service.sellerId.phoneNumber}</a>
                          }
                          {
                            service.sellerId.primaryContact === 'mobile_number_and_email' &&
                            <a className="seller-email-link" href={`mailto:${service.sellerId.email}`}>{service.sellerId.email}</a>

                          }
                          <div className="user-link w-100 text-right pb-3">
                            {this.props.isLoggedIn && service.sellerId._id &&
                              <ReportUser userId={service.sellerId._id} />
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="info-video my-2 text-right mb-5">
                    {
                      service.embeddingYoutube.urls.map((url, vidx) => (
                        <iframe
                          title="YouTube"
                          key={vidx}
                          allowFullScreen="allowFullScreen"
                          src={url}
                          width="100%"
                          height="220"
                          allowtransparency="true"
                          frameBorder="0"
                          className="mb-3"
                        >
                        </iframe>
                      ))
                    }
                    <h4>Promotion Video</h4>
                    <p>Added by:<a href={`/seller-profile/${service.sellerId._id}`}>{service.sellerId.name}</a></p>
                  </div>

                  <Review listingId={service._id} {...this.props} />

                </div>
              </div>
            </div>
          </section>

        }

        <Footer />
      </>
    )
  }
}

export default ServiceDetail;