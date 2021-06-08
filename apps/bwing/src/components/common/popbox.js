import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "./context";
import TurnoverAccumulated from "./popbox.turnover";
import Otp from "./popbox.otp";
import Loading from "./popbox.loading";
import DomainListPop from "./popbox.domainList";

export const defPopBoxType = {
	default: "default",
	TurnoverAccumulated: "TurnoverAccumulated",
	Otp: "Otp",
	Loading: "Loading",
	DomainList: "DomainList"
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

		case defPopBoxType.Loading:
			content = <Loading />;
			break;

		case defPopBoxType.DomainList:
			content = <DomainListPop domainList={popBox.domainList} />;
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

	return popBox.isOpen ? (
		<div
			id="popup"
			style={popBox.isOpen ? { display: "block" } : {}}
			className={popBox.className}>
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
					<h1 className="text-org">
						{popBox.title ?? i18n.lbl_ImportantNote}
					</h1>
				</div>
				{content}
			</div>
		</div>
	) : null;
};
export default PopUp;
