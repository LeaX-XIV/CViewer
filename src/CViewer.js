import { formatDate, orderNumbersDesc } from "./utils";

import { useContext } from "react";
import DictionaryContext from './context/DictionaryContext';
import LanguageContext from './context/LanguageContext';

const CViewer = ({cv}) => {
  return <>
    <div className="visible">
      <Anagraphic anagraphic={cv.anagraphic} />
      <Education education={cv.education} />
      <Training trainings={cv.trainings} />
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

const DocumentTitle = ({title}) => {
  return <div className="document-title">
    <div className="title">{title}</div>
    <div className="hr"/>
  </div>;
}

const SectionTitle = ({title}) => {
  return <div className="section-title">
    <div className="title">{title}</div>
    <div className="hr"/>
  </div>;
}

const Separator = ({type}) => {
  return <span className={`separator ${type}`} />
}

const Anagraphic = ({anagraphic}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const firstName = anagraphic.firstName || undefined;
  const middleNames = anagraphic.middleNames ? anagraphic.middleNames.split(/\s+/) : [];
  const lastName = anagraphic.lastName || undefined;
  const gender = anagraphic.gender || undefined;
  const dateOfBirth = anagraphic.dateOfBirth || undefined;
  const placeOfBirth = anagraphic.placeOfBirth || undefined;
  const nationality = anagraphic.nationality || undefined;
  const photo = anagraphic.photo || undefined;
  const address = {};
  address.address = anagraphic.address.address || undefined;
  address.door = anagraphic.address.door || undefined;
  address.city = anagraphic.address.city || undefined;
  address.province = anagraphic.address.province || undefined;
  address.country = anagraphic.address.country || undefined;
  address.zipCode = anagraphic.address.zipCode || undefined;
  const telephoneNumber = anagraphic.telephoneNumber || undefined;
  const mobileNumber = anagraphic.mobileNumber || undefined;
  const emails = typeof anagraphic.emails === String ? [anagraphic.emails] :
           anagraphic.emails;
  const website = anagraphic.website || undefined;
  const linkedin = anagraphic.linkedin || undefined;

  return <div className="section">
    <DocumentTitle title={`${firstName} ${middleNames.join(" ")} ${lastName.toUpperCase()}`} />
    <div className="container">
      { photo ? <img className="left photo" id="photo" src={photo} alt="mugshot" /> : <></> }
      <div className="content right">
        {/* <div id="name">
          <span id="lastName">{`${lastName.toUpperCase()} `}</span>
          <span id="middleNames">{middleNames.map((n, i) => <span id={`middle-name-${i}`} key={`middle-name-${i}`}>{n} </span>)}</span>
          <span id="firstName">{firstName}</span>
        </div> */}
        { gender ? 
          <div id="gender">
            <span>{dictionary.getTerm(lang, "gender")}</span><Separator type="colon" /><span>{gender}</span>
          </div> : <></>
        }
        { nationality ? 
          <div id="nationality">
            <span>{dictionary.getTerm(lang, "nationality")}</span><Separator type="colon" /><span>{nationality}</span>
          </div> : <></> }
        <div id="birth">
          { dateOfBirth ? <><span id="date-of-birth">{new Date(dateOfBirth).toLocaleDateString(undefined, {year: "numeric", month: "short", day: "numeric"})}</span><Separator type="tab" /></> : <></> }
          { placeOfBirth ? <span id="place-of-birth">{placeOfBirth}</span> : <></> }
        </div>
        <div id="contact-info">
          { address ?
            <>
              <div className="icon-group" id="address">
                <img className="icon filter-blueviolet" src="./icons/address.svg" alt="address icon" /> 
                { address.address ? 
                  <>
                    <span>{address.address}</span>
                    <Separator type="comma" />
                    { address.door ? 
                      <span>{address.door}</span> : 
                      <></> 
                    }
                    <Separator />
                    <Separator />
                  </> : 
                  <></> 
                }
                { address.zipCode ? 
                    <span id="zipCode">{address.zipCode}</span> : 
                    <></>
                }
                <Separator type="comma" />
                { address.city ? <span id="city">{address.city}</span> : <></> }
                <Separator />
                { address.province ? <span id="province">{address.city ? `(${address.province})` : address.province}</span> : <></> }
                <Separator />
                { address.country ? <span id="country">{address.country}</span> : <></> }
                </div>
            </> :
            <></>
          }
          { telephoneNumber ? 
              <div className="icon-group" id="telephone-number">
                <img className="icon filter-blueviolet" src="./icons/phone.svg" alt="phone icon" /> 
                <span>{telephoneNumber}</span>
              </div> :
              <></>
          }
          { mobileNumber ? 
              <div className="icon-group" id="mobile-number">
                <img className="icon filter-blueviolet" src="./icons/mobilephone.svg" alt="mobile phone icon" /> 
                <span>{mobileNumber}</span>
              </div> : 
              <></>
          }
        </div>
        { emails.length > 0 ? 
          <div className="icon-group" id="emails">
            <img className="icon filter-blueviolet" src="./icons/mail.svg" alt="email icon" /> 
            <div>
              { emails.map((e, i) => <div id={`email-${i}`} key={`email-${i}`}><a href={`mailto:${e}`}>{e}</a></div>) }
            </div>
          </div> : 
          <></>
        }
        { website ? 
          <div className="icon-group" id="website">
            <img className="icon filter-blueviolet" src="./icons/website.svg" alt="website icon" /> 
            <a href={`${website}`} target="_blank" rel="noreferrer">{website}</a>
          </div> :
          <></>
        }
        { linkedin ? 
          <div className="icon-group" id="linkedin">
            <img className="icon filter-blueviolet" src="./icons/linkedin.svg" alt="linkedin icon" /> 
            <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">{linkedin}</a>
          </div> :
          <></>
        }
      </div>
    </div>
  </div>;
}

const Education = ({education}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const Diploma = ({diploma}) => {
    return <>
      { diploma.startDate && diploma.endDate ?
        <div className="date-range left">
          <div className="date">{formatDate(diploma.startDate)}</div>
          <Separator type="dash" />
          <div className="date">{formatDate(diploma.endDate)}</div>
        </div> :
        diploma.endDate ?
        <div className="date left">{formatDate(diploma.endDate)}</div> :
        <></>
      }
      <div className="content right">
        { diploma.title ?
          <div id="diploma-title">{diploma.title}</div> :
          <></>
        }
        { diploma.grade ?
          <div id="diploma-grade">
            <span>{dictionary.getTerm(lang, "grade")}</span><Separator type="colon" /><span>{diploma.grade}</span>
          </div> :
          <></>
        }
      </div>
    </>;
  }

  const Degree = ({degree}) => {
    return <>
      { degree.startDate && degree.endDate ?
        <div className="date-range left">
          <div className="date">{formatDate(degree.startDate)}</div>
          <Separator type="dash" />
          <div className="date">{formatDate(degree.endDate)}</div>
        </div> :
        degree.endDate ?
        <div className="date left">{formatDate(degree.endDate)}</div> :
        <></>
      }
      <div className="content right">
        { degree.courseOfStudy ?
          <div id="degree-course-of-study">{degree.courseOfStudy}</div> :
          <></>
        }
        { degree.location ?
          <div id="degree-location">{degree.location}</div> :
          <></>
        }
        { degree.thesis ?
          <div id="thesis">
            { degree.thesis.title ? 
              <div id="thesis-title"><span>{dictionary.getTerm(lang, "thesis")}</span><Separator type="colon" /><span>{degree.thesis.title}</span></div> :
              <></>
            }
            { degree.thesis.abstract ? 
              <div id="thesis-abstract"><span>{dictionary.getTerm(lang, "abstract")}</span><Separator type="colon" /><span>{degree.thesis.abstract}</span></div> :
              <></>
            }
            { degree.thesis.supervisors && degree.thesis.supervisors.length > 0 ? 
              <div id="thesis-supervisors">
                {degree.thesis.supervisors.length === 1 ? <span>{dictionary.getTerm(lang, "supervisor")}</span> : <span>{dictionary.getTerm(lang, "supervisors")}</span>}
                <Separator type="colon" />
                { degree.thesis.supervisors.map((e, i) => 
                  <span 
                    id={`thesis-supervisor-${i}`}
                    key={`thesis-supervisor-${i}`}>
                      {e}
                  </span>
                ) }
              </div> : 
              <></>
            }
          </div> :
          <></>
        }
        { degree.grade ?
          <div id="degree-grade">
            <span>{dictionary.getTerm(lang, "grade")}</span><Separator type="colon" /><span>{degree.grade}</span>
          </div> :
          <></>
        }
        { degree.otherInfo ?
          <div id="degree-other-info">{degree.otherInfo}</div> :
          <></>
        }
      </div>
    </>;
  }

  const middleSchoolDiploma = education.middleSchoolDiploma ? {} : undefined;
  if (middleSchoolDiploma) {
    middleSchoolDiploma.title = education.middleSchoolDiploma.title || undefined;
    middleSchoolDiploma.startDate = education.middleSchoolDiploma.startDate ? new Date(education.middleSchoolDiploma.startDate) : undefined;
    middleSchoolDiploma.endDate = education.middleSchoolDiploma.endDate ? new Date(education.middleSchoolDiploma.endDate) : undefined;
    middleSchoolDiploma.grade = education.middleSchoolDiploma.grade || undefined;
  }
  const highSchoolDiploma = education.highSchoolDiploma ? {} : undefined;
  if (highSchoolDiploma) {
    highSchoolDiploma.title = education.highSchoolDiploma.title || undefined;
    highSchoolDiploma.startDate = education.highSchoolDiploma.startDate ? new Date(education.highSchoolDiploma.startDate) : undefined;
    highSchoolDiploma.endDate = education.highSchoolDiploma.endDate ? new Date(education.highSchoolDiploma.endDate) : undefined;
    highSchoolDiploma.grade = education.highSchoolDiploma.grade || undefined;
  }
  const universityDegrees = education.universityDegrees.map(d => {
    let degree = {};
    degree.studentNumber = d.studentNumber || undefined;
    degree.startDate = d.startDate ? new Date(d.startDate) : undefined;
    degree.endDate = d.endDate ? new Date(d.endDate) : undefined;
    degree.courseOfStudy = d.courseOfStudy || undefined;
    degree.location = d.location || undefined;
    degree.thesis = d.thesis ? {} : undefined;
    if (degree.thesis) {
      degree.thesis.title = d.thesis.title || undefined;
      degree.thesis.abstract = d.thesis.abstract || undefined;
      degree.thesis.supervisors = typeof d.thesis.supervisors === String ?
                    [d.thesis.supervisors] : d.thesis.supervisors;
    }
    degree.grade = d.grade || undefined;
    degree.otherInfo = d.otherInfo || undefined;

    return degree;
  })

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "education")} />
    <div className="container">
      { universityDegrees.sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
        .map((e, i) => 
          <Degree degree={e} key={`university-degree-${i}`} />
        )
      }
      { highSchoolDiploma ? <Diploma diploma={highSchoolDiploma} /> : <></> }
      { middleSchoolDiploma ? <Diploma diploma={middleSchoolDiploma} /> : <></> }
    </div>
  </div>;
}

const Training = ({trainings}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const Training = ({training}) => {
    const startDate = training.startDate ? new Date(training.startDate) : undefined;
    const endDate = training.endDate ? new Date(training.endDate) : undefined;
    const duration = training.duration || undefined;
    const description = training.description || undefined;
    const company = training.company || undefined;
    const location = training.location || undefined;
    const country = training.country || undefined;
    const certification = training.certification || undefined;

    return <>
      <div className="left">
      { startDate && endDate ?
        <div className="date-range">
          <div className="date">{formatDate(startDate)}</div>
          <Separator type="dash" />
          <div className="date">{formatDate(endDate)}</div>
        </div> :
        endDate ?
        <div className="date">{formatDate(endDate)}</div> :
        <></>
      }
      { duration ? 
        <div id="training-duration">
          { endDate ? <span>{`(${duration})`}</span> : <span>{duration}</span> }
        </div> :
        <></>
      }
      </div>
      <div className="content right">
        { description ?
          <div id="training-description">{description}</div> :
          <></>
        }
        { company ?
          <span id="training-company">{company}</span> :
          <></>
        }
        { location ?
          <>
            {company ? <Separator type="dash" /> : <></> }
            <span id="training-location">{location}</span>
          </> :
          <></>
        }
        { country ? 
          <>
            { company || location ? <Separator type="dash" /> : <></> }
            <span id="training-country">{country}</span>
          </> :
          <></>
        }
        { certification ?
          <div id="training-certification">
            <span>{dictionary.getTerm(lang, "certificationObtained")}</span><Separator type="colon" /><span>{certification}</span>
          </div> :
          <></>
        }
      </div>
    </>;
  }

  if (trainings.length > 0) {
    return <div className="section">
      <SectionTitle title={dictionary.getTerm(lang, "training")} />
      <div className="container">
        { trainings
            .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
            .map((t, i) => 
              <Training
                key={`training-${i}`}
                training={t}
              />
            )
        }
      </div>
    </div>;
  } else {
    return <></>;
  }
}

const InternationalExperiences = ({internationalExperiences}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const InternationalExperience = ({experience}) => {
    const startDate = experience.startDate ? new Date(experience.startDate) : undefined;
    const endDate = experience.endDate ? new Date(experience.endDate) : undefined;
    const programme = experience.programme || undefined;
    const institute = experience.institute || undefined;
    const location = experience.location || undefined;
    const country = experience.country || undefined;
    const description = experience.description || undefined;

    return <>
      { startDate && endDate ?
        <div className="date-range left">
          <div className="date">{formatDate(startDate)}</div>
          <Separator type="dash" />
          <div className="date">{formatDate(endDate)}</div>
        </div> :
        endDate ?
        <div className="date left">{formatDate(endDate)}</div> :
        <></>
      }
      <div className="content right">
        { programme ?
          <div id="international-experience-programme">{programme}</div> :
          <></>
        }
        { institute ?
          <span id="international-experience-institute">{institute}</span> :
          <></>
        }
        { location ?
          <>
            {institute ? <Separator type="dash" /> : <></> }
            <span id="international-experience-location">{location}</span>
          </> :
          <></>
        }
        { country ? 
          <>
            { institute || location ? <Separator type="dash" /> : <></> }
            <span id="international-experience-country">{country}</span>
          </> :
          <></>
        }
        { description ?
          <div id="international-experience-description">
            <span>{description}</span>
          </div> :
          <></>
        }
      </div>
    </>;
  }

  if (internationalExperiences.length > 0) {
    return <div className="section">
      <SectionTitle title={dictionary.getTerm(lang, "internationalExperiences")} />
      <div className="container">
        { internationalExperiences
            .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
            .map((e, i) => 
              <InternationalExperience
                key={`international-experience-${i}`}
                experience={e}
                />
            )
        }
      </div>
    </div>;
  } else {
    return <></>;
  }
}

const ProfessionalExperiences = ({professionalExperiences}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const ProfessionalExperience = ({experience}) => {
    const startDate = experience.startDate ? new Date(experience.startDate) : undefined;
    const endDate = experience.endDate ? new Date(experience.endDate) : undefined;
    const relationship = experience.relationship || undefined;
    const company = experience.company || undefined;
    const location = experience.location || undefined;
    const country = experience.country || undefined;
    const jobTitle = experience.jobTitle || undefined;
    const description = experience.description || undefined;

    return <>
      { startDate && endDate ?
        <div className="date-range left">
          <div className="date">{formatDate(startDate)}</div>
          <Separator type="dash" />
          <div className="date">{formatDate(endDate)}</div>
        </div> :
        endDate ?
        <div className="date left">{formatDate(endDate)}</div> :
        <></>
      }
      <div className="content right">
        { jobTitle ?
          <div id="professional-experience-programme">{jobTitle}</div> :
          <></>
        }
        { company ?
          <span id="professional-experience-institute">{company}</span> :
          <></>
        }
        { location ?
          <>
            {company ? <Separator type="dash" /> : <></> }
            <span id="professional-experience-location">{location}</span>
          </> :
          <></>
        }
        { country ? 
          <>
            { company || location ? <Separator type="dash" /> : <></> }
            <span id="professional-experience-country">{country}</span>
          </> :
          <></>
        }
        { description ?
          <div id="professional-experience-description">
            <span>{description}</span>
          </div> :
          <></>
        }
        { relationship ?
          <div id="professional-experience-relationship">
            <span>{relationship}</span>
          </div> :
          <></>
        }
      </div>
    </>;
  }

    if (professionalExperiences.length > 0) {
      return <div className="section">
        <SectionTitle title={dictionary.getTerm(lang, "professionalExperiences")} />
        <div className="container">
        { professionalExperiences
            .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
            .map((e, i) => 
              <ProfessionalExperience
                key={`professional-experience-${i}`}
                experience={e}
                />
            )
        }
      </div>
    </div>;
    } else {
      return <></>;
    }
}

const LanguageSkills = ({languageSkills}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const first = languageSkills.firstLanguage;
  const other = languageSkills.otherLanguages.map(l => {
    let lang = {};
    lang.language = l.language || undefined;
    lang.listening = l.listening || "-";
    lang.reading = l.reading || "-";
    lang.oralInteraction = l.oralInteraction || "-";
    lang.oralProduction = l.oralProduction || "-";
    lang.writing = l.writing || "-";
    return lang;
  });
  const certifications = languageSkills.certifications.map(c => {
    let cert = {};
    cert.language = c.language || undefined;
    cert.year = parseInt(c.year) || undefined;
    cert.certificate = c.certificate || undefined;
    cert.grade = c.grade || undefined;
    return cert;
  });

  function OtherLanguagesTable({otherLangs}) {
    if (otherLangs.length === 0) {
      return <></>;
    }

    return <>
      <div className="subtitle left">{dictionary.getTerm(lang, "otherLanguages")}</div>
      <div className="content right" style={{paddingBottom: "0px"}}>
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
      <table className="left" style={{paddingTop: "0px"}}>
        <thead><tr><th></th></tr><tr><th></th></tr></thead>
        <tbody>
        { otherLangs.map((l, i) => <tr key={`other-language-${i}`}><td>{l.language}</td></tr>) }
        </tbody>
      </table>
      <div className="content right" style={{paddingTop: "0px"}}>
        <table>
        <thead style={{visibility: "collapse"}}>
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
              otherLangs.map((l, i) => {
                return <tr key={`other-language-skill-${i}`}>
                  <td>{l.listening}</td>
                  <td>{l.reading}</td>
                  <td>{l.oralInteraction}</td>
                  <td>{l.oralProduction}</td>
                  <td>{l.writing}</td>
                </tr>
              })
            }
          </tbody>
        </table>
        <div className="note">{dictionary.getTerm(lang, "languageLevelsDescriptor")}</div>
        <div className="note"><a href="https://europass.cedefop.europa.eu/resources/european-language-levels-cefr">{dictionary.getTerm(lang, "referenceLanguage")}</a></div>
      </div>
    </>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "languageSkills")} />
    <div className="container">
      { first ? <><div className="subtitle left">{dictionary.getTerm(lang, "firstLanguage")}</div><div className="content right" id="first-language">{first}</div></> : <></> }
      <OtherLanguagesTable otherLangs={other} />
      { certifications && certifications.length > 0 ?
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "certifications")}</div><div className="content right"></div>
              { 
                certifications
                  .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
                  .map((c, i) => {
                    return <div className="container" key={`certification-${i}`}>
                      { c.year ? <div className="date left" id="certification-year">{c.year}</div> : <></> }
                      <div className="content right">
                        { c.certificate ? <span id="certification-certificate">{c.certificate}</span> : <span id="certification-language">{c.language}</span> }
                        { c.grade ? <><Separator type="colon" /><span id="certification-grade">{c.grade}</span></> : <></> }
                      </div>
                    </div>
                  })
              }
          </> :
          <></>
      }
  </div>
  </div>;
}

const ComputerSkills = ({computerSkills}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const operatingSystems = computerSkills.operatingSystems || undefined;
  if (operatingSystems) {
    operatingSystems.level = operatingSystems.level || undefined;
    operatingSystems.description = operatingSystems.description || undefined;
  }
  const programmingLanguages = computerSkills.programmingLanguages || undefined;
  if (programmingLanguages) {
    programmingLanguages.level = programmingLanguages.level || undefined;
    programmingLanguages.description = programmingLanguages.description || undefined;
  }
  const software = computerSkills.software || undefined;
  if (software) {
    software.level = software.level || undefined;
    software.description = software.description || undefined;
  }
  const database = computerSkills.database || undefined;
  if (database) {
    database.level = database.level || undefined;
    database.description = database.description || undefined;
  }
  const cad = computerSkills.cad || undefined;
  if (cad) {
    cad.level = cad.level || undefined;
    cad.description = cad.description || undefined;
  }
  const graphics = computerSkills.graphics || undefined;
  if (graphics) {
    graphics.level = graphics.level || undefined;
    graphics.description = graphics.description || undefined;
  }
  const spreadsheet = computerSkills.spreadsheet || undefined;
  if (spreadsheet) {
    spreadsheet.level = spreadsheet.level || undefined;
    spreadsheet.description = spreadsheet.description || undefined;
  }
  const other = computerSkills.other || undefined;

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "computerSkills")} />
    <div className="container">
      { 
        operatingSystems ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "operatingSystem")}</div>
            <div className="content right">
              <div id="operating-system-skills-description">{operatingSystems.description}</div>
              <div id="operating-system-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{operatingSystems.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        programmingLanguages ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "programmingLanguage")}</div>
            <div className="content right">
              <div id="programming-language-skills-description">{programmingLanguages.description}</div>
              <div id="programming-language-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{programmingLanguages.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        software ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "software")}</div>
            <div className="content right">
              <div id="software-skills-description">{software.description}</div>
              <div id="software-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{software.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        database ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "database")}</div>
            <div className="content right">
              <div id="database-skills-description">{database.description}</div>
              <div id="database-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{database.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        cad ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "cad")}</div>
            <div className="content right">
              <div id="cad-skills-description">{cad.description}</div>
              <div id="cad-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{cad.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        graphics ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "graphics")}</div>
            <div className="content right">
              <div id="graphics-skills-description">{graphics.description}</div>
              <div id="graphics-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{graphics.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        spreadsheet ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "spreadsheet")}</div>
            <div className="content right">
              <div id="spreadsheet-skills-description">{spreadsheet.description}</div>
              <div id="spreadsheet-skills-level">
                <span>{dictionary.getTerm(lang, "level")}</span>
                <Separator type="colon" />
                <span>{spreadsheet.level}</span>
              </div>
            </div>
          </> : 
          <></>
      }
      { 
        other ? 
          <>
            <div className="subtitle left">{dictionary.getTerm(lang, "other")}</div>
            <div className="content right" id="other-skills-description">{other}</div>
          </> : 
          <></>
      }
    </div>
  </div>;
}

const PersonalSkills = ({personalSkills}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <>
    {
      personalSkills ? 
        <div className="section">
          <SectionTitle title={dictionary.getTerm(lang, "personalSkills")} />
          <div className="container">
            <div className="left"></div>
            <div className="content right" id="personal-skills">{personalSkills}</div>
          </div>
        </div> :
        <></>
    }
  </>
}

const OtherInfo = ({otherInfo}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  const drivingLicense = otherInfo.drivingLicense || false;
  const useOwnVehicle = otherInfo.useOwnVehicle || false;
  const businessTravelItaly = otherInfo.businessTravelItaly || false;
  const relocateItaly = otherInfo.relocateItaly || false;
  const businessTravelAbroad = otherInfo.businessTravelAbroad || false;
  const relocateAbroad = otherInfo.relocateAbroad || false;
  const professionalLicenses = otherInfo.professionalLicenses ?
    otherInfo.professionalLicenses.map(l => {
      const license = {};
      license.year = l.year || undefined;
      license.description = l.description || undefined;
      return license;
    }) : [];
  // const attachedFiles = otherInfo.attachedFiles || undefined;

  return <>
    {
      drivingLicense || useOwnVehicle || businessTravelItaly || relocateItaly || businessTravelAbroad || relocateAbroad || professionalLicenses ?
        <div className="section">
          <SectionTitle title={dictionary.getTerm(lang, "otherInfo")} />
          <div className="container">
            { drivingLicense ? <><div className="left"></div><div className="content right" id="driving-license">{dictionary.getTerm(lang, "drivingLicense")}</div></> : <></> }
            { useOwnVehicle ? <><div className="left"></div><div className="content right" id="use-own-vehicle">{dictionary.getTerm(lang, "useOwnVehicle")}</div></> : <></> }
            { businessTravelItaly ? <><div className="left"></div><div className="content right" id="business-travel-italy">{dictionary.getTerm(lang, "businessTravelItaly")}</div></> : <></> }
            { relocateItaly ? <><div className="left"></div><div className="content right" id="relocate-italy">{dictionary.getTerm(lang, "relocateItaly")}</div></> : <></> }
            { businessTravelAbroad ? <><div className="left"></div><div className="content right" id="business-travel-abroad">{dictionary.getTerm(lang, "businessTravelAbroad")}</div></> : <></> }
            { relocateAbroad ? <><div className="left"></div><div className="content right" id="relocate-abroad">{dictionary.getTerm(lang, "relocateAbroad")}</div></> : <></> }
            { professionalLicenses.map((l, i) => 
                <div key={`professional-license-${i}`}>
                  <div className="left">{l.year}</div>
                  <div classNeme="content right">{l.description}</div>
                </div>
              )
            }
          </div>
        </div> : 
        <></>
    }
  </>;
}

const Publications = ({publications}) => {
  return <div className="section"></div>;
}

const Conferences = ({conferences}) => {
  return <div className="section"></div>;
}

const PrivacyPolicy = () => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <footer className="footer note">
    {dictionary.getTerm(lang, "privacyPolicy")}
  </footer>
}

export {CViewer};