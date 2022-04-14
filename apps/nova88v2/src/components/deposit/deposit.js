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
import CryptoPay from "./deposit.cryptoPay";
import AutoDeposit from "./deposit.autoDeposit";
import LinePay from "./deposit.linePay";
import api from "../../service/api";
import RecentDatas from "./deposit.recentDatas";
import { number_format, isConvert, defCurrenyId } from "../common/common";
import ImportantNote from "./importantNote";
import UserPaymentSwitch, { useGetUserPaymentData } from "./userPaymentData";
import { useGetDomainList } from "../hook/useGetDomainList";
import { useGetDepositPromotionList } from "./promoList";

const defPayType = {
	autoDeposit: "autoDeposit",
	localBank: "localBank",
	onlineBank: "onlineBank",
	mobilePay: "mobilePay",
	cryptoPay: "cryptoPay",
	linePay: "linePay"
};

const defPayment = {
	[defPayType.autoDeposit]: {
		displayKey: "lbl_AutoDeposit",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.linePay]: {
		displayKey: "lbl_Line",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.onlineBank]: {
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.mobilePay]: {
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.cryptoPay]: {
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_Instant"
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
		.filter(
			key => paymentList[key]?.length > 0 || paymentList[key]?.openLink
		)
		.map(key => {
			const pay = defPayment[key];
			return (
				<div
					key={`deposit-full-${pay.displayKey}`}
					className={selected === key ? "active" : ""}
					onClick={HandleSelect.bind(this, key)}>
					{i18n[pay.displayKey]}
				</div>
			);
		});

	return <div className="switchTag">{rows}</div>;
};

const Panel = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const { setPopBox } = useContext(popBoxContext);
	const { selected, HandleSelect } = useHandleSelect();
	const {
		userPaymentData,
		handleUserPaymentData,
		userPaymentSwitch,
		handleUserPaymentSwitch
	} = useGetUserPaymentData({
		userInfo
	});
	const [paymentList, setPaymentList] = useState({});
	const [recentDatas, setRecentDatas] = useState([]);
	const [pageVerify, setPageVerify] = useState(true);
	const { isDomainPopOpen } = useGetDomainList({
		setPopBox,
		userInfo,
		i18n
	});
	const { promoList } = useGetDepositPromotionList({
		langId: userInfo.langId,
		i18n
	});

	const depositPromoMsg = userInfo?.phoneVerified
		? ""
		: i18n.lbl_Nova_DepositPromoMsg1;

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			setLoading(false);
		};
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		navigate,
		setPageVerify,
		false,
		isDomainPopOpen
	);

	const asyncPromotionConfirmPopBox = () =>
		new Promise(resolve =>
			setPopBox({
				isOpen: true,
				title: i18n.lbl_Information,
				content: (
					<>
						<div>{i18n.lbl_Deposit_Promotion_Pop_Msg1}</div>

						<div className="btn-group">
							<button
								className="blue"
								onClick={() => {
									setPopBox({ isOpen: false });
									resolve(true);
								}}>
								{i18n.lbl_Deposit_Promotion_Button_Proceed}
							</button>
							<button
								className="white"
								onClick={() => {
									setPopBox({ isOpen: false });
									resolve(false);
								}}>
								{i18n.lbl_Deposit_Promotion_Button_Back}
							</button>
						</div>
					</>
				)
			})
		);

	const checkDepositSpecialCode = async specialCode =>
		api.payment.CheckDepositSpecialCode(specialCode).then(
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

	const _userPaymentData =
		userPaymentData?.payType === selected ? userPaymentData : {};

	let content = (
		<AutoDeposit
			payType={selected}
			creditTimeKey={defPayment[defPayType.autoDeposit].creditTimeKey}
			bankList={paymentList[defPayType.autoDeposit] ?? []}
			userPaymentData={_userPaymentData}
			handleUserPaymentData={handleUserPaymentData}
			userPaymentSwitch={userPaymentSwitch}
			promoList={promoList}
			depositPromoMsg={depositPromoMsg}
			asyncPromotionConfirmPopBox={asyncPromotionConfirmPopBox}
			checkDepositSpecialCode={checkDepositSpecialCode}
		/>
	);

	if (selected === defPayType.localBank) {
		content = (
			<LocalBank
				payType={selected}
				creditTimeKey={defPayment[defPayType.localBank].creditTimeKey}
				paymentList={paymentList[defPayType.localBank] ?? []}
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
				userPaymentSwitch={userPaymentSwitch}
				promoList={promoList}
				depositPromoMsg={depositPromoMsg}
				asyncPromotionConfirmPopBox={asyncPromotionConfirmPopBox}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.onlineBank) {
		content = (
			<OnlineBanking
				payType={selected}
				creditTimeKey={defPayment[defPayType.onlineBank].creditTimeKey}
				paymentList={paymentList[defPayType.onlineBank] ?? []}
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
				userPaymentSwitch={userPaymentSwitch}
				promoList={promoList}
				depositPromoMsg={depositPromoMsg}
				asyncPromotionConfirmPopBox={asyncPromotionConfirmPopBox}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.mobilePay) {
		content = (
			<MobilePay
				payType={defPayType.mobilePay}
				creditTimeKey={defPayment[defPayType.mobilePay].creditTimeKey}
				paymentList={paymentList[defPayType.mobilePay] ?? []}
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
				userPaymentSwitch={userPaymentSwitch}
				promoList={promoList}
				asyncPromotionConfirmPopBox={asyncPromotionConfirmPopBox}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (selected === defPayType.cryptoPay) {
		content = (
			<CryptoPay
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
				payType={defPayType.cryptoPay}
				creditTimeKey={defPayment[defPayType.cryptoPay].creditTimeKey}
				paymentList={paymentList[defPayType.cryptoPay] ?? []}
				promoList={promoList}
				asyncPromotionConfirmPopBox={asyncPromotionConfirmPopBox}
				checkDepositSpecialCode={checkDepositSpecialCode}
			/>
		);
	} else if (
		selected === defPayType.linePay &&
		paymentList[defPayType.linePay].lineLink
	) {
		content = (
			<LinePay
				redirectLink={paymentList[defPayType.linePay].lineLink}
				langId={userInfo.langId}
			/>
		);
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			let defaultSelect = userPaymentData?.payType ?? "";

			const GetAllPayment = async () => {
				setLoading(true);

				const payments = {
					[defPayType.autoDeposit]: [],
					[defPayType.localBank]: [],
					[defPayType.onlineBank]: [],
					[defPayType.mobilePay]: [],
					[defPayType.cryptoPay]: [],
					[defPayType.linePay]: []
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
					const res = await api.payment.GetAutoChannelBankGroupList();
					payments[defPayType.autoDeposit] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.autoDeposit,
						payments[defPayType.autoDeposit]
					);
					if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				} catch (error) {
					console.error(error);
				}

				try {
					const res = await api.payment.GetBankInfoOffListStatus();
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
				} catch (error) {
					console.error(error);
				}

				try {
					const res = await api.payment.GetOnlinePaymentList();
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
				} catch (error) {
					console.error(error);
				}

				try {
					const res = await api.payment.GetMobilePayGroupList();
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
				} catch (error) {
					console.error(error);
				}

				try {
					const res = await api.payment.GetCryptoPayInfoList();
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
				} catch (error) {
					console.error(error);
				}

				try {
					if (userInfo.currencyId === defCurrenyId.THB) {
						const res = await api.payment.GetLineChannelForDpeosit();

						payments[defPayType.linePay].lineLink =
							res.data?.data?.link;
						if (res.data?.data?.link) {
							payments[defPayType.linePay].openLink = true;
						}

						defaultSelect = setDefaultSelect(
							defaultSelect,
							defPayType.linePay,
							payments[defPayType.linePay]
						);
						if (res.data.errorCode !== 0) {
							console.error(res.data);
						}
					}
				} catch (error) {
					console.error(error);
				}

				if (isMountedRef.current) {
					setLoading(false);
					setPaymentList(payments);
					HandleSelect(userPaymentData?.payType ?? defaultSelect);
				}
			};

			GetAllPayment();

			api.payment.GetDepositInfoRecent().then(
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
				error => {
					console.error(error);
				}
			);
		}
	}, [userInfo.isLogin, userPaymentData.payType, userInfo.currencyId]);

	const _isConvert = isConvert(userInfo.currencyId);
	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	) => {
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
			real_amount: amount,
			picFileName,
			refId
		}));
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api.payment.SetDepositCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api.payment.GetDepositInfoRecent().then(
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
						<button className="white" onClick={ClickSubmit}>
							{i18n.lbl_Yes}
						</button>
						<button className="orange" onClick={ClickPopBoxCancel}>
							{i18n.lbl_No}
						</button>
					</div>
				)
			});
		}
	};
	return (
		<>
			<UserPaymentSwitch
				i18n={i18n}
				userPaymentSwitch={userPaymentSwitch}
				handleUserPaymentSwitch={handleUserPaymentSwitch}
			/>
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
			/>
			<ImportantNote i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

export default Panel;
