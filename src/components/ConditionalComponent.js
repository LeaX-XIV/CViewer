import React from "react";

const ConditionalComponent = ({show, children}) => {
	if (!!show === true) {
		return <>
			{children}
		</>;
	}

	return <></>;
}

export { ConditionalComponent };