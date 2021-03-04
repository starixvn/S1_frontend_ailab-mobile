import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config from "../../config";
import { isConvert, number_format, checkAmount } from "../common/common";
import api from "../../service/api";

const payType = "MobilePay";

const useHandleAmount = ({ currencyId, minAmount, maxAmount, i18n }) => {
	const _isConvert = isConvert(currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState("");

	useEffect(() => {
		setAmount("");
		setWarning("");
	}, [minAmount, maxAmount]);

	const SelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	const EditAmount = e => {
		const { value } = e.target;
		VaildAmount({ _amount: value, minAmount, maxAmount, i18n });
		setAmount(value);
	};

	const VaildAmount = ({ _amount, displayWarning = true }) => {
		const result = checkAmount(
			_amount,
			minAmount,
			maxAmount,
			_isConvert,
			i18n
		);
		if (displayWarning) {
			if (result.status !== 0) {
				setWarning(result.msg);
			} else {
				setWarning("");
			}
		}

		return result.status === 0;
	};

	return { amount, warning, SelectAmount, EditAmount, VaildAmount };
};

const Payment = props => {
	const { paymentList, creditTimeKey } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

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
		minAmount: selChannel.minAmount,
		maxAmount: selChannel.maxAmount,
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			SelectPayment(paymentList[0].groupId);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const SelectPayment = groupId => {
		if (selGroupId !== groupId) {
			setSelGroupId(() => groupId);
			setLoading(true);
			api.payment.GetMobilePayInfoList(groupId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setChannelList(res.data.data);
							SelectChannel(res.data.data?.[0]);
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

	const SelectChannel = channel => {
		setChannel(channel);
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
		<div className="depositModule_mobile open">
			<div className="title text-org icon icon-nova88">
				{i18n[creditTimeKey]}
			</div>

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroupId}
			/>
			<ChannelList
				title={i18n.lbl_SelectChannel}
				dataList={channelList}
				SelectPayment={SelectChannel}
				selected={selChannel}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={warning}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
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

const GroupList = ({ dataList, SelectPayment, selected, title }) => {
	const rows = dataList?.map(data => {
		const mainKey = `deposit-full-${payType}-groupList-${data.groupId}`;
		return (
			<Radio
				key={mainKey}
				id={`${mainKey}-radio`}
				radioGroup="deposit-mobilepay-group"
				imgUrl={`${config.cloudImgURL}/SiteSkin/img/Payment/${data.groupName}.png`}
				imgAlt={data.groupName}
				onChange={SelectPayment.bind(this, data.groupId)}
				isSelect={selected === data.groupId}
			/>
		);
	});
	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			<div className="selectModule">{rows}</div>
		</>
	);
};

GroupList.defaultProps = {
	dataList: null,
	selected: null
};

GroupList.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	SelectPayment: PropTypes.func.isRequired,
	selected: PropTypes.number,
	title: PropTypes.string.isRequired
};

const ChannelList = ({ dataList, SelectPayment, selected, title }) => {
	const rows = dataList?.map(data => {
		const mainKey = `deposit-full-${payType}-channellist-${data.channelId}`;
		return (
			<Radio
				key={mainKey}
				id={`${mainKey}-radio`}
				radioGroup="deposit-mobilepay-channel"
				imgUrl={`${config.imgUrl}/common/images/MobilePay/${data.groupName}.png`}
				imgAlt={data.groupName}
				onChange={SelectPayment.bind(this, data)}
				isSelect={selected.channelId === data.channelId}
			/>
		);
	});
	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			<div className="selectModule">{rows}</div>
		</>
	);
};

ChannelList.defaultProps = {
	dataList: null,
	selected: {}
};

ChannelList.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	SelectPayment: PropTypes.func.isRequired,
	selected: PropTypes.objectOf(PropTypes.any),
	title: PropTypes.string.isRequired
};

const Radio = ({ radioGroup, id, imgUrl, imgAlt, onChange, isSelect }) => {
	return (
		<div>
			<input
				type="radio"
				name={radioGroup}
				id={id}
				value=""
				onChange={onChange}
				checked={isSelect}
			/>
			<label htmlFor={id}>
				<div />
			</label>
			<div className="bankName">
				<img src={imgUrl} alt={imgAlt} />
			</div>
		</div>
	);
};

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isSelect: PropTypes.bool.isRequired,
	radioGroup: PropTypes.string.isRequired
};

const AmountInput = ({
	title,
	channel,
	i18n,
	tip,
	_isConvert,
	amount,
	SelectAmount,
	EditAmount
}) => {
	const { amountRule, amountList, minAmount, maxAmount } = channel;
	let content = null;
	if (amountRule === 3 && amountList?.length > 0) {
		const rows = amountList.map(a => {
			const realAmount = _isConvert ? amount * 1000 : amount;
			return (
				<button
					onClick={SelectAmount.bind(this, _isConvert ? a / 1000 : a)}
					className={a === realAmount ? "open" : ""}
					key={`${payType}-fixedamount-${a}`}>
					<i className="icon icon-checkmark" />
					{number_format(a, _isConvert)}
				</button>
			);
		});
		content = <div className="buttonBox">{rows}</div>;
	} else {
		content = (
			<div className="inputBox">
				<input
					onChange={EditAmount}
					placeholder={
						minAmount && maxAmount
							? `${i18n.lbl_MinMaxAmount}: ${number_format(
									minAmount,
									_isConvert
							  )} / ${number_format(maxAmount, _isConvert)}`
							: ""
					}
					value={amount}
				/>
				<div className="tip">{tip}</div>
			</div>
		);
	}

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			{content}
		</>
	);
};

AmountInput.defaultProps = {
	tip: ""
};

AmountInput.propTypes = {
	title: PropTypes.string.isRequired,
	channel: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tip: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired,
	amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	SelectAmount: PropTypes.func.isRequired,
	EditAmount: PropTypes.func.isRequired
};

export default Payment;
