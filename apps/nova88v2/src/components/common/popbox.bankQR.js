import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "./context";
import { paymentImgURL } from "../../config";

const BankQR = ({ onClose, qrUrl, amount, bankName }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [minutes, setMinutes] = useState(5);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else if (seconds === 0 && minutes > 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				onClose();
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [minutes, seconds]);
	const timeFormat = num => (num < 10 ? `0${num}` : num);

	return (
		<div className="popTxt">
			<div className="title">{i18n.lbl_ScanAndPay}</div>
			<div className="amount">
				{i18n.lbl_Amount}
				<span>
					{i18n[`Currency_${userInfo.currencyId}`]} {amount}
				</span>
			</div>
			<div className="guide">
				<div className="qrCode">
					<img src={`${paymentImgURL}${qrUrl}`} alt={bankName} />
				</div>
				<div className="sisa">
					<div>{i18n.lbl_PaymentTimeLeft}</div>
					<div>
						<span>{timeFormat(minutes)}</span>:
						<span>{timeFormat(seconds)}</span>
					</div>
				</div>
			</div>
			<div className="title">{i18n.lbl_ImportantNotes}：</div>
			<ul>
				<li>{i18n.lbl_DuitNowQRNote1}</li>
				<li>{i18n.lbl_DuitNowQRNote2}</li>
			</ul>
		</div>
	);
};

export default BankQR;

BankQR.defaultProps = {
	onClose: () => null
};

BankQR.propTypes = {
	onClose: PropTypes.func,
	qrUrl: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	bankName: PropTypes.string.isRequired
};
