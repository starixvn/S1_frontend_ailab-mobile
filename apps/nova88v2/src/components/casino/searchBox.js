import React, { useContext, useEffect } from "react";
import { i18nContext } from "Context";
import PropTypes from "prop-types";
import GameTypes from "./defGameType";
import Dropdown from "../common/casino.dropdown";

const SearchBox = props => {
	const { searchText, gameType } = props;
	const { i18n } = useContext(i18nContext);

	const gameTypeList = [
		{ id: null, displayText: i18n.lbl_AllGameType },
		...Object.keys(GameTypes).map(k => {
			return {
				id: GameTypes[k].category1,
				displayText: i18n[GameTypes[k].displayKey]
			};
		})
	];
	const EditField = (column, e) => {
		props.EditSearchField(column, e.target.value);
	};

	const SelectGameType = idx => {
		props.EditSearchField("gameType", {
			idx,
			value: gameTypeList[idx].id
		});
	};

	return (
		<>
			<div className="infoModule parts">
				<div className="inputBox">
					<i className="icon icon-search" />
					<input
						placeholder={i18n.lbl_SearchGames}
						value={searchText}
						onChange={EditField.bind(this, "searchText")}
					/>
				</div>
			</div>
			<div className="infoModule parts">
				<Dropdown
					i18n={i18n}
					mainKey="casino-gamePlatform"
					options={gameTypeList}
					selectedIdx={gameType?.idx}
					onSelectItem={SelectGameType}
					placeholder="Game Type"
					hideInfo={true}
				/>
			</div>
		</>
	);
};

SearchBox.defaultProps = {
	gameType: {}
};

SearchBox.propTypes = {
	EditSearchField: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	gameType: PropTypes.objectOf(PropTypes.any)
};

export default SearchBox;
