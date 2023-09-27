import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useContext, useState } from "react";
import { i18nContext } from "../common/context";

const SearchBox = ({ searchInput, setSearchInput }) => {
	const { i18n } = useContext(i18nContext);

	const [showSearchBox, setShowSearchBox] = useState(false);

	return (
		<div
			className={classNames("slots-category-search", {
				active: showSearchBox
			})}>
			<button
				type="button"
				className="icon-search-org"
				onClick={() => setShowSearchBox(!showSearchBox)}
			/>
			<div className="inputbox-group">
				<div className="inputbox-item">
					<input
						value={searchInput}
						placeholder={i18n.lbl_SearchGames}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

SearchBox.propTypes = {
	searchInput: PropTypes.string.isRequired,
	setSearchInput: PropTypes.func.isRequired
};

export default SearchBox;
