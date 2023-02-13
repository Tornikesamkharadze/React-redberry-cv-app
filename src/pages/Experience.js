import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Cv from "../components/Cv";
import { usePersonalContext } from "../context/personalContext";
import wrong from "../assets/images/wrong.png";
import correct from "../assets/images/correct.png";

const twoCharactersPattern = /^[\w\d\s\S]{2,50}$/;
const jobPattern = /[ა-ჰa-zA-Z\w\d\s\S]{1,1000}/;

const Experience = () => {
  const {
    formValues,
    setFormValues,
    resetStoredValues,
    isValid,
    deleteExperienceForm,
    clearDisplayPhone,
  } = usePersonalContext();

  const handleExperiencesChange = (e, index) => {
    //ექსფერიენსის ფუნქცია: ვინახავ ძველ მნიშვნელობებს ვამოწმებ ობიექტების ინდექსებს და ვსეტავ შესაბამისი კი ველიუ წყვილს
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      experiences: formValues.experiences.map((experience, experienceIndex) => {
        if (index !== experienceIndex) return experience;
        return { ...experience, [name]: value };
      }),
    });
  };

  const addExperience = (e) => {
    //დამატების ღილაკი რომელიც გვიგენერირებს ახალ ფორმას
    e.preventDefault();
    setFormValues({
      ...formValues,
      experiences: [
        ...formValues.experiences,
        {
          position: "",
          employer: "",
          start_date: "",
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
          <h1>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h1>
          <p>2/3</p>
        </div>
        <div className="underline"></div>
        <form className="form">
          {formValues.experiences.map((experience, index) => {
            const { position, employer, start_date, due_date, description } =
              experience;
            const isStartDateValid =
              new Date() > new Date(start_date) &&
              new Date(start_date) < new Date(due_date);
            const isDueDateValid =
              new Date() > new Date(due_date) &&
              new Date(due_date) > new Date(start_date);

            return (
              <React.Fragment key={index}>
                {/* start: position */}
                <div className="relativInput">
                  <h3 className="position">თანამდებობა</h3>
                  <input
                    name="position"
                    value={position}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    type="text"
                    placeholder="დეველოპერი, დიზაინერი, ა.შ."
                    className={`email ${
                      twoCharactersPattern.test(position)
                        ? "valid"
                        : position.length === 0
                        ? ""
                        : "noValid"
                    } `}
                  />
                  {twoCharactersPattern.test(position) ? (
                    <img src={correct} className="validImg" alt="correct" />
                  ) : position.length === 0 ? (
                    ""
                  ) : (
                    <img src={wrong} className="noValidImg" alt="wrong" />
                  )}
                  <h4>მინიმუმ 2 სიმბოლო</h4>
                </div>
                {/* end: position */}
                {/* start: employer */}
                <div className="number relativInput">
                  <h3>დამსაქმებელი</h3>
                  <input
                    name="employer"
                    value={employer}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    type="text"
                    placeholder="დამსაქმებელი"
                    className={`phone-number ${
                      twoCharactersPattern.test(employer)
                        ? "valid"
                        : employer.length === 0
                        ? ""
                        : "noValid"
                    } `}
                  />
                  {twoCharactersPattern.test(employer) ? (
                    <img src={correct} className="validImg" alt="correct" />
                  ) : employer.length === 0 ? (
                    ""
                  ) : (
                    <img src={wrong} className="noValidImg" alt="wrong" />
                  )}
                  <h4>მინიმუმ 2 სიმბოლო</h4>
                </div>
                {/* end: employer */}
                {/* start: start_date*/}
                <div className="form-control">
                  <div className="relativInput">
                    <h3>დაწყების რიცხვი</h3>
                    <input
                      type="date"
                      name="start_date"
                      value={start_date}
                      onChange={(e) => handleExperiencesChange(e, index)}
                      className={`fullname ${
                        isStartDateValid
                          ? "valid"
                          : start_date.length === 0
                          ? ""
                          : "noValid"
                      } `}
                      placeholder="mm / dd / yyyy"
                    />
                    {isStartDateValid ? (
                      <img
                        src={correct}
                        className="validImg validDate"
                        alt="correct"
                      />
                    ) : start_date.length === 0 ? (
                      ""
                    ) : (
                      <img
                        src={wrong}
                        className="noValidImg wrongDate"
                        alt="wrong"
                      />
                    )}
                  </div>
                  {/* and: start_date */}
                  {/* start: due_date*/}
                  <div className="relativInput">
                    <h3>დამთავრების რიცხვი</h3>
                    <input
                      type="date"
                      name="due_date"
                      value={due_date}
                      onChange={(e) => handleExperiencesChange(e, index)}
                      className={`fullname ${
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
                  onChange={(e) => handleExperiencesChange(e, index)}
                  className={`${jobPattern.test(description) ? "valid" : ""} `}
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                />
                {/* end: description */}
                <div className="underline expunderline"></div>
                {index !== 0 && (
                  <button
                    className="deleteFormBtn"
                    onClick={(e) => deleteExperienceForm(e, index)}
                  >
                    წაშლა
                  </button>
                )}
              </React.Fragment>
            );
          })}
          {/*start: add anothter experience button */}
          <div>
            <button onClick={addExperience} className="experienceBtn">
              მეტი გამოცდილების დამატება
            </button>
          </div>
          {/*end: add anothter experience button */}
          {/*start: page routing */}
          <Link className="prev-page" to="/personal">
            ᲣᲙᲐᲜ
          </Link>
          {isValid(formValues.experiences) ? (
            <Link className="next-page" to="/education">
              ᲨᲔᲛᲓᲔᲒᲘ
            </Link>
          ) : (
            <Link className="next-page" to="#">
              ᲨᲔᲛᲓᲔᲒᲘ
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
    .fullname {
      width: 358px;
      height: 48px;
      margin-top: 8px;
    }
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
  .wrongDate {
    bottom: 18px;
  }
`;

export default Experience;
