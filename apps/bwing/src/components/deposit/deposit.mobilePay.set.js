import React, { useContext, useState, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../../components/common/context";
import config from "../../config";
import LimitTip from "./limitTip";
import { isConvert, number_format, checkAmount } from "../common/common";
import { Redirect } from "@reach/router";
import InputBox, { defIptStatus } from "../common/inputbox.hint";
import path from "../../path";
import PageVerify from "./deposit.pageVerify";
import Title, { OneLineTitle } from "./deposit.mobilePay.title";
import DepositWrapper from "./deposit.wrapper";
import BackBtn from "./backBtn";

const SetMobilePay = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [amount, setAmount] = useState(() => {
		return props.location.state?.amountRule === 3 ? 0 : "";
	});
	const [warning, setWarning] = useState({
		status: defIptStatus.default,
		msg: ""
	});
	const [redirectPath, setRedirectPath] = useState(null);

	const _isConvert = isConvert(userInfo.currencyId);
	const paymentInfo = props.location.state;

	const [pageVerify, setPageVerify] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		props.location.state !== null
	);

	useEffect(() => {
		if (isMountedRef.current && props.location.state === null) {
			setRedirectPath(`/${path.deposit.root}`);
		}
	}, [props.location.state, redirectPath]);

	const VaildAmount = _amount => {
		let result = checkAmount(
			_amount,
			paymentInfo?.minAmount,
			paymentInfo?.maxAmount,
			_isConvert,
			i18n
		);
		if (result.status !== 0) {
			setWarning({
				status: defIptStatus.warning,
				msg: result.msg
			});
		} else {
			setWarning({
				status: defIptStatus.verified,
				msg: ""
			});
		}
		return result.status === 0;
	};

	const EditAmount = e => {
		let value = e.target.value;
		VaildAmount(value);
		setAmount(value);
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			let confirmAmount =
				paymentInfo.amountRule === 3 &&
				paymentInfo.amountList?.length > 0
					? amount / 1000
					: amount;

			let result = VaildAmount(confirmAmount);

			if (result) {
				const RedirectToNext = real_amount => {
					setPopBox(prevState => ({
						...prevState,
						isOpen: false
					}));
					setRedirectPath(`/${path.deposit.root}`);
					window.open(
						`${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay?ChannelId=${paymentInfo.channelId}&Amount=${real_amount}`
					);
				};

				let real_amount = _isConvert
					? confirmAmount * 1000
					: confirmAmount;
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<>
							<p>{i18n.lbl_ConfirmDeposit}</p>
							<img
								src={`${config.imgUrl}/common/images/MobilePay/${paymentInfo.groupName}.png`}
								alt={paymentInfo.groupName}
							/>
							<div>
								<ul>
									<li className="text-lightBlue">
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
								className="cancel"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n["lbl_Cancel"]}
							</button>
							<button
								className="submit"
								onClick={RedirectToNext.bind(
									this,
									real_amount
								)}>
								{i18n["lbl_Submit"]}
							</button>
						</div>
					)
				});
			}
		}
	};

	const OnSelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	if (!paymentInfo) return null;

	let amountBtn = paymentInfo?.amountList?.map(a => {
		return (
			<button
				className={amount === a ? "open" : ""}
				key={`deposit-mobilepay-${paymentInfo.groupId}-${paymentInfo.channelId}-${a}`}
				onClick={OnSelectAmount.bind(this, a)}>
				<i className="icon icon-checkmark"></i>
				{number_format(a, _isConvert)}
			</button>
		);
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<DepositWrapper step={3} i18n={i18n}>
			<div className="depositInBox">
				<Title i18n={i18n} />
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
						title={i18n["lbl_Amount"]}
						value={amount}
						numberConvert={isConvert(userInfo.currencyId)}
						inputType="tel"
						onChange={EditAmount}
						showTips={warning.status}
						tipDisplayText={warning.msg}
						btnStatus={warning.status}
					/>
				)}
				<div className="btn-group">
					<button className="submit" onClick={ClickSubmit}>
						{i18n.lbl_Submit}
					</button>
				</div>
			</div>
			<BackBtn i18n={i18n} to={`../`} />
		</DepositWrapper>
	);
};

export default SetMobilePay;
