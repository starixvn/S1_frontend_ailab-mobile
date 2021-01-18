import React, { useState, useContext, useRef, useEffect } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	loadingContext
} from "Context";
import moment from "moment";
import { isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import api from "../../service/api";
import { Detail } from "./referral.history.detail";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [history, setHistory] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [processing, setProcessing] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api.account.GetRefFriendList,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const submitHandler = (startDay, endDay, isUnix) => {
		setLoading(true);

		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDay).unix(),
					EndDate: moment(endDay).endOf("day").unix()
				};
				setFilterData(transactionData);
			}
			setClickSubmit(true);
			api.account
				.GetRefFriendList({
					...transactionData,
					PageNumber: 1,
					PageSize: 10
				})
				.then(
					response => {
						if (isMountedRef.current) {
							const { errorCode } = response.data;
							if (errorCode !== 0) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: response.data.message
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
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
							setProcessing(false);
							setLoading(false);
						}
					}
				);
		}
	};

	const arr = history?.map(data => {
		return (
			<Detail
				key={`referral-history-${data.custId}`}
				i18n={i18n}
				_isConvert={_isConvert}
				{...data}
			/>
		);
	});

	return (
		<>
			<HistoryFilter submitHandler={submitHandler} />
			{history ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history" />
							{i18n.lbl_TransactionHistory}
						</div>
						<ReloadSpin
							func={submitHandler.bind(
								this,
								filterData?.StartDate,
								filterData?.EndDate,
								true
							)}
						/>
					</div>
					{history.length > 0 ? (
						<div className="infoList">{arr}</div>
					) : (
						<div className="nodata icon icon-nodata">
							<div className="txt-white">{i18n.msg_NoData}</div>
						</div>
					)}{" "}
				</div>
			) : null}
		</>
	);
};

export default Panel;
