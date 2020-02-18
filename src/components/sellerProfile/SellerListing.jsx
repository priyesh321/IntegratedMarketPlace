import * as React from "react";
import CurrencyFormat from 'react-currency-format';


class SellerListing extends React.Component {

  goToSellerProfile = (sellerId) => {
    this.props.history.push('/seller-profile/'+sellerId);
  }

  goToServiceDetail =(id) => {
    this.props.history.push("/service-detail/"+id);
  }

  render() {
    const listings = this.props.sellerListing;
    return (
      <>
        <section className="treding-month mt-5">
          <div className="container custom-container owl-bg">
            <div className="looking-right pb-5">
                <h6 className="pb-2">Services from</h6>
                <h1>The same lister</h1>
            </div>
            <div className="row">
              { listings.map((service, idx) => {
                const imgData = service.productImages.filter(img => img.primary === true);
                 return <div key={idx} className="col-lg-4 col-md-4 col-12">
                    <div className="main-product-list">
                       <div className="position-relative cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>
                         { service.sellerId.role === 'Premium' &&
                           <span className="premium"><span className="abc">PREMIUM</span></span>
                         }
                         { service.productCategory.map((cat, cidx) => {
                             const badgeStyle = {
                               color: '#fff',
                               backgroundColor: cat.value.themeColor,
                             };
                             return <span key={cidx} style={badgeStyle} className="health"><span className="abc">{cat.value.title}</span></span>
                             }
                           )
                         }

                         <span className="rating"><i className="fa fa-star pr-2"></i>1.5</span>
                         <img alt="" src={imgData.length && imgData[0].file} height="169" width="400"/>
                       </div>
                        <div className="product-name p-3 cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>
                          <h4>{(service.title.length < 25) ? service.title : service.title.substring(0, 25)+"..."}</h4>
                          <p>{(service.description.length < 130) ? service.description : service.description.substring(0, 120)+"..."}</p>
                          <hr className="p-0 m-0" />
                        </div>
                        <div className="product-client media px-3">
                          <img onClick={() => this.goToSellerProfile(service.sellerId._id)} alt="" src={(service.sellerId.profilePicture) ? service.sellerId.profilePicture : 'images/default-profile.png'} className="d-flex align-self-start mr-3" />
                            <div className="media-body">
                              <a href={`/seller-profile/${service.sellerId._id}`}><h5 className="mt-0">{service.sellerId.name}</h5></a>
                              <p>Last seen on 11/1</p>
                            </div>
                        </div>
                        <div className="client-btn px-3 py-3" onClick={() => this.goToServiceDetail(service._id)}>
                          <button className="main-product-btn btn"><CurrencyFormat value={service.nonPeakPricing} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / Day</button>
                        </div>
                    </div>
                  </div>
              })
              }

            </div>
          </div>
        </section>
      </>
    )
  }
}

export default SellerListing;