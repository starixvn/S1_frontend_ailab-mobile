import React, { useState, useContext, useRef, useEffect } from "react";
import { i18nContext } from "Context";
import moment from "moment";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "./common";

const Panel = ({
	amount,
	depositAmount,
	currencyId,
	imgUrl,
	handlePopBox,
	orderNumber,
	Token,
	Rate,
	RequestAmount,
	QRcodeURL,
	promoContent,
	cashbackAmount,
	PromotionRate,
	receivedAmount,
	currencyName
}) => {
	const { i18n } = useContext(i18nContext);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const depositAmountText = `${
		i18n[`Currency_${currencyId}`]
	} ${number_format(depositAmount, isConvert(currencyId), 0)}`;

	const amountText = `${i18n[`Currency_${currencyId}`]} ${number_format(
		amount,
		isConvert(currencyId),
		0
	)}`;

	const timeText = moment().format("YYYY-MM-DD H:mm:ss");

	const onCopy = ({ val }) => {
		const virtualInput = document.createElement("input");
		virtualInput.value = val;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);
	};

	return (
		<>
			<div className="cryptolist">
				<span className="txt-lightgray">{`${i18n.lbl_PaymentDetails}：`}</span>
				<div>
					{`${i18n.lbl_Time}：`}
					<span>{timeText}</span>
				</div>
				{orderNumber !== "" && orderNumber && (
					<div>
						{`${i18n.lbl_Deposit_DragonPayPop_OrderNumber}：`}
						<span>{orderNumber}</span>
					</div>
				)}
				<div>
					{`${i18n.lbl_OrderAmount}：`}
					<span>{amountText}</span>
				</div>
				{promoContent === "1" && (
					<>
						<div>
							{`${i18n.lbl_CashbackAmount}：`}
							<span>
								{`${number_format(
									cashbackAmount,
									isConvert(currencyId)
								)}(${PromotionRate})`}
							</span>
						</div>
						<div>
							{`${i18n.lbl_ReceivedAmount}：`}
							<span>
								{number_format(
									receivedAmount,
									isConvert(currencyId)
								)}
							</span>
						</div>
					</>
				)}
			</div>
			<div className="cryptoGuide">
				{QRcodeURL ? (
					<>
						<QRCode
							className="lineqr_img"
							id="refQRcode"
							value={QRcodeURL}
						/>
						<span className="txt-lightgray">
							{QRcodeURL}
							<button
								className="icon icon-files-empty"
								onClick={() => onCopy({ val: QRcodeURL })}
							/>
						</span>
					</>
				) : (
					<img src={imgUrl} className="qrCode" alt="qrcode" />
				)}
				<ul>
					<li>{`${i18n.lbl_Pay} `}</li>
					<li>{depositAmountText}</li>
				</ul>
				{Token?.length > 0 && (
					<ul>
						<li>{i18n.lbl_Method}：</li>
						<li>{Token}</li>
					</ul>
				)}
				{Rate?.length > 0 && (
					<ul>
						<li>{i18n.lbl_Rate}：</li>
						<li>{Rate}</li>
					</ul>
				)}
				{RequestAmount?.length > 0 && (
					<ul>
						<li>{`${currencyName} ${i18n.lbl_Amount}`}：</li>
						<li>{RequestAmount}</li>
						<button
							className="icon icon-files-empty"
							onClick={() => onCopy({ val: RequestAmount })}
						/>
					</ul>
				)}
			</div>
			<div className="txt-crypto">
				{`${i18n.lbl_ImportantNotes}：`}

				<ul>
					<li>{i18n.lbl_PaymentQRDesc1}</li>
					<li>{i18n.lbl_PaymentQRDesc2}</li>
					<li>{i18n.lbl_PaymentQRNote1}</li>
					<li>{i18n.lbl_PaymentQRNote2}</li>
				</ul>
			</div>
			<div className="sisa">
				<div>{i18n.lbl_PaymentTimeLeft}</div>
				<div>
					<Counter timeStop={handlePopBox} />
				</div>
			</div>
		</>
	);
};

export const Counter = ({ startUnixTime = null, timeStop }) => {
	const now = moment().unix();
	const [count, setCount] = useState((startUnixTime || now) + 600 - now);
	const timerRef = useRef(null);

	const secondsToTime = secondsInTime => {
		const pad = (num, size) => {
			return `000${num}`.slice(size * -1);
		};
		const time = parseFloat(secondsInTime).toFixed(3);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prev => prev - 1);
		}, 1000);
		timerRef.current = interval;

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (count === 0) {
			clearInterval(timerRef.current);
			timeStop();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	return ` ( ${secondsToTime(count)} ) `;
};

Panel.defaultProps = {
	amount: "",
	depositAmount: "",
	currencyId: 2,
	handlePopBox: () => null,
	imgUrl: "",
	orderNumber: "",
	Token: "",
	Rate: "",
	RequestAmount: "",
	QRcodeURL: "",
	promoContent: null,
	cashbackAmount: null,
	PromotionRate: null,
	receivedAmount: null
};
Panel.propTypes = {
	amount: PropTypes.string,
	depositAmount: PropTypes.string,
	currencyId: PropTypes.number,
	handlePopBox: PropTypes.func,
	imgUrl: PropTypes.string,
	orderNumber: PropTypes.string,
	Token: PropTypes.string,
	Rate: PropTypes.string,
	RequestAmount: PropTypes.string,
	QRcodeURL: PropTypes.string,
	promoContent: PropTypes.string,
	cashbackAmount: PropTypes.string,
	PromotionRate: PropTypes.string,
	receivedAmount: PropTypes.string
};

export default Panel;
