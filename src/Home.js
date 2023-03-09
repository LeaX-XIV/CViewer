import { useContext } from "react";
import DictionaryContext from "./context/DictionaryContext";

const Home = ({setLang, getCv, setCv, doSubmit, isSubmitDisabled}) => {
  const context = useContext(DictionaryContext);
  
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
    }
  }

  return <>
    <input 
      type={"file"} 
      accept={"application/json"}
      onChange={readCvFile}
      />
    <select onChange={e => setLang(e.target.value)} defaultValue="en-EN">
    {
      context.getLangs().map((l, i) => 
        <option 
          value={l}
          key={`language-option-${i}`}
          >
        { context.getTerm(l, "languageString") }
        </option>
      )
    }
    </select>
    <input
      className="button"
      type="submit"
      onClick={doSubmit}
      disabled={isSubmitDisabled}
      />
  </>;
}

export {Home};