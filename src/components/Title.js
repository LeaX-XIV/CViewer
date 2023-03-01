import React from "react";

const DocumentTitle = ({title}) => {
	return <div className="document-title">
		<div className="title">{title}</div>
		<div className="hr"/>
	</div>;
}

const SectionTitle = ({title}) => {
	return <div className="section-title">
		<div className="title">{title}</div>
		<div className="hr"/>
	</div>;
}

export { DocumentTitle, SectionTitle };