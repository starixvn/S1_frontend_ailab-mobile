import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config from "../../config";
import { isConvert, number_format, getWindowOpenUrl } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import {
	api_GetOnlineBankInfoSysList,
	api_GetOnlineBankInfo
} from "../../service/api/payment";
import PromoList from "./promoList";

const payType = "onlineBanking";

const Payment = props => {
	const { paymentList, creditTimeKey, promoList, depositPromoMsg } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [selGroup, setSelGroup] = useState(null);
	const [selbank, setBank] = useState({});
	const [bankList, setBankList] = useState([]);
	const [custBonusCode, setCustBonusCode] = useState(null);

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
			SelectPayment(paymentList[0]);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const clickInfo = () => {
		const msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(selbank?.minAmount, _isConvert)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? msg : ""
		});
	};

	const SelectPayment = groupInfo => {
		if (selGroup?.payId !== groupInfo.payId) {
			setSelGroup(groupInfo);
			if (groupInfo.selBank) {
				setLoading(true);
				api_GetOnlineBankInfoSysList({ payId: groupInfo.payId }).then(
					res => {
						if (res.data.errorCode === 0) {
							if (
								isMountedRef.current &&
								res.data.data.length > 0
							) {
								setBankList(res.data.data);
								SelectBank(res.data.data[0], groupInfo);
							}
						} else if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
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
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
							setLoading(false);
						}
					}
				);
			}
		}
	};

	const SelectBank = (bankInfo, groupInfo) => {
		api_GetOnlineBankInfo({
			payId: groupInfo.payId,
			sysId: bankInfo.sysId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setBank(res.data.data);
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

	const ClickSubmit = () => {
		const result = VaildAmount({ _amount: amount });

		if (result) {
			const { payId, channelId } = selGroup;
			let { sysId } = selGroup;
			let bankLogo = null;
			let bankName = null;

			const RedirectToNext = real_amount => {
				const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking`;
				const param = {
					sysId,
					payId,
					ChannelId: channelId,
					Amount: real_amount,
					BonusCode: custBonusCode
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
								src={`${
									config.imgUrl
								}/common/images/BankLogo/${bankLogo?.toLowerCase()}`}
								alt={bankName}
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
		<div className="depositModule_mobile open">
			<div className="title text-org">
				{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}
			</div>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroup?.payId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="payName"
				idKey="payId"
				prefixImgUrl={`${config.imgUrl}/common/images/Payment/`}
				bindFullObj={true}
				i18n={i18n}
				displayKey="payName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>
			{selGroup?.selBank ? (
				<GroupList
					title={i18n.lbl_SelectBank}
					dataList={bankList}
					SelectPayment={SelectBank}
					selected={selbank?.sysId}
					mainKey={`deposit-full-${payType}-bankList`}
					imgKey="bankLogo"
					idKey="sysId"
					bindFullObj={true}
					prefixImgUrl={`${config.imgUrl}/common/images/BankLogo/`}
					imgKeyWithExtension={true}
					bindingItem={selGroup}
					displayKey="bankName"
					i18n={i18n}
					_isConvert={_isConvert}
				/>
			) : null}
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={
					selGroup?.selBank ? selbank : { ...selbank, ...selGroup }
				}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				clickInfo={clickInfo}
				VaildAmount={VaildAmount.bind(this, { _amount: amount })}
			/>
			<PromoList
				promoList={promoList}
				depositPromoMsg={depositPromoMsg}
				i18n={i18n}
				setCustBonusCode={setCustBonusCode}
			/>
			<div className="btn-group">
				<button className="lightBlue" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Payment.defaultProps = {
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	creditTimeKey: PropTypes.string.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.object),
	depositPromoMsg: PropTypes.string.isRequired
};

export default Payment;
