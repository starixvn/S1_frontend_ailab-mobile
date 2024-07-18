import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import { moveItem } from "../../../../../libs/common/src/lib/utils/tools";

const Nav = props => {
	const { categoryList, selNav, onChange } = props;
	const { i18n } = useContext(i18nContext);
	// 找出featured的位置
	const featuredIdx = categoryList.findIndex(value => {
		return value === "featured";
	});
	// 將featured排序往前
	const newCategoryList =
		categoryList && moveItem(categoryList, featuredIdx, 1);

	return newCategoryList.map(value => {
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
