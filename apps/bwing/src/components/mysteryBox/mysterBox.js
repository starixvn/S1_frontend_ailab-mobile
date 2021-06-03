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
import bgImg from "../../styles/img/mystery/bg.png";
import bgVNImg from "../../styles/img/mystery/bg_vn.png";
import { useCheckPrize } from "../hook/useCheckPrize";
import { eventIds } from "../../datas/eventId";
import { euro_event_time } from "../../datas/productList";
import bgEuro from "../../styles/img/BW1920x822.jpg";
import { isEventPeriod } from "../common/common";

const MysteryBox = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);

	const [currentTab, setCurrentTab] = useState("condition");
	const [drawPopOpen, setDrawPopOpen] = useState(false);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin,
		eventId: eventIds.mysteryBox
	});

	useEffect(() => {
		if (!userInfo.isLogin) {
			setCanDrawPrize(true);
			setCurrentTab("condition");
		}
	}, [userInfo.isLogin, setCanDrawPrize]);

	const openBox = () => {
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

	return (
		<>
			{isEventPeriod(euro_event_time) ? (
				<img className="mysteryBg" src={bgEuro} alt="bg" />
			) : (
				<img
					className="mysteryBg"
					src={userInfo.langId === "en" ? bgImg : bgVNImg}
					alt="Mystery Box"
				/>
			)}
			<div className="animation">
				<div
					className={`mysteryBox ${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={openBox}>
					{canDrawPrize === false ? (
						<div className="textBox">
							<Counter
								i18n={i18n}
								setCanDrawPrize={setCanDrawPrize}
							/>
						</div>
					) : null}
				</div>
			</div>
			{userInfo.isLogin === true ? (
				<div className="filterBtn">
					<button
						className={currentTab === "condition" ? "open" : ""}
						open
						onClick={clickTab.bind(this, "condition")}>
						{i18n.lbl_MysteryBox_Conditions}
					</button>
					<button
						className={currentTab === "history" ? "open" : ""}
						onClick={clickTab.bind(this, "history")}>
						{i18n.lbl_MysteryBox_MysteryBoxRewards}
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
			{drawPopOpen ? (
				<PopBox
					i18n={i18n}
					setDrawPopOpen={setDrawPopOpen}
					setCanDrawPrize={setCanDrawPrize}
					setPopBox={setPopBox}
				/>
			) : null}
		</>
	);
};

export default MysteryBox;
