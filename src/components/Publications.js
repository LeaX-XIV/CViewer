import { orderNumbersDesc, extractYear, capitalize } from "../utils";
import { useContext } from "react";
import { Separator } from "./Separator";
import { SectionTitle } from "./Title";
import DictionaryContext from '../context/DictionaryContext';
import LanguageContext from '../context/LanguageContext';
import { DateRange } from "./DateRange";
import { ConditionalComponent } from "./ConditionalComponent";

const Publications = ({ publications }) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  return <ConditionalComponent show={publications.length > 0}>
    <div className="section">
      <SectionTitle title={dictionary.getTerm(lang, "publications")} />
      <div className="container">
        {
          (publications || [])
            .sort((a, b) => orderNumbersDesc(a.endDate, b.endDate))
            .map((p, i) => 
              <Publication
                date={p?.date}
                title={p?.title}
                authors={p?.authors}
                book={p?.book}
                pages={p?.pages}
                issn={p?.issn}
                isbn={p?.isbn}
                key={`publication-${i}`}
                />
            )
        }
      </div>
    </div>
  </ConditionalComponent>;
}

const Publication = ({date, title, authors, book, pages, issn, isbn}) => {
  const dictionary = useContext(DictionaryContext);
  const lang = useContext(LanguageContext);

  if (!date ||
      !title ||
      !authors ||
       authors?.length <= 0 ||
      !book
  ) {
    return <>
      <div className="left"></div>
      <div className="content right error">
        { dictionary.getTerm(lang, "error") }
        <Separator type="colon" />
        { capitalize(dictionary.getTerm(lang, "invalidValue")) }
      </div>
    </>;
  }

  return <>
    <div className="left">
      <DateRange end={date} />
    </div>
    <div className="content right">
      <span id="publication-authors">
        {authors.join(", ")}
      </span>
      <Separator />
      <span id="publication-year">
        ({extractYear(date)})
      </span>
      <Separator />
      <span id="publication-title">
        "{title}"
      </span>
      <Separator type="period" />
      <span id="publication-book">
        {dictionary.getTerm(lang, "in")}
        <Separator />
        {book}
      </span>
      <ConditionalComponent show={pages}>
        <Separator type="comma" />
        <span id="publication-pages">
          {dictionary.getTerm(lang, "pag.")}
          <Separator />
          {pages}
        </span>
      </ConditionalComponent>
      <ConditionalComponent show={issn}>
        <Separator type="comma" />
        <span id="publication-issn">
          {dictionary.getTerm(lang, "issn")}
          <Separator />
          {issn}
        </span>
      </ConditionalComponent>
      <ConditionalComponent show={!issn && isbn}>
        <Separator type="comma" />
        <span id="publication-isbn">
          {dictionary.getTerm(lang, "isbn")}
          <Separator />
          {isbn}
        </span>
      </ConditionalComponent>
    </div>
  </>;
}

export { Publications };