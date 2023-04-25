import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "Context";
import TurnoverAccumulated from "./popbox.turnover";
import Otp from "./popbox.otp";
import OneGamePopBox from "./popbox.oneGame";
import ReferralPopBox from "./popbox.referral";
import DomainListPop from "./popbox.domainList";
import PromptDeposit from "./popbox.promptDeposit";
import PaymentQR from "./popbox.paymentQR";
import AddCryptoWallet from "./popbox.addCrypto";
import BankQR from "./popbox.bankQR";

export const defPopBoxType = {
	default: "default",
	TurnoverAccumulated: "TurnoverAccumulated",
	Otp: "Otp",
	OneGame: "OneGame",
	Referral: "Referral",
	DomainList: "DomainList",
	PromptDeposit: "PromptDeposit",
	PaymentQR: "PaymentQR",
	AddCryptoWallet: "AddCryptoWallet",
	BankQR: "BankQR"
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

		case defPopBoxType.PromptDeposit:
			content = <PromptDeposit {...popBox} />;
			break;

		case defPopBoxType.PaymentQR:
			content = <PaymentQR {...popBox} />;
			break;

		case defPopBoxType.AddCryptoWallet:
			content = <AddCryptoWallet {...popBox} />;
			break;

		case defPopBoxType.BankQR:
			content = <BankQR {...popBox} />;
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

	let displayContent = null;
	if (popBox.fullPage) {
		displayContent = popBox.content;
	} else if (popBox.custContent) {
		displayContent = popBox.custContent;
	} else if (popBox.title || content) {
		displayContent = (
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
		);
	} else {
		displayContent = content;
	}

	return (
		<div
			id="popup"
			className={`${popBox.className ?? ""}${
				popBox.isOpen ? " active" : ""
			}`}>
			{displayContent}
		</div>
	);
};
export default PopUp;
