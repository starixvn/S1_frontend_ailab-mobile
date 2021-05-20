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
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import { api_payment_GetLoadCardPayInfoList } from "../../service/api/payment";

const payType = "LoadCardPay";

const Payment = props => {
	const { paymentList, creditTimeKey } = props;
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [groupList, setGroupList] = useState(null);
	const [selChannel, setSelChannel] = useState({});

	const {
		amount,
		inputStatus,
		setInputStatus,
		SelectAmount,
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selChannel?.minAmount,
		maxAmount: selChannel?.maxAmount,
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			SelectGroup(paymentList[0].groupId);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const SelectGroup = groupId => {
		setLoading(true);
		api_payment_GetLoadCardPayInfoList({ groupId }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setGroupList(res.data.data);
						setSelChannel(res.data.data?.[0]);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setLoading(false);
				}
			}
		);
	};

	const clickInfo = () => {
		const msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(selChannel?.minAmount, _isConvert)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? msg : ""
		});
	};

	const ClickSubmit = () => {
		const result = VaildAmount({ _amount: amount });

		if (result) {
			const RedirectToNext = real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay?ChannelId=${selChannel.channelId}&Amount=${real_amount}`
				);
				window.location.reload();
			};

			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${config.imgUrl}/common/images/LoadCardPay/${selChannel.payName}.png`}
							alt={selChannel.payName}
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
	const canSubmit =
		amount !== "" &&
		VaildAmount({ _amount: amount, displayWarning: false });
	return (
		<div className="depositModule_mobile open">
			<div className="title text-org">{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}</div>

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={groupList}
				SelectPayment={SelectGroup}
				selected={selChannel?.groupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="payName"
				idKey="groupId"
				prefixImgUrl={`${config.imgUrl}/common/images/LoadCardPay/`}
				i18n={i18n}
				displayKey="payName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				clickInfo={clickInfo}
			/>
			<div className="btn-group">
				<button
					className={canSubmit ? "blue" : "gray"}
					onClick={ClickSubmit}>
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
