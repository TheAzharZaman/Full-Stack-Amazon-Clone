import React from "react";
import "./Footer.css";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="scrollToTop__dest" smooth={true} duration={1000}>
        <div className="backToTop__link">
          <h3>Back to top</h3>
        </div>
      </Link>

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
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService head="Amazon Music" desc="Stream millions of songs" />
          <AmazonService head="Sell on Amazon" desc="Start a Selling Account" />
          <AmazonService
            head="Audible"
            desc="Listen to Books & OriginalAudio Performances"
          />
          <AmazonService
            head="Goodreads"
            desc="Book reviews & recommendations	"
          />
          <AmazonService head="Zappos" desc="Shoes & Clothing" />
        </div>

        {/* 2 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService
            head="Amazon Advertising"
            desc="Find, attract, and engage customers"
          />
          <AmazonService
            head="Amazon Business"
            desc="Everything For Your Business"
          />
          <AmazonService
            head="Book Depository"
            desc="Books With Free
            Delivery Worldwide"
          />
          <AmazonService
            head="IMDb"
            desc="Movies, TV
            & Celebrities"
          />
          <AmazonService head="Ring" desc="Smart Home Security Systems" />
        </div>

        {/* 3 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService head="Amazon Drive" desc="Cloud storage from Amazon" />
          <AmazonService
            head="AmazonGlobal"
            desc="Ship Orders Internationally"
          />
          <AmazonService
            head="Box Office Mojo"
            desc="Find Movie
            Box Office Data"
          />
          <AmazonService
            head="IMDbPro"
            desc="Get Info Entertainment
            Professionals Need"
          />
          <AmazonService
            head="	eero WiFi"
            desc="Stream 4K Video in Every Room	"
          />
        </div>

        {/* 4 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService head="Amazon Music" desc="Stream millions of songs" />
          <AmazonService head="Sell on Amazon" desc="Start a Selling Account" />
          <AmazonService
            head="Audible"
            desc="Listen to Books & OriginalAudio Performances"
          />
          <AmazonService
            head="Goodreads"
            desc="Book reviews & recommendations	"
          />
          <AmazonService head="Zappos" desc="Shoes & Clothing" />
        </div>

        {/* 5 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService
            head="Amazon Advertising"
            desc="Find, attract, and engage customers"
          />
          <AmazonService
            head="Amazon Business"
            desc="Everything For Your Business"
          />
          <AmazonService
            head="Book Depository"
            desc="Books With Free
            Delivery Worldwide"
          />
          <AmazonService
            head="IMDb"
            desc="Movies, TV
            & Celebrities"
          />
        </div>

        {/* 6 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService head="Amazon Drive" desc="Cloud storage from Amazon" />
          <AmazonService
            head="AmazonGlobal"
            desc="Ship Orders Internationally"
          />
          <AmazonService
            head="Box Office Mojo"
            desc="Find Movie
            Box Office Data"
          />
          <AmazonService
            head="IMDbPro"
            desc="Get Info Entertainment
            Professionals Need"
          />
          <AmazonService
            head="	eero WiFi"
            desc="Stream 4K Video in Every Room	"
          />
        </div>

        {/* 7 */}
        <div className="amazon__servicesColumn flexColumn">
          <AmazonService head="Amazon Music" desc="Stream millions of songs" />
          <AmazonService head="Sell on Amazon" desc="Start a Selling Account" />
          <AmazonService
            head="Audible"
            desc="Listen to Books & OriginalAudio Performances"
          />
          <AmazonService
            head="Goodreads"
            desc="Book reviews & recommendations	"
          />
          <AmazonService head="Zappos" desc="Shoes & Clothing" />
        </div>
      </div>
      <div className="footer__copyrightSec flexRow">
        <a href="https://www.amazon.com/gp/help/customer/display.html?ie=UTF8&nodeId=508088&ref_=footer_cou">
          Conditions of Use
        </a>
        <a href="https://www.amazon.com/gp/help/customer/display.html?ie=UTF8&nodeId=468496&ref_=footer_privacy">
          Privacy Notice
        </a>
        <a href="https://www.amazon.com/interestbasedads/ref=footer_iba">
          Interest-Based Ads
        </a>
        <h3>© 1996-2020, Amazon.com, Inc. or its affiliates</h3>
      </div>
    </div>
  );
};

const AmazonService = ({ head, desc }) => {
  return (
    <a className="amazon__service flexColumn">
      <strong>{head}</strong>
      <small>{desc}</small>
    </a>
  );
};

export default Footer;
