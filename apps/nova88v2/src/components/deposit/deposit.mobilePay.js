import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config, { cloudImgURL } from "../../config";
import { isConvert, number_format, defCurrenyId } from "../common/common";
import api from "../../service/api";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import { defPopBoxType } from "../common/popbox";
import useTip from "../hook/useTip";
import PromoList from "./promoList";

const defInputCol = {
	payAccount: "payAccount"
};

const payType = "MobilePay";

const Payment = props => {
	const {
		paymentList,
		creditTimeKey,
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
	const [selChannel, setChannel] = useState({});
	const [channelList, setChannelList] = useState([]);
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});
	const [payAccount, setPayAccount] = useState({ value: "", tip: "" });

	const { showTips, showTipHandler } = useTip();
	const {
		amount,
		warning,
		SelectAmount,
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selChannel?.minAmount,
		maxAmount: selChannel?.maxAmount,
		i18n,
		digits: 0,
		lastAmount: userPaymentData?.amount
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			let groupIdx = paymentList.findIndex(
				obj => obj.groupId === userPaymentData?.groupId
			);
			groupIdx = groupIdx === -1 ? 0 : groupIdx;
			SelectPayment({ groupInfo: paymentList[groupIdx] });
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length, userPaymentData.payType]);

	const SelectPayment = ({ groupInfo }) => {
		if (selGroup?.groupId !== groupInfo?.groupId) {
			setSelGroup(() => groupInfo);
			setLoading(true);
			api.payment.GetMobilePayInfoList(groupInfo?.groupId).then(
				res => {
					if (isMountedRef.current) {
						if (
							res.data.errorCode === 0 &&
							res.data.data.length > 0
						) {
							setChannelList(res.data.data);
							let bankInfoIdx = res.data.data.findIndex(
								obj =>
									obj.channelId === userPaymentData?.channelId
							);
							bankInfoIdx = bankInfoIdx === -1 ? 0 : bankInfoIdx;
							SelectChannel({
								bankInfo: res.data.data?.[bankInfoIdx]
							});
						} else if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
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
		}
	};

	const SelectChannel = ({ bankInfo }) => {
		setChannel(bankInfo);
	};

	const onChangeInput = ({ col, val }) => {
		if (col === defInputCol.payAccount) {
			setPayAccount({ value: val, tip: "" });
		}
	};

	const ClickSubmit = async () => {
		const checkPayAccount = () => {
			if (
				userInfo.currencyId === defCurrenyId.INR &&
				selChannel?.payName === "TenPay" &&
				!payAccount.value
			) {
				setPayAccount(prev => ({
					...prev,
					tip: i18n.lbl_PleaseEnterUPI
				}));

				return false;
			}
			return true;
		};

		const result = checkPayAccount() && VaildAmount({ _amount: amount });
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

			const RedirectToNext = real_amount => {
				const userData = {
					payType: "mobilePay",
					amount: real_amount,
					channelId: selChannel?.channelId,
					groupId: selGroup.groupId
				};

				handleUserPaymentData({ userData });

				const RefreshPage = () => {
					window.location.reload();
				};

				if (selChannel?.mode === 3) {
					api.cashier
						.DepositReqMobilePay({
							langId: userInfo.langId,
							channelId: selChannel.channelId,
							real_amount,
							bonusCode
						})
						.then(
							res => {
								if (res.data.errorCode === 0) {
									setPopBox({
										isOpen: true,
										title: i18n.lbl_DepositType2,
										className: "dragonPayPop",
										popBoxType: defPopBoxType.PaymentQR,
										amount: real_amount,
										depositAmount:
											res.data.data.formData
												?.DepositAmount,
										currencyId: userInfo.currencyId,
										imgUrl: res.data.data.url,
										handlePopBox: () => {
											setPopBox(prevState => ({
												...prevState,
												isOpen: false
											}));
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

					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;

					const paramsUrl = [
						`ChannelId=${selChannel.channelId}`,
						`Amount=${real_amount}`,
						bonusCode && `BonusCode=${bonusCode}`,
						payAccount.value && `PayAccount=${payAccount.value}`
					]
						.filter(Boolean)
						.join("&");

					window.open(`${baseUrl}?${paramsUrl}`);
					RefreshPage();
				}
			};

			const real_amount = _isConvert ? amount * 1000 : amount;

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							className="bankimg"
							src={`${cloudImgURL}/SiteSkin/img/MobilePay/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.groupName}
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
							onClick={RedirectToNext.bind(this, real_amount)}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);

	return (
		<div className="depositModule active">
			<div className="title text-org icon icon-mobile">
				{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}
			</div>

			{paymentList.length > 1 && (
				<GroupList
					title={i18n.lbl_PaymentModes}
					dataList={paymentList}
					SelectPayment={SelectPayment}
					selected={selGroup?.groupId}
					mainKey={`deposit-full-${payType}-groupList`}
					imgKey="groupName"
					idKey="groupId"
					prefixImgUrl={`${cloudImgURL}/SiteSkin/img/MobilePay/`}
					displayKey="groupName"
					_isConvert={_isConvert}
				/>
			)}
			{channelList?.length > 1 && (
				<GroupList
					title={i18n.lbl_SelectChannel}
					dataList={channelList}
					channel={selChannel}
					SelectPayment={SelectChannel}
					selected={selChannel?.channelId}
					mainKey={`deposit-full-${payType}-channelList`}
					imgKey={defCurrenyId.BDT ? "channelName" : "payName"}
					idKey="channelId"
					bindFullObj={true}
					prefixImgUrl={`${cloudImgURL}/SiteSkin/img/MobilePay/`}
					displayKey="channelName"
					_isConvert={_isConvert}
				/>
			)}
			{userInfo.currencyId === defCurrenyId.INR &&
				selChannel?.payName === "TenPay" && (
					<>
						<div className="title">
							<span className="text-org">*</span>
							{selGroup?.groupName}
						</div>
						<div className="selectModule">
							<div className="infoModule">
								<div
									className={`inputInfo${
										showTips.includes("payAccount")
											? " active"
											: ""
									}`}>
									{i18n.lbl_EnterYourUPIHint2}
								</div>
								<div
									className={`inputBox${
										payAccount.tip ? " error" : ""
									}`}>
									<i className="icon icon-pencil" />
									<input
										value={payAccount.value}
										placeholder={i18n.lbl_EnterYourUPIHint1}
										onChange={e =>
											onChangeInput({
												val: e.target.value,
												col: defInputCol.payAccount
											})
										}
									/>
									<div className="icon-module">
										<i
											className="icon icon-information"
											onClick={() =>
												showTipHandler("payAccount")
											}
										/>
									</div>
								</div>
								<div className="tip">{payAccount.tip}</div>
							</div>
						</div>
					</>
				)}
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning.msg}
				status={warning.status}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selChannel?.minAmount
						? number_format(selChannel?.minAmount, _isConvert, 0)
						: 1
				)}
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
		</div>
	);
};

Payment.defaultProps = {
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	creditTimeKey: PropTypes.string.isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	asyncPromotionConfirmPopBox: PropTypes.func.isRequired,
	checkDepositSpecialCode: PropTypes.func.isRequired
};

export default Payment;
