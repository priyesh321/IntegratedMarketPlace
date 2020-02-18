/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./productTraffic.css";

class ProductTraffic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicelist: [],
      showDay: 'Today',
      pickerDate: new Date()
    }
  }

  componentDidMount() {
    this.props.getServiceListingViewsData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.views.length !== prevProps.views.length) {
      this.listFilterByDate();
    }
  }

  listFilterByDate = date => {
    const { showDay } = this.state;
    let servicelist = [];
    let viewsToday;
    let viewsYestarday;
    let viewsOnDate;
    this.props.views.forEach(list => {
      if (date) {
        viewsOnDate = list.views.find(view => new Date(view.createdAt).toDateString() === new Date(date).toDateString());
        list.onDate = viewsOnDate ? viewsOnDate.viewCount : 0;
        if (viewsOnDate) {
          servicelist.push(list);
        }
      } else {
        viewsToday = list.views.find(view => new Date(view.createdAt).toDateString() === new Date().toDateString());
        viewsYestarday = list.views.find(view => new Date(view.createdAt).toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString());
        list.today = viewsToday ? viewsToday.viewCount : 0;
        list.yestarday = viewsYestarday ? viewsYestarday.viewCount : 0;
        if (showDay === 'Today' && viewsToday) {
          servicelist.push(list);
        } else if (showDay === 'Yestarday' && viewsYestarday) {
          servicelist.push(list);
        }
      }
    })
    this.setState({ servicelist })
  }

  handleDayChange = e => {
    this.setState({ showDay: e.target.innerHTML }, () => {
      this.listFilterByDate();
    });
  }

  handleDateChange = date => {
    this.listFilterByDate(date);
    this.setState({ pickerDate: date, showDay: 'Date' });
  }

  goToServiceDetail =(id) => {
    this.props.history.push("/service-detail/"+id);
  }

  render() {
    const { showDay, servicelist, pickerDate } = this.state;
    return (
      <>
        <Header />
        <section className="service-nav py-2">
          <div className="container custom-container">
            <div className="row">
              <div className="col-lg-12">
                <ul>
                  <li><a href="javascript:void(0)">Home</a></li>
                  <li><a href="javascript:void(0)"><i className="fa fa-chevron-right" />Product Traffic</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="service-info">
          <div className="container custom-container service-info-bg pt-4 pb-5 px-3">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="product_right_tabs_content">
                  <h4 className="pb-3 m-0">Product Listing Traffic</h4>
                  <div className="row py-3">
                    <div className="col-lg-1 col-md-1 col-12">
                      <div className="filter-heading">
                        <label className="m-0">Filter</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        placeholderText="Date"
                        selected={pickerDate}
                        dropdownMode="select"
                        onChange={e => this.handleDateChange(e, "peakPeriod", "startDate")}
                        className="form-control bg-white"
                        dateFormat="dd/MM/yyyy"
                        required={true}
                      />
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                      <div className="right-product-link text-right">
                        <ul>
                          <li onClick={this.handleDayChange} className={showDay === 'Yesterday' ? 'active' : ''}>Yesterday</li>
                          <li onClick={this.handleDayChange} className={showDay === 'Today' ? 'active' : ''}>Today</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  {servicelist.map((view, index) => (
                    <div key={index} className="col-lg-3 col-md-3 col-12">
                      <a href="#" className="d-block" onClick={() => this.goToServiceDetail(view.listingId._id)}>
                        <div className="main-product-list shadow">
                          <img src={view.listingId.productImages[0]} alt="list-placeholder" height="169" width="100%" />
                          <div className="product-name p-3 text-center">
                            <h4>{view.listingId.title}</h4>
                            <h6>Total Traffic {showDay === 'Date' ? `on ${pickerDate.toDateString()}` : showDay}</h6>
                            <h4>{showDay === 'Today' ? view.today :
                              showDay === 'Date' ? view.onDate :
                                view.yestarday
                            } Views</h4>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

export default ProductTraffic;