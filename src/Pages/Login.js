import React from "react";
import "./Login.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import AuthFooter from "../Components/AuthFooter";

const Login = () => {
  return (
    <div className="login">
      <div className="login__contentCont">
        <Link to="/">
          <img className="login__logo" src={Logo} />
        </Link>
        <form className="login__form">
          <h3>Sign In</h3>
          <div className="loginForm__input">
            <label>Email</label>
            <input placeholder="Your registered email address" type="text" />
          </div>
          <div className="loginForm__input">
            <label>Password</label>
            <input placeholder="Your account password" type="password" />
          </div>

          <input className="signup__submit" type="submit" value="Sign In" />
          <p className="signup__termsTagline">
            By creating an account, you agree to Amazon's
          </p>
          <h4 className="signup__termsLinks">
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088">
              Conditions of Use
            </a>
            and
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=468496">
              Privacy Notice
            </a>
            .
          </h4>

          <h4 className="signin__needHelp">
            <Link to="/user_authentication">Need help?</Link>
          </h4>
        </form>
        <div className="signin__alreadyHaveAccount">
          <div className="tag">
            <div className="tag_lines"></div>
            <h4>New to Amazon?</h4>
            <div className="tag_lines"></div>
          </div>
          <Link to="user_registration">
            <button>Create your Amazon account</button>
          </Link>
        </div>
        <div className="box--shadow__signin "></div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Login;
