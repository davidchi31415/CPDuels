import React from "react";
import "./styles.css";
import { Button, Link, useColorModeValue } from "@chakra-ui/react";

const BuyUsACoffee = () => {
  return (
    <Button
      className="buyButton"
      display="inline-flex"
      alignItems="center"
      rounded="md"
      colorScheme="primary"
      p="0.5rem"
      fontSize="1rem"
      letterSpacing="0.6px"
      fontWeight="bold"
      onClick={() => window.open("https://www.buymeacoffee.com/davidchi31j")}
      boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
    >
      <img
        className="coffeeImage"
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span className="coffeeButtonText">Buy us a coffee</span>
    </Button>
  );
};

export default BuyUsACoffee;
