import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "Context";
import TurnoverAccumulated from "./popbox.turnover";
import Otp from "./popbox.otp";
import OneGamePopBox from "./popbox.oneGame";

export const defPopBoxType = {
	default: "default",
	TurnoverAccumulated: "TurnoverAccumulated",
	Otp: "Otp",
	OneGame: "OneGame"
};

const PopUp = () => {
	const { popBox, setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	const handlePopBox = () => {
		setPopBox(prevState => ({ ...prevState, isOpen: false }));
	};

	let content = null;
	switch (popBox.popBoxType) {
		case defPopBoxType.TurnoverAccumulated:
			content = <TurnoverAccumulated {...popBox} />;
			break;

		case defPopBoxType.Otp:
			content = <Otp ClosePopbox={popBox.ClosePopbox} />;
			break;

		case defPopBoxType.OneGame:
			content = <OneGamePopBox setRedirect={popBox.setRedirect} />;
			break;

		default:
			content = (
				<div className="popTxt">
					{popBox.content}
					{popBox.hasBtn === true ? popBox.btnBar : null}
				</div>
			);
			break;
	}

	return (
		<div id="popup" className={`${popBox.isOpen ? "active" : ""}`}>
			<div className="pop">
				<div className="popTit">
					{popBox.hideCloseBtn === true ? null : (
						<div
							className="icon icon-close"
							onClick={handlePopBox}
						/>
					)}
					{popBox.title ?? i18n.lbl_ImportantNote}
				</div>
				{content}
			</div>
		</div>
	);
};
export default PopUp;
