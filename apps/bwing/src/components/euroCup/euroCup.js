import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useNavigate } from "@reach/router";
import {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventPredictScoreQuery,
	useGetCupEventTicketQuery,
	useMultiUserPollTicketsMutation,
	usePredictCupEventScoreMutation
} from "@ailab-mobile/service";
import { popBoxContext, userInfoContext } from "../common/context";
import { eventTime } from "../common/eventTime";
import { isEventPeriod } from "../common/common";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import TopTwoPredictions from "./predict/TopTwoPredictions";
import PredictionRecord from "./predict/predictionRecord";
import TeamSelector from "./predict/teamSelector";
import TopContent from "./topContent";
import Mission from "./mission";
import Directions from "./directions";

const EuroCup = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [activeTab, setActiveTab] = useState(1);
	const [selectedGroup, setSelectedGroup] = useState("");
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [homeTeamScore, setHomeTeamScore] = useState("");
	const [awayTeamScore, setAwayTeamScore] = useState("");

	const {
		data: { data: predictionSettingData = {} } = {}
	} = useGetCupEventPredictionSettingQuery({ langId: userInfo.langId });

	const {
		data: {
			data: {
				cupEventPromotionMissionProgress = {},
				promotionMission = [],
				unUsedTickets = 0,
				userTicketResult = {}
			} = {}
		} = {}
	} = useGetCupEventTicketQuery(null, {
		skip: !userInfo.isLogin,
		refetchOnMountOrArgChange: true
	});

	const {
		data: { data: { data: predictScoreList = [], isPredict } = {} } = {}
	} = useGetCupEventPredictScoreQuery(null, { skip: !userInfo.isLogin });

	const [pollTicketsMutation] = useMultiUserPollTicketsMutation();

	const [predictCupEventScoreMutation] = usePredictCupEventScoreMutation();

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(predictionSettingData?.selectOptions);

	const usedTickets = userTicketResult?.groupCountryTicket
		?.filter(({ countryId }) => countryId !== null)
		?.map(ticketObj => {
			const matchOption = options?.find(
				option => option.countryId === ticketObj.countryId
			);
			return {
				...ticketObj,
				...matchOption
			};
		});

	const handlePredictScore = async () => {
		const target = promotionMission?.find(
			({ isCompleted }) => isCompleted === false
		);

		const onSubmitPredictionScore = async () => {
			try {
				const res = await predictCupEventScoreMutation({
					homeTeamScore,
					awayTeamScore
				}).unwrap();
				const { errorCode, message } = res;
				if (errorCode === 0) {
					setPopBox({ isOpen: false });
					setHomeTeamScore("");
					setAwayTeamScore("");
				} else {
					setPopBox({
						isOpen: true,
						title: t("lbl_ImportantNote"),
						content: message || "error",
						errorCode
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					title: t("lbl_ImportantNote"),
					content: error
				});
			}
		};
		if (homeTeamScore === "" || awayTeamScore === "") return;
		if (target === -1) {
			setPopBox({
				isOpen: true,
				content: (
					<div id="popup" className="active">
						<div className="eurocuppop">
							<div className="eurocuppop-content">
								<div>
									{t("lbl_CupEvent_PredictScore_unCompleted")}
								</div>
								<button
									onClick={() =>
										setPopBox({ isOpen: false })
									}>
									{t("lbl_OK")}
								</button>
							</div>
						</div>
					</div>
				)
			});
		} else {
			setPopBox({
				isOpen: true,
				content: (
					<div id="popup" className="active">
						<div className="submitpop score">
							<div className="submitpop-wrapper active">
								<div className="submitpop-tip">
									{t("lbl_CupEvent_SentCantBeModified")}
								</div>
								<div className="submitpop-btn">
									<button onClick={onSubmitPredictionScore}>
										{t("lbl_OK")}
									</button>
									<button
										onClick={() =>
											setPopBox({ isOpen: false })
										}>
										{t("lbl_CANCEL")}
									</button>
								</div>
							</div>
						</div>
					</div>
				)
			});
		}
	};
	const handleSubmitConfirmModalOpen = async ({ userPollTicket, count }) => {
		if (!selectedTeamId || !ticketsNumber || unUsedTickets < ticketsNumber)
			return;

		const selectedTeam = options?.find(
			({ countryId }) => countryId === Number(selectedTeamId)
		);
		const onSubmitPredictionTeam = async () => {
			if (!userInfo.isLogin) return;
			try {
				const res = await pollTicketsMutation({
					userPollTicket,
					count
				}).unwrap();
				const { errorCode, message } = res;
				if (errorCode === 0) {
					setTicketsNumber("");
					setSelectedTeamId("");
					setSelectedGroup("");
					setPopBox({ isOpen: false });
				} else {
					setPopBox({
						isOpen: true,
						title: t("lbl_ImportantNote"),
						content: message || "error",
						errorCode
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					title: t("lbl_ImportantNote"),
					content: error
				});
			}
		};
		setPopBox({
			isOpen: true,
			className: "active",
			content: (
				<div id="popup" className="submitpop active">
					<div className="pop">
						<div className="submitpop-tip">
							{t("lbl_CupEvent_ConfirmMsg")}
						</div>
						<div className="record-item">
							<div className="ticket">
								<img
									className="euro-logo"
									src={`${bannerImgUrl}/h5/img/event/eurocup/ticket-euro-logo.png`}
									alt="ticket-euro-logo"
								/>
								<div className="flag">
									<img
										src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
										alt={selectedTeam.imageName}
									/>
									<span>{selectedTeam.countryName}</span>
								</div>
								<div className="number">
									<span>{count}</span>
									<span>{t("lbl_CupEvent_Tickets")}</span>
								</div>
							</div>
						</div>

						<div className="submitpop-btn">
							<button onClick={onSubmitPredictionTeam}>
								{t("lbl_OK")}
							</button>
							<button
								onClick={() => setPopBox({ isOpen: false })}>
								{t("lbl_Cancel")}
							</button>
						</div>
						<div
							className="close-btn"
							onClick={() => setPopBox({ isOpen: false })}>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/close-circle.png`}
								alt="close-circle"
							/>
						</div>
					</div>
				</div>
			)
		});
	};

	const handlePredictionRecordModalOpen = () => {
		if (usedTickets?.length <= 3) return;
		setPopBox({
			isOpen: true,
			content: (
				<div id="popup" className="recordlist active">
					<div className="pop">
						<div className="record-title">
							{t("lbl_CupEvent_PredictionRecord")}
						</div>
						<div className="record-content">
							{usedTickets?.map(
								({
									count,
									countryId,
									countryName,
									imageName
								}) => (
									<div
										className="record-item"
										key={countryId}>
										<div className="ticket">
											<img
												className="euro-logo"
												src={`${bannerImgUrl}/h5/img/event/eurocup/ticket-euro-logo.png`}
												alt="euro-logo"
											/>
											<div className="flag">
												<img
													src={`${sportsImgUrl}/Country%20Team/${imageName}`}
													alt={imageName}
												/>
												<span>{countryName}</span>
											</div>
											<div className="number">
												<span>
													{t(
														"lbl_CupEvent_NumberOfTickets"
													)}
												</span>
												<span>{count}</span>
											</div>
										</div>
									</div>
								)
							)}
						</div>
						<div
							className="close-btn"
							onClick={() => setPopBox({ isOpen: false })}>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/close-circle.png`}
								alt="close-circle"
							/>
						</div>
					</div>
				</div>
			)
		});
	};

	useEffect(() => {
		if (!isEventPeriod(eventTime.euroCup)) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		if (userInfo.isLogin) {
			const targetIndex =
				promotionMission.findIndex(
					({ isCompleted }) => isCompleted === false
				) + 1;
			setActiveTab(targetIndex ?? 1);
		}
	}, [promotionMission.length]);

	return (
		<>
			<TopContent />
			<TopTwoPredictions
				predictScoreList={predictScoreList}
				isPredict={isPredict}
				homeTeamScore={homeTeamScore}
				awayTeamScore={awayTeamScore}
				setHomeTeamScore={setHomeTeamScore}
				setAwayTeamScore={setAwayTeamScore}
				onSubmit={handlePredictScore}
			/>
			<div
				className={classNames("mission-wrapper", {
					submit: isEventPeriod(eventTime.predictScore)
				})}>
				<div className="mission-content">
					<div className="title">
						<span>{t("lbl_CupEvent_Mission")}</span>
					</div>
					<div className="mission-date">
						{t("lbl_CupEvent_Mission_Date")}
					</div>
					<Mission
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						promotionMission={promotionMission}
						cupEventPromotionMissionProgress={
							cupEventPromotionMissionProgress
						}
					/>

					<TeamSelector
						options={predictionSettingData?.selectOptions}
						selectedTeamId={selectedTeamId}
						ticketsNumber={ticketsNumber}
						selectedGroup={selectedGroup}
						setSelectedTeamId={setSelectedTeamId}
						setTicketsNumber={setTicketsNumber}
						setSelectedGroup={setSelectedGroup}
						onSubmit={handleSubmitConfirmModalOpen}
					/>
					{usedTickets?.length > 0 && (
						<PredictionRecord
							usedTickets={usedTickets}
							onOpen={handlePredictionRecordModalOpen}
						/>
					)}
				</div>
			</div>
			<div className="bottom-bg">
				<img
					src={`${bannerImgUrl}/h5/img/event/eurocup/bottom-bg.png`}
					alt="bottom-bg"
				/>
			</div>
			<Directions />
		</>
	);
};

export default EuroCup;
