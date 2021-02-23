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
import bgImg from "../../styles/img/event/bg_en.png";
import bgVNImg from "../../styles/img/event/bg_vn.png";
import { useCheckPrize } from "../hook/useCheckPrize";
import { eventIds } from "../../datas/eventId";

const AngPow = () => {
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

	return (
		<>
			<img
				className="angpaoBg"
				src={userInfo.langId === "vn" ? bgVNImg : bgImg}
				alt={i18n.lbl_FreeAngPow}
			/>
			<div className="animation">
				<div
					className={`angpao${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={drawAngPow}>
					<div className="top">
						<div className="badge" />
					</div>
					<div className="top2">
						<div className="badge" />
					</div>
					<div className="textBox">
						<p className="bigtitle">
							{i18n.lbl_FreeAngPow.toUpperCase()}
						</p>
						{canDrawPrize === false ? (
							<Counter
								i18n={i18n}
								setCanDrawPrize={setCanDrawPrize}
							/>
						) : null}
					</div>
					<div className="moneyArea">
						<div className="box" />
						<div className="l" />
						<div className="l" />
						<div className="l" />
						<div className="l" />
						<div className="l" />
					</div>
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
				<Condition i18n={i18n} langId={userInfo.langId} />
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

export default AngPow;
