import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Button } from "@mui/material";
import Cv from "../components/Cv";
import { usePersonalContext } from "../context/personalContext";
import wrong from "../assets/images/wrong.png";
import correct from "../assets/images/correct.png";
import { useState } from "react";
import { useEffect } from "react";

const phonePattern = /^\+995\d{9}$/;
const namePattern = /^[ა-ჰ]{2,50}$/;
const surnamePattern = /^[ა-ჰ]{2,50}$/;
const emailPattern = /^([a-zA-Z])+@redberry.ge$/;

const Personal = () => {
  const {
    formValues,
    handleChange,
    resetStoredValues,
    addPhoto,
    setFormValues,
    displayPhone,
    setDisplayPhone,
    clearDisplayPhone,
  } = usePersonalContext();


  const removePhoneSpaces = (phone) => {
    return phone.replace(/\s/g, "");
  };

  const handlePhoneChange = (e) => {
    let useSpace = e.target.value;
    if (useSpace.length === 4) {
      useSpace += " ";
    }
    if (useSpace.length === 8) {
      useSpace += " ";
    }
    if (useSpace.length === 11) {
      useSpace += " ";
    }
    if (useSpace.length === 14) {
      useSpace += " ";
    }
    if (useSpace.length > 17) return;
    setDisplayPhone(useSpace);
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      phone_number: removePhoneSpaces(displayPhone),
    });
  }, [displayPhone]);

  return (
    <div className="flexbox">
      <Wrapper>
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
        <div className="main">
          <h1>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</h1>
          <p>1/3</p>
        </div>
        <div className="underline"></div>
        <form className="form">
          <div className="form-control">
            {/* start: name input*/}
            <div className="relativInput">
              <h3>სახელი</h3>
              <input
                className={`fullname ${
                  namePattern.test(formValues.name)
                    ? "valid"
                    : formValues.name.length === 0
                    ? ""
                    : "noValid"
                } `}
                placeholder="ანზორ"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              {namePattern.test(formValues.name) ? (
                <img src={correct} className="validImg" alt="correct" />
              ) : formValues.name.length === 0 ? (
                ""
              ) : (
                <img src={wrong} className="noValidImg" alt="wrong" />
              )}
              <h4>მინიმუმ 2 ასო, ქართული ასოები</h4>
            </div>
            {/* end: name input*/}
            {/* end: surname input*/}
            <div className="relativInput">
              <h3>გვარი</h3>
              <input
                className={`fullname ${
                  surnamePattern.test(formValues.surname)
                    ? "valid"
                    : formValues.surname.length === 0
                    ? ""
                    : "noValid"
                } `}
                placeholder="მუმლაძე"
                type="text"
                name="surname"
                value={formValues.surname}
                onChange={handleChange}
              ></input>
              {surnamePattern.test(formValues.surname) ? (
                <img src={correct} className="validImg" alt="correct" />
              ) : formValues.surname.length === 0 ? (
                ""
              ) : (
                <img src={wrong} className="noValidImg" alt="wrong" />
              )}
              <h4>მინიმუმ 2 ასო, ქართული ასოები</h4>
            </div>
          </div>
          {/* end: surname iput*/}
          {/* start: upload-photo*/}
          <div className="upload-photo">
            <label>პირადი ფოტოს ატვირთვა</label>
            <Button
              className="upload-btn"
              variant="contained"
              component="label"
            >
              ატვირთვა
              <input
                onChange={addPhoto}
                name="image"
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </div>
          {/* end: upload-photo*/}
          {/* start: textarea */}
          <h3>ჩემ შესახებ (არასავალდებულო)</h3>
          <textarea
            className={`${formValues.about_me.length > 1 ? "valid" : ""} `}
            name="about_me"
            value={formValues.about_me}
            onChange={handleChange}
          />
          {/* end: textarea */}
          {/* start: email */}
          <div className="relativInput">
            <h3>ელ.ფოსტა</h3>
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              type="email"
              placeholder="anzorr666@redberry.ge"
              className={`email ${
                formValues.email.length > 1 &&
                emailPattern.test(formValues.email)
                  ? "valid"
                  : formValues.email.length === 0
                  ? ""
                  : "noValid"
              } `}
            />
            {emailPattern.test(formValues.email) ? (
              <img src={correct} className="validImg" alt="correct" />
            ) : formValues.email.length === 0 ? (
              ""
            ) : (
              <img src={wrong} className="noValidImg" alt="wrong" />
            )}
            <h4>უნდა მთავრდებოდეს @redberry.ge-ით</h4>
          </div>
          {/* end: email */}
          {/* start: mobile number */}
          <div className="number relativInput">
            <h3>მობილურის ნომერი</h3>
            <input
              name="phone_number"
              value={displayPhone}
              onChange={handlePhoneChange}
              type="text"
              placeholder="+995 551 12 34 56"
              className={`phone-number ${
                phonePattern.test(formValues.phone_number)
                  ? "valid"
                  : formValues.phone_number.length === 0
                  ? ""
                  : "noValid"
              } `}
            />
            {phonePattern.test(formValues.phone_number) ? (
              <img src={correct} className="validImg" alt="correct" />
            ) : formValues.phone_number.length === 0 ? (
              ""
            ) : (
              <img src={wrong} className="noValidImg" alt="wrong" />
            )}
            <h4>ნომერი უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</h4>
          </div>
          {/* end: mobile number  */}
          <Link
            className="next-page"
            to={`${
              namePattern.test(formValues.name) &&
              surnamePattern.test(formValues.surname) &&
              emailPattern.test(formValues.email) &&
              phonePattern.test(formValues.phone_number) &&
              formValues.image !== ""
                ? "/experience"
                : "#"
            }`}
          >
            ᲨᲔᲛᲓᲔᲒᲘ
          </Link>
        </form>
      </Wrapper>
      <Cv />
    </div>
  );
};

const Wrapper = styled.div`
  margin-left: 100px;
  width: 45%;
  .form-control {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    h3 {
      padding-bottom: 8px;
    }
    .fullname {
      width: 358px;
      height: 48px;
      margin-bottom: 8px;
    }
  }
  .upload-photo {
    margin: 40px 0px 35px 0px;
  }
  .upload-btn {
    margin-left: 19px;
    width: 107px;
    height: 27px;
    background: #0e80bf;
  }
  textarea {
    resize: none;
    width: 99%;
    height: 103px;
    margin: 6px 0px 33px 0px;
  }
  .number {
    margin-top: 29px;
  }
  .email,
  .phone-number {
    width: 99%;
    height: 48px;
    margin: 8px 0px 8px 0px;
  }
  .next-page {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    color: #ffffff;
    background: #6b40e3;
    margin-top: 35px;
    width: 151px;
    height: 48px;
    border-radius: 4px;
  }
`;

export default Personal;
