/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import CurrencyFormat from 'react-currency-format';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


class FeatureListing extends React.Component {

  componentDidMount() {
    this.props.getFeaturedListingData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.featuredListings.sliderData.length !== prevProps.featuredListings.sliderData.length) {
      this.props.getFeaturedListingData();
    }
  }

  goToSellerProfile = (id) => {
    this.props.history.push("/seller-profile/" + id);
  }

  goToServiceDetail = (id) => {
    this.props.history.push("/service-detail/" + id);
  }

  render() {
    const { sliderData, ratings } = this.props.featuredListings;
    let featuredListings = [];
    featuredListings = sliderData.map((service, idx) => {
    const serviceRating = ratings.find(rating => rating._id === service._id);
    const imgData = service.productImages.filter(img => img.primary === true)
      return (
        <div key={idx} className="main-product-list health-new">
          <div className="position-relative cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>
            {service.sellerId.role === 'premium' &&
              <span className="premium"><span className="abc">PREMIUM</span></span>
            }
            {service.productCategory.map((cat, cidx) => {
              const badgeStyle = {
                color: '#fff',
                backgroundColor: cat.value.themeColor,
              };
              return <span key={cidx} style={badgeStyle} className="health"><span className="abc">{cat.value.title}</span></span>
            }
            )
            }
            <span>
              <span className="rating"><i className="fa fa-star pr-2"></i>{serviceRating ? serviceRating.rating.toFixed(1) : 0}</span>
              <span className="grey-info">{serviceRating ? serviceRating.count : 0}</span>
            </span>
            <img alt="" src={imgData.length && imgData[0].file} height="169" />
          </div>
          <div className="product-name p-3 cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>
            <h4 className="cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>{(service.title.length < 20) ? service.title : service.title.substring(0, 20) + "..."}</h4>
            <p>{(service.description.length < 90) ? service.description : service.description.substring(0, 90) + "..."}</p>
            <hr className="p-0 m-0" />
          </div>
          <div className="product-client px-3 owl-image">
            <img onClick={() => this.goToSellerProfile(service.sellerId._id)} alt="" src={(service.sellerId.profilePicture) ? service.sellerId.profilePicture : 'images/default-profile.png'} className="float-left mr-3" />
            <div className="media-body">
              <h5 className="mt-0">{service.sellerId.name}</h5>
              <p>Last seen on 11/1</p>
            </div>
          </div>
          <div className="client-btn px-3 py-3" onClick={() => this.goToServiceDetail(service._id)}>
            <button className="main-product-btn btn"><CurrencyFormat value={service.nonPeakPricing} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / {service.chargingModel}</button>
          </div>
        </div>
      )
    })
    return (
      <>
        <div className="treding-month light-blue-bg">
          <div className="product-heading w-100 text-center position-relative text-white pt-5 pb-3">
            <h1>FEATURED LISTING</h1>
          </div>

          <OwlCarousel
            key={`carousel_featured_${this.props.featuredListings.length}`}
            className="owl-theme"
            loop={false}
            margin={10}
            nav={false}
            items={4}
            dots={false}
            autoplay={true}
          >
            {featuredListings}
          </OwlCarousel>
          <div className="owl-carousel-link">
           <a href='all-featured'>View All <i className="fa fa-angle-right"></i></a>
            </div>
        </div>
      </>
    );
  }
}

export default FeatureListing;
