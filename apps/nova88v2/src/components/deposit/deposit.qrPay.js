import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import api from "../../service/api";
import config, { paymentImgURL } from "../../config";
import { useHandleAmount } from "../hook/useHandleAmount";
import { isConvert, number_format } from "../common/common";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import PromoList from "./promoList";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";

const Payment = ({
	payType,
	promoList,
	paymentList,
	userPaymentData,
	handleUserPaymentData,
	checkDepositSpecialCode,
	asyncPromotionConfirmPopBox
}) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [selGroupId, setSelGroupId] = useState(null);
	const [selChannel, setChannel] = useState({});
	const [channelList, setChannelList] = useState([]);
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});

	const _isConvert = isConvert(userInfo.currencyId);

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
		lastAmount: userPaymentData?.amount,
		i18n
	});

	const selectPayment = async (groupData, { init }) => {
		// if init (data from useEffect not having groupInfo )
		const { groupId } = init ? groupData : groupData?.groupInfo;

		if (selGroupId !== groupId) {
			setSelGroupId(() => groupId);

			try {
				const res = await api.payment.GetQRPayInfoList(groupId);
				const { data, message, errorCode } = res.data;

				if (errorCode === 0) {
					setChannelList(data);
					SelectChannel(data?.[0]);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${errorCode}] ${message}`
					});
				}
			} catch (error) {}
		}
	};

	const SelectChannel = channel => {
		setChannel(channel);
	};

	const handleSubmit = async () => {
		const checked = VaildAmount({ _amount: amount });
		const real_amount = _isConvert ? amount * 1000 : amount;

		if (checked) {
			if (
				userInfo.phoneVerified &&
				depositPromo.requiredAmount &&
				real_amount < depositPromo.requiredAmount
			) {
				const success = await asyncPromotionConfirmPopBox();
				if (!success) return;
			}

			let { bonusCode } = depositPromo;
			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) return;
			}

			const redirectToNext = () => {
				const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqQRPay`;
				const paramUrl = [
					`ChannelId=${selChannel.channelId}`,
					`Amount=${real_amount}`,
					bonusCode && `BonusCode=${depositPromo.bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				window.open(`${mainUrl}?${paramUrl}`);

				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const userData = {
					payType,
					amount: real_amount,
					groupId: selChannel?.groupId,
					channelId: selChannel?.channelId
				};

				handleUserPaymentData({ userData });

				window.location.reload();
			};

			const handlePopBankQR = async () => {
				try {
					const res = await api_payment_DepositReqLocalPay({
						groupId: selChannel.groupId,
						amount: real_amount,
						bonusCode: bonusCode ?? ""
					});
					const { data, errorCode } = res.data;

					const {
						amount: popBoxAmount,
						bankLogo,
						code,
						returnUrl,
						transId,
						generateQr,
						message
					} = data;

					if (errorCode === 0) {
						setPopBox({
							title: i18n.lbl_DepositType6,
							isOpen: true,
							code,
							transId,
							bankLogo,
							qrCodeUrl: returnUrl,
							amount: popBoxAmount,
							generateQr,
							popBoxType: defPopBoxType.BankQR,
							onClose: () => {
								setPopBox({ isOpen: false });
								window.location.reload();
							}
						});

						const userData = {
							payType,
							amount: real_amount,
							groupId: selChannel?.groupId,
							channelId: selChannel?.channelId
						};

						handleUserPaymentData({ userData });
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				} catch (error) {}
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${paymentImgURL}/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.groupName}
						/>
						<div className="tip">
							<span>{i18n.lbl_DepositAmount} :</span>{" "}
							{number_format(real_amount, _isConvert, 0)}
						</div>
					</>
				),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="darkGray"
							onClick={() =>
								setPopBox(prevState => ({
									...prevState,
									isOpen: false
								}))
							}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="lightBlue"
							onClick={
								// channelId === -1 代表是後端建的假渠道，在原畫面 show QRCode
								selChannel.channelId === -1
									? handlePopBankQR
									: redirectToNext
							}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	useEffect(() => {
		if (paymentList.length > 0) {
			const selectedIdx =
				userPaymentData?.payType === payType
					? paymentList?.findIndex(
							({ groupId }) =>
								groupId === userPaymentData?.groupId
					  )
					: 0;
			selectPayment(paymentList[selectedIdx], { init: true });
		}
	}, [paymentList.length]);

	return (
		<>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={data => selectPayment(data, { init: false })}
				selected={selGroupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgURL}/`}
				bindFullObj={true}
				displayKey="channelName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>

			<GroupList
				title={i18n.lbl_SelectChannel}
				dataList={channelList}
				SelectPayment={SelectChannel}
				selected={selChannel?.channelId}
				mainKey={`deposit-full-${payType}-channelList`}
				imgKey="groupName"
				idKey="channelId"
				bindFullObj={true}
				prefixImgUrl={`${paymentImgURL}/`}
				i18n={i18n}
				displayKey="payName"
				showMinMaxHint={true}
				_isConvert={_isConvert}
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning.msg}
				status={warning.status}
				EditAmount={EditAmount}
				SelectAmount={SelectAmount}
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
				userInfo={userInfo}
				amount={Number(amount)}
				promoList={promoList}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<div className="btn-group">
				<button className="lightBlue" onClick={handleSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	promoList: [],
	userPaymentData: {},
	handleUserPaymentData: () => null,
	asyncPromotionConfirmPopBox: () => null
};

Payment.propTypes = {
	payType: PropTypes.string.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.object),
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	checkDepositSpecialCode: PropTypes.func.isRequired,
	asyncPromotionConfirmPopBox: PropTypes.func
};

export default Payment;
