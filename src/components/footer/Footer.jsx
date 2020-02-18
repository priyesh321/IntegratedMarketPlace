/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import './footer.css';

class Header extends React.Component {

  render() {
    return (
      <>
      {/* Footer Start */}
      <footer className="pt-5 bg-white mt-5">
        <div className="container custom-container">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-12">
              <div className="main-footer">
                <h6>ABOUT</h6>
                <p>MarketPlace It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem using 'Content here, content here', making it look like readable English. </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <div className="main-footer">
                <h6>MARKETPLACE</h6>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Customer Service</a></li>
                  <li><a href="#">Shipping Policy</a></li>
                  <li><a href="#">Return Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12">
              <div className="main-footer">
                <h6>QUICK LINKS</h6>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Security Policy</a></li>
                  <li><a href="#">Site Map</a></li>
                  <li><a href="#">Buy and Sell on MarketPlace</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <div className="main-footer">
                <h6>GET SOCIAL</h6>
                <ul className="social">
                  <li><a href="#"><i className="fa fa-facebook-official"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                  <img src="/images/footer-logo.jpg" className="mt-4" alt="Footer logo" />
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="row py-3">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="copyright-left">
                <p>@2019 MarketPlace All right reserved.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="copyright-right text-right">
                <p>Made <i className="fa fa-heart"></i> with by Zehntech</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
      </>
    );
  }
}

export default Header;
