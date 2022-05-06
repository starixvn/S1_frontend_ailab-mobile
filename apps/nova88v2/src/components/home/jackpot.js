import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";
import { Link } from "../../route/link";
import path from "../../path";
import defNav from "../casino/defNav";
import { langToCurrency } from "../common/common";

const defaultElementHeight = 17;
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const animateDelaySec = 800;

const Jackpot = ({ i18n, userInfo }) => {
	const jackpotRef = useRef();
	const intervalTimer = useRef();

	let _currencyId = null;

	if (userInfo.isLogin) {
		_currencyId = userInfo.currencyId;
	} else if (userInfo.isLogin === false) {
		_currencyId = langToCurrency[userInfo.langId];
	}

	const _currency = _currencyId ? i18n[`Currency_${_currencyId}`] : "";
	const [value, setValue] = useState({ curr: "", prev: "" });

	const supportAnimation = typeof document.getAnimations === "function";

	useEffect(() => {
		if (_currency) {
			try {
				intervalTimer.current = supportAnimation
					? 2000 + animateDelaySec
					: 0;

				const ticker = new Ticker({
					info: 2,
					casino: "hotspin88am",
					currency:
						_currency === "CNY" ? "cny" : _currency?.toLowerCase()
				});

				ticker.attachToTextBox("tick");
				ticker.tick();
			} catch (error) {
				console.log(error);
			}
		}
	}, [_currency, supportAnimation]);

	useInterval(() => {
		setValue(prev => ({
			curr: jackpotRef.current.innerText,
			prev: prev.curr
		}));
	}, intervalTimer.current);

	return (
		<Link to={path.casino.root} state={{ nav: defNav.PROMO.key }}>
			<span id="tick" ref={jackpotRef} style={{ display: "none" }} />
			{value.curr ? (
				<div className="jpot">
					<div className="number">
						<div>{_currency}</div>
						<ShowingNum
							value={value}
							currency={_currency}
							supportAnimation={supportAnimation}
						/>
					</div>
				</div>
			) : null}
		</Link>
	);
};

Jackpot.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const ShowingNum = ({ value, currency, supportAnimation }) => {
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

	if (supportAnimation) {
		const currAmount = currTotal.filter(
			item => item !== "," && item !== "."
		);
		if (currAmount.length > 0) {
			const prevAmount = prevTotal.filter(
				item => item !== "," && item !== "."
			);

			currAmount.forEach((n, idx) => {
				const height =
					prevAmount[idx] <= n
						? n - prevAmount[idx]
						: 10 - Math.abs(n - prevAmount[idx]);
				const elem = elementList?.[idx];

				if (elem) {
					const elemHeight = elem.querySelector("div").offsetHeight;
					const movingHeight =
						(elemHeight ?? defaultElementHeight) * Number(height);

					elem.style.top = 0;
					if (elem.animate) {
						elem.animate(
							{ top: `-${movingHeight}px`, easing: "ease" },
							2000
						);
					}

					Promise.all(
						elem
							.getAnimations()
							.map(animation => animation.finished)
					).then(() => {
						elem.style.top = `-${movingHeight}px`;
					});
				}
			});
		}
	}

	return arr;
};

ShowingNum.propTypes = {
	value: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Jackpot;
