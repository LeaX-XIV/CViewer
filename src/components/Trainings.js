import { orderNumbersDesc } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";
import { DateRange } from "./DateRange";

const Trainings = ({ trainings }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <ConditionalComponent show={trainings.length > 0}>
    <div className="section">
      <SectionTitle title={dictionary.getTerm(lang, "training")} />
      <div className="container">
        {
          trainings
            .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
            .map((t, i) => 
              <Training
                key={`training-${i}`}
                startDate={t?.startDate}
                endDate={t?.endDate}
                duration={t?.duration}
                description={t?.description}
                company={t?.company}
                location={t?.location}
                country={t?.country}
                certification={t?.certification}
                />
            )
        }
      </div>
    </div>
  </ConditionalComponent>;
}

const Training = ({startDate, endDate, duration, description, company, location, country, certification}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!description) {
    return <></>;
  }

  return <>
    <div className="left">
      <DateRange start={startDate} end={endDate} />
      <ConditionalComponent show={duration}>
        <div id="training-duration">
          {endDate ?
            <span>{`(${duration})`}</span> :
            <span>{duration}</span>}
        </div>
      </ConditionalComponent>
    </div>
    <div className="content right">
      <ConditionalComponent show={description}>
        <div id="training-description">{description}</div>
      </ConditionalComponent>
      <ConditionalComponent show={company}>
        <span id="training-company">{company}</span>
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
      <ConditionalComponent show={certification}>
        <div id="training-certification">
          <span>{dictionary.getTerm(lang, "certificationObtained")}</span>
          <Separator type="colon" />
          <span>{certification}</span>
        </div>
      </ConditionalComponent>
    </div>
  </>;
}

export { Trainings };