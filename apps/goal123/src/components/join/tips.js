import React from "react";
import PropTypes from "prop-types";

const Tip = props => (
	<>
		<i className={`icon ${props.Icon}`} />
		<div className={`${props.ClassName} ${props.IsOpen ? "open" : ""}`}>
			{props.children}
		</div>
	</>
);

Tip.defaultProps = {
	Icon: "",
	ClassName: "",
	IsOpen: null
};

Tip.propTypes = {
	Icon: PropTypes.string,
	ClassName: PropTypes.string,
	IsOpen: PropTypes.bool,
	children: PropTypes.node.isRequired
};

export default Tip;
