import { useContext } from "react";

import DictionaryContext from './context/DictionaryContext';
import LanguageContext from './context/LanguageContext';

import { PersonalInfo } from "./components/PersonalInfo";
import { Education } from "./components/Education";
import { Trainings } from "./components/Trainings";
import { InternationalExperiences } from "./components/InternationalExperiences";
import { ProfessionalExperiences } from "./components/ProfessionalExperiences";
import { LanguageSkills } from "./components/LanguageSkills";
import { ComputerSkills } from "./components/ComputerSkills";
import { PersonalSkills } from "./components/PersonalSkills";
import { OtherInfo } from "./components/OtherInfo";
import { Publications } from "./components/Publications";
import { Conferences } from "./components/Conferences";

const CViewer = ({cv}) => {
  return <>
    <div className="visible">
      <PersonalInfo personalInfo={cv.personalInfo} />
      <Education education={cv.education} />
      <Trainings trainings={cv.trainings} />
      <InternationalExperiences internationalExperiences={cv.internationalExperiences} />
      <ProfessionalExperiences professionalExperiences={cv.professionalExperiences} />
      <LanguageSkills languageSkills={cv.languageSkills} />
      <ComputerSkills computerSkills={cv.computerSkills} />
      <PersonalSkills personalSkills={cv.personalSkills} />
      <OtherInfo otherInfo={cv.otherInfo} />
      <Publications publications={cv.publications} />
      <Conferences conferences={cv.conferences} />
    </div>
    <PrivacyPolicy />
  </>;
}

const PrivacyPolicy = () => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <footer className="footer note">
    {dictionary.getTerm(lang, "privacyPolicy")}
  </footer>
}

export {CViewer};