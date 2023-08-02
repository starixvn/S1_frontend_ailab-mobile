import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { cloudBannerImgURL, paymentImgURL } from "../../config";
import { number_format } from "./common";

const EWalletQR = ({ amount, qrUrl, transId, onClose }) => {
	const inputRef = useRef(null);
	const { t } = useTranslation();

	const copy = () => {
		if (inputRef.current) {
			inputRef.current.select();
			document.execCommand("copy");
		}
	};
	return (
		<div className="pop">
			<div className="popTit">
				<img src={`${cloudBannerImgURL}/h5/img/thaiqr.jpg`} alt="" />
				<div className="icon icon-close" onClick={onClose} />
			</div>
			<div className="popTxt">
				<div className="guide">
					<div className="banklogo">
						<img
							src={`${cloudBannerImgURL}/h5/img/promptpay.png`}
							alt=""
						/>
					</div>
					<div className="qrCode">
						<img src={`${paymentImgURL}${qrUrl}`} alt="" />
					</div>
					<div className="amount">
						{t("lbl_EWalletQRDesc1")}
						<span>฿ {number_format(amount)}</span>
					</div>
					<div className="description">
						Description:
						<input type="text" value={transId} ref={inputRef} />
						<button
							className="icon icon-files-empty"
							onClick={copy}
						/>
					</div>
					<div className="info">
						<p>{t("lbl_EWalletQRDesc2")}</p>
						<div>{t("lbl_EWalletQRDesc3")}</div>
						<div>
							{t("lbl_EWalletQRDesc4")}
							<span>167</span>
							{t("lbl_EWalletQRDesc5")}
						</div>
						<div>
							{t("lbl_EWalletQRDesc6")}
							<span> {t("lbl_EWalletQRDesc7")}</span>
						</div>
					</div>
				</div>
				<div className="title">{t("lbl_EWalletQRDesc8")}</div>
				<ul>
					<li>{t("lbl_EWalletQRDesc9")}</li>
					<li>{t("lbl_EWalletQRDesc10")}</li>
					<li>{t("lbl_EWalletQRDesc11")}</li>
					<li>{t("lbl_EWalletQRDesc12")}</li>
				</ul>
			</div>
		</div>
	);
};

export default EWalletQR;

EWalletQR.propTypes = {
	amount: PropTypes.number.isRequired,
	qrUrl: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
};
