import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "./context";
import TurnoverAccumulated from "./popbox.turnover";
import Otp from "./popbox.otp";
import Loading from "./popbox.loading";
import DomainListPop from "./popbox.domainList";
import AddCryptoWallet from "./popbox.addCrypto";
import PaymentQR from "./popbox.paymentQR";
import BankQR from "./popbox.bankQR";

export const defPopBoxType = {
	default: "default",
	TurnoverAccumulated: "TurnoverAccumulated",
	Otp: "Otp",
	Loading: "Loading",
	DomainList: "DomainList",
	AddCryptoWallet: "AddCryptoWallet",
	paymentQR: "paymentQR",
	BankQR: "BankQR"
};

const PopUp = () => {
	const { popBox, setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	const handlePopBox = () => {
		setPopBox(prevState => ({ ...prevState, isOpen: false }));
	};

	let content = null;
	let fallbackTitle = i18n.lbl_ImportantNote;
	switch (popBox.popBoxType) {
		case defPopBoxType.TurnoverAccumulated:
			content = (
				<TurnoverAccumulated
					currencyId={currencyId}
					turnover={turnover}
					rollover={rollover}
				/>
			);
			break;

		case defPopBoxType.Otp:
			content = <Otp ClosePopbox={popBox.ClosePopbox} />;
			break;

		case defPopBoxType.Loading:
			content = <Loading />;
			break;

		case defPopBoxType.DomainList:
			content = <DomainListPop domainList={popBox.domainList} />;
			break;

		case defPopBoxType.AddCryptoWallet:
			content = <AddCryptoWallet {...popBox} />;
			break;

		case defPopBoxType.paymentQR:
			content = <PaymentQR {...popBox} />;
			break;

		case defPopBoxType.BankQR:
			content = <BankQR {...popBox} />;
			break;

		default:
			fallbackTitle = i18n.lbl_Error_Oops;
			content = (
				<div className="popTxt">
					{popBox.content}
					{popBox.hasBtn === true ? popBox.btnBar : null}
				</div>
			);
			break;
	}
	return popBox.isOpen ? (
		<div
			id="popup"
			className={`${popBox.isOpen ? "show" : ""} ${popBox.className}`}>
			{popBox.custContent ? (
				popBox.custContent
			) : (
				<div className="pop">
					<div className="popTit">
						{popBox.hideCloseBtn === true ? null : (
							<div
								className="close open"
								onClick={popBox.handlePopBox ?? handlePopBox}>
								<span />
								<span />
								<span />
								<span />
								<span />
								<span />
							</div>
						)}
						{popBox.title ?? fallbackTitle}
					</div>
					{content}
				</div>
			)}
		</div>
	) : null;
};
export default PopUp;
