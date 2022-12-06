import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";

const SearchBox = props => {
	const { searchInput, setSearchInput } = props;
	const { i18n } = useContext(i18nContext);

	return (
		<div className="inputBox">
			<i className="icon icon-search" />
			<input
				data-testid="searchBox"
				placeholder={i18n.lbl_SearchGames}
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
			/>
		</div>
	);
};

SearchBox.propTypes = {
	searchInput: PropTypes.string.isRequired,
	setSearchInput: PropTypes.func.isRequired
};

export default SearchBox;
