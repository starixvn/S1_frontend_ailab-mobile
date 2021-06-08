import React, { useState, useContext, useRef, useEffect } from "react";
import { i18nContext } from "Context";
import moment from "moment";
import { number_format, isConvert } from "./common";

const Panel = ({ amount, currencyId, imgUrl, handlePopBox }) => {
	const { i18n } = useContext(i18nContext);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const amountText = `${i18n[`Currency_${currencyId}`]} ${number_format(
		amount,
		false,
		0,
		isConvert(currencyId)
	)}`;

	const timeText = moment().format("YYYY-MM-DD H:mm:ss");

	return (
		<div className="popTxt">
			<div className="title">{`${i18n.lbl_PaymentDetails}：`}</div>
			<div>
				{`${i18n.lbl_Time}：`}
				<span>{timeText}</span>
			</div>
			<div>
				{`${i18n.lbl_OrderAmount}：`}
				<span>{amountText}</span>
			</div>
			<div className="guide">
				<img src={imgUrl} className="qrCode" alt="qrcode" />
				<div>
					{`${i18n.lbl_Pay} `}
					<span>{amountText}</span>
				</div>
				<ul>
					<li>{i18n.lbl_PaymentQRDesc1}</li>
					<li>{i18n.lbl_PaymentQRDesc2}</li>
				</ul>
			</div>
			<div className="title">{`${i18n.lbl_ImportantNotes}：`}</div>
			<ul>
				<li>{i18n.lbl_PaymentQRNote1}</li>
				<li>{i18n.lbl_PaymentQRNote2}</li>
			</ul>
			<div className="sisa">
				<div>{i18n.lbl_PaymentTimeLeft}</div>
				<div>
					<Counter timeStop={handlePopBox} />
				</div>
			</div>
		</div>
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

export default Panel;
