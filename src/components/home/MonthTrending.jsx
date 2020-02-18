/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import CurrencyFormat from 'react-currency-format';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class MonthTrending extends React.Component {

  componentDidMount() {
    this.props.getMonthTrendingData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.monthTrendingData.sliderData.length !== prevProps.monthTrendingData.sliderData.length) {
      this.props.getMonthTrendingData();
    }
  }

  goToSellerProfile = (id) => {
    this.props.history.push("/seller-profile/" + id);
  }

  goToServiceDetail = (id) => {
    this.props.history.push("/service-detail/" + id);
  }

  render() {
    const { sliderData, ratings } = this.props.monthTrendingData;
    let monthTrending = [];
    monthTrending = sliderData.map((service, idx) => {
      const serviceRating = ratings.find(rating => rating._id === service._id);
      const imgData = service.productImages.filter(img => img.primary === true)
      return (
        <div key={idx} className="main-product-list health-new">
          <div className="position-relative cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>
            {service.sellerId.role === 'Premium' &&
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
            <h4>{(service.title.length < 25) ? service.title : service.title.substring(0, 25) + "..."}</h4>
            <p>{(service.description.length < 130) ? service.description : service.description.substring(0, 120) + "..."}</p>
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
            <button className="main-product-btn btn"><CurrencyFormat value={service.nonPeakPricing} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / Day</button>
          </div>
        </div>
      )
    })
    return (
      <>
        <section className="treding-month light-blue-bg">
          <div className="container custom-container owl-bg">
            <div className="looking-right pb-5">
              <h6 className="pb-2">Trending</h6>
              <h1>Of the month</h1>
            </div>
            <OwlCarousel
              key={`carousel_trending_${this.props.monthTrendingData.length}`}
              className="owl-theme"
              loop={false}
              margin={10}
              nav
              items={4}
              dots={false}
              autoplay={true}
            >
              {monthTrending}
            </OwlCarousel>
            <div className="owl-carousel-link">
              <a href="#">View All <i className="fa fa-angle-right"></i></a>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default MonthTrending;
