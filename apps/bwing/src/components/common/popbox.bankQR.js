import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "./context";
import { paymentImgUrl } from "../../config";
import { isConvert, number_format } from "./common";

const BankQR = ({
	onClose,
	qrCodeUrl,
	amount,
	transId,
	code,
	bankLogo,
	title,
	generateQr
}) => {
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
		<div id="popup" className="qrpayPop active">
			<div className="pop">
				<div className="popTit">
					{title}
					<div className="icon icon-close" onClick={onClose} />
				</div>
				<div className="popTxt">
					<div className="logo">
						<img
							alt={bankLogo}
							src={`${paymentImgUrl}/${bankLogo.toLowerCase()}`}
						/>
					</div>
					<div className="info">
						{i18n.lbl_TransactionID}
						<span>{transId}</span>
					</div>
					<div className="sisa">
						<div>{i18n.lbl_PaymentTimeLeft}</div>
						<div>
							<span>{timeFormat(minutes)}</span>:
							<span>{timeFormat(seconds)}</span>
						</div>
					</div>
					<div className="amount">
						{i18n.lbl_Amount}
						<span>
							{i18n[`Currency_${userInfo.currencyId}`]}{" "}
							{number_format(
								amount,
								isConvert(userInfo.currencyId),
								0
							)}
						</span>
					</div>
					<div className="guide">
						<div className="qrCode">
							{generateQr ? (
								<QRCode
									id="QRcode"
									value={`${paymentImgUrl}${qrCodeUrl}`}
									renderAs="svg"
								/>
							) : (
								<img src={qrCodeUrl} alt="" />
							)}
						</div>
						<div className="code">
							{code}
							<button>{i18n.lbl_Copy}</button>
						</div>
						<div className="info">{i18n.lbl_BankQrInfo}</div>
					</div>
					<div className="title">{`${i18n.lbl_Content}：`}</div>
					<ul>
						<li>{i18n.lbl_BankQrContent1}</li>
						<li>{i18n.lbl_BankQrContent2}</li>
						<li>{i18n.lbl_BankQrContent3}</li>
						<li>{i18n.lbl_BankQrContent4}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BankQR;

BankQR.defaultProps = {
	onClose: () => null,
	generateQr: null
};

BankQR.propTypes = {
	onClose: PropTypes.func,
	qrCodeUrl: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	transId: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	bankLogo: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	generateQr: PropTypes.bool
};
