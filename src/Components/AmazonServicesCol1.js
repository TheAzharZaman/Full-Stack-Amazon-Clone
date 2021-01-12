import React from "react";

const amazonServicesCol1 = () => {
  return (
    <div className="amazon__servicesColumn flexColumn">
      <AmazonService head="Amazon Music" desc="Stream millions of songs" />
      <AmazonService head="Sell on Amazon" desc="Start a Selling Account" />
      <AmazonService
        head="Audible"
        desc="Listen to Books & OriginalAudio Performances"
      />
      <AmazonService head="Goodreads" desc="Book reviews & recommendations	" />
      <AmazonService head="Zappos" desc="Shoes & Clothing" />
    </div>
  );
};

const AmazonService = ({ head, desc }) => {
  return (
    <a className="amazon__service">
      <strong>{head}</strong>
      <small>{desc}</small>
    </a>
  );
};

export default amazonServicesCol1;
