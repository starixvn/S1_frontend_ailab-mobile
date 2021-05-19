import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const defCurrenyId = {
	MYR: 2,
	THB: 4,
	RMB: 13,
	IDR: 15
};

const langToCurrency = {
	en: defCurrenyId.MYR,
	cs: defCurrenyId.MYR,
	th: defCurrenyId.THB,
	id: defCurrenyId.IDR
};

const Jackpot = ({ i18n, userInfo }) => {
	const jackpotRef = useRef();
	const _currencyId = userInfo.currencyId ?? langToCurrency[userInfo.langId];
	const _currency = i18n[`Currency_${_currencyId}`];
	const [value, setValue] = useState({ curr: "", prev: "" });
	const animateDelaySec = 800;

	useEffect(() => {
		try {
			const ticker = new Ticker({
				info: 2,
				casino: "hotspin88am",
				currency: _currency === "RMB" ? "cny" : _currency?.toLowerCase()
			});

			ticker.attachToTextBox("tick");
			ticker.tick();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useInterval(() => {
		setValue({
			curr: jackpotRef.current.innerText,
			prev: value.curr
		});
	}, 2000 + animateDelaySec);
	return (
		<>
			<span id="tick" ref={jackpotRef} style={{ display: "none" }} />
			{value.curr ? (
				<div className="jpot">
					<div className="number">
						<div>{_currency}</div>
						<ShowingNum value={value} currency={_currency} />
					</div>
				</div>
			) : null}
		</>
	);
};

Jackpot.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const ShowingNum = ({ value, currency }) => {
	let currTotal = [];
	let prevTotal = [];
	if (currency === "THB") {
		currTotal = String(value.curr).substr(1).split("");
		prevTotal = String(value.prev).substr(1).split("");
	} else {
		currTotal = String(value.curr).split(" ")[0].split("");
		prevTotal = String(value.prev).split(" ")[0].split("");
	}
	const elementList = document.querySelectorAll(
		".jpot .number .numberRow > div.active"
	);

	const arr = currTotal.map((val, idx) => {
		const isNumber = !isNaN(Number(val));
		const key = `jackpot-${idx}line`;
		let valArr = [];

		if (isNumber) {
			const prevVal = Number(prevTotal[idx]);
			if (prevVal <= val) {
				valArr = numberArray.slice(prevVal, Number(val) + 1);
			} else {
				const valArr1 = numberArray.slice(prevVal);
				const valArr2 = numberArray.slice(0, Number(val) + 1);
				valArr = [...valArr1, ...valArr2];
			}

			return (
				<div className="numberRow" key={key}>
					<div className="active">
						{valArr.map((n, i) => (
							<div key={`jackpot-num-${i}`}>{n}</div>
						))}
					</div>
				</div>
			);
		}

		return (
			<div key={key}>
				<div>{val}</div>
			</div>
		);
	});

	const currAmount = currTotal.filter(item => item !== "," && item !== ".");
	if (currAmount.length > 0) {
		const prevAmount = prevTotal.filter(
			item => item !== "," && item !== "."
		);

		currAmount.forEach((n, idx) => {
			const height =
				prevAmount[idx] <= n
					? n - prevAmount[idx]
					: 10 - Math.abs(n - prevAmount[idx]);

			const elemHeight = 17 * Number(height);
			const elem = elementList?.[idx];

			if (elem) {
				elem.style.top = 0;
				elem.animate({ top: `-${elemHeight}px` }, 2000);

				Promise.all(
					elem.getAnimations().map(animation => animation.finished)
				).then(() => {
					elem.style.top = `-${elemHeight}px`;
				});
			}
		});
	}

	return arr;
};

ShowingNum.propTypes = {
	value: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Jackpot;
