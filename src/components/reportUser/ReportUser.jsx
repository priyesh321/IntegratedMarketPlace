/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import './reportUser.css';

class ReportUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      reportReason: '',
      reportedUserId: null,
      alert: false
    };
  }

  componentDidMount() {
    const { userId } = this.props.userId;
    this.setState({ reportedUserId :  userId});
  }

  static getDerivedStateFromProps = (props, state) => {
    if(props.success.length > 0) {
      return { alert: true }
    }
    return state;
  }



  openModal = () => {
    this.setState({modal: true})
  }

  handleClose = () => {
    this.setState({ modal: false, reportReason:'', alert: false });
    this.props.onResetSuccess();
  }

  handleAlertDismiss = () => {
    this.props.onResetSuccess();
    this.setState({ alert: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { reportReason } = this.state;
    const reportedUserId = this.props.userId;
    const reportingUserId = this.props.currentUser._id;
    const data = { reportedUserId, reportReason, reportingUserId };
    this.props.onReportUser(data);
  }

  render() {
    return (
      <>
      <a href="#" className="report-user-link" onClick={this.openModal}>Report User</a>

      <Modal className="width-75" show={this.state.modal} size='lg' onHide={this.handleClose}>

        <form onSubmit={this.handleSubmit}>
          <div className="set-login-padding py-4 px-4">
            <button type="button" className="close" onClick={ this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 text-center">
                <h4>Report User</h4>
              </div>
            </div>
            <div className="row mx-0 my-4">
              <div className="col-lg-12 col-md-12 col-12 py-3">
                { this.props.success.length> 0 &&
                  <Alert variant="success" show={ this.state.alert } onClose={ this.handleAlertDismiss } dismissible>
                    {this.props.success}
                  </Alert>
                }
                <label>Please tell us the reason why you want to report it!</label>
                <textarea 
                  className="form-control" 
                  required 
                  value={this.state.reportReason} 
                  name="reason" 
                  onChange={e => this.setState({ reportReason: e.target.value })}
                  >
                  </textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 border-0 text-right">       
                <button className="btn cancel mr-3" onClick={this.handleClose}>Cancel</button>
                <button type="submit" className="btn form-signup text-white">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      </>
    );
  }
}

export default ReportUser;