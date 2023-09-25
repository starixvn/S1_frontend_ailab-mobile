import React, { useContext } from "react";
import { i18nContext } from "Context";
import PropTypes from "prop-types";

const Nav = props => {
	const { memberType, categoryList, selNav, onChange } = props;
	const { i18n } = useContext(i18nContext);
	return categoryList.map(value => {
		const LiveStreamingMemberType = 3;
		if (memberType === LiveStreamingMemberType && value === "random") {
			return null;
		}

		return (
			<button
				data-testid={`nav_${value}`}
				key={`casino-nav-${value}`}
				className={selNav === value ? "active" : ""}
				onClick={() => onChange(value)}>
				{i18n[`lbl_${value.charAt(0).toUpperCase() + value.slice(1)}`]}
			</button>
		);
	});
};

Nav.defaultProps = {
	categoryList: []
};

Nav.propTypes = {
	categoryList: PropTypes.arrayOf(PropTypes.any),
	selNav: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default Nav;
