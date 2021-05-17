import React, { useEffect, useRef, useState, useMemo } from "react";
import useInterval from "../hook/useInterval";

const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jackpot = ({ i18n, currencyId }) => {
	const jackpotRef = useRef();
	const _currencyId = currencyId ?? 2;
	const _currency = i18n[`Currency_${_currencyId}`];
	const [value, setValue] = useState("");

	const ticker = new Ticker({
		info: 2,
		casino: "hotspin88am",
		currency: _currency === "RMB" ? "cny" : _currency?.toLowerCase()
	});

	useEffect(() => {
		ticker.attachToTextBox("tick");
		ticker.tick();
	}, []);

	useInterval(() => {
		setValue(jackpotRef.current.innerText);
	}, 2000);

	return (
		<div className="jpot">
			<div className="number">
				<div>{_currency}</div>
				<span id="tick" ref={jackpotRef} style={{ display: "none" }} />
				<ShowingNum value={value} />
			</div>
		</div>
	);
};

const ShowingNum = ({ value }) => {
	const totalNum = String(value).split(" ")[0];
	const numArr = totalNum.split("");
	const elementList = document.querySelectorAll(
		".jpot .number .numberRow > div.active"
	);

	const totalAmount = numArr.filter(item => item !== "," && item !== ".");
	if (totalAmount.length > 0) {
		totalAmount.forEach((n, idx) => {
			const elemHeight = 20 * Number(n);
			const elem = elementList?.[idx];
			if (elem) {
				elem.animate(
					{
						top: `-${elemHeight}px`,
						direction: "normal, reverse",
						animationIterationCount: "infinite"
					},
					2000
				);
			}
		});
	}

	const arr = useMemo(
		() =>
			numArr.map((num, idx) => {
				const key = `jackpot-${idx}line`;
				return <Item key={key} val={num} />;
			}),
		[numArr.length]
	);

	return arr;
};

const Item = ({ val }) => {
	const isNumber = !isNaN(Number(val));

	if (isNumber) {
		return (
			<div className="numberRow">
				<div className="active">
					{numberArr.map((idx, n) => (
						<div key={`jackpot-num-${idx}`}>{n}</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div>{val}</div>
		</div>
	);
};

export default Jackpot;
