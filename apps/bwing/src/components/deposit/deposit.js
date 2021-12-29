import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "@reach/router";
import moment from "moment";
import {
	i18nContext,
	userInfoContext,
	loadingContext,
	bankSlipPopBoxContext,
	popBoxContext
} from "../common/context";
import PageVerify from "./deposit.pageVerify";
import MobilePay from "./deposit.mobilePay";
import OnlineBanking from "./deposit.onlineBanking";
import LocalBank from "./deposit.localBank";
import LoadCardPay from "./deposit.loadCardPay";
import CryptoPay from "./deposit.cryptoPay";
import {
	api_GetDepositInfoRecent,
	api_GetMobilePayGroupList,
	api_GetBankInfoOffList,
	api_GetOnlinePaymentList,
	api_SetDepositCancel,
	api_payment_GetLoadCardPayGroupList,
	api_payment_CheckDepositSpecialCode,
	api_GetCryptoPayInfoList
} from "../../service/api/payment";
import RecentDatas from "./deposit.recentDatas";
import { number_format, isConvert } from "../common/common";
import ImportantNote from "./importantNote";
import { useGetDomainList } from "../hook/useGetDomainList";
import { useGetDepositPromotionList } from "./promoList";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay",
	loadCardPay: "loadCardPay",
	cryptoPay: "cryptoPay"
};

const defPayment = {
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.mobilePay]: {
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.onlineBank]: {
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.loadCardPay]: {
		displayKey: "lbl_TopUpCard",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.cryptoPay]: {
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_5mins"
	}
};

const useHandleSelect = defaultSelect => {
	const [selected, setSelected] = useState(defaultSelect ?? "");

	const HandleSelect = value => {
		setSelected(value);
	};

	return { selected, HandleSelect };
};

const Tab = ({ i18n, selected, HandleSelect, paymentList }) => {
	const rows = Object.keys(defPayment)
		.filter(key => paymentList[key]?.length > 0)
		.map(key => {
			const pay = defPayment[key];
			return (
				<div
					key={`deposit-full-${pay.displayKey}`}
					className={selected === key ? "open" : ""}
					onClick={HandleSelect.bind(this, key)}>
					{i18n[pay.displayKey]}
				</div>
			);
		});

	return <div className="switchTag">{rows}</div>;
};

const Panel = () => {
	const navigate = useNavigate();
	const { selected, HandleSelect } = useHandleSelect();
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const { setPopBox } = useContext(popBoxContext);

	const [paymentList, setPaymentList] = useState({});
	const [recentDatas, setRecentDatas] = useState([]);

	const [pageVerify, setPageVerify] = useState(true);
	const { promoList } = useGetDepositPromotionList({
		langId: userInfo.langId,
		i18n
	});

	useGetDomainList({
		setPopBox,
		userInfo,
		i18n
	});

	PageVerify(userInfo, i18n, setPopBox, navigate, setPageVerify, false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const checkDepositSpecialCode = async specialCode =>
		api_payment_CheckDepositSpecialCode(specialCode).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode, data } = res.data;

				// eslint-disable-next-line consistent-return
				if (errorCode === 0) return data.bonusCode;

				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: `[${errorCode}]${message}`
				});
			},
			() => {
				if (!isMountedRef.current) return;

				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ApiServerError
				});
			}
		);

	let content = (
		<MobilePay
			payType={defPayType.mobilePay}
			creditTimeKey={defPayment[defPayType.mobilePay].creditTimeKey}
			paymentList={paymentList[defPayType.mobilePay] ?? []}
			promoList={promoList}
			checkDepositSpecialCode={checkDepositSpecialCode}
		/>
	);

	if (selected === defPayType.localBank) {
		content = (
			<LocalBank
				payType={selected}
				creditTimeKey={defPayment[defPayType.localBank].creditTimeKey}
				paymentList={paymentList[defPayType.localBank] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.onlineBank) {
		content = (
			<OnlineBanking
				payType={selected}
				creditTimeKey={defPayment[defPayType.onlineBank].creditTimeKey}
				paymentList={paymentList[defPayType.onlineBank] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.loadCardPay) {
		content = (
			<LoadCardPay
				payType={selected}
				creditTimeKey={defPayment[defPayType.loadCardPay].creditTimeKey}
				paymentList={paymentList[defPayType.loadCardPay] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.cryptoPay) {
		content = (
			<CryptoPay
				payType={selected}
				creditTimeKey={defPayment[defPayType.cryptoPay].creditTimeKey}
				paymentList={paymentList[defPayType.cryptoPay] ?? []}
				promoList={promoList}
			/>
		);
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			const GetAllPayment = async () => {
				setLoading(true);
				let defaultSelect = "";

				const payments = {
					[defPayType.mobilePay]: [],
					[defPayType.onlineBank]: [],
					[defPayType.localBank]: [],
					[defPayType.loadCardPay]: [],
					[defPayType.cryptoPay]: []
				};

				const setDefaultSelect = (currentValue, payType, dataList) =>
					currentValue === "" && dataList.length > 0
						? payType
						: currentValue;

				const getDataListResult = res =>
					res.data.errorCode === 0 && res.data.data?.length > 0
						? res.data.data
						: [];

				try {
					const res = await api_GetBankInfoOffList();
					payments[defPayType.localBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.localBank,
						payments[defPayType.localBank]
					);
				} catch (error) {}

				try {
					const res = await api_GetMobilePayGroupList();
					payments[defPayType.mobilePay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.mobilePay,
						payments[defPayType.mobilePay]
					);
				} catch (error) {}

				try {
					const res = await api_GetOnlinePaymentList();
					payments[defPayType.onlineBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.onlineBank,
						payments[defPayType.onlineBank]
					);
				} catch (error) {}

				try {
					const res = await api_payment_GetLoadCardPayGroupList();
					payments[defPayType.loadCardPay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.loadCardPay,
						payments[defPayType.loadCardPay]
					);
				} catch (error) {}

				try {
					const res = await api_GetCryptoPayInfoList();
					payments[defPayType.cryptoPay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.cryptoPay,
						payments[defPayType.cryptoPay]
					);
				} catch (error) {}

				if (isMountedRef.current) {
					setLoading(false);
					setPaymentList(payments);
					HandleSelect(defaultSelect);
				}
			};

			GetAllPayment();

			api_GetDepositInfoRecent().then(res => {
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
		// if (pageVerify) {
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
			amount: number_format(amount, _isConvert, 0),
			picFileName,
			refId
		}));
		// }
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api_SetDepositCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetDepositInfoRecent().then(resRecent => {
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
						<button className="Cancel" onClick={ClickPopBoxCancel}>
							{i18n.lbl_Cancel}
						</button>
						<button className="blue" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const GetDepositInfoRecent = () => {
		api_GetDepositInfoRecent().then(
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

	return (
		<>
			<Tab
				i18n={i18n}
				selected={selected}
				HandleSelect={HandleSelect}
				paymentList={paymentList}
			/>
			{content}
			<RecentDatas
				Datas={recentDatas}
				SubmitProof={SubmitProof}
				ClickCancel={ClickCancel}
				ReloadFunc={GetDepositInfoRecent}
			/>
			<ImportantNote langId={userInfo.langId} i18n={i18n} />
		</>
	);
};

export default Panel;
