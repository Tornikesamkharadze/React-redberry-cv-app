import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Cv from "../components/Cv";
import { usePersonalContext } from "../context/personalContext";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
const Resume = () => {
  const [showPopup, setShowPopup] = useState(true);
  const { resetStoredValues, clearDisplayPhone } = usePersonalContext();

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Wrapper>
      <Cv />
      {showPopup && (
        <div className="popup">
          <h1 className="gg"> რეზიუმე წარმატებით გაიგზავნა 🎉</h1>
          <button className="closePopup" onClick={closePopup}>
            <VscClose className="closeIcon" />
          </button>
        </div>
      )}
      <Link
        onClick={() => {
          resetStoredValues();
          clearDisplayPhone();
        }}
        className="btn"
        to="/"
      >
        <MdOutlineKeyboardArrowLeft
          style={{ width: " 40px", height: "40px" }}
        />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 1000px;
  margin-left: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup {
    background: #ffffff;
    border: 1px solid #e4e4e4;
    box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    position: fixed;
    top: 8%;
    right: 2%;
    width: 427px;
    height: 167px;
  }
  .gg {
    padding: 40px 33px;
  }
  .closePopup {
    border: none;
    background-color: transparent;
    position: absolute;
    top: 6%;
    right: 3%;
    cursor: pointer;
  }
  .closeIcon {
    height: 30px;
    width: 30px;
  }
`;

export default Resume;
