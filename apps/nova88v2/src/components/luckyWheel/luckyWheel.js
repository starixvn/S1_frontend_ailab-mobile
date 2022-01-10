import React, { useState, useEffect, useContext } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	loadingContext
} from "../common/context";
import Condition from "./condition";
import History from "./history";
import { useCheckPrize } from "../hook/useCheckPrize";
import { eventIds } from "../../datas/eventId";
import api from "../../service/api";
import PopBoxLuckyWheel from "../common/popbox.luckyWheel";
import useCounter from "../hook/useCounter";
import useHandleLogin from "../hook/useHandleLogin";
import { cloudBannerImgURL } from "../../config";

const LuckyWheel = () => {
	const { handleLogin } = useHandleLogin();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);
	const [prizeList, setPrizeList] = useState([]);
	const { count } = useCounter();
	const [deg, setDeg] = useState(67.5);
	const [prize, setPrize] = useState(null);
	const [isSpinning, setSpinning] = useState(null);
	const { canDrawPrize, setCanDrawPrize } = useCheckPrize({
		i18n,
		setPopBox,
		isLogin: userInfo.isLogin,
		eventId: eventIds.luckyWheel,
		count
	});

	useEffect(() => {
		setLoading(true);
		api.events
			.GetDisplayDrawPrizeList({ eventId: eventIds.luckyWheel })
			.then(res => {
				setPrizeList(res.data.data);
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setCanDrawPrize({
				status: false,
				msg: ""
			});
		}

		if (isSpinning === false && prize) {
			setPopBox({
				isOpen: true,
				className: "wheelPopModule",
				fullPage: true,
				content: (
					<PopBoxLuckyWheel prize={prize} setPopBox={setPopBox} />
				)
			});
			setCanDrawPrize({
				status: false,
				msg: i18n.lbl_MysteryBox_AlreadyDrawn
			});
		}
	}, [userInfo.isLogin, setCanDrawPrize, prize, isSpinning]);

	const spin = () => {
		if (!userInfo.isLogin) {
			handleLogin();
		} else if (canDrawPrize.status) {
			setSpinning(true);
			api.events.DrawPrize({ eventId: eventIds.luckyWheel }).then(
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
							title: i18n.lbl_ImportantNote,
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
			setCanDrawPrize({
				status: false,
				msg: canDrawPrize.msg
			});
		}
	};

	return (
		<div className="eventPage">
			<div className="eventTitleBg">
				<div className="eventTitle">
					{i18n.lbl_LuckyBox?.toUpperCase()}
				</div>
			</div>
			<div className="wheelModule">
				<img
					src={`${cloudBannerImgURL}/h5/img/event/wheel/wheelcover.png`}
					alt="wheelcover"
				/>
				<button onClick={spin}>
					<img
						src={`${cloudBannerImgURL}/h5/img/event/wheel/wheelbtn.png`}
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
					<>
						<div className="luckyBox title">
							<span>
								{i18n.lbl_My?.toUpperCase()} {i18n.lbl_LuckyBox}{" "}
								{i18n.lbl_Rewards?.toUpperCase()}
							</span>
						</div>
						<History
							userInfo={userInfo}
							i18n={i18n}
							setPopBox={setPopBox}
							setLoading={setLoading}
							canDrawPrize={canDrawPrize.status}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default LuckyWheel;
