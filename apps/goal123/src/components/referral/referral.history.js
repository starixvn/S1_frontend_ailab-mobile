import React, { useState, useContext, useRef, useEffect } from "react";
import { i18nContext, popBoxContext, loadingContext } from "Context";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useLazyGetRefFriendDetailQuery } from "@ailab-mobile/service";
import ReloadSpin from "../common/reloadSpin";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import { api_account_GetRefFriendList } from "../../service/api/account";
import { number_format } from "../common/common";
import ReferralHistoryDetails from "./referral.history.details";

const Panel = () => {
	const { t } = useTranslation();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [history, setHistory] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [processing, setProcessing] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [isDetailsActive, setIsDetailsActive] = useState(false);
	const isMountedRef = useRef(null);

	const [
		getRefFriendDetail,
		{ data: { data: referralDetail = [] } = {} }
	] = useLazyGetRefFriendDetailQuery();

	const handleRefFriendDetail = async payload => {
		try {
			await getRefFriendDetail(payload).unwrap();
			setIsDetailsActive(true);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: i18n.msg_ApiServerError
			});
		}
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api_account_GetRefFriendList,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const submitHandler = ({ startDay, endDay, isUnix }) => {
		setLoading(true);

		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDay),
					EndDate: moment(endDay).endOf("day")
				};
				setFilterData(transactionData);
			} else {
				transactionData = filterData;
			}

			setClickSubmit(true);
			api_account_GetRefFriendList({
				StartDate: moment(transactionData.StartDate)
					.zone("+07:00")
					.unix(),
				EndDate: moment(transactionData.EndDate).zone("+07:00").unix(),
				PageNumber: 1,
				PageSize: 10
			}).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}] ${message}`
							});
						} else {
							setHistory(response.data.data);
							if (
								response.data.totalPages >=
								response.data.pageNumber
							) {
								setPageInfo(() => ({
									totalPages: response.data.totalPages,
									pageNumber: response.data.pageNumber
								}));
							}
						}
						setProcessing(false);
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
						setLoading(false);
					}
				}
			);
		}
	};

	const arr = history?.map(
		({ settledDate, totalDeposit, rewardAmount }, index) => {
			return (
				<div className="info" key={settledDate}>
					<ul>
						<li>
							<span className="title">NO.</span>
							<span>{index + 1}</span>
						</li>
						<li>
							<span className="title">
								{t("lbl_Date")} (+7:00)
							</span>
							<span>
								{moment(settledDate, "YYYY-MM-DDThh:mm:ssZ")
									.zone("+07:00")
									.format("MM/DD/YYYY")}
							</span>
						</li>
						<li>
							<span className="title">
								{t("lbl_TotalDeposit")}
							</span>
							<span>{number_format(totalDeposit, false)}</span>
						</li>
						<li>
							<span className="title">
								{t("lbl_RewardAmount")}
							</span>
							<span>{number_format(rewardAmount, false)}</span>
						</li>
						<li>
							<span className="title">{t("lbl_Status")}</span>
						</li>
						<div className="btn-group">
							<a
								className="orange"
								onClick={async () => {
									const payload = {
										startDate: moment(settledDate).unix(),
										endDate: moment(settledDate)
											.endOf("day")
											.unix(),
										pageNumber: 1,
										pageSize: 10
									};

									await handleRefFriendDetail(payload);
								}}>
								{t("lbl_Details")}
							</a>
						</div>
					</ul>
				</div>
			);
		}
	);

	return (
		<>
			<HistoryFilter submitHandler={submitHandler} />
			{history ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history" />
							{i18n.lbl_ReferralHistory}
						</div>
						<ReloadSpin
							func={submitHandler.bind(this, {
								startDay: filterData?.StartDate,
								endDay: filterData?.EndDate,
								isUnix: true
							})}
						/>
					</div>
					{history.length > 0 ? (
						<div className="infoList">{arr}</div>
					) : (
						<div className="nodata icon icon-nodata">
							<div className="txt-white">{i18n.msg_NoData}</div>
						</div>
					)}
				</div>
			) : null}

			<ReferralHistoryDetails
				referralDetail={referralDetail}
				active={isDetailsActive}
				setIsDetailsActive={setIsDetailsActive}
			/>
		</>
	);
};

export default Panel;
