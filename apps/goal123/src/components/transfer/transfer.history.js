import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetTransferHistory } from "../../service/api/tp";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import Loading from "../common/loading";

const transferDirection = (
	direction,
	displayMainWallet,
	displayAdjustment,
	isAdjustment,
	tpName
) => {
	let startWallet = "";
	let endWallet = "";
	if (direction === 1) {
		if (isAdjustment) {
			startWallet = tpName;
			endWallet = displayAdjustment;
		} else {
			startWallet = displayMainWallet;
			endWallet = tpName;
		}
	} else if (isAdjustment) {
		startWallet = tpName;
		endWallet = displayAdjustment;
	} else {
		startWallet = tpName;
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

	const submitHandler = ({ startDay, endDay, isUnix, isLoading }) => {
		if (isLoading) {
			setLoading(true);
		}

		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDay).unix(),
					EndDate: moment(endDay).endOf("day").unix()
				};
				setFilterData(transactionData);
			} else {
				transactionData = {
					StartDate: moment(startDay).zone("+07:00").unix(),
					EndDate: moment(endDay).endOf("day").zone("+07:00").unix()
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
			i18n.lbl_Adjustment,
			item.isAdjustment,
			item.tpName
		);
		return (
			<TransactionHistory
				key={`transferHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				_isConvert={_isConvert}
				amount={item.amount}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				i18n={i18n}
				className="info transfer"
				memo={item.memo}
				status={item.status}
			/>
		);
	});

	if (loading) return <Loading />;

	return (
		<>
			<HistoryFilter submitHandler={submitHandler} />
			{getHistoryState ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history" />
							{i18n.lbl_TransactionHistory}
						</div>
						<ReloadSpin
							func={submitHandler.bind(this, {
								startDay: filterData?.StartDate,
								endDay: filterData?.EndDate,
								isUnix: true
							})}
						/>
					</div>
					{getHistoryState.length > 0 ? (
						<>
							<div className="txt-blue2">
								{i18n.msg_AmountFormatTip}
							</div>
							<div className="infoList">{arr}</div>
						</>
					) : (
						<div className="nodata icon icon-nodata">
							<div className="txt-white">{i18n.msg_NoData}</div>
						</div>
					)}
				</div>
			) : null}
		</>
	);
};

export const TransactionHistory = props => {
	const _status =
		props.status === 0 ? props.i18n.lbl_Success : props.i18n.lbl_Fail;
	return (
		<div className={props.className}>
			<ul>
				<li>
					<span className="title">
						{props.i18n.lbl_Date} (+07:00)
					</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">
						{props.i18n.lbl_Time} (+07:00)
					</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("hh:mm:ss A")}
					</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_ID}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Status}</span>
					<span>{_status}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Amount}</span>
					<span>{number_format(props.amount, false)}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Direction}</span>
					<span>
						<span>{props.startWallet}</span>
						{props.endWallet === props.i18n.lbl_Adjustment ? (
							<i>&nbsp;&nbsp;</i>
						) : (
							`>`
						)}
						<span>{props.endWallet}</span>
					</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_Memo}</span>
					<span>
						<span>{props.memo}</span>
					</span>
				</li>
			</ul>
			<div className="btn-group" />
		</div>
	);
};

TransactionHistory.defaultProps = {
	i18n: null,
	className: null,
	createTime: null,
	status: null,
	transId: null,
	amount: null,
	startWallet: null,
	endWallet: null,
	memo: null
};

TransactionHistory.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	className: PropTypes.string,
	createTime: PropTypes.string,
	status: PropTypes.number,
	transId: PropTypes.string,
	amount: PropTypes.string,
	startWallet: PropTypes.string,
	endWallet: PropTypes.string,
	memo: PropTypes.string
};

export default Panel;
