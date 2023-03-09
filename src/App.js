import './App.css';
import {CViewer} from './CViewer';
import { Home } from './Home';

import {useState} from 'react';
import LanguageContext from './context/LanguageContext';

const App = () => {
  const [cv, setCv] = useState(null);
  const [lang, setLang] = useState("en-EN");
  const [submit, setSubmit] = useState(false);

  function reset() {
    setCv(null);
    setSubmit(null);
  }

  return submit && cv ?
    <LanguageContext.Provider value={lang}>
      <CViewer cv={cv} reset={reset} />
    </LanguageContext.Provider> :
    <Home
      setLang={l => setLang(l)}
      getCv={() => JSON.parse(JSON.stringify(cv))}
      setCv={c => setCv(c)}
      doSubmit={() => setSubmit(true)}
      isSubmitDisabled={!cv}
      />
}

export default App;
