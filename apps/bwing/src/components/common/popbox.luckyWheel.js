import React, { useContext } from "react";
import { i18nContext, popBoxContext } from "Context";

const PopBoxLuckyWheel = ({ prize }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	return (
		<div className="pop active">
			<button
				className="icon icon-close"
				onClick={() => setPopBox({ isOpen: false })}
			/>
			<div className="title">{i18n.lbl_MysteryBox_Congratulations}</div>
			<div>{i18n.lbl_MysteryBox_CreditedAccount1}</div>
			<div className="am">{prize}</div>
			<div>{i18n.lbl_MysteryBox_CreditedAccount2}</div>
		</div>
	);
};

export default PopBoxLuckyWheel;
