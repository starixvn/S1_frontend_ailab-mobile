import classNames from "classnames";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";

const Nav = props => {
	const { categoryList, selNav, onChange } = props;
	const { i18n } = useContext(i18nContext);

	return categoryList.map(value => {
		return (
			<button
				key={`casino-nav-${value}`}
				className={classNames("slots-category-item", {
					active: selNav === value
				})}
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
