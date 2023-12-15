import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import config, { paymentImgURL } from "../../config";
import { debounce, isConvert, number_format } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import PromoList from "./promoList";
import { defPayType } from "./deposit.def";

const payType = defPayType.quickTransfer;

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
	const [selGroup, setSelGroup] = useState(null);
	const [selChannel, setSelChannel] = useState({});
	const [channelList, setChannelList] = useState([]);

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

	const SelectPayment = paymentProps => {
		const { groupInfo, userData } = paymentProps;

		if (selGroup?.groupId !== groupInfo.groupId || userData) {
			setSelGroup(groupInfo);

			if (groupInfo.supportChannels.length > 0) {
				setChannelList(groupInfo.supportChannels);

				let channelIndex = groupInfo.supportChannels.findIndex(
					obj =>
						obj.channelId === userPaymentData?.channelId &&
						groupInfo?.channelId === userPaymentData?.channelId
				);
				channelIndex = channelIndex === -1 ? 0 : channelIndex;

				SelectBank({
					groupInfo,
					bankInfo: groupInfo.supportChannels[channelIndex]
				});
			} else {
				setSelChannel({
					maxAmount: groupInfo.maxAmount,
					minAmount: groupInfo.minAmount
				});
				setChannelList([]);
			}
		}
	};

	const SelectBank = ({ bankInfo }) => {
		setSelChannel(bankInfo);
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

			const { groupId } = selGroup;
			const { channelId } = selChannel;

			const RedirectToNext = debounce(() => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const userData = {
					payType: defPayType.douDouPay,
					amount: resultAmount,
					groupId,
					channelId
				};

				handleUserPaymentData({ userData });

				const RefreshPage = () => {
					window.location.reload();
				};

				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReq`;

				const paramsUrl = [
					`channelId=${channelId}`,
					`amount=${resultAmount}`,
					bonusCode && `BonusCode=${bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${paramsUrl}`);

				RefreshPage();
			}, 1000);

			RedirectToNext();
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);

	return (
		<>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroup?.groupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgURL}/`}
				bindFullObj={true}
				displayKey="groupName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>
			<GroupList
				title={i18n.lbl_SelectChannel}
				dataList={channelList}
				SelectPayment={SelectBank}
				selected={selChannel?.channelId}
				mainKey={`deposit-full-${payType}-channelId`}
				imgKey="channelName"
				idKey="channelId"
				prefixImgUrl={`${paymentImgURL}/`}
				imgKeyWithExtension={false}
				bindFullObj={true}
				bindingItem={selGroup}
				displayKey="channelName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={
					selGroup?.selectBank
						? selChannel
						: { ...selChannel, ...selGroup }
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
					selGroup?.selectBank
						? i18n.lbl_AmountTooltip.replace(
								"{{0}}",
								number_format(
									selChannel?.minAmount,
									_isConvert,
									0
								)
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
