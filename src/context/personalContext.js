import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
const initialValues = {
  name: "",
  surname: "",
  email: "",
  phone_number: "",
  experiences: [
    {
      position: "",
      employer: "",
      start_date: "",
      due_date: "",
      description: "",
    },
  ],
  educations: [
    {
      institute: "",
      degree: "",
      degree_id: null,
      due_date: "",
      description: "",
    },
  ],
  image: "",
  about_me: "",
};

const getLocalStorage = () => {
  let storedValues = localStorage.getItem("form");
  if (!storedValues) {
    return initialValues;
  }
  return JSON.parse(storedValues);
};

const rootUrl = "https://resume.redberryinternship.ge/api/degrees";
const postUrl = "https://resume.redberryinternship.ge/api/cvs";

const PersonalContext = React.createContext();
const PersonalProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(getLocalStorage());
  const [options, setOptions] = useState([]);
  const [displayPhone, setDisplayPhone] = useState("");

  //start:useffects for localStorages
  useEffect(() => {
    localStorage.setItem("displayPhone", displayPhone);
  }, [displayPhone]);

  const savedDisplayPhone = localStorage.getItem("displayPhone");

  useEffect(() => {
    if (savedDisplayPhone) {
      setDisplayPhone(savedDisplayPhone);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formValues));
  }, [formValues]);

  //end:useffects for localStorages

  const sendData = async () => {
 /*    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("surname", formValues.surname);
    formData.append("email", formValues.email);
    formData.append("phone_number", formValues.phone_number);
    formData.append("experiences", JSON.stringify(formValues.experiences));
    formData.append("educations", JSON.stringify(formValues.educations));
    formData.append("image", formValues.image);
    formData.append("about_me", formValues.about_me);

    const formDataBlob = new Blob([JSON.stringify(formValues)], {
      type: "application/json",
    }); */

    try {
      const { data } = await axios.post(postUrl, formValues);
      console.log(data);
    } catch (error) {
      /*  console.error(error.response.data); */
      console.error(error.response.status);
      /*  console.error(error.response.headers); */
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const addPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFormValues({
        ...formValues,
        image: reader.result,
      });
    };
  };

  const handleOptionsChange = (e, index) => {
    //სელექთის ფუნქცია
    setFormValues({
      ...formValues,
      educations: formValues.educations.map((education, educationIndex) => {
        if (index !== educationIndex) return education;
        return {
          ...education,
          degree: e.target.value,
          degree_id: e.target.options[e.target.selectedIndex].id,
        };
      }),
    });
  };

  const getData = async () => {
    const { data } = await axios(rootUrl);
    setOptions(data);
  };

  useEffect(() => {
    getData();
  }, []);

  //start: clear localStorage
  const resetStoredValues = () => {
    setFormValues(initialValues);
  };

  const clearDisplayPhone = () => {
    localStorage.removeItem("displayPhone");
    setDisplayPhone("");
  };
  //end: clear localStorage
  //start: validation functions
  const validateExperience = (experience) => {
    //ვალიდაციი ფუნქცია იღებს სათითაოდ ობიექტებს რომელსაც აწვდის isValid ფუნქცია და ამოწმებს თუ აკმაყოფილებს პატერნებს
    const positionRegex = /^[\w\d\s\S]{2,50}$/;
    const employerRegex = /^[\w\d\s\S]{2,50}$/;
    const dateRegex =
      new Date() > new Date(experience.start_date) &&
      new Date() > new Date(experience.due_date) &&
      new Date(experience.start_date) < new Date(experience.due_date);
    const descriptionRegex = /[ა-ჰa-zA-Z\w\d\s\S]{1,1000}/;

    return (
      positionRegex.test(experience.position) &&
      employerRegex.test(experience.employer) &&
      dateRegex &&
      descriptionRegex.test(experience.description)
    );
  };

  const isValid = (experiences) => {
    /* ფუნცია იღებს მასივს და სათითაოდ აწვდის ობიექტებად validateExperience
     ფუნქციას და თუ რომელიმე ობიექტიდან როდესაც validateExperience-ი შეამოწმებს 
     ერთი მაინც დაუბრუნებს ფოლსი ველიუს მაშინ isValid ფუნქცია 
     არეთარნებს ფოლს */
    for (const experience of experiences) {
      if (!validateExperience(experience)) {
        return false;
      }
    }
    return true;
  };

  const validateEducation = (education) => {
    const twoCharactersPattern = /^[\w\d\s\S]{2,50}$/;
    const validDegree = education.degree !== "";
    const validDueDate = new Date() > new Date(education.due_date);
    const descriptionPattern = /[ა-ჰa-zA-Z\w\d\s\S]{1,1000}/;
    return (
      twoCharactersPattern.test(education.institute) &&
      validDegree &&
      validDueDate &&
      descriptionPattern.test(education.description)
    );
  };

  const isValidEducation = (educations) => {
    for (const education of educations) {
      if (!validateEducation(education)) {
        return false;
      }
    }
    return true;
  };
  //end: validation functions

  // Delete forms
  const deleteExperienceForm = (e, index) => {
    e.preventDefault();
    const removeForm = formValues.experiences.filter((_, stateIndex) => {
      return stateIndex !== index;
    });
    return setFormValues({ ...formValues, experiences: removeForm });
  };

  const deleteEducationForm = (e, index) => {
    const removeForm = formValues.educations.filter((_, stateIndex) => {
      return index !== stateIndex;
    });
    return setFormValues({ ...formValues, educations: removeForm });
  };

  return (
    <PersonalContext.Provider
      value={{
        handleChange,
        formValues,
        setFormValues,
        resetStoredValues,
        validateExperience,
        isValid,
        deleteExperienceForm,
        deleteEducationForm,
        options,
        handleOptionsChange,
        isValidEducation,
        addPhoto,
        sendData,
        clearDisplayPhone,
        displayPhone,
        setDisplayPhone,
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
const usePersonalContext = () => {
  return useContext(PersonalContext);
};

export { PersonalContext, PersonalProvider, usePersonalContext };
