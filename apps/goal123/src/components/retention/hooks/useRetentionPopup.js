import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { popBoxContext } from "../../common/context";
import path from "../../../path";

const useRetentionPopup = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();

	const handleClose = () => {
		setPopBox({ isOpen: false });
	};

	const handleOK = () => {
		setPopBox({ isOpen: false });
		window.location.reload();
	};

	const openVerificationPopup = () => {
		const handleGoNow = () => {
			navigate(`/${path.member.root}`);
			handleClose();
		};
		setPopBox({
			isOpen: true,
			title: t("lbl_ImportantNote"),
			content: t("msg_OTPHint"),
			hasBtn: true,
			hideCloseBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={handleClose}>
						{t("lbl_Later")}
					</button>
					<button onClick={handleGoNow} className="btn-check">
						{t("lbl_GoNow")}
					</button>
				</div>
			)
		});
	};

	const openSuccessPopup = () => {
		setPopBox({
			isOpen: true,
			title: t("lbl_ImportantNote"),
			content: <div>{t("lbl_ClaimSucceed")}</div>,
			hasBtn: true,
			hideCloseBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={handleOK}>
						OK
					</button>
				</div>
			)
		});
	};

	const openErrorPopup = (message, errorCode) => {
		setPopBox({
			isOpen: true,
			title: t("lbl_ImportantNote"),
			content: `[${errorCode}]${message}`
		});
	};

	return {
		openVerificationPopup,
		openSuccessPopup,
		openErrorPopup
	};
};

export default useRetentionPopup;
