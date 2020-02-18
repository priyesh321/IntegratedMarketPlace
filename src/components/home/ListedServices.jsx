/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import CurrencyFormat from 'react-currency-format';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class ListedServices extends React.Component {

  componentDidMount() {
    this.props.getListedServicesData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.listedServices.sliderData.length !== prevProps.listedServices.sliderData.length) {
      this.props.getListedServicesData();
    }
  }

  goToSellerProfile = (id) => {
    this.props.history.push("/seller-profile/" + id);
  }

  goToServiceDetail = (id) => {
    this.props.history.push("/service-detail/" + id);
  }

  render() {
    const { sliderData, ratings } = this.props.listedServices;
    let listedServices = [];
    listedServices = sliderData.map((service, idx) => {
      const serviceRating = ratings.find(rating => rating._id === service._id);
      const imgData = service.productImages.filter(img => img.primary === true)
      return (
        <div className="w-20" key={idx}>
          <div className="main-product-list health-new">
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
              <img alt="" src={imgData.length && imgData[0].file} height="169" width="209" />
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
        </div>
      )
    })
    return (
      <>
        <section className="treding-month mt-5">
          <div className="container custom-container owl-bg">
            <div className="looking-right pb-5">
              <h6 className="pb-2">Listed</h6>
              <h1>Services</h1>
            </div>
            <div className="row">
              {listedServices}
            </div>            
          </div>
        </section>
      </>
    );
  }
}

export default ListedServices;
