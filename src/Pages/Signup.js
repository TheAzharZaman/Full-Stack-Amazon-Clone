import React, { useState } from "react";
import "./Signup.css";
import Logo from "./logo.png";
import { Link, useHistory } from "react-router-dom";
import AuthFooter from "../Components/AuthFooter";
import { auth, db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRedirectToCheckout,
  SET_REDIRECT_TO_CHECKOUT,
} from "../redux/slices/userSlice";

const Signup = () => {
  const dispatchRedux = useDispatch();
  const needToRedirectToCheckout = useSelector(selectRedirectToCheckout);
  const [{}, dispatch] = useStateValue();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

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

  const signupHandler = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userObj) => {
        db.collection("users").doc(userObj?.user.uid).set({
          userID: userObj?.user.uid,
          displayName: displayName,
          email: email,
          accountPassword: password,
          addressAdded: false,
          addressMarkedAsDefault: false,
          address: {},
          ordersPlaced: 0,
          ordersInDraft: 0,
          orderCancelled: 0,
        });

        if (userObj) {
          if (needToRedirectToCheckout) {
            history.replace("/checkout/add-your-shipping-address");
            dispatchRedux(SET_REDIRECT_TO_CHECKOUT(false));
          } else {
            history.replace("/");
          }
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <div className="signup__contentCont">
        <Link to="/">
          <img className="signup__logo" src={Logo} />
        </Link>
        <form onSubmit={signupHandler} className="signup__form">
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
            <Link to="/auth/signin">Sign-In</Link>
          </h4>
        </form>
        <div className="box--shadow"></div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Signup;
