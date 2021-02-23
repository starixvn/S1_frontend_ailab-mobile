import React, { useState, useEffect, useContext } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	navContext,
	defNavPanel,
	loadingContext
} from "../common/context";
import Condition from "./condition";
import History from "./history";
import PopBox from "./popBox";
import Counter from "./counter";
import eventImg from "../../styles/img/event/angpao_inf.png";
import eventIdImg from "../../styles/img/event/angpao_inf_id.png";
import eventBgImg from "../../styles/img/event/angpao_inf_d.png";
import { useCheckPrize } from "../hook/useCheckPrize";
import { eventIds } from "../../datas/eventId";

const AngPow = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);

	const [currentTab, setCurrentTab] = useState("condition");
	const [AngPowPop, setDrawPopOpen] = useState(false);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin,
		eventId: eventIds.angPow
	});

	useEffect(() => {
		if (!userInfo.isLogin) {
			setCanDrawPrize(true);
			setCurrentTab("condition");
		}
	}, [userInfo.isLogin, setCanDrawPrize]);

	const drawAngPow = () => {
		if (!userInfo.isLogin) {
			setNav(defNavPanel.login);
		} else if (canDrawPrize) {
			setDrawPopOpen(true);
		}
	};

	const clickTab = tab => {
		if (tab !== currentTab) {
			setCurrentTab(tab);
		}
	};

	let _eventImg = eventImg;
	if (canDrawPrize === false) {
		_eventImg = eventBgImg;
	} else if (userInfo.langId === "id") {
		_eventImg = eventIdImg;
	}

	return (
		<>
			<div className="animation">
				<div
					className={`angpao${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={drawAngPow}>
					<div className="redbox">
						<img src={_eventImg} alt={i18n.lbl_AngPow} />
					</div>
					{canDrawPrize === false ? (
						<Counter
							i18n={i18n}
							setCanDrawPrize={setCanDrawPrize}
						/>
					) : null}
				</div>
			</div>
			{userInfo.isLogin === true ? (
				<div className="filterBtn">
					<button
						className={currentTab === "condition" ? "open" : ""}
						open
						onClick={clickTab.bind(this, "condition")}>
						{i18n.lbl_AngPow_Conditions}
					</button>
					<button
						className={currentTab === "history" ? "open" : ""}
						onClick={clickTab.bind(this, "history")}>
						{i18n.lbl_AngPow_MyAngPow}
					</button>
				</div>
			) : null}
			{currentTab === "history" ? (
				<History
					userInfo={userInfo}
					i18n={i18n}
					setPopBox={setPopBox}
					setLoading={setLoading}
					canDrawPrize={canDrawPrize}
				/>
			) : (
				<Condition i18n={i18n} />
			)}
			{AngPowPop ? (
				<PopBox
					i18n={i18n}
					setDrawPopOpen={setDrawPopOpen}
					setCanDrawPrize={setCanDrawPrize}
					setPopBox={setPopBox}
					langId={userInfo.langId}
				/>
			) : null}
		</>
	);
};

export default AngPow;
