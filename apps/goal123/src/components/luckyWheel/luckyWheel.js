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
import { eventIds } from "../../datas/eventIds";
import {
	api_events_DrawPrize,
	api_events_GetDisplayDrawPrizeList
} from "../../service/api/events";
import PopBoxLuckyWheel from "../common/popbox.luckyWheel";
import useCounter from "../hook/useCounter";
import { bannerImgUrl } from "../../config";
import useRetentionPromotion from "../retention/hooks/useRetentionPromotion";

const LuckyWheel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setLoading } = useContext(loadingContext);
	const [prizeList, setPrizeList] = useState([]);
	const { count } = useCounter();
	const [isSpinning, setSpinning] = useState(null);
	const [deg, setDeg] = useState(67.5);
	const [prize, setPrize] = useState(null);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin,
		eventId: eventIds.luckyWheel,
		count
	});
	const { retentionBonusCode } = useRetentionPromotion();
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		api_events_GetDisplayDrawPrizeList({ eventId: eventIds.luckyWheel })
			.then(res => {
				setPrizeList(res.data.data);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				console.error(err);
			});
	}, []);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setCanDrawPrize({
				status: false,
				msg: ""
			});
		}

		if (isSpinning === false && prize && userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				className: "wheelPopModule",
				custContent: (
					<PopBoxLuckyWheel prize={prize} setPopBox={setPopBox} />
				)
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
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
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

	const handleretention = () => {
		navigate(`/${path.retention.root}`);
	};

	return (
		<div className="eventPage">
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

			<div
				className={`eventTitleBg${
					userInfo.langId === "vn" ? " vietnam" : ""
				}`}>
				<div className="eventTitle">{i18n.lbl_LuckyWheel}</div>
			</div>
			<div className="wheelModule">
				<img
					src={`${bannerImgUrl}/h5/img/event/wheel/wheel.png`}
					alt="wheelcover"
				/>
				<button onClick={_spin}>
					<img
						src={
							userInfo.langId === "vn"
								? `${bannerImgUrl}/h5/img/event/wheel/spinbtn_vn.png`
								: `${bannerImgUrl}/h5/img/event/wheel/spinbtn_en.png`
						}
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
			<div className="info">
				<Condition i18n={i18n} />

				{userInfo.isLogin === true && (
					<History
						userInfo={userInfo}
						i18n={i18n}
						setPopBox={setPopBox}
						setLoading={setLoading}
						canDrawPrize={canDrawPrize.status}
					/>
				)}
			</div>
		</div>
	);
};

export default LuckyWheel;
