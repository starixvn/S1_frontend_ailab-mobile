import React, { useContext } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { i18nContext, userInfoContext, popBoxContext } from "./context";
import path from "../../path";

const currentLocation = window.location.origin;

const ReferralPopBox = ({ referralCode }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const refLink = `${currentLocation}/${userInfo.langId}/${path.join.root}?AffId=${referralCode}`;

	const copyText = () => {
		const virtualInput = document.createElement("input");
		virtualInput.value = `${i18n.lbl_Referral_Welcome} ${refLink}`;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);
	};

	const clickQRCode = () => {
		const canvas = document.getElementById("refQRcode");
		const imgUrl = canvas.toDataURL("image/png", "image/octet-stream");

		setPopBox({
			isOpen: true,
			title: `${i18n.lbl_Referral_code}: ${referralCode}`,
			content: <img src={imgUrl} alt={referralCode} />
		});
	};

	return (
		<div className="popTxt">
			<div>{i18n.lbl_Your_link_invite}</div>
			<div>
				<button>
					<i className="icon icon-files-empty" onClick={copyText} />
				</button>
				<button onClick={clickQRCode}>
					<i className="icon icon-qrcode" />
					<QRCode
						id="refQRcode"
						value={refLink}
						style={{ display: "none" }}
					/>
				</button>
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${i18n.lbl_Referral_Welcome}`}>
					<i className="icon icon-facebook" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://wa.me/?text=${i18n.lbl_Referral_Welcome} ${refLink}`}>
					<i className="icon icon-whatsapp" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href={`http://line.naver.jp/R/msg/text/?${i18n.lbl_Referral_Welcome}%0D%0A${refLink}`}>
					<i className="icon icon-line" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://t.me/share/url?url=${refLink}&text=${i18n.lbl_Referral_Welcome}`}>
					<i className="icon icon-telegram" />
				</a>
			</div>
		</div>
	);
};

ReferralPopBox.propTypes = {
	referralCode: PropTypes.string.isRequired
};

export default ReferralPopBox;
