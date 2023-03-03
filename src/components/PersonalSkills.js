import { useContext } from "react";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';

const PersonalSkills = ({ personalSkills }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!personalSkills) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "personalSkills")} />
    <div className="container">
      <div className="left"></div>
      <div className="content right" id="personal-skills">{personalSkills}</div>
    </div>
  </div>;
}

export { PersonalSkills };