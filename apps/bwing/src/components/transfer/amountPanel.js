import React from "react";
import InputBox from "../common/inputbox.hint";

export default ({
	i18n,
	changeDirection,
	amount,
	transferFrom,
	transferTo,
	EditAmount,
	warning,
	clickSubmit
}) => {
	return (
		<div className="depositInBox textCenter">
			<div className="swapBox">
				<span>{i18n["lbl_From"]}</span>
				<span>{i18n[transferFrom].toUpperCase()}</span>
			</div>
			<button
				className="icon icon-icon32px_Double-arrow swapIcon"
				onClick={changeDirection}></button>
			<div className="swapBox">
				<span>{i18n["lbl_To"]}</span>
				<span>{i18n[transferTo].toUpperCase()}</span>
			</div>
			<div className="inputBoxLevel">
				<div className="left">
					<InputBox
						title={i18n["lbl_Amount"]}
						value={amount}
						inputType="tel"
						onChange={EditAmount}
						btnStatus={warning.status}
					/>
				</div>
				<div className="right">
					<div className="btn-group">
						<button className="blue" onClick={clickSubmit}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				</div>
			</div>
			{warning.msg ? (
				<div className={`tip${warning.msg ? " open" : ""}`}>
					{warning.msg}
				</div>
			) : null}
		</div>
	);
};
