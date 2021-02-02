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
import eventImg from "../../styles/img/event/angpao_inf_en.png";
import eventVNImg from "../../styles/img/event/angpao_inf_vn.png";
import eventBgImg from "../../styles/img/event/angpao_inf_d.png";

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
			api_events_CheckDrawPrize().then(
				res => {
					if (isMountedRef.current) {
						const { errorCode } = res.data;
						if (errorCode === 0) {
							setCanDrawPrize(true);
						} else if (errorCode === 100) {
							setCanDrawPrize(false);
						} else if (errorCode === 101) {
							setCanDrawPrize(false);
							setPopBox({
								isOpen: true,
								title: i18n.lbl_AngPow_EventTitle,
								content: i18n.lbl_AngPow_NotWinning
							});
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

const AngPow = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);

	const [currentTab, setCurrentTab] = useState("condition");
	const [AngPowPop, setAngPowPop] = useState(false);
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

	const drawAngPow = () => {
		if (!userInfo.isLogin) {
			setNav(defNavPanel.login);
		} else if (canDrawPrize) {
			setAngPowPop(true);
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
	} else if (userInfo.langId === "vn") {
		_eventImg = eventVNImg;
	}

	return (
		<>
			<div className="animation">
				<div
					className={`angpao${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={drawAngPow}>
					<img
						className="redbox"
						src={_eventImg}
						alt={i18n.lbl_FreeAngPow}
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
			{AngPowPop ? (
				<PopBox
					i18n={i18n}
					setAngPowPop={setAngPowPop}
					setCanDrawPrize={setCanDrawPrize}
					setPopBox={setPopBox}
					langId={userInfo.langId}
				/>
			) : null}
		</>
	);
};

export default AngPow;
