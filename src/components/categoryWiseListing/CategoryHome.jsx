/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import CategoryWiseFeaturedListing from './CategoryWiseFeaturedListing'
import Header from "../../containers/header";
import Footer from "../../containers/footer";


class CategoryHome extends React.Component {

  render() {

    return (
      <>
      <Header />
        <section className="service-nav py-2">
          <div className="container custom-container">
            <div className="row">
              <div className="col-lg-12">
                <ul>
                  <li><a href="javascript:void(0)">Home</a></li>
                  <li><a href="javascript:void(0)"><i className="fa fa-chevron-right" />Featured Listing</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container custom-container">
            <CategoryWiseFeaturedListing {...this.props} />
          </div>
        </section>

      <Footer />
      </>
    );
  }
}

export default CategoryHome;
