import { useContext } from "react";
import { Separator } from "./Separator";
import { DocumentTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { ConditionalComponent } from "./ConditionalComponent";

const PersonalInfo = ({ personalInfo }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <div className="section">
    <Title
      firstName={personalInfo?.firstName}
      middleNames={personalInfo?.middleNames}
      lastName={personalInfo?.lastName}
      />
    <div className="container">
      <Photo photoSrc={personalInfo?.photo} />
      <div className="content right">
        <ConditionalComponent show={personalInfo?.gender}>
          <div id="gender">
            <span>{dictionary.getTerm(lang, "gender")}</span><Separator type="colon" /><span>{personalInfo?.gender}</span>
          </div>
        </ConditionalComponent>
        <ConditionalComponent show={personalInfo?.nationality}>
          <div id="nationality">
            <span>{dictionary.getTerm(lang, "nationality")}</span><Separator type="colon" /><span>{personalInfo?.nationality}</span>
          </div>
        </ConditionalComponent>
        <div id="birth">
          <ConditionalComponent show={personalInfo?.dateOfBirth}>
            <span id="date-of-birth">
              {new Date(personalInfo?.dateOfBirth)?.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </span>
            <ConditionalComponent show={personalInfo?.placeOfBirth}>
              <Separator type="tab" />
            </ConditionalComponent>
          </ConditionalComponent>
          <ConditionalComponent show={personalInfo?.placeOfBirth}>
            <span id="place-of-birth">{personalInfo?.placeOfBirth}</span>
          </ConditionalComponent>
        </div>
        <div id="contact-info">
          <Address
            address={personalInfo?.address?.address}
            door={personalInfo?.address?.door}
            zipCode={personalInfo?.address?.zipCode}
            city={personalInfo?.address?.city}
            province={personalInfo?.address?.province}
            country={personalInfo?.address?.country}
            />
          <ConditionalComponent show={personalInfo?.telephoneNumber}>
            <div className="icon-group" id="telephone-number">
              <img className="icon filter-blueviolet" src="./icons/phone.svg" alt="phone icon" />
              <a href={`tel:${personalInfo?.telephoneNumber}`}>{personalInfo?.telephoneNumber}</a>
            </div>
          </ConditionalComponent>
          <ConditionalComponent show={personalInfo?.mobileNumber}>
            <div className="icon-group" id="mobile-number">
              <img className="icon filter-blueviolet" src="./icons/mobilephone.svg" alt="mobile phone icon" />
              <a href={`tel:${personalInfo?.mobileNumber}`}>{personalInfo?.mobileNumber}</a>
            </div>
          </ConditionalComponent>
        </div>
        <ConditionalComponent show={personalInfo?.emails && personalInfo?.emails.length > 0}>
          <div className="icon-group" id="emails">
            <img className="icon filter-blueviolet" src="./icons/mail.svg" alt="email icon" />
            <div>
              {personalInfo?.emails.map((e, i) => <div id={`email-${i}`} key={`email-${i}`}><a href={`mailto:${e}`}>{e}</a></div>)}
            </div>
          </div>
        </ConditionalComponent>
        <ConditionalComponent show={personalInfo?.website}>
          <div className="icon-group" id="website">
            <img className="icon filter-blueviolet" src="./icons/website.svg" alt="website icon" />
            <a href={`${personalInfo?.website}`} target="_blank" rel="noreferrer">{personalInfo?.website}</a>
          </div>
        </ConditionalComponent>
        <ConditionalComponent show={personalInfo?.linkedin}>
          <div className="icon-group" id="linkedin">
            <img className="icon filter-blueviolet" src="./icons/linkedin.svg" alt="linkedin icon" />
            <a href={`https://linkedin.com/in/${personalInfo?.linkedin}`} target="_blank" rel="noreferrer">{personalInfo?.linkedin}</a>
          </div>
        </ConditionalComponent>
      </div>
    </div>
  </div>;
}

const Title = ({firstName, middleNames, lastName}) => {
  let title = `${firstName || ""} \
               ${middleNames || ""} \
               ${lastName?.toUpperCase()}`;

  if (!lastName) {
    title = "Curriculum Vitae";
  }

  return <DocumentTitle title={title} />;
}

const Photo = ({photoSrc}) => {
  if (!photoSrc) {
    return <div className="left"></div>;
  }

  return <img 
           className="left photo"
           id="photo"
           src={photoSrc}
           alt="mugshot"
           />
}

const Address = ({address, door, zipCode, city, province, country}) => {
  if (!zipCode &&
      !city &&
      !province &&
      !country
    ) {
    return <></>;
  }

  return <div className="icon-group" id="address">
    <img className="icon filter-blueviolet" src="./icons/address.svg" alt="address icon" />
    <ConditionalComponent show={address}>
      <span>{address}</span>
      <ConditionalComponent show={door}>
        <Separator type="comma" />
        <span>{door}</span>
      </ConditionalComponent>
    </ConditionalComponent>
    <ConditionalComponent show={zipCode || city || province || country}>
      <Separator type="tab" />
      <ConditionalComponent show={zipCode}>
        <span id="zipCode">{zipCode}</span>
        <ConditionalComponent show={city || province || country}>
          <Separator type="comma" />
        </ConditionalComponent>
        <ConditionalComponent show={city}>
          <span id="city">{city}</span>
          <ConditionalComponent show={province || country}>
            <Separator />
          </ConditionalComponent>
        </ConditionalComponent>
        <ConditionalComponent show={province}>
          <span id="province">{city ? `(${province})` : province}</span>
          <ConditionalComponent show={country}>
            <Separator />
          </ConditionalComponent>
        </ConditionalComponent>
        <ConditionalComponent show={country}>
          <span id="country">{country}</span>
        </ConditionalComponent>
      </ConditionalComponent>
    </ConditionalComponent>
  </div>;
}

export { PersonalInfo };