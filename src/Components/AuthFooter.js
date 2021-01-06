import React from "react";
import "./AuthFooter.css";

const AuthFooter = () => {
  return (
    <div className="authFooter flexColumn">
      <div className="authFooter__links flexRow evenly">
        <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088">
          Conditions of Use
        </a>
        <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=468496">
          Privacy Notice
        </a>
        <a href="https://www.amazon.com/help">Help</a>
      </div>
      <p className="copyright__text">
        © 1996-2020, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
};

export default AuthFooter;
