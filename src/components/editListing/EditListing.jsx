/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import "../createListing/createListing.css";
import Header from "../../containers/header";
import Footer from "../../containers/footer";
import ImageUpload from "../../containers/imageUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { required, IsYoutubeUrl } from "../../formValidation";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import Select as vSelect from "react-validation/build/select";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import Select from 'react-select';
import locations from '../createListing/locations';
import CurrencyInput from 'react-currency-masked-input'
import { Alert } from 'react-bootstrap';

const initialState = {
  changePrimary: false,
  allowedFiles: null,
  isFileSize: null,
  title: "",
  data: "EditListing",
  location: null,
  chargingModel: "Jobs",
  productCategory: null,
  operatingHours: {
    startTime: "",
    endTime: ""
  },
  peakPeriod: {
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    peakPricing: ""
  },
  embeddingYoutube: {
    urls: [""],
    websiteUrl: ""
  },
  description: "",
  nonPeakPricing: "",
  productImages: [],
  savedProductImages: [],
  primaryImage: [],
  saveFiles: [],
  step: 1,
  alert: false
};

class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.currentUser.role === 'Non Premium') {
      this.setState({ allowedFiles: 2 })
    }
    if (this.props.currentUser.role === "Premium") {
      this.setState({ allowedFiles: 4 })
    }
    const { listingId } = this.props.match.params;
    this.props.getCategories();
    this.props.getListingData(listingId);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.listingData) {
      const data = nextProps.listingData;
      const listCategories = [];
      data.productCategory.map((item, idx) => {
        return listCategories.push({ label: item.label, value: item.value._id })
      })
      this.setState({
        title: data.title,
        location: data.location,
        productCategory: listCategories,
        operatingHours: {
          startTime: new Date(data.operatingHours.startTime),
          endTime: new Date(data.operatingHours.endTime)
        },
        peakPeriod: {
          startDate: new Date(data.peakPeriod.startDate),
          endDate: new Date(data.peakPeriod.endDate),
          startTime: new Date(data.peakPeriod.startTime),
          endTime: new Date(data.peakPeriod.endTime),
          peakPricing: data.peakPeriod.peakPricing
        },
        embeddingYoutube: {
          urls: data.embeddingYoutube.urls,
          websiteUrl: data.embeddingYoutube.websiteUrl
        },
        description: data.description,
        nonPeakPricing: '' + data.nonPeakPricing,
        savedProductImages: data.productImages,
      })
    }

    if (nextProps.files.length > 0) {
      this.setState({ productImages: nextProps.files })
    }

    if (nextProps.success.length > 0) {
      this.props.history.push("/my-listing");
    }
  }

  handleChangeCategory = (productCategory) => {
    this.setState({ productCategory });
  }

  handleChangeLocation = (location) => {
    this.setState({ location });
  }

  handleStep1 = e => {
    e.preventDefault();
    this.setState({ step: 2 });
  }

  handleGoToStep1 = e => {
    e.preventDefault();
    this.setState({ step: 1 });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { listingId } = this.props.match.params;
    const {
      title,
      location,
      productCategory,
      operatingHours,
      peakPeriod,
      embeddingYoutube,
      description,
      nonPeakPricing,
      productImages,
      chargingModel,
      savedProductImages,
    } = this.state;
    let formData = new FormData();
    formData.append("title", title);
    formData.append("location", JSON.stringify(location));
    formData.append("productCategory", JSON.stringify(productCategory));
    formData.append("operatingHours", JSON.stringify(operatingHours));
    formData.append("peakPeriod", JSON.stringify(peakPeriod));
    formData.append("embeddingYoutube", JSON.stringify(embeddingYoutube));
    formData.append("description", description);
    formData.append("chargingModel", chargingModel);
    formData.append("nonPeakPricing", nonPeakPricing);
    formData.append("saveFiles", JSON.stringify(savedProductImages));
    formData.append("primaryImage", JSON.stringify(productImages));
    formData.append("isPublish", true);
    productImages.map((file, i) => formData.append("file", file))
    this.props.onHandleEditListing(formData, listingId);
  };

  handleTimeChange = (time, parentField, fieldName) => {
    this.setState({
      [parentField]: { ...this.state[parentField], [fieldName]: time }
    });
  };

  handleDateChange = (date, parentField, fieldName) => {
    this.setState({
      [parentField]: { ...this.state[parentField], [fieldName]: date }
    });
  };

  cancel = e => {
    e.preventDefault();
    // this.state = initialState;
    this.setState(initialState);
  };

  handleUrlChange = idx => evt => {
    const newUrls = this.state.embeddingYoutube.urls.map((url, cidx) => {
      if (idx !== cidx) return url;
      return url = evt.target.value;
    });
    this.setState({
      embeddingYoutube: { ...this.state.embeddingYoutube, urls: newUrls }
    });
  }

  handleUrlAdd = (e) => {
    e.preventDefault();
    this.setState({
      embeddingYoutube: { ...this.state.embeddingYoutube, urls: this.state.embeddingYoutube.urls.concat([""]) }
    });
  }

  handleUrlRemove = idx => e => {
    e.preventDefault();
    this.setState({
      embeddingYoutube: { ...this.state.embeddingYoutube, urls: this.state.embeddingYoutube.urls.filter((url, cidx) => idx !== cidx) }
    });
  }

  handleAlertDismiss = () => {
    this.props.resetSuccess();
    this.setState({ alert: false });
  }

  checkPrimary = (index) => {
    let imgData = this.state.savedProductImages;
    imgData.map((file, i) => {
     return file.primary = (index === i) ? true : false;
    })
    this.setState({ savedProductImages: imgData, changePrimary:true })
    
  } 

  updatePrimary = () => {
    let imgData = this.state.savedProductImages;
    imgData.map((file, i) => {
     return file.primary = false;
    })
    this.setState({ savedProductImages: imgData, changePrimary:false })
  }

  render() {
    const categories = this.props.categoriesData;
    // eslint-disable-next-line no-unused-vars
    const showTimeSelect = "10:00";
    const optionsCategory = categories.map(item => (
      { value: item._id, label: item.title }
    ));

    const optionsLocation = locations.map(loc => (
      { value: loc.id, label: loc.text }
    ));
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const files = this.state.savedProductImages.map((item, i) => (
      <li key={i}>
        {
          item.primary &&
          <span className="badge badge-primary">Primary</span>
        }
        <img className="position-relative cursor-pointer" onClick={() => this.checkPrimary(i)} alt="" src={item.file} width="100" height="100" />
      </li>
    ));
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
                      Edit Listing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Create Listing Step 1 - start */}
        <section className="service-info">
          <div className="container custom-container service-info-bg pt-2">
            <h3 className="text-center mb-3 mt-3">Edit Listing</h3>
            <div className="row">
              <div className="col-lg-8 col-md-12 col-12 offset-2">
                <Alert variant="success" show={this.state.alert} onClose={this.handleAlertDismiss} dismissible>
                  {this.props.success}
                </Alert>

                {this.state.step === 1 &&
                  <div className="step-one-listing-form">
                    <Form ref={c => { this.form = c; }} onSubmit={this.handleStep1}>
                      <div className="main-listing-form">
                        <label>TITLE OF SERVICE</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="title"
                          value={this.state.title}
                          onChange={e => this.setState({ title: e.target.value })}
                          validations={[required]}
                        />
                      </div>
                      <span className="input-btm-text">
                        Take note, you will not be able to edit your title once
                        this listing is published
                    </span>
                      <div className="main-listing-form">
                        <h5>OPRETING HOURS</h5>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="main-listing-form">
                              <label>START TIME</label>
                              <DatePicker
                                className="form-control"
                                selected={this.state.operatingHours.startTime}
                                onChange={e => this.handleTimeChange(e, "operatingHours", "startTime")}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                timeCaption="Start Time"
                                minTime={start}
                                maxTime={new Date(this.state.operatingHours.endTime)}
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="main-listing-form">
                              <label>END TIME</label>
                              <DatePicker
                                className="form-control"
                                selected={this.state.operatingHours.endTime}
                                onChange={e => this.handleTimeChange(e, "operatingHours", "endTime")}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                timeCaption="End Time"
                                maxTime={end}
                                minTime={new Date(this.state.operatingHours.startTime)}
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-12">
                            <div className="main-listing-form">
                              <label>NON PEAK PRICING</label>
                              <span className="currency">$</span>
                              <CurrencyInput
                                className="form-control currency-input"
                                name="nonPeakPricing"
                                value={this.state.nonPeakPricing}
                                onChange={e =>
                                  this.setState({ nonPeakPricing: e.target.value })
                                }
                              />
                              <Input
                                type="hidden"
                                name="nonPeakPricing"
                                validations={[required]}
                                value={this.state.nonPeakPricing}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="main-listing-form">
                        <h5>PEAK PERIOD</h5>
                        <div className="row mb-4">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>START DATE</label>
                              <DatePicker
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                selected={this.state.peakPeriod.startDate}
                                onChange={e => this.handleDateChange(e, "peakPeriod", "startDate")}
                                className="form-control bg-white"
                                dateFormat="dd/MM/yyyy"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>START TIME</label>
                              <DatePicker
                                className="form-control"
                                selected={this.state.peakPeriod.startTime}
                                onChange={e => this.handleTimeChange(e, "peakPeriod", "startTime")}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                timeCaption="Start Time"
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>END DATE</label>
                              <DatePicker
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                selected={this.state.peakPeriod.endDate}
                                onChange={e => this.handleDateChange(e, "peakPeriod", "endDate")}
                                className="form-control bg-white"
                                dateFormat="dd/MM/yyyy"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>END TIME</label>
                              <DatePicker
                                className="form-control"
                                selected={this.state.peakPeriod.endTime}
                                onChange={e => this.handleTimeChange(e, "peakPeriod", "endTime")}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                timeCaption="Start Time"
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>PEAK PRICING</label>
                              <span className="currency">$</span>
                              <CurrencyInput
                                className="form-control currency-input"
                                name="peakPricing"
                                value={this.state.peakPeriod.peakPricing}
                                onChange={e => this.setState({
                                  peakPeriod: {
                                    ...this.state.peakPeriod, peakPricing: e.target.value
                                  }
                                })
                                }
                              />
                              <Input
                                type="hidden"
                                name="peakPricing"
                                value={this.state.peakPeriod.peakPricing}
                                validations={[required]}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <label>CHARGING MODEL</label>
                              <select
                                className="form-control select-box"
                                name="chargingModel"
                                onChange={(e) => this.setState({ chargingModel: e.target.value })}
                                value={this.state.chargingModel}
                                validations={[required]}
                              >
                                <option value="Jobs">Per Jobs</option>
                                <option value="Hour" >Per Hour</option>
                                <option value="Day" >Per Day</option>
                                <option value="Week" >Per Week</option>
                                <option value="Month" >Per Month</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="main-listing-form">
                              <p>
                                All Listing contact details will be extracted
                                directly from User Profile should you wish to
                                chanrge your contact details please edit from user
                                Profile
                            </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-form-btn text-right">
                        <ul>
                          <li>
                            <button className="btn cancel" onClick={this.cancel}>
                              Cancel
                          </button>
                          </li>
                          <li>
                            <Button className="btn publish">Continue</Button>
                          </li>
                        </ul>
                      </div>
                    </Form>
                  </div>
                }
              </div>
            </div>
            {this.state.step === 2 &&
              <div className="row">
                <div className="col-lg-8 col-md-12 col-12 offset-2">
                  <Form ref={c => { this.form = c; }} onSubmit={this.handleSubmit} >

                    <div className="step-two-listing-form pt-5">
                      <div className="main-listing-option mb-4">
                        <label className="select-label">LOCATION</label>
                        <Select
                          key='location'
                          placeholder="Select Location"
                          value={this.state.location}
                          onChange={this.handleChangeLocation}
                          options={optionsLocation}
                          isMulti={true}
                          styles={{
                            menuPortal: base => {
                              const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
                              return { ...rest, zIndex: 9999 };
                            }
                          }}
                          menuPortalTarget={document.body}
                        />
                        <Input type="hidden" validations={[required]} name="location" value={this.state.location} />
                      </div>

                      <div className="main-listing-option mb-4">
                        <label className="select-label">CATEGORY</label>
                        <Select
                          key='productCategory'
                          name="productCategory"
                          placeholder="Select Category"
                          value={this.state.productCategory}
                          onChange={this.handleChangeCategory}
                          options={optionsCategory}
                          isMulti={true}
                          styles={{
                            menuPortal: base => {
                              const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
                              return { ...rest, zIndex: 9999 };
                            }
                          }}
                          menuPortalTarget={document.body}
                          validations={[required]}
                        />
                        <Input type="hidden" validations={[required]} name="productCategory" value={this.state.productCategory} />
                      </div>
                      {this.props.currentUser.role === 'Premium' &&
                        <div className="main-listing-form">
                          <h5>EMBEDDING YOUTUBE PROMOTIONAL VIDEOS</h5>
                          {
                            this.state.embeddingYoutube.urls.map((url, idx) => (
                              <div className="row mb-4" key={idx}>
                                <div className="col-lg-11 col-md-11 col-12">
                                  <div className="main-listing-form">
                                    <label>VIDEO</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      value={url}
                                      onChange={this.handleUrlChange(idx)}
                                      validations={[IsYoutubeUrl]}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-1 col-md-1 col-12 pl-0">
                                  <div className="main-listing-form">
                                    {idx === this.state.embeddingYoutube.urls.length - 1 ?
                                      <button className="btn add-btn" onClick={this.handleUrlAdd}>
                                        <i className="fa fa-plus" aria-hidden="true" />
                                      </button>
                                      :
                                      <button className="btn add-btn" onClick={this.handleUrlRemove(idx)}>
                                        <i className="fa fa-minus" aria-hidden="true" />
                                      </button>
                                    }
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      }

                      <div className="main-listing-form mb-4">
                        <label>WEBSITE</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="websiteUrl"
                          value={this.state.embeddingYoutube.websiteUrl}
                          onChange={e =>
                            this.setState({
                              embeddingYoutube: {
                                ...this.state.embeddingYoutube,
                                websiteUrl: e.target.value
                              }
                            })
                          }
                          validations={[required]}
                        />
                      </div>
                      <div className="main-listing-form listing-textarea mb-4">
                        <label>Description</label>
                        <Textarea
                          type="text"
                          className="form-control"
                          name="description"
                          value={this.state.description}
                          onChange={e =>
                            this.setState({ description: e.target.value })
                          }
                          validations={[required]}
                        >
                        </Textarea>
                      </div>

                      {
                        this.state.allowedFiles > this.state.savedProductImages.length &&
                        <ImageUpload fileLength={this.state.savedProductImages.length}
                          updatePrimary={this.updatePrimary}
                          changePrimary={this.state.changePrimary}
                          />
                      }

                      <div>
                        <label>Saved Files</label>
                        <ul className="all-files">
                          <ul className="img_files">{files}</ul>
                        </ul>
                      </div>
                      <div className="listing-form-btn text-right">
                        <ul>
                          <li>
                            <button className="btn cancel" onClick={this.handleGoToStep1}>
                              Back
                          </button>
                          </li>
                          <li>
                            <Button className="btn publish">Publish</Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            }
          </div>
        </section>
        {/* Create Listing end */}

        <Footer />
      </>
    );
  }
}

export default EditListing;
