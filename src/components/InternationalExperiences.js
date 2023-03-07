import { orderNumbersDesc } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";
import { DateRange } from "./DateRange";
import { ErrorContent } from "./ErrorContent";

const InternationalExperiences = ({ internationalExperiences }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (internationalExperiences?.length <= 0) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "internationalExperiences")} />
    <div className="container">
      {
        (internationalExperiences || [])
          .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
          .map((e, i) => <Experience
                            key={`international-experience-${i}`}
                            startDate={e?.startDate}
                            endDate={e?.endDate}
                            programme={e?.programme}
                            institute={e?.institute}
                            location={e?.location}
                            country={e?.country}
                            description={e?.description}
                            />
          )
      }
    </div>
  </div>;
}

const Experience = ({ startDate, endDate, programme, institute, location, country, description }) => {
  if (!programme &&
      !institute &&
      !location &&
      !country
    ) {
    return <>
      <div className="left"></div>
      <div className="content right error">
        <ErrorContent obj={{
                            startDate,
                            endDate,
                            programme,
                            institute,
                            location,
                            country,
                            description
                          }} />
      </div>
    </>;
  }

  return <>
    <div className="left">
      <DateRange start={startDate} end={endDate} />
    </div>
    <div className="content right">
      <ConditionalComponent show={programme}>
        <div id="international-experience-programme">{programme}</div>
      </ConditionalComponent>
      <ConditionalComponent show={institute}>
        <span id="international-experience-institute">{institute}</span>
      </ConditionalComponent>
      <ConditionalComponent show={location}>
        <ConditionalComponent show={institute}>
          <Separator type="dash" />
        </ConditionalComponent>
        <span id="training-location">{location}</span>
      </ConditionalComponent>
      <ConditionalComponent show={country}>
        <ConditionalComponent show={institute || location}>
          <Separator type="dash" />
        </ConditionalComponent>
        <span id="training-country">{country}</span>
      </ConditionalComponent>
      <ConditionalComponent show={description}>
        <div className="note" id="international-experience-description">{description}</div>
      </ConditionalComponent>
    </div>
  </>;
};

export { InternationalExperiences };