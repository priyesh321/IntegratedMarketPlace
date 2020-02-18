/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import CurrencyFormat from 'react-currency-format';
import Moment from 'react-moment';

class CategoryWiseFeaturedListing extends React.Component {

  componentDidMount() {
    this.props.getCateoryListing();
  }

  goToSellerProfile = (id) => {
    this.props.history.push("/seller-profile/" + id);
  }

  goToServiceDetail = (id) => {
    this.props.history.push("/service-detail/" + id);
  }

  sortedList = () => {
  this.props.categoryListing.map((service,sidx) => {
  return service.services.sort((a,b) => new Date(b.sellerId.lastLoginDate).getTime() - new Date(a.sellerId.lastLoginDate));
  })
  }

  render() {
    this.sortedList();
    let categoryListing = [];
    if (this.props.categoryListing.length) {
      categoryListing = this.props.categoryListing.map((service, idx) => {
        return (
          <div className="px-5" key={idx}>
            <h4 className="mt-lg-4 mt-md-3">{service.categoryName}</h4>
            <hr></hr>

            <div className="row">
              {
                !service.services.length &&
                <div className="col-lg-12">
                  <div className="bg-white box-shadow p-3 text-center rounded-sm">
                    <h5 className="py-2">No Listing Available here...</h5>
                  </div>
                </div>
              }
          
              {service.services.map((item, sidx) => {
                const imgData = item.productImages.filter(img => img.primary === true)
                return (
                  <div className="col-lg-3 col-md-3 col-12 mt-3" key={sidx}>
                    <div className="main-product-list health-new">
                      <div className="position-relative cursor-pointer" onClick={() => this.goToServiceDetail(item._id)}>
                        {item.sellerId.role === 'Premium' &&
                          <span className="premium"><span className="abc">PREMIUM</span></span>
                        }
                        {item.productCategory.map((cat, cidx) => {
                          const badgeStyle = {
                            color: '#fff',
                            backgroundColor: cat.value.themeColor,
                          };
                          return <span key={cidx} style={badgeStyle} className="health"><span className="abc">{cat.value.title}</span></span>
                        }
                        )
                        }
                        {service.ratings.map((rat, ridx) => {
                          const serviceRating = service.ratings.find(rating => rating._id === item._id);
                          return(
                          <span key={ridx}>
                            <span className="rating"><i className="fa fa-star pr-2"></i>{serviceRating ? serviceRating.rating.toFixed(1) : 0}</span>
                            <span className="grey-info">{serviceRating ? serviceRating.count : 0}</span>
                          </span>
                          )
                        })}
                        <img alt="" src={imgData.length && imgData[0].file} height="169" width="300"/>
                      </div>
                      <div className="product-name p-3 cursor-pointer" onClick={() => this.goToServiceDetail(item._id)}>
                        <h4>{(item.title.length < 25) ? item.title : item.title.substring(0, 25) + "..."}</h4>
                        <p>{(item.description.length < 130) ? item.description : item.description.substring(0, 120) + "..."}</p>
                        <hr className="p-0 m-0" />
                      </div>
                      <div className="product-client px-3 owl-image">
                        <img onClick={() => this.goToSellerProfile(item.sellerId._id)} alt="" src={(item.sellerId.profilePicture) ? item.sellerId.profilePicture : 'images/default-profile.png'} className="float-left mr-3" />
                        <div className="media-body">
                          <h5 className="mt-0">{item.sellerId.name}</h5>
                          <p> <Moment format="MM/YYYY">{item.sellerId.lastLoginDate}</Moment></p>                 
                        </div>
                      </div>
                      <div className="client-btn px-3 py-3" onClick={() => this.goToServiceDetail(item._id)}>
                        <button className="main-product-btn btn"><CurrencyFormat value={item.nonPeakPricing} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / Day</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })
    }

    return (
      <>
        <section className="treding-month mt-2">
          <div>
            {categoryListing}
          </div>
        </section>

      </>
    );
  }
}

export default CategoryWiseFeaturedListing;
