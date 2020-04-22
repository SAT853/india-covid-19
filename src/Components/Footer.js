import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Nav } from "react-bootstrap";
import {
  faGithub,
  faTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="footer-container">
      <Nav className="justify-content-center footer nav-bar" activeKey="/home">
        <ButtonGroup aria-label="Social Media Icons" className="social">
          <Button
            variant="secondary"
            href="https://github.com/SAT853"
            className="m-2"
          >
            <FontAwesomeIcon icon={faGithub} />{" "}
          </Button>{" "}
          <Button
            variant="secondary"
            href="https://twitter.com/sathishrpsg671"
            className="m-2"
            style={{ background: " #1da1f2", border: "none" }}
          >
            <FontAwesomeIcon icon={faTwitter} />{" "}
          </Button>{" "}
          <Button
            href="https://www.linkedin.com/in/sathishkumar-raja"
            variant="secondary"
            className="m-2"
            style={{ background: "#0e76a8", border: "none" }}
          >
            <FontAwesomeIcon icon={faLinkedin} />{" "}
          </Button>{" "}
        </ButtonGroup>
      </Nav>
    </div>
  );
};

export default Footer;
