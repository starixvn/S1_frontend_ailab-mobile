import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { defNavPanel, navContext } from "../common/context";
import gameList, { defCol } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const Menu = ({ i18n, userInfo }) => {
	const { setNav } = useContext(navContext);
	const [selectedCol, setSelectedCol] = useState(defCol.hotGame);

	const showSubPanel = ({ panel }) => {
		if (selectedCol !== panel) {
			setSelectedCol(panel);
		}
	};

	const clickGame = ({ tpId, gameId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const gameArr = gameList({ langId: userInfo.langId }).map(item => {
		const showingEventIcon = getEventIcon({
			subIcon: item?.items?.filter(subItem => subItem.eventIcon),
			eventIcon: item?.eventIcon
		});

		return (
			<button
				key={`menu-${item.category}`}
				className={`${selectedCol === item.category ? "active" : ""}${
					showingEventIcon !== "" ? ` icon${showingEventIcon}` : ""
				}`}
				onClick={showSubPanel.bind(this, {
					panel: item.category
				})}>
				<img src={item.img} alt={item.category} />
				<p>{i18n[item.translateKey]}</p>
			</button>
		);
	});

	const subGameArr = gameList({ langId: userInfo.langId })
		.find(item => {
			return item.category === selectedCol;
		})
		?.items.map(subItem => {
			const {
				spanText,
				spanTextKey,
				img,
				tpId,
				gameId,
				path,
				parameter
			} = subItem;

			if (path) {
				return (
					<Link
						className="game"
						key={spanText || spanTextKey}
						to={path}
						state={parameter}>
						<img src={img} alt={spanText || spanTextKey} />
						<div className="title">
							{spanText || i18n[spanTextKey]}
						</div>
					</Link>
				);
			}
			return (
				<div
					className="game"
					key={spanText || spanTextKey}
					onClick={clickGame.bind(this, { tpId, gameId })}>
					<img src={img} alt={spanText || spanTextKey} />
					<div className="title">{spanText || i18n[spanTextKey]}</div>
				</div>
			);
		});

	return (
		<>
			<div className="sideBarNew">{gameArr}</div>
			<div className="gamelistNew">{subGameArr}</div>
		</>
	);
};

Menu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Menu;
