import './App.css';
import {CViewer} from './CViewer';

import {useContext, useState} from 'react';
import DictionaryContext from './context/DictionaryContext';
import LanguageContext from './context/LanguageContext';

const App = () => {
  const [cv, setCv] = useState();
  const [lang, setLang] = useState("en-EN");
  const [submit, setSubmit] = useState(false);

  function reset() {
    setCv(null);
    setSubmit(null);
  }

  function readCvFile(triggerEv) {
    triggerEv.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsText(triggerEv.target.files[0], 'UTF-8');
    fileReader.onload = readEv => {
      // Preserve old value in case of error
      let cvObj = cv;
      try {
        cvObj = JSON.parse(readEv.target.result);
      } catch(ex) {
        console.error(ex.message);
      }
      setCv(cvObj);
    }
  }

  const context = useContext(DictionaryContext);

  return submit && cv ?
    <LanguageContext.Provider value={lang}>
      <CViewer cv={cv} reset={reset} />
    </LanguageContext.Provider> :
    <div>
      <input type={"file"} 
        accept={"application/json"}
        onChange={readCvFile}/>
      <select onChange={e => setLang(e.target.value)} defaultValue="en">
        {
          context.getLangs().map((l, i) => 
            <option 
              value={l}
              key={`language-option-${i}`}
            >
                {context.getTerm(l, "languageString")}
            </option>
          )
        }
      </select>
      <input
        type="submit"
        onClick={() => cv ? setSubmit(true) : false }
        disabled={!cv}
        />
    </div>
}

export default App;
