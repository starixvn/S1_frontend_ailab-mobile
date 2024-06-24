import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import path from "../../path";
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
import { useCheckPrize } from "../hook/useCheckPrize";
import { eventIds } from "../../datas/eventId";
import {
	api_events_DrawPrize,
	api_events_GetDisplayDrawPrizeList
} from "../../service/api/events";
import PopBoxLuckyWheel from "../common/popbox.luckyWheel";
import useCounter from "../hook/useCounter";
import { bannerImgUrl } from "../../config";
import useRetentionPromotion from "../retention/hooks/useRetentionPromotion";

const defTabs = {
	condition: true,
	history: false
};
const LuckyWheel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);
	const [prizeList, setPrizeList] = useState([]);
	const { count } = useCounter();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [deg, setDeg] = useState(247.5);
	const [tab, setTab] = useState(defTabs.condition);
	const [isSpinning, setSpinning] = useState(null);
	const [prize, setPrize] = useState(null);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin,
		eventId: eventIds.luckyWheel,
		count
	});
	const { retentionBonusCode } = useRetentionPromotion();


	const handleretention = () => {
		navigate(`/${path.retention.root}`);
	};


	useEffect(() => {
		setLoading(true);
		api_events_GetDisplayDrawPrizeList({ eventId: eventIds.luckyWheel })
			.then(res => {
				setLoading(false);
				if (res.data.errorCode === 0) {
					setPrizeList(res.data.data);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			})
			.catch(() => {
				setLoading(false);
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			});
	}, []);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setCanDrawPrize({
				status: false,
				msg: ""
			});
			setTab(defTabs.condition);
		}

		if (isSpinning === false && prize && userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				className: "luckyboxPop active",
				custContent: <PopBoxLuckyWheel prize={prize} />
			});
			setCanDrawPrize({
				status: false,
				msg: i18n.lbl_MysteryBox_AlreadyDrawn
			});
		}
	}, [userInfo.isLogin, setCanDrawPrize, isSpinning, prize]);

	const _spin = () => {
		if (!userInfo.isLogin) {
			setNav(defNavPanel.login);
		} else if (canDrawPrize.status) {
			setSpinning(true);
			api_events_DrawPrize({ eventId: eventIds.luckyWheel }).then(
				res => {
					const { data, errorCode, message } = res.data;

					if (errorCode === 0) {
						setPrize(data.prizeName);

						setTimeout(() => {
							const _deg =
								(prizeList.findIndex(
									el => el.prizeName === data.prizeName
								) -
									3) *
								-22.5;
							setSpinning(false);
							setDeg(_deg);
						}, 2400);
					} else if (errorCode === 100) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.lbl_MysteryBox_AlreadyDrawn
						});
						setCanDrawPrize({
							status: false,
							msg: i18n.lbl_MysteryBox_AlreadyDrawn
						});
						setSpinning(false);
					} else if (errorCode === 102) {
						setCanDrawPrize({
							status: false,
							msg: res.data.message
						});
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
						setCanDrawPrize({
							status: false,
							msg: message
						});
						setSpinning(false);
					}

					setLoading(false);
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			);
		} else if (canDrawPrize.status === false) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: canDrawPrize.msg
			});
		}
	};

	return (
		<>
			<img
				className="luckyboxBg"
				src={`${bannerImgUrl}/h5/img/luckybox/bg.jpg`}
				alt="luckywheel"
			/>
			<div>
				{retentionBonusCode && (
					<div className="eventpage-tap">
						<>
							<button className="active">
								{t("Label_Retention_LuckyWheel")}
							</button>
							<button onClick={handleretention}>
								{t("Label_Retention_SurpriseReward")}
							</button>
						</>
					</div>
				)}
				<div className="luckyout">
					<img
						className="pin"
						src={`${bannerImgUrl}/h5/img/luckybox/pin.png`}
						alt="wheelcover"
					/>
					<img
						src={`${bannerImgUrl}/h5/img/luckybox/spin.png`}
						alt="wheelcover"
					/>
					<button className="wheelbox" onClick={_spin}>
						<img
							src={`${bannerImgUrl}/h5/img/luckybox/spingo.png`}
							alt="spinner"
						/>
					</button>

					<div
						className={`wheel${isSpinning ? " active" : ""}`}
						style={{ transform: `rotate(${deg}deg)` }}>
						<ul>
							{prizeList.map(el => (
								<li key={`${el.prizeId}-${el.index}`}>
									<p>{el.prizeName}</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="filterBtn">
					{userInfo.isLogin === true && (
						<>
							<button
								onClick={() => setTab(defTabs.condition)}
								className={`${
									tab === defTabs.condition ? "open" : ""
								}`}>
								{i18n.lbl_Conditions?.toUpperCase()}
							</button>
							<button
								onClick={() => setTab(defTabs.history)}
								className={`${
									tab === defTabs.history ? "open" : ""
								}`}>
								{i18n.lbl_MyLuckyWheelRewards}
							</button>
						</>
					)}
				</div>

				{tab === defTabs.condition && <Condition i18n={i18n} />}
				{tab === defTabs.history && userInfo.isLogin && (
					<History
						userInfo={userInfo}
						i18n={i18n}
						setPopBox={setPopBox}
						setLoading={setLoading}
						canDrawPrize={canDrawPrize.status}
					/>
				)}
			</div>
		</>
	);
};

export default LuckyWheel;
