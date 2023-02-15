import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config, { cloudImgURL } from "../../config";
import { isConvert, number_format } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import PromoList from "./promoList";

const payType = "autoDeposit";

const Payment = props => {
	const {
		bankList,
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
	const [selbank, setSelBank] = useState({});
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
		if (bankList.length > 0) {
			let bankIdx = bankList.findIndex(
				obj => obj.sysId === userPaymentData?.sysId
			);
			bankIdx = bankIdx === -1 ? 0 : bankIdx;
			SelectBank({
				bankInfo: bankList[bankIdx],
				userData: Boolean(userPaymentData?.sysId)
			});
			setSelBank(bankList[bankIdx]);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [bankList.length, userPaymentData.payType]);

	const SelectBank = ({ bankInfo, userData }) => {
		if (selbank.sysId !== bankInfo.sysId || userData) {
			setLoading(true);
			setSelBank(bankInfo);
		}
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

			const RedirectToNext = real_amount => {
				const userData = {
					payType,
					amount: real_amount,
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

				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqBankAutoChannel`;
				const paramsUrl = [
					`sysId=${sysId}`,
					`Amount=${real_amount}`,
					bonusCode && `BonusCode=${bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${paramsUrl}`);
				RefreshPage();
			};

			const real_amount = _isConvert ? amount * 1000 : amount;
			const { sysId, bankLogo, bankName } = selbank;

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							className="bankimg"
							src={`${cloudImgURL}/SiteSkin/img/BankLogo/${bankLogo?.toLowerCase()}`}
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
		<>
			<GroupList
				title={i18n.lbl_SelectBank}
				titleClassName="fast"
				channel={selbank}
				dataList={bankList}
				SelectPayment={SelectBank}
				selected={selbank?.sysId}
				mainKey={`deposit-full-${payType}-bankList`}
				imgKey="bankLogo"
				idKey="sysId"
				bindFullObj={true}
				prefixImgUrl={`${cloudImgURL}/SiteSkin/img/BankLogo/`}
				imgKeyWithExtension={true}
				displayKey="bankName"
				_isConvert={_isConvert}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selbank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				msg={warning.msg}
				status={warning.status}
				tip={i18n.lbl_AmountTooltip.replace(
					"{{0}}",
					number_format(selbank?.minAmount, _isConvert, 0)
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
		</>
	);
};

Payment.defaultProps = {
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: []
};

Payment.propTypes = {
	bankList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	asyncPromotionConfirmPopBox: PropTypes.func.isRequired,
	checkDepositSpecialCode: PropTypes.func.isRequired
};

export default Payment;
