import './App.css';
import {CViewer} from './CViewer';

import {useContext, useState} from 'react';
import DictionaryContext from './context/DictionaryContext';
import LanguageContext from './context/LanguageContext';

const App = () => {
  const [cv, setCv] = useState();
  const [lang, setLang] = useState("en-EN");
  const [submit, setSubmit] = useState(false);

  function readCvFile(e) {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      try {
        const cvObj = JSON.parse(e.target.result);
        setCv(cvObj);
      } catch(e) {
        console.error(e.message);
      }
    }
  }

  const context = useContext(DictionaryContext);

  return submit && cv ?
    <LanguageContext.Provider value={lang}>
      <CViewer cv={cv} />
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
