import React, { useContext } from "react";

import { Separator } from "./Separator";

import { formatDate, isYear } from "../utils";
import DictionaryContext from "../context/DictionaryContext";
import LanguageContext from "../context/LanguageContext";

const DateRange = ({start, end}) => {
    const dictionary = useContext(DictionaryContext);
    const lang = useContext(LanguageContext);

    const startDate = isYear(start) ? parseInt(start) : new Date(start);
    const endDate = isYear(end) ? parseInt(end) : new Date(end);

    if (start && end) {
        return <div className="date-range">
            <div className="date">
              {formatDate(startDate)}
            </div>
            <Separator type="dash" />
            <div className="date">
              {formatDate(endDate)}
            </div>
          </div>
    }
    if (!start) {
        return <div className="date">
            {formatDate(endDate)}
          </div>
    }
    if (!end) {
      return <div className="date-range">
          <div className="date">
            {formatDate(startDate)}
          </div>
          <Separator type="dash" />
          <div className="date">
            {dictionary.getTerm(lang, "ongoing")}
          </div>
        </div>
    }

    return <></>;
}

export { DateRange };