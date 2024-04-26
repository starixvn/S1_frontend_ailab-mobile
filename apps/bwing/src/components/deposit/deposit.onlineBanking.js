import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import config, { paymentImgUrl } from "../../config";
import { isConvert, number_format, getWindowOpenUrl } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import PromoList from "./promoList";

const payType = "onlineBanking";

const Payment = props => {
	const { paymentList, promoList, checkDepositSpecialCode, onSubmit } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [selbank, setSelBank] = useState({});
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});

	const {
		amount,
		inputStatus,
		setInputStatus,
		SelectAmount,
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selbank?.minAmount,
		maxAmount: selbank?.maxAmount,
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			setSelBank(paymentList[0]);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const clickInfo = () => {
		const msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(selbank?.minAmount, _isConvert, 0)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? msg : ""
		});
	};

	const SelectBank = bankInfo => {
		if (selbank.sysId !== bankInfo.sysId) {
			setSelBank(bankInfo);
		}
	};

	const ClickSubmit = async () => {
		const result = VaildAmount({ _amount: amount });

		if (result) {
			const { sysId, bankLogo, bankName } = selbank;
			let { bonusCode } = depositPromo;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) {
					return;
				}
			}

			// 原想放在 RedirectToNext 裡，但 RedirectToNext 的 reload 會導致追蹤碼的請求中斷
			onSubmit();

			const RedirectToNext = real_amount => {
				const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqBankAutoChannel`;
				const param = {
					sysId,
					Amount: real_amount,
					BonusCode: bonusCode
				};
				const windowOpenUrl = getWindowOpenUrl({ mainUrl, param });
				window.open(windowOpenUrl);

				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				window.location.reload();
			};

			const real_amount = _isConvert ? amount * 1000 : amount;
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${paymentImgUrl}/${bankLogo?.toLowerCase()}`}
							alt={bankName}
						/>
						<div>
							<ul>
								<li className="text-lightBlue">
									{i18n.lbl_DepositAmount} :
								</li>
								<li>
									{number_format(real_amount, _isConvert, 0)}
								</li>
							</ul>
						</div>
					</>
				),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="Cancel"
							onClick={() =>
								setPopBox(prevState => ({
									...prevState,
									isOpen: false
								}))
							}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="blue"
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
				dataList={paymentList}
				SelectPayment={SelectBank}
				selected={selbank?.sysId}
				mainKey={`deposit-full-${payType}-bankList`}
				imgKey="bankLogo"
				idKey="sysId"
				bindFullObj={true}
				prefixImgUrl={`${paymentImgUrl}/`}
				imgKeyWithExtension={true}
				displayKey="bankName"
				i18n={i18n}
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selbank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				btnStatus={inputStatus.checked}
				tip={inputStatus.msg}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				VaildAmount={VaildAmount.bind(this, { _amount: amount })}
				clickInfo={clickInfo}
			/>

			<PromoList
				amount={Number(amount)}
				promoList={promoList}
				i18n={i18n}
				userInfo={userInfo}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<div className="btn-group">
				<button className="blue" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	checkDepositSpecialCode: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Payment;
