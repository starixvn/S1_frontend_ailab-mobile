import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "@reach/router";
import { useLazyGetDepositQuickTransferQuery } from "@ailab-mobile/service";
import moment from "moment";
import { MetaPixelTracker } from "@ailab-mobile/common";
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
import QRPay from "./deposit.qrPay";
import QuickTransfer from "./deposit.quickTransfer";
import {
	api_GetDepositInfoRecent,
	api_GetMobilePayGroupList,
	api_GetBankInfoOffList,
	api_GetAutoChannelBankGroupList,
	api_SetDepositCancel,
	api_payment_GetLoadCardPayGroupList,
	api_payment_CheckDepositSpecialCode,
	api_GetCryptoPayInfoList,
	api_GetQRPayGroupList
} from "../../service/api/payment";
import RecentDatas from "./deposit.recentDatas";
import { number_format } from "../common/common";
import ImportantNote from "./importantNote";
import { useGetDepositPromotionList } from "./promoList";
import { defPayType } from "./deposit.def";
import Options from "./deposit.options";
import { useHandleSelect } from "./hook/useHandleSelect";

const Panel = () => {
	const navigate = useNavigate();
	const { selectedOption, handleSelect } = useHandleSelect();
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
		i18n,
		setPopBox
	});

	const [getDepositQuickTransfer] = useLazyGetDepositQuickTransferQuery();

	PageVerify(userInfo, i18n, setPopBox, navigate, setPageVerify, false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			setLoading(false);
		};
	});

	const GetAllPayment = async () => {
		setLoading(true);
		let defaultSelect = "";

		const payments = {
			[defPayType.mobilePay]: [],
			[defPayType.onlineBank]: [],
			[defPayType.localBank]: [],
			[defPayType.cryptoPay]: [],
			[defPayType.loadCardPay]: [],
			[defPayType.qrPay]: [],
			[defPayType.quickTransfer]: []
		};

		const setDefaultSelect = (currentValue, payType, dataList) =>
			currentValue === "" && dataList.length > 0 ? payType : currentValue;

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
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const res = await api_GetMobilePayGroupList();
			payments[defPayType.mobilePay] = getDataListResult(res);

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.mobilePay,
				payments[defPayType.mobilePay]
			);
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const res = await api_GetAutoChannelBankGroupList();
			payments[defPayType.onlineBank] = getDataListResult(res);

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.onlineBank,
				payments[defPayType.onlineBank]
			);
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const res = await api_payment_GetLoadCardPayGroupList();
			payments[defPayType.loadCardPay] = getDataListResult(res);

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.loadCardPay,
				payments[defPayType.loadCardPay]
			);
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const res = await api_GetCryptoPayInfoList();
			payments[defPayType.cryptoPay] = getDataListResult(res);

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.cryptoPay,
				payments[defPayType.cryptoPay]
			);
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const res = await api_GetQRPayGroupList();
			payments[defPayType.qrPay] = getDataListResult(res);

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.qrPay,
				payments[defPayType.qrPay]
			);
			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		try {
			const {
				data: depositQuickTransferResponse
			} = await getDepositQuickTransfer();
			const quickTransferGroupList =
				depositQuickTransferResponse?.data?.QuickTransfer?.data || [];

			payments[defPayType.quickTransfer] = quickTransferGroupList;

			defaultSelect = setDefaultSelect(
				defaultSelect,
				defPayType.quickTransfer,
				payments[defPayType.quickTransfer]
			);

			if (res.data.errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${res.data.errorCode}] ${res.data.message}`
				});
			}
		} catch (error) {}

		if (isMountedRef.current) {
			setLoading(false);
			setPaymentList(payments);
			handleSelect(defaultSelect);
		}
	};

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

	const handleSubmit = () => {
		MetaPixelTracker("depositSubmit");
	};

	let content = (
		<MobilePay
			payType={defPayType.mobilePay}
			paymentList={paymentList[defPayType.mobilePay] ?? []}
			promoList={promoList}
			checkDepositSpecialCode={checkDepositSpecialCode}
			GetAllPayment={GetAllPayment}
			onSubmit={handleSubmit}
		/>
	);

	if (selectedOption === defPayType.localBank) {
		content = (
			<LocalBank
				payType={selectedOption}
				paymentList={paymentList[defPayType.localBank] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				onSubmit={handleSubmit}
			/>
		);
	} else if (selectedOption === defPayType.onlineBank) {
		content = (
			<OnlineBanking
				payType={selectedOption}
				paymentList={paymentList[defPayType.onlineBank] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				onSubmit={handleSubmit}
			/>
		);
	} else if (selectedOption === defPayType.loadCardPay) {
		content = (
			<LoadCardPay
				payType={selectedOption}
				paymentList={paymentList[defPayType.loadCardPay] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				onSubmit={handleSubmit}
			/>
		);
	} else if (selectedOption === defPayType.cryptoPay) {
		content = (
			<CryptoPay
				payType={selectedOption}
				paymentList={paymentList[defPayType.cryptoPay] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				onSubmit={handleSubmit}
			/>
		);
	} else if (selectedOption === defPayType.qrPay) {
		content = (
			<QRPay
				paymentList={paymentList[defPayType.qrPay] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				GetAllPayment={GetAllPayment}
				onSubmit={handleSubmit}
			/>
		);
	} else if (selectedOption === defPayType.quickTransfer) {
		content = (
			<QuickTransfer
				payType={selectedOption}
				paymentList={paymentList[defPayType.quickTransfer] ?? []}
				promoList={promoList}
				checkDepositSpecialCode={checkDepositSpecialCode}
				onSubmit={handleSubmit}
			/>
		);
	}

	const [isCancelSubmit, setIsCancelSubmit] = useState(false);
	useEffect(() => {
		if (userInfo.isLogin) {
			GetAllPayment();

			api_GetDepositInfoRecent().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setRecentDatas(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
		setIsCancelSubmit(false);
	}, [userInfo.isLogin, isCancelSubmit]);

	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId,
		isShowReceiptInfo = true
	) => {
		// if (pageVerify) {
		const { currencyId, ...restBankInfo } = bankInfo || {};
		const { accountName, accountNo, code } = depositRep || {};
		setbankSlipPopBox(() => ({
			depositTime: `${moment().format("yyyy-MM-DDT")}${moment().format(
				"HH:mm"
			)}`,
			...restBankInfo,
			transId,
			accountNo,
			accountName,
			code,
			isOpen: true,
			amount: number_format(amount, false, 0),
			picFileName,
			refId,
			disableSubmit: false,
			isShowReceiptInfo
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
								api_GetDepositInfoRecent().then(
									resRecent => {
										if (resRecent.data.errorCode === 0) {
											setRecentDatas(resRecent.data.data);
										} else {
											setPopBox({
												isOpen: true,
												content: `[${resRecent.data.errorCode}] ${resRecent.data.message}`
											});
										}
									},
									() => {
										setPopBox({
											isOpen: true,
											content: i18n.msg_ApiServerError
										});
									}
								);
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
						<button
							className="darkGray"
							onClick={ClickPopBoxCancel}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="lightBlue"
							onClick={async () => {
								await ClickSubmit();
								setIsCancelSubmit(true);
							}}>
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
				}
			}
		);
	};

	return (
		<>
			<div className="depositModule_mobile open">
				<Options
					i18n={i18n}
					selectedOption={selectedOption}
					handleSelect={handleSelect}
					paymentList={paymentList}
				/>
				{content}
			</div>
			<RecentDatas
				Datas={recentDatas}
				SubmitProof={SubmitProof}
				ClickCancel={ClickCancel}
				GetDepositInfoRecent={GetDepositInfoRecent}
			/>
			<ImportantNote i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

export default Panel;
