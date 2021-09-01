import React, { useRef, useState, useEffect } from "react";
import { number_format } from "../common/common";

const DEFAULT_MIN_VALUE = 1;

export default ({
	onChangeAmount,
	amountValue,
	availableBalance = 1,
	_isConvert
}) => {
	const [mouseMoveActive, setMouseMoveActive] = useState(false);
	const [originalScreenX, setOriginalScreenX] = useState(null);
	const [originalPointWidth, setOriginalPointWidth] = useState(0);
	const [resultAmount, setResultAmount] = useState(amountValue);
	const [cashLineWidthPercentage, setCashLineWidthPercentage] = useState(0);

	const cashBarRef = useRef(null);

	const _maxValue = Math.floor(
		_isConvert ? availableBalance / 1000 : availableBalance
	);

	const minMaxRange = (val, min, max) => {
		return Math.floor(Math.min(Math.max(val, min), max));
	};

	const widthPercentageCalculationHandlar = (currentVale, maxValue) => {
		const result = currentVale / maxValue;
		return isNaN(result) ? 0 : result;
	};

	const onMouseDownHandlar = e => {
		const cashBarElementWidth = cashBarRef.current.clientWidth;
		const _originalPointWidth =
			Math.imul(cashBarElementWidth, cashLineWidthPercentage) * 0.01;

		setOriginalPointWidth(_originalPointWidth);
		setOriginalScreenX(e.screenX);
		setMouseMoveActive(true);
	};

	const onMouseUpHandlar = () => {
		setMouseMoveActive(false);
	};

	const onMouseMoveHandlar = e => {
		if (!mouseMoveActive) return;
		const cashBarElementWidth = cashBarRef.current.clientWidth;
		const mouseMoveOffset = e.screenX - originalScreenX;
		const cashLinewidth = originalPointWidth + mouseMoveOffset;
		const _cashLineWidthPercentage = widthPercentageCalculationHandlar(
			minMaxRange(cashLinewidth, 0, cashBarElementWidth),
			cashBarElementWidth
		);
		const _resultAmount = _maxValue * _cashLineWidthPercentage;
		onChangeAmount(minMaxRange(Math.floor(_resultAmount), 1, _maxValue));
	};

	const handleClickOutside = e => {
		if (cashBarRef.current && !cashBarRef.current.contains(e.target)) {
			setMouseMoveActive(false);
		}
	};

	useEffect(() => {
		setResultAmount(minMaxRange(amountValue, 1, _maxValue));
		setCashLineWidthPercentage(
			minMaxRange(
				((amountValue - DEFAULT_MIN_VALUE) /
					(_maxValue - DEFAULT_MIN_VALUE)) *
					100,
				0,
				100
			)
		);

		if (amountValue > _maxValue) onChangeAmount(_maxValue);
	}, [amountValue]);

	useEffect(() => {
		if (typeof document !== `undefined`) {
			document.addEventListener("mouseup", handleClickOutside);
		}
		return () => {
			if (typeof document !== `undefined`) {
				document.removeEventListener("mouseup", handleClickOutside);
			}
		};
	}, []);

	const spanStyle = {
		// 禁止滑鼠反白選取此元件
		WebkitUserSelect: "none",
		MozUserSelect: "none",
		OUserSelect: "none",
		MsUserSelect: "none",
		// 不斷行
		whiteSpace: "nowrap"
	};

	return _maxValue > 1 ? (
		<div
			ref={cashBarRef}
			onMouseMove={onMouseMoveHandlar}
			onMouseUp={onMouseUpHandlar}
			className="cashBar">
			{/* <button className="min" onClick={() => onChangeAmount(1)}>
				Min
			</button> */}

			<div
				className="cashLine"
				style={{ width: `${cashLineWidthPercentage}%` }}>
				<div
					onMouseDown={onMouseDownHandlar}
					style={{ cursor: "pointer" }}
					className="cashPoint">
					<span style={spanStyle}>
						{`$${number_format(resultAmount)} ${
							(_isConvert ? "('000)" : "", 0)
						}`}
					</span>
				</div>
			</div>
			{/* <button className="max" onClick={() => onChangeAmount(_maxValue)}>
				Max
			</button> */}
		</div>
	) : null;
};
