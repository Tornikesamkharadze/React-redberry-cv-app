import React from "react";
import styled from "styled-components";
import background from "../assets/images/background.png";
import redberryLogo from "../assets/images/redberry-logo.png";
import redberry from "../assets/images/LOGO.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper>
      <div className="header">
        <img className="redberryLogo" src={redberryLogo} alt="redberryLogo" />
        <div className="underline"></div>
      </div>
      <div>
        <Link className="btn" to="personal">
          ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
        </Link>
        <img className="redberry" src={redberry} alt="redberry" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh !important;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  .header {
    width: 90%;
    margin: auto;
  }
  .redberryLogo {
    padding: 26px 0px;
  }
  .underline {
    width: 100%;
    border: 1px solid #1a1a1a;
  }
  .redberry {
    position: absolute;
    top: 42%;
    left: 55%;
    z-index: -100;
  }
  .btn {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 464px;
    height: 60px;
    border-radius: 8px;
    background: #1a1a1a;
  }
`;

export default Home;
