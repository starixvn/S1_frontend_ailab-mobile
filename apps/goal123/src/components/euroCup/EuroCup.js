import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import moment from "moment";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventTicketQuery,
	useGetCupEventTicketSummaryQuery,
	useGetMemberDepositQuery,
	useMultiUserPollTicketsMutation
} from "@ailab-mobile/service";
import { isDateRange } from "@ailab-mobile/common";
import paths from "../../path";
import { popBoxContext, userInfoContext } from "../common/context";
import PredictList from "./predict/PredictList";
import TicketOverview from "./TicketOverview";
import TeamSelector from "./predict/TeamSelector";
import PredictionRecord from "./predict/PredictionRecord";
import { DIRECTIONS_TYPE, PREDICT_TABS } from "./def";
import Directions from "./Directions";
import RewardItem from "./reward/RewardItem";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import { numFormatToDigits } from "../common/common";
import { eventTime } from "../common/eventTime";
import Schedule from "./schedule/Schedule";

const EuroCup = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	const [selectedGroup, setSelectedGroup] = useState("");
	const [selectedTeamId, setSelectedTeamId] = useState("");
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [directionsType, setDirectionsType] = useState(
		DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
	);
	const [activePredictTab, setActivePredictTab] = useState(
		PREDICT_TABS.PREDICTION
	);
	const {
		data: { data: predictionSettingData = {} } = {}
	} = useGetCupEventPredictionSettingQuery({ langId: userInfo.langId });

	const {
		data: { data: ticketSummary = [] } = {}
	} = useGetCupEventTicketSummaryQuery(
		{ langId: userInfo.langId },
		{
			selectFromResult: ({ data: { data = [] } = {} }) => {
				const sortedData = [...data].sort(
					(a, b) => b.percentage - a.percentage
				);
				return {
					data: { data: sortedData }
				};
			}
		}
	);

	const { data: { data: tickets = {} } = {} } = useGetCupEventTicketQuery(
		null,
		{
			skip: !userInfo.isLogin,
			refetchOnMountOrArgChange: true
		}
	);

	const {
		data: { data: memberDepositList = [] } = {}
	} = useGetMemberDepositQuery(null, {
		skip: !userInfo.isLogin,
		refetchOnMountOrArgChange: true
	});

	const [pollTicketsMutation] = useMultiUserPollTicketsMutation();

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(predictionSettingData?.selectOptions);

	const usedTickets = tickets.userTicketResult?.groupCountryTicket
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

	const handleSubmitConfirmModalOpen = async ({ userPollTicket, count }) => {
		if (
			!selectedTeamId ||
			!ticketsNumber ||
			tickets.unUsedTickets < ticketsNumber
		)
			return;
		const selectedTeam = options?.find(
			({ countryId }) => countryId === Number(selectedTeamId)
		);
		const onSubmit = async () => {
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
						content: message || "error",
						errorCode
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: t("msg_ApiServerError")
				});
			}
		};
		setPopBox({
			isOpen: true,
			className: `submitpop active`,
			custContent: (
				<div className="pop">
					<div className="submitpop-tip">
						{t("lbl_CupEvent_ConfirmMsg")}
					</div>
					<div className="record-item">
						<div className="ticket">
							<img
								className="euro-logo"
								src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo.png`}
								alt="euro-logo"
							/>
							<div className="flag">
								<img
									src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
									alt={selectedTeam.imageName}
								/>
								<span>{selectedTeam.countryName}</span>
							</div>
							<div className="number">
								<span>{t("lbl_CupEvent_NumberOfTickets")}</span>
								<span>{count}</span>
							</div>
						</div>
					</div>

					<div className="submitpop-btn">
						<button onClick={onSubmit}>{t("lbl_OK")}</button>
						<button onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Cancel")}
						</button>
					</div>
				</div>
			)
		});
	};

	const handleDepositListModalOpen = () => {
		if (memberDepositList.length === 0) return;
		setPopBox({
			isOpen: true,
			className: "depositlist active",
			custContent: (
				<div className="pop">
					<div className="depositlist-title">
						{t("lbl_CupEvent_DepositList")}
					</div>
					<div className="depositlist-item">
						<div className="first-text">
							<div>
								{t("lbl_Date")} (
								{memberDepositList[0].statementTime.slice(-6)})
							</div>
							<div>{t("lbl_CupEvent_DepositID")}</div>
							<div>{t("lbl_DepositAmount")}</div>
						</div>
						<div>
							<div className="date">
								{memberDepositList.map(({ statementTime }) => (
									<div>
										{moment(statementTime).format(
											"YYYY/MM/DD HH:mm:ss"
										)}
									</div>
								))}
							</div>
							<div className="user">
								{memberDepositList.map(({ transId }) => (
									<div>{transId}</div>
								))}
							</div>
							<div className="money">
								{memberDepositList.map(({ depositAmount }) => (
									<div>
										{numFormatToDigits(depositAmount, 0)}
										<div>VND</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div
						className="close-btn"
						onClick={() => setPopBox({ isOpen: false })}>
						<img
							src={`${bannerImgUrl}/desktop/img/event/eurocup/close-circle.png`}
							alt="close-circle"
						/>
					</div>
				</div>
			)
		});
	};

	const handlePredictionRecordModalOpen = () => {
		if (usedTickets <= 3) return;
		setPopBox({
			isOpen: true,
			className: "recordlist active",
			custContent: (
				<div className="pop">
					<div className="record-title">
						{t("lbl_CupEvent_PredictionRecord")}
					</div>
					<div className="record-content">
						{usedTickets?.map(
							({ count, countryId, countryName, imageName }) => (
								<div className="record-item" key={countryId}>
									<div className="ticket">
										<img
											className="euro-logo"
											src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo.png`}
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
							src={`${bannerImgUrl}/desktop/img/event/eurocup/close-circle.png`}
							alt="close-circle"
						/>
					</div>
				</div>
			)
		});
	};

	useEffect(() => {
		// 身份驗證未完成狀態
		if (userInfo.isLogin && tickets?.errorCode === 104) {
			setPopBox({
				isOpen: true,
				content: t("Label_CupEvent_Verify_Email_Phone")
			});
		}
	}, [tickets.errorCode]);

	useEffect(() => {
		if (!isDateRange(eventTime.eventCup)) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<img
				className="top-bn"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/top-bn-${userInfo.langId}.jpg`}
				alt={userInfo.langId}
			/>
			<div className="prediction-tab">
				<button
					className={classNames({
						active: activePredictTab === PREDICT_TABS.PREDICTION
					})}
					onClick={() =>
						setActivePredictTab(PREDICT_TABS.PREDICTION)
					}>
					<span>{t("lbl_CupEvent_Prediction")}</span>
				</button>
				<button
					className={classNames({
						active: activePredictTab === PREDICT_TABS.SCHEDULE
					})}
					onClick={() => setActivePredictTab(PREDICT_TABS.SCHEDULE)}>
					<span> {t("lbl_CupEvent_Schedule")}</span>
				</button>
			</div>
			{activePredictTab === PREDICT_TABS.PREDICTION && (
				<div className="prediction-wrapper active">
					<div className="prediction-title">
						<div>{t("lbl_CupEvent_PredictionOfParticipant")}</div>
						<div>
							{t("lbl_CupEvent_PredictionOfParticipant_desc")}
						</div>
						<a className="deposit-btn-a">
							<span
								onClick={() =>
									navigate(
										`${
											userInfo.isLogin
												? `/${paths.deposit.root}`
												: `/${paths.login.root}`
										}`
									)
								}>
								{t("lbl_DepositNow")}
							</span>
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/arrow-right.png`}
								alt="arrow-right"
							/>
						</a>
					</div>
					<PredictList ticketSummary={ticketSummary} />
				</div>
			)}
			{activePredictTab === PREDICT_TABS.SCHEDULE && (
				<Schedule predictionSettingData={predictionSettingData} />
			)}

			<div className="ticket-wrapper">
				<TicketOverview
					tickets={tickets}
					onOpen={handleDepositListModalOpen}
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
				<div className="record">
					{userInfo.isLogin && usedTickets?.length > 0 && (
						<PredictionRecord
							usedTickets={usedTickets}
							onOpen={handlePredictionRecordModalOpen}
						/>
					)}
				</div>
			</div>
			<img
				className="bottom-bg"
				src={`${bannerImgUrl}/h5/img/event/eurocup/bottom-bg.png`}
				alt="bottom-bg"
			/>
			<div className="reward-content">
				<RewardItem />
				{/* 開獎後將R ewardItem切換RewardItemWinner */}
				<Directions
					directionsType={directionsType}
					setDirectionsType={setDirectionsType}
				/>
			</div>
			<div className="footer-bg">
				<img
					src={`${bannerImgUrl}/h5/img/event/eurocup/footer-bg.png`}
					alt="footer-bg"
				/>
			</div>
		</>
	);
};

export default EuroCup;
