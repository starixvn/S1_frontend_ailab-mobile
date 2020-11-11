import React, { useState, useContext, useRef, useEffect } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	bankSlipPopBoxContext
} from "Context";
import {
	number_format,
	isConvert,
	autoFetchingData as AUTO_FETCHING_DATA,
	Loading
} from "@ailab-mobile/common";
import moment from "moment";
import { Filter } from "./components/filter";
import { Detail } from "./components/detail";
import { StatementDetail } from "./components/detail.statement";
import { transferDirection } from "./common/common";
import { Content } from "./components/content";
import { defTransactionType } from "./common/def";

export const History = ({ transactionType, GetHistory, SetCancel }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [redirectPath, setRedirectPath] = useState(null);

	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin, setRedirectPath]);

	AUTO_FETCHING_DATA(
		GetHistory,
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

			setFilterData(transactionData);
			setClickSubmit(true);
			GetHistory({
				...transactionData,
				PageNumber: 1
			}).then(
				response => {
					if (isMountedRef.current) {
						const errorCode = response.data.errorCode;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: response.data.message
							});
						} else {
							if (isMountedRef.current) {
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
						}

						setProcessing(false);
						setLoading(false);
					}
				},
				err => {
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

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			SetCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setGetHistoryState(prevState => {
								let newD = [...prevState];
								let idx = newD.findIndex(
									x => x.transId === transId
								);
								newD[idx].status = 5;
								return newD;
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		};

		const ClickCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: "",
			content: i18n["lbl_CancelConfirm"],
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={ClickCancel}>
						{i18n["lbl_Cancel"]}
					</button>
					<button className="orange" onClick={ClickSubmit}>
						{i18n["lbl_Submit"]}
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
		refId
	}) => {
		let { currencyId, ...restBankInfo } = bankInfo;
		let { accountName, accountNo } = depositRep;
		setbankSlipPopBox(() => ({
			depositTime: `${moment().format("yyyy-MM-DDT")}${moment().format(
				"HH:mm"
			)}`,
			...restBankInfo,
			transId: transId,
			accountNo: accountNo,
			accountName: accountName,
			isOpen: true,
			amount: number_format(amount, _isConvert),
			picFileName: picFileName,
			refId: refId
		}));
	};

	let arr = getHistoryState?.map(item => {
		const _transferDirection = transferDirection(
			item.direction,
			i18n.lbl_MainWallet,
			i18n.lbl_Wallet_Saba
		);
		return transactionType !== defTransactionType.statement ? (
			<Detail
				key={`${transactionType}-history-${item.transId}`}
				transactionType={transactionType}
				{...item}
				i18n={i18n}
				className={
					transactionType === defTransactionType.transfer
						? "info transfer"
						: "info"
				}
				_isConvert={_isConvert}
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(this, { ...item })}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
			/>
		) : (
			<StatementDetail
				key={`${transactionType}-history-${item.refTransId}-${item.createTime}`}
				{...item}
				_isConvert={_isConvert}
				direction={item.direction === 1 ? "+" : "-"}
				i18n={i18n}
			/>
		);
	});

	return redirectPath !== null ? (
		<Redirect to="/" noThrow />
	) : (
		<>
			<Filter submitHandler={submitHandler} />
			{loading ? (
				<Loading />
			) : (
				<Content
					i18n={i18n}
					isRecentDatas={false}
					submitHandler={submitHandler}
					filterData={filterData}
					getHistoryState={getHistoryState}
					arr={arr}
				/>
			)}
		</>
	);
};
