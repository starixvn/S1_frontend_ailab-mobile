import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "Context";
import TurnoverAccumulated from "./popbox.turnover";
import Otp from "./popbox.otp";
import OneGamePopBox from "./popbox.oneGame";
import ReferralPopBox from "./popbox.referral";
import DomainListPop from "./popbox.domainList";
import PaymentQR from "./popbox.paymentQR";
import AddCryptoWallet from "./popbox.addCrypto";
import DuitNowQR from "./popbox.duitNowQR";

export const defPopBoxType = {
	default: "default",
	TurnoverAccumulated: "TurnoverAccumulated",
	Otp: "Otp",
	OneGame: "OneGame",
	Referral: "Referral",
	DomainList: "DomainList",
	PaymentQR: "PaymentQR",
	AddCryptoWallet: "AddCryptoWallet",
	DuitNowQR: "DuitNowQR"
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
			content = (
				<OneGamePopBox
					setRedirect={popBox.setRedirect}
					tpId={popBox.tpId}
				/>
			);
			break;

		case defPopBoxType.Referral:
			content = <ReferralPopBox referralCode={popBox.referralCode} />;
			break;

		case defPopBoxType.DomainList:
			content = <DomainListPop domainList={popBox.domainList} />;
			break;

		case defPopBoxType.PaymentQR:
			content = <PaymentQR {...popBox} />;
			break;

		case defPopBoxType.AddCryptoWallet:
			content = <AddCryptoWallet {...popBox} />;
			break;

		case defPopBoxType.DuitNowQR:
			content = <DuitNowQR {...popBox} />;
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
		<div
			id="popup"
			className={`${popBox.className ?? ""}${
				popBox.isOpen ? " active" : ""
			}`}>
			{popBox.fullPage ? (
				popBox.content
			) : popBox.title || content ? (
				<div className="pop">
					<div className="popTit">
						{popBox.hideCloseBtn === true ? null : (
							<div
								className="icon icon-close"
								onClick={popBox.handlePopBox ?? handlePopBox}
							/>
						)}
						{popBox.title ?? i18n.lbl_ImportantNote}
					</div>
					{content}
				</div>
			) : (
				content
			)}
		</div>
	);
};
export default PopUp;
