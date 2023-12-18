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
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import PromoList from "./promoList";
import { defPayType } from "./deposit.def";

const payType = defPayType.douDouPay;

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

	const SelectPayment = paymentProps => {
		const { groupInfo, userData } = paymentProps;
		if (selGroup?.payId !== groupInfo.payId || userData) {
			setLoading(true);

			setSelGroup(groupInfo);

			if (groupInfo.supportBanks.length > 0) {
				setBankList(groupInfo.supportBanks);

				let bankIdx = groupInfo.supportBanks.findIndex(
					obj =>
						obj.sysId === userPaymentData?.sysId &&
						groupInfo?.payId === userPaymentData?.payId
				);
				bankIdx = bankIdx === -1 ? 0 : bankIdx;

				SelectBank({
					groupInfo,
					bankInfo: groupInfo.supportBanks[bankIdx]
				});
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
		setBank(bankInfo);
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

			const { payId, channelId } = selGroup;
			let { sysId } = selbank;
			let bankLogo = null;
			let bankName = null;
			const RedirectToNext = debounce(() => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const userData = {
					payType: "onlineBank",
					amount: resultAmount,
					payId,
					sysId
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
					sysId && `sysId=${sysId}`,
					bonusCode && `BonusCode=${bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${paramsUrl}`);

				RefreshPage();
			}, 1000);

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
								{number_format(resultAmount, _isConvert, 0)}
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
									resultAmount
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			} else {
				RedirectToNext();
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
					selGroup?.selectBank ? selbank : { ...selbank, ...selGroup }
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
