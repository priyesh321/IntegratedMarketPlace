/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import './review.css';
import StarRatingComponent from 'react-star-rating-component';
import { Alert } from 'react-bootstrap';
import TimeAgo from 'react-timeago';

class ReportUser extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      description: '',
      rating: 1,
      alert: false,
      mustBeLogin: false,
      updateReview: false,
      isReviewGiven: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success.length > 0) {
      this.setState({ alert: true })
    }
    if(nextProps.reviewsData.reviews && nextProps.reviewsData.reviews.length) {
      const { reviews } = nextProps.reviewsData;
      const reviewedGiven = reviews.find(review => review.userId._id === nextProps.currentUser._id);
      if (reviewedGiven === undefined) {
        this.setState({ isReviewGiven: false })
      }
      else {
        this.setState({ isReviewGiven: true })
      }   
  } else{
    this.setState({ isReviewGiven: false })
  }
}

  componentDidUpdate() {
    if (this.state.alert && this.state.updateReview) {
      this.setState({ updateReview: false });
      this.props.getReviewsData(this.props.listingId);
    }
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue }, () => {
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.isLoggedIn) {
      const { description, rating } = this.state;
      const listingId = this.props.listingId;
      const userId = this.props.currentUser._id;
      const data = { description, rating, listingId, userId };
      this.props.onSaveReview(data);
      this.setState({ description: '', rating: 1, updateReview: true });
    } else {
      this.setState({ mustBeLogin: true });
    }
  }

  handleAlertDismiss = () => {
    this.props.onResetSuccess();
    this.setState({ alert: false });
  }

  handleErrorDismiss = () => {
    this.setState({ mustBeLogin: false });
  }

  goToSellerProfile = (sellerId) => {
    this.props.history.push('/seller-profile/' + sellerId);
  }

  render() {
    const { reviews, avgRating } = this.props.reviewsData;
    return (
      <>
        {this.props.success.length > 0 &&
          <Alert variant="success" show={this.state.alert} onClose={this.handleAlertDismiss} dismissible>
            {this.props.success}
          </Alert>
        }
        {this.state.mustBeLogin &&
          <Alert variant="danger" show={this.state.mustBeLogin} onClose={this.handleErrorDismiss} dismissible>
            You need to login for add review.
        </Alert>
        }

        {
          !this.state.isReviewGiven &&
          <div className="user-info-review position-relative text-right">
            <form onSubmit={this.handleSubmit}>
              <span>REVIEW FORM BUYERS</span>
              <textarea
                className="form-control review"
                placeholder="Right your review"
                required
                value={this.state.description}
                name="description"
                onChange={e => this.setState({ description: e.target.value })}
              >
              </textarea>
              <StarRatingComponent
                className="float-left mt-2"
                name="rating"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick}
                starColor={'#23cf5f'}
                renderStarIcon={() => <i className="fa fa-star"></i>}
              />
              <div className="w-100 float-left">
                <button type="submit" className="btn submit-btn">Submit</button>
              </div>
            </form>
          </div>
        }

        {reviews &&
          <div className="client-review w-100 float-left mt-4">
            <h4>{reviews.length} Reviews<span><i className="fa fa-star"></i> {avgRating}</span></h4>
            <hr />
            {reviews.map((review, ridx) => (
              <div key={ridx} className="product-client media mt-4 position-relative">
                <img onClick={() => this.goToSellerProfile(review.userId._id)} alt="" src={(review.userId.profilePicture) ? review.userId.profilePicture : 'images/default-profile.png'} className="d-flex align-self-start mr-3" />
                <span className={`img-rating ${review.rating <= 2 ? 'bg-red' : ''}`}><i className="fa fa-star"></i> {review.rating}</span>
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{review.userId.name}<span className="float-right">Report Reviews</span></h5>
                  <p className="my-1"><TimeAgo key={ridx} minPeriod={10} live={false} date={review.createdAt} /></p>
                  <p>{review.description}</p>
                  <hr />
                </div>
              </div>
            )
            )}
          </div>
        }
      </>
    )
  }
}

export default ReportUser;