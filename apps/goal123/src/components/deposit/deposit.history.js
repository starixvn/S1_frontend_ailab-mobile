import React, { useState, useContext, useRef, useEffect } from "react";
import moment from "moment";
import {
	AllowUploadReceiptType,
	WithReceiptInfoType
} from "@ailab-mobile/common";
import PropTypes from "prop-types";
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
import Layout from "../common/layout";
import TabPage from "../common/tabPage";
import path from "../../path";
import DepositMsg from "../common/popBox.DepositMsg";

const defTabs = {
	default: {
		to: `/${path.deposit.root}`,
		displayKey: "lbl_Deposit",
		excludeMath: path.depositHistory.root
	},
	History: {
		to: `/${path.depositHistory.root}`,
		displayKey: "lbl_DepositHistory"
	}
};

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
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false,
		depositTime: null,
		picFileName: "",
		refId: "",
		receipt: null
	});

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

			setFilterData(transactionData);
			setClickSubmit(true);
			api_GetDepositInfoHistory({
				...transactionData,
				PageNumber: 1
			}).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode } = response.data;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${response.data.errorCode}] ${response.data.message}`
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

	const SubmitProof = ({
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId,
		isShowReceiptInfo
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
			refId,
			isShowReceiptInfo
		}));
	};

	const arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`depositHistory-${item.transId}`}
				{...item}
				className="info"
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(this, { ...item })}
			/>
		);
	});

	if (loading) return <Loading />;

	return (
		<Layout title={i18n.lbl_Deposit} mainClass="main depositmain">
			<bankSlipPopBoxContext.Provider
				value={{ bankSlipPopBox, setbankSlipPopBox }}>
				<TabPage defTabs={defTabs}>
					<HistoryFilter submitHandler={submitHandler} />
					{getHistoryState && (
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
									<div className="txt-white">
										{i18n.msg_NoData}
									</div>
								</div>
							)}
						</div>
					)}
				</TabPage>
				<BankSlip />
			</bankSlipPopBoxContext.Provider>
		</Layout>
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
	const isShowReceiptInfo = WithReceiptInfoType.includes(props.depositType);

	let btnGroup = null;
	if (
		// 存款方式
		AllowUploadReceiptType.includes(props.depositType) &&
		// 存款狀態
		(props.status === 1 || props.status === 7)
	) {
		btnGroup = (
			<div className="btn-group">
				<button className="darkGray" onClick={props.ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
				<button
					className="lightBlue openPopup"
					onClick={() => props.SubmitProof(isShowReceiptInfo)}>
					{i18n.lbl_SubmitProof}
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
					<span className={defIconStatus[props.status]}>
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
	className: "",
	thirdId: null,
	depositMessageDetail: []
};

TransactionHistory.propTypes = {
	depositType: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired,
	ClickCancel: PropTypes.func.isRequired,
	SubmitProof: PropTypes.func.isRequired,
	className: PropTypes.string,
	createTime: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	thirdId: PropTypes.string,
	depositMessageDetail: PropTypes.arrayOf(PropTypes.any)
};

export default Panel;
