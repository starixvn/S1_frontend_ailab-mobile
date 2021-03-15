import React from "react";
import PropTypes from "prop-types";

export const defIptStatus = {
	default: "",
	warning: false,
	verified: true
};

const IptStatus = ({ btnStatus }) => {
	switch (btnStatus) {
		case defIptStatus.verified:
			return <span className="icon icon-checkmark" />;
		case defIptStatus.warning:
			return <span className="icon icon-errormark" />;
		default:
			return null;
	}
};

IptStatus.propTypes = {
	btnStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

IptStatus.defaultProps = {
	btnStatus: defIptStatus.default
};

export default IptStatus