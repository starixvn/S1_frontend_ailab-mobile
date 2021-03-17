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
import { useHandleAmount } from "../hook/useHandleAmount";

const payType = "MobilePay";

const Payment = props => {
	const { paymentList, creditTimeKey } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [status, setStatus] = useState(null);

	const [selGroupId, setSelGroupId] = useState(null);
	const [selChannel, setChannel] = useState({});
	const [channelList, setChannelList] = useState([]);

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
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			SelectPayment({ groupInfo: paymentList[0] });
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const SelectPayment = ({ groupInfo }) => {
		if (selGroupId !== groupInfo?.groupId) {
			setSelGroupId(() => groupInfo?.groupId);
			setLoading(true);
			api.payment.GetMobilePayInfoList(groupInfo?.groupId).then(
				res => {
					if (isMountedRef.current) {
						if (
							res.data.errorCode === 0 &&
							res.data.data.length > 0
						) {
							setChannelList(res.data.data);
							SelectChannel({ bankInfo: res.data.data?.[0] });
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
		}
	};

	const SelectChannel = ({ bankInfo }) => {
		setChannel(bankInfo);
	};

	const ClickSubmit = () => {
		const result = VaildAmount({ _amount: amount });

		setStatus(result);
		if (result) {
			const RedirectToNext = real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay?ChannelId=${selChannel.channelId}&Amount=${real_amount}`
				);
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
							src={`${config.imgUrl}/common/images/MobilePay/${selChannel.groupName}.png`}
							alt={selChannel.groupName}
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

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${config.cloudImgURL}/SiteSkin/img/Payment/`}
				displayKey="groupName"
			/>
			<GroupList
				title={i18n.lbl_SelectChannel}
				dataList={channelList}
				channel={selChannel}
				SelectPayment={SelectChannel}
				selected={selChannel?.channelId}
				mainKey={`deposit-full-${payType}-channelList`}
				imgKey="groupName"
				idKey="channelId"
				bindFullObj={true}
				prefixImgUrl={`${config.imgUrl}/common/images/MobilePay/`}
				displayKey="channelName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning}
				status={status}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				tip={i18n.lbl_AmountTooltip0}
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
