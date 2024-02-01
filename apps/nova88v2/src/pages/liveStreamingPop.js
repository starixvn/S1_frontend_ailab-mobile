import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import api from "../service/api";
import { cloudBannerImgURL } from "../config";
import { popBoxContext, userInfoContext } from "../components/common/context";
import {
	currencyIdToCurrency,
	defCurrencyToLang,
	defCurrenyId,
	langMappingCurr as langAndCurrMapping
} from "../components/common/common";
import { GET_ENTER_PAGE } from "../service/enterPage";
import useHandleLogin from "../components/hook/useHandleLogin";

const LiveStreamingLink = () => {
	const { t } = useTranslation();
	const { handleLogin } = useHandleLogin();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId, currencyId, isLogin }
	} = useContext(userInfoContext);
	const [isShowLiveStreaming, setIsShowLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);
	const getLiveStreamingList = async () => {
		try {
			const {
				data: { data: resultList }
			} = await api.liveStreaming.GetDataList({
				langId,
				currencyId
			});
			if (resultList.length > 0) {
				setIsShowLiveStreaming(true);
				// 根據開始時間+2hr判斷是否過期,並取前3項
				const filterList = resultList
					.filter(({ battleTime }) =>
						moment(battleTime).add(2, "hours").isAfter(moment())
					)
					.slice(0, 3);

				setLiveStreamingList(filterList);
			}
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: error
			});
		}
	};

	const isWithinTwoHours = startTime =>
		moment().isBetween(
			moment(startTime),
			moment(startTime).add(2, "hours"),
			null,
			"[]"
		);

	const handleBetting = ({ tpId, gameId, matchId }) => {
		GET_ENTER_PAGE({
			tpId,
			langId,
			gameId,
			isLogin,
			tpGameType: 1,
			matchid: matchId,
			loginCallback: () => {
				handleLogin();
				setPopBox({ isOpen: false });
			},
			liveStreamingId: true
		});
	};

	const getClassNameByCurrencyId = () => {
		const currencyClassNames = {
			[langAndCurrMapping.vn]: _langId =>
				_langId === "en" ? "vn-en" : "vn",
			[langAndCurrMapping.th]: _langId =>
				_langId === "en" ? "th-en" : "th",
			[langAndCurrMapping.my]: _langId => {
				switch (_langId) {
					case "en":
						return "my-en";
					case "cs":
						return "my-cs";
					default:
						return "my";
				}
			}
		};
		const getClassName =
			currencyClassNames[currencyIdToCurrency[currencyId]];
		if (getClassName) {
			return getClassName(langId);
		}
		return "";
	};

	const handleLiveSteamingModalOpen = () => {
		setPopBox({
			isOpen: true,
			className: "livesportspop",
			custContent: (
				<div className={`livesports ${getClassNameByCurrencyId()}`}>
					<div>
						{liveStreamingList.map(
							({
								sportLeaguesTitle,
								homeTeamPic,
								homeTeamName,
								battleTime,
								awayTeamPic,
								awayTeamName,
								tpId,
								gameId,
								matchId
							}) => (
								<div
									className={`livesports-item ${
										isWithinTwoHours(battleTime)
											? ""
											: "next"
									}`}
									onClick={() =>
										handleBetting({
											tpId,
											gameId,
											matchId
										})
									}>
									<div className="top">
										<div>{sportLeaguesTitle}</div>
										<div>
											{isWithinTwoHours(battleTime)
												? // LIVE字樣不翻譯
												  "LIVE"
												: t("lbl_Next")}
										</div>
									</div>
									<div className="bottom">
										<div className="bottom-team">
											<div>
												<img
													src={homeTeamPic}
													alt={homeTeamName}
												/>
											</div>
											<div>{homeTeamName}</div>
										</div>
										<div className="bottom-time">
											<img
												src={`${cloudBannerImgURL}/h5/img/4.0/vs.png`}
												alt=""
											/>
											<div>
												<div>
													{moment(battleTime).format(
														"DD MMM"
													)}
												</div>
												<div>
													{moment(battleTime).format(
														"hh:mm A"
													)}
												</div>
											</div>
										</div>
										<div className="bottom-team">
											<div>
												<img
													src={awayTeamPic}
													alt={awayTeamName}
												/>
											</div>
											<div>{awayTeamName}</div>
										</div>
									</div>
								</div>
							)
						)}
					</div>

					<img
						onClick={() => setPopBox({ isOpen: false })}
						src={`${cloudBannerImgURL}/h5/img/promosBackPopup/delet.png`}
						alt=""
						className="closepop"
					/>
				</div>
			)
		});
	};

	useEffect(() => {
		// 當currencyId為vn或th時顯示直播icon
		if (
			currencyId === defCurrenyId.VND ||
			currencyId === defCurrenyId.THB ||
			currencyId === defCurrenyId.MYR
		) {
			getLiveStreamingList();
		}
	}, [langId, isLogin]);

	return isShowLiveStreaming ? (
		<div className="eventLink livesports">
			<button
				className="icon icon-close"
				onClick={() => setIsShowLiveStreaming(false)}
			/>
			<a className="" onClick={handleLiveSteamingModalOpen}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/livesports-${defCurrencyToLang[currencyId]}.png`}
					alt="livesports"
				/>
			</a>
		</div>
	) : null;
};

export default LiveStreamingLink;
