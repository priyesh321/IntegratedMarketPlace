/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import "./myListing.css";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import { Alert, Table, Button, Modal } from 'react-bootstrap';
import moment from 'moment'

class MyListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
      fetch: false,
      modal: false,
      selectedList: ''
    };
  }

  componentDidMount() {
    if (this.props.currentUser._id) {
      this.props.getMyListingData(this.props.currentUser._id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success.length) {
      this.props.getMyListingData(this.props.currentUser._id);
      this.setState({ alert: true });
    }
  }

  componentDidUpdate() {
    if (this.props.currentUser._id && !this.state.fetch) {
      this.props.getMyListingData(this.props.currentUser._id)
      this.setState({ fetch: true });
    }
  }

  handleAlertDismiss = () => {
    this.setState({ alert: false });
    this.props.onResetSuccess();
  }

  goToFeatureListing = (serviceId) => {
    this.props.history.push("/" + serviceId + "/featurelisting");
  }

  goToEditListing = (serviceId) => {
    this.props.history.push("/" + serviceId + "/edit");
  }

  goToServiceDetail = (id) => {
    this.props.history.push("/service-detail/" + id);
  }

  handleDelete = (id) => {
    this.props.deleteListing(this.state.selectedList._id);
    this.setState({ modal: false })
  }

  openModal = (serviceData) => {
    this.setState({ modal: true, selectedList: serviceData })
  }

  handleClose = () => {
    this.setState({ modal: false, alert: false });
  }

  render() {
    var currentDate = moment(this.state.selectedList.featuredDate).add(30, 'd')
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
                      My Listing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Modal className="width-75" show={this.state.modal} size='lg' onHide={this.handleClose}>
          <div className="set-login-padding py-4 px-4">
            <button type="button" className="close" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>

            </button>
            <div className="row">
              {this.state.selectedList.isFeatured === true ?
                <div className="col-lg-12 col-md-12 col-12 text-center">
                  <h3 className='mb-0'>Delete Featured Listing: {this.state.selectedList.title}</h3>
                </div>
                :
                <div className="col-lg-12 col-md-12 col-12 text-center">
                  <h3 className="mb-0">Delete listing: {this.state.selectedList.title}</h3>
                </div>
              }
            </div>
            <div className="row mx-0 my-4">
              {this.state.selectedList.isFeatured === true ?
                <div className="col-lg-12 col-md-12 col-12 py-3">
                  <p className="subhead">This is a featured listing, the listing will be featured till <span>{currentDate.format('DD-MM-YYYY')}</span>.You will not be refunded for the fees you have paid for featuring this post. Are you sure you want to delete this listing</p>
                </div>

                :
                <div className="col-lg-12 col-md-12 col-12 py-3">
                  <p className="subhead">Deleting this listing means other consumer will never be able to see this listing anymore. Are you sure you want to delete this listing?</p>
                </div>
              }
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 border-0 text-right">
                <button className="btn cancel mr-3" onClick={this.handleClose}>Cancel</button>
                <button className="btn form-signup text-white" onClick={() => this.handleDelete(this.state.selectedList._id)}>Delete</button>
              </div>
            </div>
          </div>
        </Modal>

        {/* My Listing */}
        <section className="service-info">
          <div className="container custom-container service-info-bg pt-8">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-12 offset-2">
                <Alert variant="success" show={this.state.alert} onClose={this.handleAlertDismiss} dismissible>
                  {this.props.success}
                </Alert>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title of Service</th>
                    <th>Category</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.myListing.map((service, index) => {
                    return (<tr key={index}>

                      <td className="position-relative cursor-pointer" onClick={() => this.goToServiceDetail(service._id)}>{service.title}</td>

                      <td>
                        <ul className="categories_list">
                          {
                            service.productCategory.map((cat, cidx) => {
                              const badgeStyle = {
                                color: '#fff',
                                backgroundColor: cat.value.themeColor,
                              };
                              return <li key={cat.value._id}><a href="#" className="badge badge-pill" style={badgeStyle}>{cat.value.title}</a></li>
                            }
                            )
                          }

                        </ul>
                      </td>
                      <td>
                        <Button variant="info" onClick={() => this.goToEditListing(service._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => this.goToFeatureListing(service._id)} className="ml-2">Feature</Button>
                        <Button variant="danger" onClick={() => this.openModal(service)} className="ml-2">Delete</Button>
                      </td>
                    </tr>)
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
        {/* My Listing end */}

        <Footer />
      </>
    );
  }
}

export default MyListing;
