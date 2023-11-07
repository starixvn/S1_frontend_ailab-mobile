import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	bankSlipPopBoxContext
} from "../common/context";
import {
	api_GetDepositInfoHistory,
	api_SetDepositCancel
} from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import BankSlip from "./bankSlip";
import DepositMsg from "../common/popBox.DepositMsg";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);

	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api_GetDepositInfoHistory,
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
			} else {
				transactionData = {
					StartDate: moment(startDay).zone("+07:00").unix(),
					EndDate: moment(endDay).endOf("day").zone("+07:00").unix()
				};
				setFilterData(transactionData);
			}

			setFilterData(transactionData);
			setClickSubmit(true);
			api_GetDepositInfoHistory({
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
									pageNumber: response.data.pageNumber,
									donePage: [1]
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
			api_SetDepositCancel(transId).then(
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

		const ClickPopBoxCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CancelConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="cancel" onClick={ClickSubmit}>
						{i18n.lbl_Yes}
					</button>
					<button className="submit" onClick={ClickPopBoxCancel}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const SubmitProof = ({
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		receiptInfo,
		refId
	}) => {
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo } = depositRep;
		setbankSlipPopBox(() => ({
			depositTime: `${moment().format("yyyy-MM-DDT")}${moment().format(
				"HH:mm"
			)}`,
			...restBankInfo,
			transId,
			accountNo,
			accountName,
			isOpen: true,
			amount: number_format(amount, _isConvert),
			picFileName,
			receiptInfo,
			refId
		}));
	};

	const arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`depositHistory-${item.transId}`}
				{...item}
				className="info infoBlack"
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(this, { ...item })}
			/>
		);
	});

	const history = getHistoryState ? (
		<>
			<div className="textArea" style={{ padding: "2vw 0 4vw 2vw" }}>
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
	) : null;

	return (
		<>
			<div className="depositBox">
				<HistoryFilter submitHandler={submitHandler} />
				{loading ? <Loading /> : history}
			</div>
			<BankSlip />
		</>
	);
};

const statusClassName = {
	1: "textYellow",
	3: "textGreen",
	4: "textRed",
	5: "textGray"
};

export const TransactionHistory = props => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	let btnGroup = null;
	if (props.depositType === 3 && (props.status === 1 || props.status === 7)) {
		btnGroup = (
			<div className="btn-group">
				<button className="blue" onClick={props.SubmitProof}>
					{i18n.lbl_SubmitProof}
				</button>
				<button className="gray openPopup" onClick={props.ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
			</div>
		);
	}

	const handleClickInfoBtn = () => {
		setPopBox({
			isOpen: true,
			custContent: (
				<DepositMsg
					transId={props.transId}
					depositMessageDetail={props.depositMessageDetail}
				/>
			),
			className: "statuspop active"
		});
	};

	return (
		<div className={props.className}>
			<ul>
				<li>
					<span className="title">{i18n.lbl_Date} (+07:00)</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07: 00")
							.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Time} (+07:00)</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07: 00")
							.format("hh:mm:ss A")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ID}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Method}</span>
					<span>{i18n[`lbl_DepositType${props.depositType}`]}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(props.amount, false)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span className={statusClassName[props.status]}>
						{i18n[`lbl_DepositStatus${props.status}`]}
						{props.depositMessageDetail &&
							props.depositMessageDetail.length > 0 && (
								<button
									className="infobtn"
									onClick={handleClickInfoBtn}
								/>
							)}
					</span>
				</li>
			</ul>
			{props.thirdId && (
				<div>
					<div className="title">{i18n.lbl_Action}</div>
					<div>{props.thirdId}</div>
				</div>
			)}
			{btnGroup}
		</div>
	);
};

TransactionHistory.defaultProps = {
	depositType: null,
	className: null,
	createTime: null,
	transId: null,
	amount: null,
	status: null,
	SubmitProof: () => null,
	ClickCancel: () => null,
	thirdId: null,
	depositMessageDetail: []
};

TransactionHistory.propTypes = {
	depositType: PropTypes.number,
	className: PropTypes.string,
	createTime: PropTypes.string,
	transId: PropTypes.string,
	amount: PropTypes.number,
	status: PropTypes.number,
	SubmitProof: PropTypes.func,
	ClickCancel: PropTypes.func,
	thirdId: PropTypes.string,
	depositMessageDetail: PropTypes.arrayOf(PropTypes.any)
};

export default Panel;
