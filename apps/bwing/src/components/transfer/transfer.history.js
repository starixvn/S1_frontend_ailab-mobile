import React, { useState, useContext, useRef, useEffect } from "react";
import moment from "moment";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetTransferHistory } from "../../service/api/tp";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import Loading from "../common/loading";

const transferDirection = (direction, displayMainWallet, displaySabaWallet) => {
	let startWallet = "";
	let endWallet = "";

	if (direction === 1) {
		startWallet = displayMainWallet;
		endWallet = displaySabaWallet;
	} else {
		startWallet = displaySabaWallet;
		endWallet = displayMainWallet;
	}
	return { startWallet, endWallet };
};

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api_GetTransferHistory,
		filterData,
		pageInfo,
		setGetHistoryState,
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
			api_GetTransferHistory({
				...transactionData,
				PageNumber: 1
			}).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}] ${message}`
							});
						} else if (isMountedRef.current) {
							setGetHistoryState(response.data.data);
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

	const arr = getHistoryState?.map(item => {
		const _transferDirection = transferDirection(
			item.direction,
			i18n.lbl_MainWallet,
			i18n.lbl_Wallet_Saba
		);
		return (
			<TransactionHistory
				key={`transferHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				_isConvert={_isConvert}
				amount={number_format(item.amount, false)}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				i18n={i18n}
				className="info transfer"
				status={item.status}
			/>
		);
	});

	return (
		<div className="depositBox">
			<HistoryFilter submitHandler={submitHandler} />
			{loading ? (
				<Loading />
			) : (
				<>
					{getHistoryState ? (
						<>
							<div
								className="textArea"
								style={{ padding: "2vw 0 4vw 2vw" }}>
								{i18n.msg_AmountFormatTip}
							</div>
							<div className="recent open">
								<div className="recentTransactions">
									<ReloadSpin
										func={submitHandler.bind(
											this,
											filterData?.StartDate,
											filterData?.EndDate,
											true
										)}
									/>
								</div>
								{getHistoryState.length > 0 ? (
									<div className="infoList">{arr}</div>
								) : (
									<div className="not-found">
										<i className="icon icon-warning" />
										<p>{i18n.msg_NoData}</p>
									</div>
								)}
							</div>
						</>
					) : null}
				</>
			)}
		</div>
	);
};

export const TransactionHistory = props => {
	const _status =
		props.status === 0 ? props.i18n.lbl_Success : props.i18n.lbl_Fail;
	const _statusColor = props.status === 0 ? "textGreen" : "textGray";

	return (
		<div className={props.className}>
			<ul>
				<li>
					<span className="title">{props.i18n.lbl_Date}</span>
					<span>
						{moment(props.createTime).format("MM/DD/YYYY(Z)")}
					</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Time}</span>
					<span>{moment(props.createTime).format("hh:mm:ss A")}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_ID}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Amount}</span>
					<span>{props.amount}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Status}</span>
					<span className={_statusColor}>{_status}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Direction}</span>
					<span>
						<span>{`${props.startWallet}  >`}</span>
						<span>{props.endWallet}</span>
					</span>
				</li>
			</ul>
			<div className="btn-group" />
		</div>
	);
};

export default Panel;
