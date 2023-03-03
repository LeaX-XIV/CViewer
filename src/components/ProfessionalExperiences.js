import { orderNumbersDesc } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";
import { DateRange } from "./DateRange";

const ProfessionalExperiences = ({ professionalExperiences }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (professionalExperiences?.length <= 0) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "professionalExperiences")} />
    <div className="container">
      {
        professionalExperiences
          .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
          .map((e, i) => <Experience
                            key={`professional-experience-${i}`}
                            startDate={e?.startDate}
                            endDate={e?.endDate}
                            relationship={e?.relationship}
                            company={e?.company}
                            location={e?.location}
                            country={e?.country}
                            jobTitle={e?.jobTitle}
                            description={e?.description}
                            />
          )
      }
    </div>
  </div>;
}

const Experience = ({startDate, endDate, relationship, company, location, country, jobTitle, description}) => {
  if (!company &&
      !jobTitle
    ) {
      return <></>;
    }

  return <>
    <div className="left">
      <DateRange start={startDate} end={endDate} />
    </div>
    <div className="content right">
      <ConditionalComponent show={jobTitle}>
        <div id="professional-experience-programme">{jobTitle}</div>
      </ConditionalComponent>
      <ConditionalComponent show={company}>
        <span id="professional-experience-institute">{company}</span>
      </ConditionalComponent>
      <ConditionalComponent show={location}>
        <ConditionalComponent show={company}>
          <Separator type="dash" />
        </ConditionalComponent>
        <span id="training-location">{location}</span>
      </ConditionalComponent>
      <ConditionalComponent show={country}>
        <ConditionalComponent show={company || location}>
          <Separator type="dash" />
        </ConditionalComponent>
        <span id="training-country">{country}</span>
      </ConditionalComponent>
      <ConditionalComponent show={description}>
        <div id="professional-experience-description">{description}</div>
      </ConditionalComponent>
      <ConditionalComponent show={relationship}>
        <div id="professional-experience-relationship">{relationship}</div>
      </ConditionalComponent>
    </div>
  </>;
}

export { ProfessionalExperiences };