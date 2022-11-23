import React from "react";
import "./styles.css";

const BuyUsACoffee = () => {
  return (
    <a
      className="buyButton"
      target="_blank"
      href="https://www.buymeacoffee.com/davidchi31j"
    >
      <img
        className="coffeeImage"
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span className="coffeeButtonText">Buy us a coffee</span>
    </a>
  );
};

export default BuyUsACoffee;
