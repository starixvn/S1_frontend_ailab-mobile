import React, { useState, useEffect, useRef, useContext } from "react";
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
import { api_events_CheckDrawPrize } from "../../service/api/events";
import eventImg from "../../styles/img/event/box/box_close.png";

const useCheckPrize = ({ i18n, setPopBox, isLogin }) => {
	const [canDrawPrize, setCanDrawPrize] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isLogin === true) {
			api_events_CheckDrawPrize({ eventId: 5 }).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode } = res.data;
						if (errorCode === 0) {
							setCanDrawPrize(true);
						} else if (errorCode === 100) {
							setCanDrawPrize(false);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [isLogin, i18n, setPopBox]);

	return { canDrawPrize, setCanDrawPrize };
};

const MysteryBox = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);

	const [currentTab, setCurrentTab] = useState("condition");
	const [mysteryBoxPop, setMysteryBoxPop] = useState(false);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin
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
			setMysteryBoxPop(true);
		}
	};

	const clickTab = tab => {
		if (tab !== currentTab) {
			setCurrentTab(tab);
		}
	};

	return (
		<>
			<div className="animation">
				<div
					className={`goldbox__item ${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={openBox}>
					<img
						className="goldbox__close"
						src={eventImg}
						alt="Mystery Box"
					/>
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
				<Condition i18n={i18n} langId={userInfo.langId} />
			)}
			{mysteryBoxPop ? (
				<PopBox
					i18n={i18n}
					setMysteryBoxPop={setMysteryBoxPop}
					setCanDrawPrize={setCanDrawPrize}
					setPopBox={setPopBox}
				/>
			) : null}
		</>
	);
};

export default MysteryBox;
