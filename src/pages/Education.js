import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Cv from "../components/Cv";
import { usePersonalContext } from "../context/personalContext";
import wrong from "../assets/images/wrong.png";
import correct from "../assets/images/correct.png";

const twoCharactersPattern = /^[\w\d\s\S]{2,50}$/;
const descriptionPattern = /[ა-ჰa-zA-Z\w\d\s\S]{1,1000}/;

const Education = () => {
  const {
    formValues,
    setFormValues,
    resetStoredValues,
    isValid,
    deleteEducationForm,
    options,
    handleOptionsChange,
    isValidEducation,
    sendData,
    clearDisplayPhone,
  } = usePersonalContext();

  const handleEducationsChange = (e, index) => {
    //ექსფერიენსის ფუნქცია: ვინახავ ძველ მნიშვნელობებს ვამოწმებ ობიექტების ინდექსებს და ვსეტავ შესაბამისი კი ველიუ წყვილს
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      educations: formValues.educations.map((education, educationIndex) => {
        if (index !== educationIndex) return education;
        return { ...education, [name]: value };
      }),
    });
  };

  const addEducation = (e) => {
    //დამატების ღილაკი რომელიც გვიგენერირებს ახალ ფორმას
    e.preventDefault();
    setFormValues({
      ...formValues,
      educations: [
        ...formValues.educations,
        {
          institute: "",
          degree: "",
          degree_id: "",
          due_date: "",
          description: "",
        },
      ],
    });
  };
  
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
          <h1>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h1>
          <p>3/3</p>
        </div>
        <div className="underline"></div>
        <form className="form">
          {formValues.educations.map((education, index) => {
            const { institute, degree, due_date, description } = education;
            const isDueDateValid = new Date() > new Date(due_date);
            return (
              <React.Fragment key={index}>
                {/* start: institute */}
                <div className="relativInput">
                  <h3 className="position">სასწავლებელი</h3>
                  <input
                    name="institute"
                    value={institute}
                    onChange={(e) => handleEducationsChange(e, index)}
                    type="text"
                    placeholder="სასწავლებელი"
                    className={`institute ${
                      twoCharactersPattern.test(institute)
                        ? "valid"
                        : institute.length === 0
                        ? ""
                        : "noValid"
                    } `}
                  />
                  {twoCharactersPattern.test(institute) ? (
                    <img src={correct} className="validImg" alt="correct" />
                  ) : institute.length === 0 ? (
                    ""
                  ) : (
                    <img src={wrong} className="noValidImg" alt="wrong" />
                  )}
                  <h4>მინიმუმ 2 სიმბოლო</h4>
                </div>
                {/* end: institute */}
                {/* start: degree*/}
                <div className="form-control">
                  <div className="relativInput">
                    <h3>ხარისხი</h3>
                    <select
                      onChange={(e) => handleOptionsChange(e, index)}
                      className={`degree ${
                        degree ? "valid" : degree.length === 0 ? "" : "noValid"
                      } `}
                      value={degree}
                    >
                      <option value="" disabled>
                        აირჩიეთ ხარისხი
                      </option>
                      {options.map((option) => {
                        return (
                          <option
                            key={option.id}
                            value={option.title}
                            id={option.id}
                          >
                            {option.title}
                          </option>
                        );
                      })}
                    </select>
                    {degree ? (
                      <img
                        src={correct}
                        className="validImg validDegree"
                        alt="correct"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {/* and: degree */}
                  {/* start: due_date*/}
                  <div className="relativInput">
                    <h3>დამთავრების რიცხვი</h3>
                    <input
                      type="date"
                      name="due_date"
                      value={due_date}
                      onChange={(e) => handleEducationsChange(e, index)}
                      className={`degree ${
                        isDueDateValid
                          ? "valid"
                          : due_date.length === 0
                          ? ""
                          : "noValid"
                      } `}
                      placeholder="mm / dd / yyyy"
                    ></input>
                    {isDueDateValid ? (
                      <img
                        src={correct}
                        className="validImg validDate"
                        alt="correct"
                      />
                    ) : due_date.length === 0 ? (
                      ""
                    ) : (
                      <img
                        src={wrong}
                        className="noValidImg wrongDate"
                        alt="wrong"
                      />
                    )}
                  </div>
                </div>
                {/* end: due_date*/}
                {/* start: description */}
                <h3 className="description">აღწერა</h3>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => handleEducationsChange(e, index)}
                  className={`${
                    descriptionPattern.test(description) ? "valid" : ""
                  } `}
                  placeholder="განათლების აღწერა"
                />
                {/* end: description */}
                <div className="underline expunderline"></div>
                {/*start: delete form btn */}
                {index !== 0 && (
                  <button
                    className="deleteFormBtn"
                    onClick={(e) => deleteEducationForm(e, index)}
                  >
                    წაშლა
                  </button>
                )}
                {/*end: delete form btn */}
              </React.Fragment>
            );
          })}
          {/*start: add anothter institute button */}
          <div>
            <button onClick={addEducation} className="experienceBtn">
              სხვა სასწავლებლის დამატება
            </button>
          </div>
          {/*end: add anothter institute button */}
          {/*start: page routing */}
          <Link className="prev-page" to="/experience">
            ᲣᲙᲐᲜ
          </Link>
          {isValid(formValues.experiences) &&
          isValidEducation(formValues.educations) ? (
            <Link onClick={sendData} className="finishBtn" to="/resume">
              ᲓᲐᲡᲠᲣᲚᲔᲑᲐ
            </Link>
          ) : (
            <Link className="finishBtn" to="#">
              ᲓᲐᲡᲠᲣᲚᲔᲑᲐ
            </Link>
          )}
          {/*and: page routing */}
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
    padding-top: 33px;
    .degree {
      width: 358px;
      height: 48px;
      margin-top: 8px;
    }
  }
  textarea {
    resize: none;
    width: 99%;
    height: 179px;
    margin: 6px 0px 33px 0px;
  }
  .institute {
    width: 99%;
    height: 48px;
    margin: 8px 0px 8px 0px;
  }
  .finishBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    color: #ffffff;
    background: #6b40e3;
    margin-top: 25px;
    width: 151px;
    height: 48px;
    border-radius: 4px;
  }
  .prev-page {
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    color: #ffffff;
    background: #6b40e3;
    margin-top: 25px;
    width: 113px;
    height: 48px;
    border-radius: 4px;
  }
  .description {
    padding-top: 33px;
  }
  .expunderline {
    margin-bottom: 30px;
    border: 1px solid #c1c1c1;
  }
  .experienceBtn {
    width: 289px;
    height: 48px;
    background: #62a1eb;
    border-radius: 4px;
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    cursor: pointer;
  }
  .deleteFormBtn {
    float: right;
    color: #ffffff;
    background: #62a1eb;
    width: 113px;
    height: 48px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 100;
    text-transform: uppercase;
  }
  .validDate {
    right: 25px;
    bottom: 15px;
  }
  .validDegree {
    right: 24px;
    bottom: 17px;
  }
  .wrongDate {
    bottom: 18px;
  }
`;
export default Education;
