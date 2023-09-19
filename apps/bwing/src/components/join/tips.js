import React from "react";

export default props => (
	<>
		<i className={`icon ${props.Icon}`} />
		<div className={`${props.ClassName} ${props.IsOpen ? "open" : ""}`}>
			{props.children}
		</div>
	</>
);
