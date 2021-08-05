import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import GameTypes from "./defGameType";
import Dropdown from "../common/dropdown";

const SearchBox = props => {
	const { i18n } = useContext(i18nContext);
	const [openAdvance, setOpenAdvance] = useState(false);
	const { searchText, gameType } = props;

	const gameTypeList = [
		{ id: null, displayText: i18n.lbl_AllGameType },
		...Object.keys(GameTypes).map(k => {
			return {
				id: GameTypes[k].category1,
				displayText: i18n[GameTypes[k].displayKey]
			};
		})
	];

	const HandleOpenAdvance = () => {
		setOpenAdvance(prevState => !prevState);
	};

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
			<div className="inputBox">
				<i className="icon icon-search" />
				<input
					className="search"
					placeholder={i18n.lbl_SearchGames}
					value={searchText}
					onChange={EditField.bind(this, "searchText")}
				/>
				<button
					className="icon icon-equalizer filter"
					onClick={HandleOpenAdvance}
				/>
			</div>
			<div className={`filterSelect${openAdvance ? " open" : ""}`}>
				<div className="inputBox">
					<Dropdown
						i18n={i18n}
						mainKey="casino-gamePlatform"
						options={gameTypeList}
						selectedIdx={gameType?.idx}
						onSelectItem={SelectGameType}
						placeholder="Game Type"
					/>
				</div>
			</div>
		</>
	);
};

SearchBox.defaultProps = {
	searchText: ""
};

SearchBox.propTypes = {
	EditSearchField: PropTypes.func.isRequired,
	searchText: PropTypes.string,
	gameType: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SearchBox;
