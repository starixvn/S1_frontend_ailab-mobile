import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config, { paymentImgURL } from "../../config";
import { debounce, isConvert, number_format } from "../common/common";
import api from "../../service/api";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import { defPopBoxType } from "../common/popbox";
import PromoList from "./promoList";

const payType = "onlineBanking";

const Payment = props => {
	const {
		paymentList,
		userPaymentData,
		handleUserPaymentData,
		promoList,
		asyncPromotionConfirmPopBox,
		checkDepositSpecialCode
	} = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [selGroup, setSelGroup] = useState(null);
	const [selbank, setBank] = useState({});
	const [bankList, setBankList] = useState([]);
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});

	const {
		amount,
		warning,
		SelectAmount,
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selbank?.minAmount,
		maxAmount: selbank?.maxAmount,
		i18n,
		digits: 0,
		lastAmount: userPaymentData?.amount
	});
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			let groupIdx = paymentList.findIndex(
				obj => obj.payId === userPaymentData?.payId
			);
			groupIdx = groupIdx === -1 ? 0 : groupIdx;
			SelectPayment({
				groupInfo: paymentList[groupIdx],
				userData: Boolean(userPaymentData?.payId)
			});
			setSelGroup(paymentList[groupIdx]);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length, userPaymentData.payType]);

	const SelectPayment = ({ groupInfo, userData }) => {
		if (selGroup?.payId !== groupInfo.payId || userData) {
			setLoading(true);
			setSelGroup(groupInfo);

			if (groupInfo.selBank) {
				api.payment
					.GetOnlineBankInfoSysList({ payId: groupInfo.payId })
					.then(
						res => {
							if (res.data.errorCode === 0) {
								if (
									isMountedRef.current &&
									res.data.data.length > 0
								) {
									setBankList(res.data.data);

									let bankIdx = res.data.data.findIndex(
										obj =>
											obj.sysId ===
												userPaymentData?.sysId &&
											groupInfo?.payId ===
												userPaymentData?.payId
									);
									bankIdx = bankIdx === -1 ? 0 : bankIdx;

									SelectBank({
										groupInfo,
										bankInfo: res.data.data[bankIdx]
									});
								}
							} else if (res.data.errorCode !== 0) {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}

							if (isMountedRef.current) {
								setLoading(false);
							}
						},
						() => {
							if (isMountedRef.current) {
								setPopBox({
									isOpen: true,
									content: i18n.msg_ApiServerError
								});
								setLoading(false);
							}
						}
					);
			} else {
				setBank({
					maxAmount: groupInfo.maxAmount,
					minAmount: groupInfo.minAmount
				});
				setBankList([]);
			}
		}
	};

	const SelectBank = ({ groupInfo, bankInfo }) => {
		api.payment
			.GetOnlineBankInfo({
				payId: groupInfo.payId,
				sysId: bankInfo.sysId
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setBank(res.data.data);
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

	const ClickSubmit = async () => {
		const result = VaildAmount({ _amount: amount });

		if (result) {
			const resultAmount = _isConvert ? amount * 1000 : Number(amount);

			if (
				userInfo.phoneVerified &&
				depositPromo.requiredAmount &&
				resultAmount < depositPromo.requiredAmount
			) {
				const success = await asyncPromotionConfirmPopBox();

				if (!success) return;
			}

			let { bonusCode } = depositPromo;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) {
					return;
				}
			}

			const { payId, channelId, mode } = selGroup;
			let { sysId } = selbank;
			let bankLogo = null;
			let bankName = null;
			const RedirectToNext = debounce(real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const userData = {
					payType: "onlineBank",
					amount: real_amount,
					payId,
					sysId
				};

				handleUserPaymentData({ userData });

				const RefreshPage = () => {
					window.location.reload();
				};

				if (mode === 3) {
					api.cashier
						.DepositReqOnlineBanking({
							langId: userInfo.langId,
							sysId,
							payId,
							channelId,
							real_amount,
							bonusCode
						})
						.then(
							res => {
								if (res.data.errorCode === 0) {
									setPopBox({
										isOpen: true,
										title: i18n.lbl_DepositType1,
										className: "dragonPayPop",
										popBoxType: defPopBoxType.PaymentQR,
										amount: real_amount,
										depositAmount:
											res.data.data.formData
												.DepositAmount,
										currencyId: userInfo.currencyId,
										imgUrl: res.data.data.url,
										orderNumber: res.data.data.thirdId,
										bankName:
											res.data.data.formData.BankName,
										accountName:
											res.data.data.formData.AccountName,
										accountNumber:
											res.data.data.formData
												.AccountNumber,
										handlePopBox: () => {
											RefreshPage();
										}
									});
								} else {
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
				} else {
					setPopBox(prevState => ({
						...prevState,
						isOpen: false
					}));

					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking`;

					const paramsUrl = [
						`payId=${payId}`,
						`ChannelId=${channelId}`,
						`Amount=${real_amount}`,
						sysId && `sysId=${sysId}`,
						bonusCode && `BonusCode=${bonusCode}`
					]
						.filter(Boolean)
						.join("&");

					window.open(`${baseUrl}?${paramsUrl}`);

					RefreshPage();
				}
			}, 1000);

			const real_amount = _isConvert ? amount * 1000 : amount;
			if (selGroup.selBank) {
				sysId = selbank.sysId;
				bankLogo = selbank.bankLogo;
				bankName = selbank.bankName;

				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<>
							<p>{i18n.lbl_ConfirmDeposit}</p>
							<img
								className="bankimg"
								src={`${paymentImgURL}/square/${bankLogo?.toLowerCase()}`}
								alt={bankName}
							/>
							<div>
								<span>{i18n.lbl_DepositAmount} :</span>{" "}
								{number_format(real_amount, _isConvert, 0)}
							</div>
						</>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="white"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="orange"
								onClick={RedirectToNext.bind(
									this,
									real_amount
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			} else {
				RedirectToNext(real_amount);
			}
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);
	return (
		<>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroup?.payId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="payName"
				idKey="payId"
				prefixImgUrl={`${paymentImgURL}/`}
				bindFullObj={true}
				displayKey="payName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>
			<GroupList
				title={i18n.lbl_SelectBank}
				channel={selbank}
				dataList={bankList}
				SelectPayment={SelectBank}
				selected={selbank?.sysId}
				mainKey={`deposit-full-${payType}-bankList`}
				imgKey="bankLogo"
				idKey="sysId"
				bindFullObj={true}
				prefixImgUrl={`${paymentImgURL}/square/`}
				imgKeyWithExtension={true}
				bindingItem={selGroup}
				displayKey="bankName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={
					selGroup?.selBank ? selbank : { ...selbank, ...selGroup }
				}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				msg={warning.msg}
				status={warning.status}
				tip={
					selGroup?.selBank
						? i18n.lbl_AmountTooltip.replace(
								"{{0}}",
								number_format(selbank?.minAmount, _isConvert, 0)
						  )
						: i18n.lbl_AmountTooltip.replace(
								"{{0}}",
								number_format(
									selGroup?.minAmount,
									_isConvert,
									0
								)
						  )
				}
				currencyId={userInfo.currencyId}
			/>

			<PromoList
				i18n={i18n}
				amount={Number(amount)}
				userInfo={userInfo}
				promoList={promoList}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<div className="btn-group">
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	asyncPromotionConfirmPopBox: PropTypes.func.isRequired,
	checkDepositSpecialCode: PropTypes.func.isRequired
};

export default Payment;
