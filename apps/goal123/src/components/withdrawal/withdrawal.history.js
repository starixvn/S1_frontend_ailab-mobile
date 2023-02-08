import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { i18nContext, popBoxContext } from "../common/context";
import {
	api_GetWithdrawalInfoHistory,
	api_SetWithdrawalCancel
} from "../../service/api/payment";
import { number_format } from "../common/common";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import WithdrawalMsg from "../common/popBox.WithdrawalMsg";

const withdrawalStatus = {
	pending: 1,
	onHold: 2,
	verify: 3,
	process: 4,
	cancelled: 5,
	approved: 6,
	rejected: 7,
	toKyc: 8
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);
	const [clickSubmit, setClickSubmit] = useState(false);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	AUTO_FETCHING_DATA(
		api_GetWithdrawalInfoHistory,
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
			api_GetWithdrawalInfoHistory({
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
						} else {
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

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			api_SetWithdrawalCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setGetHistoryState(prevState => {
								const newD = [...prevState];
								const idx = newD.findIndex(
									x => x.transId === transId
								);
								newD[idx].status = 5;
								return newD;
							});
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		};

		const closePopBox = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CancelConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="darkGray" onClick={closePopBox}>
						{i18n.lbl_Cancel}
					</button>
					<button className="lightBlue" onClick={ClickSubmit}>
						{i18n.lbl_Submit}
					</button>
				</div>
			)
		});
	};

	const arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`withdrawalHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				status={item.status}
				ClickCancel={ClickCancel.bind(this, item.transId)}
				canCancel={item.canCancel}
				withdrawalMessageDetail={item.withdrawalMessageDetail}
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

const defIconStatus = {
	0: "pending",
	1: "pending",
	2: "pending",
	3: "approved",
	4: "reject",
	5: "cancelled",
	6: "cancelled",
	7: "pending",
	8: "pending",
	99: "reject"
};

export const TransactionHistory = props => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	let btnGroup = null;
	if (
		props.canCancel !== false &&
		(props.status === withdrawalStatus.pending ||
			props.status === withdrawalStatus.toKyc)
	) {
		btnGroup = (
			<div className="btn-group">
				<button className="darkGray" onClick={props.ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
			</div>
		);
	}

	const handleClickInfoBtn = () => {
		setPopBox({
			isOpen: true,
			custContent: (
				<WithdrawalMsg
					transId={props.transId}
					withdrawalMessageDetail={props.withdrawalMessageDetail}
				/>
			),
			className: "statuspop active"
		});
	};

	return (
		<div className="info infoBlack">
			<ul>
				<li>
					<span className="title">{i18n.lbl_Date} (+07:00)</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Time} (+07:00)</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("hh:mm:ss A")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ID}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(props.amount, false)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span className={defIconStatus[props.status]}>
						{i18n[`lbl_DepositStatus${props.status}`]}
						{props.withdrawalMessageDetail &&
							props.withdrawalMessageDetail.length > 0 && (
								<button
									className="infobtn"
									onClick={handleClickInfoBtn}
								/>
							)}
					</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	);
};

TransactionHistory.defaultProps = {
	createTime: null,
	transId: null,
	amount: null,
	status: null,
	ClickCancel: () => null,
	canCancel: null,
	withdrawalMessageDetail: []
};

TransactionHistory.propTypes = {
	createTime: PropTypes.string,
	transId: PropTypes.string,
	amount: PropTypes.number,
	status: PropTypes.number,
	ClickCancel: PropTypes.func,
	canCancel: PropTypes.bool,
	withdrawalMessageDetail: PropTypes.arrayOf(PropTypes.any)
};

export default Panel;
