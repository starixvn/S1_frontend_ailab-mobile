import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config from "../../config";
import { isConvert, number_format } from "../common/common";
import api from "../../service/api";
import GroupList from "./deposit.all.groupList";
import AmountInput from "./deposit.all.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";

const payType = "onlineBanking";

const Payment = props => {
	const { paymentList, creditTimeKey } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [selGroup, setSelGroup] = useState(null);
	const [selbank, setBank] = useState({});
	const [bankList, setBankList] = useState([]);

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

	const SelectPayment = groupInfo => {
		if (selGroup?.payId !== groupInfo.payId) {
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
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking?sysId=${sysId}&payId=${payId}&ChannelId=${channelId}&Amount=${real_amount}`
				);
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
								src={`${config.imgUrl}/common/images/BankLogo/${bankLogo}`}
								alt={bankName}
							/>
							<div className="tip">
								<span>{i18n.lbl_DepositAmount} :</span>{" "}
								{number_format(real_amount, _isConvert)}
							</div>
						</>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="blue"
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
				RedirectToNext(this, real_amount);
			}
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);

	return (
		<div className="depositModule_mobile open">
			<div className="title text-org icon icon-nova88">
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
				prefixImgUrl={`${config.cloudImgURL}/SiteSkin/img/Payment/`}
				bindFullObj={true}
				i18n={i18n}
				displayKey="payName"
				_isConvert={_isConvert}
			/>
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
				showMinMaxHint={true}
				i18n={i18n}
				_isConvert={_isConvert}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selbank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={warning}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
			/>
			<div className="btn-group">
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	creditTimeKey: PropTypes.string.isRequired
};

export default Payment;
