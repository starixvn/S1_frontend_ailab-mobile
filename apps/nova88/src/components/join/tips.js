import React from "react";
import PropTypes from "prop-types";

const Tips = props => (
	<>
		<i className={`icon ${props.Icon}`} />
		<div className={`${props.ClassName} ${props.IsOpen ? "open" : ""}`}>
			{props.children}
		</div>
	</>
);

Tips.defaultProps = {
	Icon: "",
	IsOpen: false,
	ClassName: "",
	children: null
};

Tips.propTypes = {
	Icon: PropTypes.string,
	ClassName: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	IsOpen: PropTypes.bool
};

export default Tips;
