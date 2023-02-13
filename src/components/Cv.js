import styled from "styled-components";
import React from "react";
import { usePersonalContext } from "../context/personalContext";
import mIcon from "../assets/images/Vector.png";
import phoneIcon from "../assets/images/phone-icon.png";
import star from "../assets/images/star.png";
const Cv = () => {
  const { formValues, displayPhone } = usePersonalContext();
  return (
    <Wrapper>
      <div className="cv-card">
        {/*start: Personal page section */}
        <section className="card-section">
          <div className="personal-info">
            <h1>
              {formValues.name} {formValues.surname}
            </h1>
            <div className="mail">
              {formValues.email && <img src={mIcon} alt="@" />}
              <p>{formValues.email}</p>
            </div>
            <div className="phone_number">
              {formValues.phone_number && (
                <img src={phoneIcon} alt="phone icon" />
              )}
              <p>{displayPhone}</p>
            </div>
            <div className="textarea">
              {formValues.about_me && <h2>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>}
              <textarea
                id="textarea"
                value={formValues.about_me}
                disabled={true}
              />
            </div>
            <img className="star" src={star} alt="star" />
          </div>
          {formValues.image && (
            <img className="resume-photo" src={formValues.image} alt="resume" />
          )}
        </section>
        {/*end: Personal page section */}
        {/* start:Experiences page section*/}
        {formValues.experiences.map((experience, index) => {
          const { position, employer, start_date, due_date, description } =
            experience;
          return (
            <section key={index} className="experience-section">
              {(position ||
                employer ||
                start_date ||
                due_date ||
                description !== "") && (
                <>
                  <div className="topline" />
                  <h2>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h2>
                  <div style={{ display: "flex", paddingBottom: "7px" }}>
                    <h3>{position}</h3>
                    {position && employer && ","}
                    <h3>&nbsp;{employer}</h3>
                  </div>
                  {(start_date || due_date) && (
                    <span className="start-date">
                      {start_date} - {due_date}
                    </span>
                  )}
                  <div className="textarea" style={{ paddingTop: "16px" }}>
                    <textarea
                      id="textarea"
                      disabled={true}
                      value={description}
                    />
                  </div>
                </>
              )}
            </section>
          );
        })}
        {/* end:Experiences page section */}
        {/* start:Education page section */}
        {formValues.educations.map((education, index) => {
          const { institute, degree, due_date, description } = education;
          return (
            <section key={index}>
              {(institute || degree || due_date || description) && (
                <>
                  <div className="topline" />
                  <h2>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
                  <div style={{ display: "flex", paddingBottom: "7px" }}>
                    <h3>{institute}</h3>
                    {institute && degree && ","}
                    <h3>&nbsp;{degree}</h3>
                  </div>
                  <span className="start-date">{due_date}</span>
                  <div className="textarea" style={{ paddingTop: "16px" }}>
                    <textarea
                      id="textarea"
                      disabled={true}
                      value={description}
                    />
                  </div>
                </>
              )}
            </section>
            
          );
        })}
        {/* end:Education page section */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  * {
    h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 34px;
      line-height: 42px;
      color: #f93b1d;
    }
    h2 {
      color: #f93b1d;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      padding-bottom: 15px;
    }
  }
  margin-left: 150px;
  .cv-card {
    margin: 68px 0px 0px 0px;
  }
  #textarea {
    resize: none;
    width: 99%;
    height: 103px;
    background-color: transparent;
    border: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-transform: lowercase;
    color: #000000;
  }
  .card-section {
    display: flex;
    .personal-info {
      margin-top: 5px;
      width: 400px;
    }
    .mail,
    .phone_number {
      display: flex;
      padding-bottom: 34px;
      img {
        padding-right: 12px;
      }
    }
    .mail {
      padding: 17px 0px 10px 0px;
    }
    .star {
      position: fixed;
      bottom: 24px;
    }
    .resume-photo {
      height: 246px;
      width: 246px;
      border-radius: 50%;
    }
  }
  .topline {
    width: 100%;
    margin: 19px 0px 24px 0px;
    border: 1px solid #c8c8c8;
  }
  .start-date {
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #919191;
    margin: 7px 0px 16px 0px;
  }
`;
export default Cv;
