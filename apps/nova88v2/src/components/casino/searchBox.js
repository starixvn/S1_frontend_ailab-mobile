import React, { useContext, useEffect } from "react";
import { i18nContext } from "Context";
import PropTypes from "prop-types";
import GameTypes from "./defGameType";
import Dropdown from "../common/casino.dropdown";

const SearchBox = props => {
	const { TpList, searchText, provider, gameType } = props;
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

	const providerList = [
		{ id: null, displayText: i18n.lbl_AllProvider },
		...Object.keys(TpList)?.map(k => {
			const d = TpList[k];
			return {
				id: d.value,
				displayText: d.displayKey ? i18n[d.displayKey] : d.displayText
			};
		})
	];

	useEffect(() => {
		if (!props.provider?.init) {
			const defaultProviderIdx = providerList.findIndex(
				p => p.id === props.DefaultProvider
			);
			if (defaultProviderIdx !== -1) {
				props.EditSearchField("provider", {
					idx: defaultProviderIdx,
					value: providerList[defaultProviderIdx].id,
					init: true
				});
			}
		}
	}, [i18n, props, providerList]);

	const EditField = (column, e) => {
		props.EditSearchField(column, e.target.value);
	};

	const SelectProvider = idx => {
		props.EditSearchField("provider", {
			idx,
			value: providerList[idx].id,
			init: true
		});
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
					options={providerList}
					selectedIdx={provider?.idx}
					onSelectItem={SelectProvider}
					placeholder="Game Platform"
					hideInfo={true}
				/>
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
	gameType: {},
	provider: {},
	DefaultProvider: null
};

SearchBox.propTypes = {
	TpList: PropTypes.objectOf(PropTypes.object).isRequired,
	provider: PropTypes.objectOf(PropTypes.any),
	DefaultProvider: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	EditSearchField: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	gameType: PropTypes.objectOf(PropTypes.any)
};

export default SearchBox;
