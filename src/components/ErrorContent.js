import { capitalize } from "../utils";
import { useContext } from "react";
import DictionaryContext from "../context/DictionaryContext";
import LanguageContext from "../context/LanguageContext";
import { Separator } from "./Separator";

const ErrorContent = ({obj}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <>
    { dictionary.getTerm(lang, "error") }
    <Separator type="colon" />
    { capitalize(dictionary.getTerm(lang, "invalidValue")) }
    <br />
    { displayObjectValue(obj, 1) }
  </>;
}

function displayObjectValue(obj, level=0) {
  if (obj === undefined) return <>undefined</>;
  if (obj === null) return <>null</>;

  if (Object.keys(obj).every(k => Number.isInteger(parseInt(k))))
    return displayArrayValue(obj, level);

  return <>
    &#123; {/* { */} <br />
      {
        Object.entries(obj).map(([k, v], i) => 
        <span key={i}>
          { Array.from(Array(level + 2)).map((_, i) => <Separator key={i} />) }
          <b>{k}</b>
          <Separator type="colon" />
          {
            typeof v === 'string' ?
              displayStringValue(v) : 
            typeof v === 'object' ?
              displayObjectValue(v, level + 2) :
              v?.toString() || "undefined"
          }
          <Separator type="comma" />
          <br />
        </span>
      )
      }
    { Array.from(Array(level)).map((_, i) => <Separator key={i} />) }
    &#125; {/* } */}
  </>;
}

function displayArrayValue(arr, level) {
  if (arr === undefined) return <>undefined</>;
  if (arr === null) return <>null</>;

  return <>
    &#91; {/* [ */} <br />
      {
        arr.map((v, i) => 
        <span key={i}>
          { Array.from(Array(level + 2)).map((_, i) => <Separator key={i} />) }
          {
            typeof v === 'string' ?
              displayStringValue(v) : 
            typeof v === 'object' ?
              displayObjectValue(v, level + 2) :
              v?.toString() || "undefined"
          }
          <Separator type="comma" />
          <br />
        </span>
      )
      }
    { Array.from(Array(level)).map((_, i) => <Separator key={i} />) }
    &#93; {/* ] */}
  </>;
}

function displayStringValue(str) {
  if (str === undefined) return <>undefined</>;
  if (str === null) return <>null</>;

  return <>
    "{str}"
  </>;
}

export { ErrorContent };