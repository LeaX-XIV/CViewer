import { orderNumbersDesc, capitalize } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";
import { DateRange } from "./DateRange";

const Education = ({ education }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!education.universityDegrees &&
      !education.highSchoolDiploma &&
      !education.middleSchoolDiploma
    ) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "education")} />
    <div className="container">
      {
        (education?.universityDegrees || [])
          .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
          .map((d, i) => <Degree 
                          key={`university-degree-${i}`}
                          studentNumber={d?.studentNumber}
                          startDate={d?.startDate}
                          endDate={d?.endDate}
                          courseOfStudy={d?.courseOfStudy}
                          location={d?.location}
                          thesis={d?.thesis}
                          grade={d?.grade}
                          otherInfo={d?.otherInfo}
                          />
          )
      }
      <Diploma 
        startDate={education?.highSchoolDiploma?.startDate}
        endDate={education?.highSchoolDiploma?.endDate}
        title={education?.highSchoolDiploma?.title}
        grade={education?.highSchoolDiploma?.grade}
        />
      <Diploma 
        startDate={education?.middleSchoolDiploma?.startDate}
        endDate={education?.middleSchoolDiploma?.endDate}
        title={education?.middleSchoolDiploma?.title}
        grade={education?.middleSchoolDiploma?.grade}
        />
    </div>
  </div>;
}

const Degree = ({ studentNumber, startDate, endDate, courseOfStudy, location, thesis, grade, otherInfo }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!courseOfStudy) {
    return <>
      <div className="left"></div>
      <div className="content right error">
        { dictionary.getTerm(lang, "error") }
        <Separator type="colon" />
        { capitalize(dictionary.getTerm(lang, "invalidValue")) }
      </div>
    </>;
  }

  return <>
    <div className="left">
      <DateRange start={startDate} end={endDate} />
    </div>
    <div className="content right">
      <div id="degree-course-of-study">{courseOfStudy}</div>
      <ConditionalComponent show={location}>
        <div id="degree-location">{location}</div>
      </ConditionalComponent>
      <ConditionalComponent show={thesis}>
        <Thesis 
          title={thesis?.title}
          abstract={thesis?.abstract}
          supervisors={thesis?.supervisors || []}
          />
      </ConditionalComponent>
      <ConditionalComponent show={grade}>
        <div id="degree-grade">
          <span>{dictionary.getTerm(lang, "grade")}</span>
          <Separator type="colon" />
          <span>{grade}</span>
        </div>
      </ConditionalComponent>
      <ConditionalComponent show={otherInfo}>
        <div className="note" id="degree-other-info">{otherInfo}</div>
      </ConditionalComponent>
    </div>
  </>;
}

const Thesis = ({title, abstract, supervisors, }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!title) {
    return <>
      <div className="left"></div>
      <div className="content right error">
        { dictionary.getTerm(lang, "error") }
        <Separator type="colon" />
        { capitalize(dictionary.getTerm(lang, "invalidValue")) }
      </div>
    </>;
  }

  return <div id="thesis">
    <div id="thesis-title">
      <span>{dictionary.getTerm(lang, "thesis")}</span>
      <Separator type="colon" />
      <span>{title}</span>
    </div>
    <ConditionalComponent show={abstract}>
      <div id="thesis-abstract">
        <span>{dictionary.getTerm(lang, "abstract")}</span>
        <Separator type="colon" />
        <span>{abstract}</span>
      </div>
    </ConditionalComponent>
    <ConditionalComponent show={supervisors && supervisors?.length > 0}>
      <div id="thesis-supervisors">
        {supervisors?.length === 1 ?
          <span>{dictionary.getTerm(lang, "supervisor")}</span> :
          <span>{dictionary.getTerm(lang, "supervisors")}</span>}
        <Separator type="colon" />
        { supervisors.join(", ") }
      </div>
    </ConditionalComponent>
  </div>;
}

const Diploma = ({ startDate, endDate, title, grade }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!title) {
    return <></>;
  }

  return <>
    <div className="left">
      <DateRange start={startDate} end={endDate} />
    </div>
    <div className="content right">
      <div id="diploma-title">{title}</div>
      <ConditionalComponent show={grade}>
        <div id="diploma-grade">
          <span>{dictionary.getTerm(lang, "grade")}</span>
          <Separator type="colon" />
          <span>{grade}</span>
        </div>
      </ConditionalComponent>
    </div>
  </>;
}

export { Education };