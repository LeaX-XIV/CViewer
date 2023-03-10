import { useContext, useState } from "react";
import DictionaryContext from "./context/DictionaryContext";
import LanguageContext from "./context/LanguageContext";

const Home = ({setLang, getCv, setCv, doSubmit, isSubmitDisabled}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext)
  
  let [filename, setFilename] = useState(null);
  
  function readCvFile(triggerEv) {
    triggerEv.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsText(triggerEv.target.files[0], 'UTF-8');
    fileReader.onload = readEv => {
      // Preserve old value in case of error
      let cvObj = getCv();
      try {
        cvObj = JSON.parse(readEv.target.result);
      } catch(ex) {
        console.error(ex.message);
      }
      setCv(cvObj);
      setFilename(triggerEv.target.files[0].name);
    }
  }

  return <div className="center">
    <label className="custom-input button">
      <input 
        type={"file"} 
        accept={"application/json"}
        onChange={readCvFile}
      />
      {filename ? filename : dictionary.getTerm(lang, "uploadCV")}
    </label>
    <select 
      className="custom-input button"
      onChange={e => setLang(e.target.value)}
      defaultValue="en-EN"
      >
      {
        dictionary.getLangs().map((l, i) => 
          <option
            className="custom-input"
            value={l}
            key={`language-option-${i}`}
            >
          { dictionary.getTerm(l, "languageString") }
          </option>
        )
      }
    </select>
    <input
      className="button"
      type="submit"
      onClick={doSubmit}
      disabled={isSubmitDisabled}
      // style={{opacity: isSubmitDisabled ? "0%" : "100%"}}
      value={dictionary.getTerm(lang, "submit")}
      />
  </div>;
}

export {Home};