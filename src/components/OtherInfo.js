import { useContext } from "react";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { DateRange } from "./DateRange";

const OtherInfo = ({ otherInfo }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!otherInfo?.drivingLicense &&
      !otherInfo?.useOwnVehicle &&
      !otherInfo?.businessTravelItaly &&
      !otherInfo?.relocateItaly &&
      !otherInfo?.businessTravelAbroad &&
      !otherInfo?.relocateAbroad &&
      !otherInfo?.professionalLicenses &&
       otherInfo?.professionalLicenses?.length <= 0 &&
      !otherInfo?.attachedFiles &&
       otherInfo?.attachedFiles?.length <= 0
      ) {
    return <></>;
  }

  return <div className="section">
    <SectionTitle title={dictionary.getTerm(lang, "otherInfo")} />
    <div className="container">
      <Option name="drivingLicense" isOk={otherInfo.drivingLicense} />
      <Option name="useOwnVehicle" isOk={otherInfo.useOwnVehicle} />
      <Option name="businessTravelItaly" isOk={otherInfo.businessTravelItaly} />
      <Option name="relocateItaly" isOk={otherInfo.relocateItaly} />
      <Option name="businessTravelAbroad" isOk={otherInfo.businessTravelAbroad} />
      <Option name="relocateAbroad" isOk={otherInfo.relocateAbroad} />
      {
        (otherInfo.professionalLicenses || [])
          .map((l, i) => 
          <ProfessionalLicense
            key={`professional-license-${i}`}
            date={l.date}
            description={l.description}
            />
      )}
      {
        // TODO: display attached files in some way
        (otherInfo.attachedFiles || [])
          .map((f, i) =>
            <></>
          )
      }
    </div>
  </div>;
}

const Option = ({name, isOk}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!isOk || !name) {
    return <></>;
  }

  return <>
    <div className="left" />
    <div className="content right" id={name}>
      {dictionary.getTerm(lang, name)}
    </div>
  </>;
}

const ProfessionalLicense = ({date, description}) => {
  if (!description) {
    return <></>;
  }

  return <div>
    <div className="left"><DateRange end={date} /></div>
    <div className="content right">{description}</div>
  </div>;
}

export { OtherInfo };