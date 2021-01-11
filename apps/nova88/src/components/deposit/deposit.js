import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment";
import {
	i18nContext,
	popBoxContext,
	bankSlipPopBoxContext,
	userInfoContext
} from "Context";
import { Link, Redirect } from "@reach/router";
import { number_format, isConvert } from "../common/common";
import Step from "./step";
import RecentDatas from "./deposit.recentDatas";
import Loading from "../common/loading";
import PageVerify from "./deposit.pageVerify";
import api from "../../service/api";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay",
	cryptoPay: "cryptoPay"
};

const defPayment = {
	[defPayType.onlineBank]: {
		icon: "icon icon-connection",
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.localBank]: {
		icon: "icon icon-credit-card",
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.mobilePay]: {
		icon: "icon icon-mobile",
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.cryptoPay]: {
		icon: "icon icon-BTC",
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_Instant"
	}
};

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const [allowPayment, setAllowPayment] = useState({
		[defPayType.onlineBank]: false,
		[defPayType.localBank]: false,
		[defPayType.mobilePay]: false
	});

	const [onlineBankingList, setOnlineBankingList] = useState([]);
	const [localBankList, setLocalBankList] = useState([]);
	const [mobilePayList, setMobilePayList] = useState([]);
	const [cryptoPayList, setCryptoPayList] = useState([]);
	const [recentDatas, setRecentDatas] = useState([]);

	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		false
	);

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (userInfo.isLogin) {
			setLoading(true);

			api.payment.GetOnlinePaymentList().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setOnlineBankingList(res.data.data);
						setAllowPayment(prevState => ({
							...prevState,
							[defPayType.onlineBank]:
								res.data.data && res.data.data.length > 0
						}));
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);

			api.payment.GetBankInfoOffList().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setLocalBankList(res.data.data);
						setAllowPayment(prevState => ({
							...prevState,
							[defPayType.localBank]:
								res.data.data && res.data.data.length > 0
						}));
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);

			api.payment.GetMobilePayGroupList().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setMobilePayList(res.data.data);
						setAllowPayment(prevState => ({
							...prevState,
							[defPayType.mobilePay]:
								res.data.data && res.data.data.length > 0
						}));
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);

			api.payment.GetCryptoPayInfoList().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setCryptoPayList(res.data.data);
						setAllowPayment(prevState => ({
							...prevState,
							[defPayType.cryptoPay]:
								res.data.data && res.data.data.length > 0
						}));
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);

			api.payment.GetDepositInfoRecent().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setRecentDatas(res.data.data);
				}
			});
		}
	}, [userInfo.isLogin]);

	const _isConvert = isConvert(userInfo.currencyId);
	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	) => {
		if (pageVerify) {
			const { currencyId, ...restBankInfo } = bankInfo;
			const { accountName, accountNo } = depositRep;
			setbankSlipPopBox(() => ({
				depositTime: `${moment().format(
					"yyyy-MM-DDT"
				)}${moment().format("HH:mm")}`,
				...restBankInfo,
				transId,
				accountNo,
				accountName,
				isOpen: true,
				amount: number_format(amount, _isConvert),
				picFileName,
				refId
			}));
		}
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api.payment.SetDepositCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api.payment
									.GetDepositInfoRecent()
									.then(resRecent => {
										if (resRecent.data.errorCode === 0) {
											setRecentDatas(resRecent.data.data);
										}
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
						}
					}
				);
			};

			const ClickPopBoxCancel = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: "",
				content: i18n.lbl_CancelConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={ClickPopBoxCancel}>
							{i18n.lbl_Cancel}
						</button>
						<button className="orange" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const paymentList = pageVerify
		? Object.keys(defPayment)
				.filter(key => {
					return allowPayment[key];
				})
				.map(key => {
					const item = defPayment[key];
					let list = [];
					if (key === defPayType.onlineBank) {
						list = onlineBankingList;
					} else if (key === defPayType.localBank) {
						list = localBankList;
					} else if (key === defPayType.mobilePay) {
						list = mobilePayList;
					} else if (key === defPayType.cryptoPay) {
						list = cryptoPayList;
					}
					return (
						<div key={`deposit-${key}`}>
							<Link
								to={key}
								className={item.icon}
								state={{
									paymentList: list
								}}
							/>
							<span>{i18n[item.displayKey]}</span>
							<span className="title">{i18n.lbl_CreditTime}</span>
							<span className="creditTime">
								{i18n[item.creditTimeKey]}
							</span>
						</div>
					);
				})
		: null;

	const GetDepositInfoRecent = () => {
		api.payment.GetDepositInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentDatas(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	return redirectPath === null ? (
		loading ? (
			<Loading />
		) : (
			<>
				<Step step={1} />
				<div className="depositType">{paymentList}</div>
				<RecentDatas
					Datas={recentDatas}
					SubmitProof={SubmitProof}
					ClickCancel={ClickCancel}
					ReloadFunc={GetDepositInfoRecent}
				/>
			</>
		)
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default Panel;
