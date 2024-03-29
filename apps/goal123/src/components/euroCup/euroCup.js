import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import moment from "moment";
import { useTranslation } from "react-i18next";
import paths from "../../path";
import {
	api_cupEvent_GetCupEventPredictionSetting,
	api_cupEvent_GetCupEventTicket,
	api_cupEvent_GetCupEventTicketSummary,
	api_cupEvent_GetMemberDeposit,
	api_cupEvent_MultiUserPollTickets
} from "../../service/api/euroCup";
import { popBoxContext, userInfoContext } from "../common/context";
import PredictList from "./predict/predictLIst";
import TicketOverview from "./ticketOverview";
import TeamSelector from "./predict/teamSelector";
import PredictionRecord from "./predict/predictionRecord";
import { DIRECTIONS_TYPE } from "./def";
import Directions from "./directions";
import RewardItem from "./reward/RewardItem";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import { numFormatToDigits } from "../common/common";

const EuroCup = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	const [predictionSetting, setPredictionSetting] = useState(null);
	const [tickets, setTickets] = useState({});
	const [memberDepositList, setMemberDepositList] = useState([]);
	const [ticketSummary, setTicketSummary] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState("");
	const [selectedTeamId, setSelectedTeamId] = useState("");
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [directionsType, setDirectionsType] = useState(
		DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
	);

	const getCupEventPredictionSetting = async ({ langId }) => {
		try {
			const res = await api_cupEvent_GetCupEventPredictionSetting({
				langId
			});
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setPredictionSetting(data);
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

	const getCupEventTicket = async () => {
		try {
			const res = await api_cupEvent_GetCupEventTicket();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setTickets(data);
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

	const getMemberDeposit = async () => {
		try {
			const res = await api_cupEvent_GetMemberDeposit();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setMemberDepositList(data);
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

	const getTicketsSummary = async () => {
		try {
			const res = await api_cupEvent_GetCupEventTicketSummary();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				const sortedData = data.sort(
					(a, b) => b.percentage - a.percentage
				);
				setTicketSummary(sortedData);
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

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(predictionSetting?.selectOptions);

	const usedTickets = tickets.userTicketResult?.groupCountryTicket
		.filter(({ countryId }) => countryId !== null)
		.map(ticketObj => {
			const matchOption = options.find(
				option => option.countryId === ticketObj.countryId
			);
			return {
				...ticketObj,
				...matchOption
			};
		});

	const handleSubmitConfirmModalOpen = async ({ userPollTicket, count }) => {
		if (!selectedTeamId || !ticketsNumber) return;
		const selectedTeam = options.find(
			({ countryId }) => countryId === selectedTeamId
		);
		const onSubmit = async () => {
			if (!userInfo.isLogin) return;
			try {
				const res = await api_cupEvent_MultiUserPollTickets({
					userPollTicket,
					count
				});
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					setTicketsNumber("");
					setSelectedTeamId("");
					setSelectedGroup("");
					await getCupEventTicket();
					await getTicketsSummary();
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
								alt=""
							/>
							<div className="flag">
								<img
									src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
									alt=""
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
							<div>Deposit ID</div>
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
							alt=""
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
						{usedTickets.map(
							({ count, countryId, countryName, imageName }) => (
								<div className="record-item" key={countryId}>
									<div className="ticket">
										<img
											className="euro-logo"
											src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo.png`}
											alt=""
										/>
										<div className="flag">
											<img
												src={`${sportsImgUrl}/Country%20Team/${imageName}`}
												alt=""
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
							alt=""
						/>
					</div>
				</div>
			)
		});
	};

	const handlePredictionExpire = () => {
		// 目標時間為6月14日的23點59分59秒（GMT+8）,故utc時間減8小時做判斷
		const targetTimeUtc = moment.utc("2024-06-14 15:59:59");
		const nowUtc = moment.utc();
		return nowUtc.isAfter(targetTimeUtc);
	};

	const isPredictionExpire = handlePredictionExpire();

	useEffect(() => {
		if (userInfo.isLogin) {
			getCupEventTicket();
			getMemberDeposit();
		}
		getCupEventPredictionSetting({ langId: userInfo.langId });
		getTicketsSummary();
	}, [userInfo.isLogin]);

	return (
		<>
			<img
				className="top-bn"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/top-bn-${userInfo.langId}.jpg`}
				alt=""
			/>
			<div className="prediction-wrapper">
				<div className="prediction-title">
					<div>{t("lbl_CupEvent_PredictionOfParticipant")}</div>
					<div>{t("lbl_CupEvent_PredictionOfParticipant_desc")}</div>
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
							alt=""
						/>
					</a>
				</div>
				<PredictList ticketSummary={ticketSummary} />
			</div>
			<div className="ticket-wrapper">
				<TicketOverview
					tickets={tickets}
					onOpen={handleDepositListModalOpen}
				/>
				<TeamSelector
					options={predictionSetting?.selectOptions}
					selectedTeamId={selectedTeamId}
					ticketsNumber={ticketsNumber}
					selectedGroup={selectedGroup}
					isPredictionExpire={isPredictionExpire}
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
				alt=""
			/>
			<div className="reward-content">
				<RewardItem />
				{/* 開獎後將RewardItem切換RewardItemWinner */}
				<Directions
					directionsType={directionsType}
					setDirectionsType={setDirectionsType}
				/>
			</div>
			<div className="footer-bg">
				<img
					src={`${bannerImgUrl}/h5/img/event/eurocup/footer-bg.png`}
					alt=""
				/>
			</div>
		</>
	);
};

export default EuroCup;
