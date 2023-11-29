import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import QRCode from "qrcode.react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const stepList = [
	{ subtitle: "lbl_Share", description: "lbl_Referral_ShareDescription" },
	{ subtitle: "lbl_Recharge", description: "lbl_Referral_Recharge" },
	{
		subtitle: "lbl_Referral_rewards",
		description: "lbl_Referral_RewardsDescription"
	}
];

const ReferralInfo = ({ referralCode, onCopy }) => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const { t } = useTranslation();
	const link_default = window.location.origin;
	const referralLink = `${link_default}/${langId}/join?AffId=${referralCode}`;
	const welcomeMessage = t("lbl_Referral_Welcome_Goal123");
	const swiperParams = {
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		}
	};

	return (
		<div className="refer-info">
			<div className="refer-info-step">
				<div className="title">{t("lbl_Your_link_invite")}</div>
				<Swiper {...swiperParams}>
					{stepList.map(({ subtitle, description }, key) => (
						<div className="step-item" key={subtitle}>
							<div className="step-title">
								{t("lbl_Step", { step: key })}
							</div>
							<img
								src={`${bannerImgUrl}/h5/img/referral/referral-step-0${key}.svg`}
								alt=""
							/>
							<div className="subtitle">{t(subtitle)}</div>
							<p>{t(description)}</p>
						</div>
					))}
				</Swiper>
			</div>
			<div className="refer-info-share">
				<div className="refer-info-copy">
					<div className="subtitle">{t("lbl_Referral_code")}</div>
					<div className="copy">
						<i
							className="icon-copy-text"
							onClick={() => onCopy("ref_code")}
						/>
						<input type="text" value={referralCode} id="ref_code" />
					</div>
					<div className="subtitle">{t("lbl_Referral_link")}</div>
					<div className="copy">
						<i
							className="icon-copy-text"
							onClick={() => onCopy("ref_link")}
						/>
						<input type="text" value={referralLink} id="ref_link" />
					</div>
				</div>
				<div className="refer-info-qr">
					<div className="subtitle">QR CODE</div>
					<div className="refer-img-qr">
						<QRCode
							id={referralCode}
							value={referralLink}
							size={176}
						/>
					</div>
				</div>
				<div className="refer-info-social">
					<div className="subtitle">
						{" "}
						{t("lbl_Referral_ShareAcrossSocialMedia")}
					</div>
					<div className="social">
						<img
							onClick={() =>
								window.open(
									`https://www.facebook.com/sharer/sharer.php?u=${link_default}&quote=${welcomeMessage}`,
									"",
									"height=600,width=600"
								)
							}
							src={`${bannerImgUrl}/h5/img/referral/icon-facebook-a.svg`}
							alt=""
						/>
						<img
							onClick={() =>
								window.open(
									`https://wa.me/?&text=${welcomeMessage} ${link_default}`,
									"",
									"height=600,width=600"
								)
							}
							src={`${bannerImgUrl}/h5/img/referral/icon-whatapp-a.svg`}
							alt=""
						/>
						<img
							onClick={() =>
								window.open(
									`https://t.me/share/url?url=${link_default}&text=${welcomeMessage}`,
									"",
									"height=600,width=600"
								)
							}
							src={`${bannerImgUrl}/h5/img/referral/icon-telegram-a.svg`}
							alt=""
						/>
						<img
							onClick={() =>
								window.open(
									`http://line.naver.jp/R/msg/text/?${welcomeMessage}%0D%0A${link_default}`,
									"",
									"height=600,width=600"
								)
							}
							src={`${bannerImgUrl}/h5/img/referral/icon-line-a.svg`}
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReferralInfo;

ReferralInfo.propTypes = {
	referralCode: PropTypes.string.isRequired,
	onCopy: PropTypes.func.isRequired
};
