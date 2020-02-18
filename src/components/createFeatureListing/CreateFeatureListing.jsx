/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import { Modal } from 'react-bootstrap';
import './createFeatureListing.css'
import Form from "react-validation/build/form";
import Button from "react-validation/build/button";

class CreateFeatureListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: '',
      modal: true,
      alert: false,
      isAgree: false,
      redirect: false
    };
  }

  componentDidMount() {
    const { listingId } = this.props.match.params;
    this.props.getListingData(listingId);
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.success.length > 0) {
      props.history.push('/')
    }
    if(props.data) {
      return { listing: props.data }
    }

    return state;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = this.state.listing._id;
    const data = { isFeatured: true, featuredDate: new Date() };
    this.props.onMakeFeatureListing(serviceId, data);
  }

  render () {
    let categories_list = [];
    if(this.state.listing.productCategory) {
      const categories = this.state.listing.productCategory;
      categories_list = categories.map((item, idx) => {
        const badgeStyle = {
          color: '#fff',
          backgroundColor: item.value.themeColor,
        };
        return <li key={item.value._id}><a href="#" className="badge badge-pill" style={badgeStyle}>{item.value.title}</a></li>
      })
    }
    return (
      <>
      <Header />

      <section className="service-nav py-2">
        <div className="container custom-container">
          <div className="row">
            <div className="col-lg-12">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-chevron-right" />
                    Listing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="service-info">
        <div className="container custom-container service-info-bg pt-8">

        </div>
      </section>        

      <Footer />

      <Modal show={this.state.modal} size='lg' onHide={this.handleClose} id="feature-listing">
        <Form method="post" onSubmit={ this.handleSubmit }>
          <div className="set-login-padding py-4 px-4">
            <div className="signup-header">
              <button type="button" className="close" onClick={ this.handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12 text-center">
                  <h3 className="mb-0">Feature Your Listing</h3>
                  <p className="subhead">You are currently trying to feature your listing with our platform.</p>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="header-pad p-0">
                    <h5 className="font-500 mt-4 mb-3">{this.state.listing.title}</h5>
                    <h6 className="font-500">Categories</h6>
                    <ul className="categories_list">
                      {categories_list}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mx-0 my-4 border">
              <div className="col-lg-12 col-md-12 col-12 box_body py-3">
                <h3>Terms and Condition</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.</p>
              </div>
            </div>              
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 border-0">
                <b className="font-500">Accecpt Terms</b><br/>
                <div className="custom-control custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="customCheck1" 
                    value={this.state.isAgree}
                    onChange={e => this.setState({ isAgree: e.target.checked })}
                    required
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">I Agree With The Terms and Condition</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 border-0 text-right">
                <Button type="submit" className="btn form-signup text-white">Promot</Button>
              </div>
            </div>              
          </div>
        </Form>
      </Modal>
      </>
    );
  }
}

export default CreateFeatureListing;