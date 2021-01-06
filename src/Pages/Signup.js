import React, { useState } from "react";
import "./Signup.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import AuthFooter from "../Components/AuthFooter";
import { auth } from "../Files/firebase";
import { AssignmentLateRounded, RecentActorsRounded } from "@material-ui/icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (
      displayName === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmValue === "" ||
      password !== passwordConfirmValue
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [password, passwordConfirmValue]);

  // const signupHandler = async (e) => {
  //   e.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userObj) => {
  //       console.log(userObj);
  //     })
  //     .catch((error) => alert(error.message));
  //   // .catch((error) => console.log(error.message));
  // };

  return (
    <div className="signup">
      <div className="signup__contentCont">
        <Link to="/">
          <img className="signup__logo" src={Logo} />
        </Link>
        <form className="signup__form">
          <h3>Create account</h3>
          <div className="form__input">
            <label>Your name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              type="text"
            />
          </div>
          <div className="form__input">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your valid email adress"
              type="text"
            />
          </div>
          <div className="form__input">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Atleast 6 characters"
              type="password"
            />
          </div>
          <p className="signupPassword__tip">
            Passwords must be at least 6 characters.
          </p>
          <div className="form__input">
            <label>Re-enter password</label>
            <input
              value={passwordConfirmValue}
              onChange={(e) => setPasswordConfirmValue(e.target.value)}
              type="password"
            />
          </div>

          <input
            disabled={loading}
            className="signup__submit"
            type="submit"
            value="Create your Amazon account"
          />
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

          <h4 className="signup__haveanAccount">
            Already have an account?
            <Link to="/user_authentication">Sign-In</Link>
          </h4>
        </form>
        <div className="box--shadow"></div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Signup;
