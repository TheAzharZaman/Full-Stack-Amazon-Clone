import React from "react";
import AmazonServicesCol1 from "./AmazonServicesCol1";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="backToTop__link">
        <h3>Back to top</h3>
      </div>
      <div className="footer__top flexColumn">
        <div className="footerTop__linksSection flexRow">
          <div className="footerTop__linksSec footerTop__linksSec1 flexColumn">
            <h3>Get to Know Us</h3>
            <a>Careers</a>
            <a>Blog</a>
            <a>About Amazon</a>
            <a>Investor Relations</a>
            <a>Amazon Devices</a>
            <a>Amazon Tours</a>
            <a>Careers</a>
          </div>
          <div className="footerTop__linksSec footerTop__linksSec2 flexColumn">
            <h3>Make Money with Us</h3>
            <a>Sell products on Amazon</a>
            <a>Sell apps on Amazon</a>
            <a>Become an Affiliate</a>
            <a>Advertise Your Products</a>
            <a>Self-Publish with Us</a>
            <a>Host an Amazon Hub</a>
            <a>See More Make Money with Us</a>
          </div>
          <div className="footerTop__linksSec footerTop__linksSec3 flexColumn">
            <h3>Amazon Payment Products</h3>
            <a>Amazon Business Card</a>
            <a>Shop with Points</a>
            <a>Reload Your Balance</a>
            <a>Amazon Currency Converter</a>
          </div>
          <div className="footerTop__linksSec footerTop__linksSec4 flexColumn">
            <h3>Let Us Help You</h3>
            <a>Amazon and COVID-19</a>
            <a>Your Account</a>
            <a>Your Orders</a>
            <a>Shipping Rates & Policies</a>
            <a>Returns & Replacements</a>
            <a>Amazon Assistant</a>
            <a>Help</a>
          </div>
        </div>
      </div>

      <div className="footer__main flexRow">
        <amazonServicesCol1 />

        {/* 2 */}
        {/* <amazonServicesCol1 /> */}

        {/* 3 */}
        {/* <amazonServicesCol1 /> */}

        {/* 4 */}
        {/* <amazonServicesCol1 /> */}

        {/* 5 */}
        {/* <amazonServicesCol1 /> */}

        {/* 6 */}
        {/* <amazonServicesCol1 /> */}

        {/* 7 */}
        {/* <amazonServicesCol1 /> */}
      </div>
    </div>
  );
};

export default Footer;
