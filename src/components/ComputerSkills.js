import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";

const ComputerSkills = ({ computerSkills }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!computerSkills?.operatingSystems &&
      !computerSkills?.programmingLanguages &&
      !computerSkills?.software &&
      !computerSkills?.database &&
      !computerSkills?.cad &&
      !computerSkills?.graphics &&
      !computerSkills?.spreadsheet &&
      !computerSkills?.other
    ) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "computerSkills")} />
    <div className="container">
      <Skill 
        name={"operatingSystems"}
        description={computerSkills?.operatingSystems?.description}
        level={computerSkills?.operatingSystems?.level}
        />
      <Skill 
        name={"programmingLanguages"}
        description={computerSkills?.programmingLanguages?.description}
        level={computerSkills?.programmingLanguages?.level}
        />
      <Skill 
        name={"software"}
        description={computerSkills?.software?.description}
        level={computerSkills?.software?.level}
        />
      <Skill 
        name={"database"}
        description={computerSkills?.database?.description}
        level={computerSkills?.database?.level}
        />
      <Skill 
        name={"cad"}
        description={computerSkills?.cad?.description}
        level={computerSkills?.cad?.level}
        />
      <Skill 
        name={"graphics"}
        description={computerSkills?.graphics?.description}
        level={computerSkills?.graphics?.level}
        />
      <Skill 
        name={"spreadsheet"}
        description={computerSkills?.spreadsheet?.description}
        level={computerSkills?.spreadsheet?.level}
        />
      <Skill 
        name={"other"}
        description={computerSkills?.other}
        level={undefined}
        />
    </div>
  </div>;
}

const Skill = ({name, description, level}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!description) {
    return <></>;
  }

  return <>
    <div className="subtitle left">{dictionary.getTerm(lang, name)}</div>
    <div className="content right">
      <div id="spreadsheet-skills-description">{description}</div>
      <ConditionalComponent show={level}>
        <div id="spreadsheet-skills-level">
          <span>{dictionary.getTerm(lang, "level")}</span>
          <Separator type="colon" />
          <span>{level}</span>
        </div>
      </ConditionalComponent>
    </div>
  </>;
}

export { ComputerSkills };