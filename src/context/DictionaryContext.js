import { createContext } from "react";

const terms = {
	"en-EN": {
		languageString: "English",

		education: "Education",
		training: "Training",
		internationalExperiences: "International Experiences",
		professionalExperiences: "Professional experiences",
		languageSkills: "Language Skills",
		computerSkills: "Computer Skills",
		personalSkills: "Other Skills",
		otherInfo: "Other Information",
		publications: "Publications",
		conferences: "Conferences",

		gender: "Gender",
		nationality: "Nationality",
		ongoing: "ongoing",
		grade: "Grade",
		thesis: "Thesis",
		abstract: "Abstract",
		supervisor: "Supervisor",
		supervisors: "Supervisors",
		certificationObtained: "Certification obtained",
		firstLanguage: "First language",
		otherLanguages: "Other languages",
		understanding: "Understanding",
		speaking: "Speaking",
		writing: "Writing",
		listening: "Listening",
		reading: "Reading",
		spokenInteraction: "Spoken interaction",
		spokenProduction: "Spoken production",
		languageLevelsDescriptor: "Levels: A1/2: Basic user - B1/2: Intermediate user - C1/2: Proficient user",
		referenceLanguage: "Common European Framework of Reference for Languages",
		certifications: "Certifications",
		operatingSystems: "Operating systems",
		programmingLanguages: "Programming languages/code",
		software: "Programs/software",
		database: "Databases",
		cad: "CAD",
		graphics: "Graphics",
		spreadsheet: "Spreadsheet",
		other: "Other",
		level: "Level",
		drivingLicense: "Driving license",
		useOwnVehicle: "Availability to use own vehicle",
		businessTravelItaly: "Availability to travel on business (in Italy)",
		relocateItaly: "Availability to relocate (in Italy)",
		businessTravelAbroad: "Availability to travel on business (abroad)",
		relocateAbroad: "Availability to relocate (abroad)",
		in: "In",
		"pag.": "pag.",
		issn: "ISSN",
		isbn: "ISBN",
		privacyPolicy: "I declare that I read the privacy statement on the processing of my personal data and my rights within the meaning of the General Data Protection Regulation (EU Regulation 2016/679) and Legislative decree no.196 of 30th June 2003 (Code regarding the protection of personal data). I hereby give my consent to the processing of my personal data included in my CV."
	},
	"it-IT": {
		// cSpell: disable
		languageString: "Italiano",

		education: "Istruzione",
		training: "Formazione",
		internationalExperiences: "Esperienze Internazionali",
		professionalExperiences: "Esperienze Professionali",
		languageSkills: "Lingue",
		computerSkills: "Conoscenze Informatiche",
		personalSkills: "Altre Competenze",
		otherInfo: "Informazioni Supplementari",
		publications: "Pubblicazioni",
		conferences: "Conferenze",

		gender: "Sesso",
		nationality: "Nazionalità",
		ongoing: "in corso",
		grade: "Voto",
		thesis: "Tesi",
		abstract: "Abstract",
		supervisor: "Relatore",
		supervisors: "Relatori",
		certificationObtained: "Certificazione ottenuta",
		firstLanguage: "Prima lingua",
		otherLanguages: "Alte lingue",
		understanding: "Comprensione",
		speaking: "Espressione",
		writing: "Scrittura",
		listening: "Ascolto",
		reading: "Lettura",
		spokenInteraction: "Interazione orale",
		spokenProduction: "Produzione orale",
		languageLevelsDescriptor: "Livelli: A1/A2: Utente base - B1/B2: Utente intermedio - C1/C2: Utente avanzato",
		referenceLanguage: "Quadro Comune Europeo di Riferimento delle Lingue",
		certifications: "Certificazioni",
		operatingSystems: "Sistemi operativi",
		programmingLanguages: "Linguaggi di programmazione",
		software: "Programmi/applicazioni",
		database: "Basi di dati",
		cad: "CAD",
		graphics: "Grafica",
		spreadsheet: "Fogli di calcolo",
		other: "Altro",
		level: "Livello",
		drivingLicense: "Patente di guida",
		useOwnVehicle: "Disponibilità di utilizzo di mezzo proprio",
		businessTravelItaly: "Disponibilità a effettuare trasferte (in Italia)",
		relocateItaly: "Disponibilità a trasferimenti (in Italia)",
		businessTravelAbroad: "Disponibilità a effettuare trasferte (all''estero)",
		relocateAbroad: "Disponibilità a trasferimenti (all''estero)",
		in: "In",
		"pag.": "pag.",
		issn: "ISSN",
		isbn: "ISBN",
		privacyPolicy: "Ho preso visione dell'informativa completa riguardante la modalità di trattamento dei dati da me forniti e i diritti a me spettanti ai sensi del GDPR (Regolamento UE 2016/679) e del Decreto Legislativo 30 giugno 2003, n. 196 “Codice in materia di protezione dei dati personali” e autorizzo il trattamento dei miei dati personali presenti nel CV."
	}
	// cSpell: enable
};

const DictionaryContext = createContext({
	getTerm: (lang, term) => terms[lang][term],
	getLangs: () => Object.keys(terms)
});

export default DictionaryContext;