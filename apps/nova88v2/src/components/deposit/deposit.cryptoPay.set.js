import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import Step from "./step";
import config from "../../config";
import LimitTip from "./limitTip";
import { isConvert, number_format, checkAmount } from "../common/common";
import InputBox from "../common/inputbox";

const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [amount, setAmount] = useState(() => {
		return props.location.state?.amountRule === 3 ? 0 : "";
	});
	const [warning, setWarning] = useState({ status: false, msg: "" });

	const _isConvert = isConvert(userInfo.currencyId);
	const paymentInfo = props.location.state;

	const VaildAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: paymentInfo.minAmount,
			maxAmount: paymentInfo.maxAmount,
			_isConvert,
			i18n
		});
		if (result.status !== 0) {
			setWarning({
				status: true,
				msg: result.msg
			});
		} else {
			setWarning({
				status: false,
				msg: ""
			});
		}
		return result.status === 0;
	};

	const EditAmount = e => {
		const { value } = e.target;
		VaildAmount(value);
		setAmount(value);
	};

	const ClickSubmit = () => {
		const confirmAmount =
			paymentInfo.amountRule === 3 && paymentInfo.amountList?.length > 0
				? amount / 1000
				: amount;

		const result = VaildAmount(confirmAmount);

		if (result) {
			const RedirectToNext = real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay?ChannelId=${paymentInfo.channelId}&Amount=${real_amount}`
				);
			};

			const real_amount = _isConvert
				? confirmAmount * 1000
				: confirmAmount;
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<div className="icon icon-BTC" />
						<div>
							<ul>
								<li className="text-org">
									{i18n.lbl_DepositAmount} :
								</li>
								<li>
									{number_format(real_amount, _isConvert)}
								</li>
							</ul>
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

	const OnSelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	const amountBtn = paymentInfo?.amountList?.map(a => {
		return (
			<button
				className={amount === a ? "open" : ""}
				key={`deposit-cryptoPay-${paymentInfo.groupId}-${paymentInfo.channelId}-${a}`}
				onClick={OnSelectAmount.bind(this, a)}>
				<i className="icon icon-checkmark" />
				{number_format(a, _isConvert)}
			</button>
		);
	});

	return (
		<>
			<Step step={3} />
			<div className="inputBox">
				<div className="account">
					<div className="bankLogo">
						<img
							src={`${config.imgUrl}/common/images/MobilePay/${paymentInfo.groupName}.png`}
							alt={paymentInfo.groupName}
						/>
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">
									{paymentInfo.groupName}
								</span>
								<LimitTip
									minAmount={paymentInfo.minAmount}
									maxAmount={paymentInfo.maxAmount}
									displayTextLimit={i18n.lbl_Unlimited}
									displayTextUnLimit={i18n.lbl_Limit}
									_isConvert={_isConvert}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{amountBtn &&
			amountBtn.length > 0 &&
			paymentInfo.amountRule === 3 ? (
				<>
					<span className="infoStates">
						{number_format(amount, _isConvert)}
					</span>
					<div className="buttonBox">{amountBtn}</div>
				</>
			) : (
				<InputBox
					icon="icon-pencil"
					placeholder={i18n.lbl_Amount}
					value={amount}
					inputType="tel"
					onChange={EditAmount}
					Warning={warning}
					tip={`${i18n.lbl_ExchangeRate} : ${paymentInfo.sellRate} (${i18n.lbl_ExchangeRateReferenceOnly})`}
					ClassName="tip"
				/>
			)}
			<div className="btn-group">
				<Link to="../" className="white">
					{i18n.lbl_Back}
				</Link>
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Main.defaultProps = {
	location: {}
};

Main.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};

export default Main;
