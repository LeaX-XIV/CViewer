import { orderDatesDesc } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";
import { DateRange } from "./DateRange";
import { ErrorContent } from "./ErrorContent";

const LanguageSkills = ({ languageSkills }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!languageSkills?.firstLanguage &&
      !languageSkills?.otherLanguages &&
      !languageSkills.certificates
    ) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "languageSkills")} />
    <div className="container">
      <ConditionalComponent show={languageSkills?.firstLanguage}>
        <div className="subtitle left">{dictionary.getTerm(lang, "firstLanguage")}</div>
        <div className="content right" id="first-language">{languageSkills?.firstLanguage}</div>
      </ConditionalComponent>
    </div>
    <div className="container no-page-break">
      <OtherLanguagesTable otherLanguages={languageSkills?.otherLanguages} />
    </div>
    <div className="container">
      <ConditionalComponent show={languageSkills?.certificates && languageSkills?.certificates?.length > 0}>
        <div className="subtitle left">{dictionary.getTerm(lang, "certifications")}</div><div className="content right"></div>
        {
          (languageSkills?.certificates || [])
            .sort((a, b) => orderDatesDesc(a.date, b.date))
            .map((c, i) => 
              <Certificate
                key={`certificate-${i}`}
                date={c?.date}
                certificate={c?.certificate}
                language={c?.language}
                grade={c?.grade}
                />
            )
        }
      </ConditionalComponent>
    </div>
  </div>;
};

const OtherLanguagesTable = ({ otherLanguages }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if(otherLanguages?.length <= 0) {
    return <></>;
  }

  return <>
    <div className="subtitle left">{dictionary.getTerm(lang, "otherLanguages")}</div>
    <div className="content right" style={{ paddingBottom: "0px" }}>
      <table>
        <thead>
          <tr>
            <th colSpan="2">{dictionary.getTerm(lang, "understanding")}</th>
            <th colSpan="2">{dictionary.getTerm(lang, "speaking")}</th>
            <th>{dictionary.getTerm(lang, "writing")}</th>
          </tr>
          <tr>
            <th>{dictionary.getTerm(lang, "listening")}</th>
            <th>{dictionary.getTerm(lang, "reading")}</th>
            <th>{dictionary.getTerm(lang, "spokenInteraction")}</th>
            <th>{dictionary.getTerm(lang, "spokenProduction")}</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
    <table className="left" style={{ paddingTop: "0px" }}>
      <thead><tr><th></th></tr><tr><th></th></tr></thead>
      <tbody>
        {
          otherLanguages
            .map((l, i) => <ConditionalComponent show={l.language} key={`other-language-${i}`}>
                             <tr>
                               <td>{l.language}</td>
                             </tr>
                           </ConditionalComponent>
            )
        }
      </tbody>
    </table>
    <div className="content right" style={{ paddingTop: "0px" }}>
      <table>
        <thead style={{ visibility: "collapse" }}>
          <tr>
            <th colSpan="2">{dictionary.getTerm(lang, "understanding")}</th>
            <th colSpan="2">{dictionary.getTerm(lang, "speaking")}</th>
            <th>{dictionary.getTerm(lang, "writing")}</th>
          </tr>
          <tr>
            <th>{dictionary.getTerm(lang, "listening")}</th>
            <th>{dictionary.getTerm(lang, "reading")}</th>
            <th>{dictionary.getTerm(lang, "spokenInteraction")}</th>
            <th>{dictionary.getTerm(lang, "spokenProduction")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            otherLanguages
              .map((l, i) => <ConditionalComponent show={l.language} key={`other-language-skill-${i}`}>
                               <tr>
                                 <td>{l?.listening || "-"}</td>
                                 <td>{l?.reading || "-"}</td>
                                 <td>{l?.oralInteraction || "-"}</td>
                                 <td>{l?.oralProduction || "-"}</td>
                                 <td>{l?.writing || "-"}</td>
                               </tr>
                             </ConditionalComponent>
              )
          }
        </tbody>
      </table>
      <div className="note">{dictionary.getTerm(lang, "languageLevelsDescriptor")}</div>
      <div className="note"><a target="_blank" rel="noreferrer noopener" href={`https://europa.eu/europass/en/common-european-framework-reference-language-skills`}>{dictionary.getTerm(lang, "referenceLanguage")}</a></div>
    </div>
  </>;
}

const Certificate = ({date, certificate, language, grade}) => {
  if (!certificate && !language) {
    return <>
      <div className="left"></div>
      <div className="content right error">
        <ErrorContent obj={{
                            date,
                            certificate,
                            language,
                            grade
                          }} />
      </div>
    </>;
  }

  return <div className="container">
    <ConditionalComponent show={date}>
      <div className="left">
        <DateRange end={date} />
      </div>
    </ConditionalComponent>
    <div className="content right">
      {certificate ?
        <span id="certificate-certificate">{certificate}</span> :
        <span id="certificate-language">{language}</span>}
      <ConditionalComponent show={grade}>
        <Separator type="colon" />
        <span id="certificate-grade">{grade}</span>
      </ConditionalComponent>
    </div>
  </div>;
}

export { LanguageSkills };