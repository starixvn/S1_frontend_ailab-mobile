import React, { useState, useEffect, useRef, useContext } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "../common/context";
import Condition from "./condition";
import History from "./history";
import PopBox from "./popBox";
import Counter from "./counter";
import api from "../../service/api";

const AngPow = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	const [currentTab, setCurrentTab] = useState("condition");
	const [AngPowPop, setAngPowPop] = useState(false);
	const [canDrawPrize, setCanDrawPrize] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true) {
			api.events.CheckDrawPrize({ eventId: 0 }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 100) {
							setCanDrawPrize(false);
						} else if (
							res.data.errorCode !== 0 &&
							res.data.errorCode !== 100
						) {
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
	}, [i18n, setPopBox, userInfo]);

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

	return (
		<>
			<div className="animation">
				<div
					className={`angpao${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={drawAngPow}>
					<div className="redbox" />
					{canDrawPrize === false ? (
						<Counter
							i18n={i18n}
							setCanDrawPrize={setCanDrawPrize}
						/>
					) : null}
				</div>
			</div>
			<div className="filterBtn">
				<button
					className={currentTab === "condition" ? "open" : ""}
					open
					onClick={clickTab.bind(this, "condition")}>
					{i18n.lbl_AngPow_Conditions}
				</button>
				{userInfo.isLogin === true ? (
					<button
						className={currentTab === "history" ? "open" : ""}
						onClick={clickTab.bind(this, "history")}>
						{i18n.lbl_AngPow_MyAngPow}
					</button>
				) : null}
			</div>

			{currentTab === "history" ? (
				<History
					userInfo={userInfo}
					i18n={i18n}
					setPopBox={setPopBox}
				/>
			) : (
				<Condition i18n={i18n} />
			)}
			{AngPowPop ? (
				<PopBox
					i18n={i18n}
					setAngPowPop={setAngPowPop}
					setCanDrawPrize={setCanDrawPrize}
					setPopBox={setPopBox}
				/>
			) : null}
		</>
	);
};

export default AngPow;
