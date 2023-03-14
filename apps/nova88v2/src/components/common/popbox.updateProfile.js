import React from "react";
import PropTypes from "prop-types";

const PopBoxUpdateProfile = ({ title, content, btnBar }) => {
	return (
		<div className="Cancel active">
			<div className="icon icon-icon32px_Profile" />
			<div className="title">{title}</div>
			<div>{content}</div>
			{btnBar}
		</div>
	);
};

PopBoxUpdateProfile.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	btnBar: PropTypes.string.isRequired
};
export default PopBoxUpdateProfile;
