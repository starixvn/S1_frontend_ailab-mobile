import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import {
	useGetReferralCodeQuery,
	useGetReferralSummaryV2Query,
	useLazyGetReferralSettingDetailQuery
} from "@ailab-mobile/service";
import {
	i18nContext,
	referralPopBox,
	userInfoContext
} from "../common/context";
import { ReferralPopBox } from "./referral.popbox";
import { isConvert, number_format } from "../common/common";

const Referral = () => {
	const { t } = useTranslation();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setReferralBox } = useContext(referralPopBox);
	const _isConvert = isConvert(userInfo.currencyId);

	const {
		data: { data: referralSummaryData } = {}
	} = useGetReferralSummaryV2Query();

	const { data: { data: referralCode } = {} } = useGetReferralCodeQuery();

	const [getReferralSettingDetail] = useLazyGetReferralSettingDetailQuery();

	const onCopy = column_id => {
		const copyText = document.getElementById(column_id);
		copyText.select();
		navigator.clipboard.writeText(copyText.value);
	};

	const getReferralDetail = async () => {
		const {
			data: referralSettingDetail
		} = await getReferralSettingDetail().unwrap();

		// * 如果從後台關閉, data = null, 則直接 return 出去
		if (!referralSettingDetail) return;

		setReferralBox({
			isOpen: true,
			content: <ReferralPopBox data={referralSettingDetail} i18n={i18n} />
		});
	};

	const originHost = window.location.origin;
	const welcomeMessage = t("lbl_Referral_Welcome");
	const joinLink = `${originHost}/join?AffId=${referralCode}`;

	const referralInfoList = [
		{
			img: "icon-Facebook",
			url: `https://www.facebook.com/sharer/sharer.php?u=${joinLink}&quote=${welcomeMessage}`
		},
		{
			img: "icon-WhatsApp",
			url: `https://wa.me/?&text=${welcomeMessage} ${joinLink}`
		},
		{
			img: "icon-Telegram",
			url: `https://t.me/share/url?url=${joinLink}&text=${welcomeMessage}`
		},
		{
			img: "icon-Line",
			url: `http://line.naver.jp/R/msg/text/?${welcomeMessage}%0D%0A${joinLink}`
		}
	];

	return (
		<>
			<img
				src={`https://banner.0814media.net/h5/img/referral-topBanner-H5-${userInfo?.langId}.jpg`}
				alt=""
				className="referral-topbanner"
				onClick={getReferralDetail}
			/>
			<div className="refer">
				<div className="referstatus">
					<div className="title">{t("lbl_ReferralStatus")}</div>
					<div className="referstatus-item">
						<div className="card">
							{String(t("lbl_NoOfAchievements")).toUpperCase()}
							<div>
								{referralSummaryData?.referralCount &&
									referralSummaryData.referralCount}
							</div>
						</div>
						<div className="card">
							{t("Label_Referral_AccumulateRewardAmount")}
							<div>
								<span>
									{t(`Currency_${userInfo.currencyId}`)}
								</span>
								{referralSummaryData?.amountSum &&
									number_format(
										referralSummaryData.amountSum,
										_isConvert
									)}
							</div>
						</div>
					</div>
				</div>
				<div className="referinfo">
					<div className="referinfo-up">
						<div className="title">
							{t("Label_Referral_Simple3StepsToShare")}
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src="https://banner.0814media.net/h5/img/referral-step-01.png"
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("Label_Share")}
								</div>
								<p>{t("Label_Referral_ShareDescription")}</p>
							</div>
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src="https://banner.0814media.net/h5/img/referral-step-02.png"
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("Label_Recharge")}
								</div>
								<p>{t("Label_Referral_Recharge")}</p>
							</div>
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src="https://banner.0814media.net/h5/img/referral-step-03.png"
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("lbl_Rewards")}
								</div>
								<p>{t("Label_Referral_RewardsDescription")}</p>
							</div>
						</div>
					</div>
					<div className="referinfo-down">
						<div className="title">
							<div>{t("lbl_Your_link_invite")}</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("lbl_Referral_code")}
							</div>
							<div
								className="inputcopy"
								onClick={() => onCopy("ref_code")}>
								<input
									id="ref_code"
									type="text"
									value={referralCode}
								/>
							</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("lbl_Referral_link")}
							</div>
							<div
								className="inputcopy"
								onClick={() => onCopy("ref_link")}>
								<input
									type="text"
									value={joinLink}
									id="ref_link"
								/>
							</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">QR CODE</div>

							<QRCode value={joinLink} />
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("Label_Referral_ShareAcrossSocialMedia")}{" "}
							</div>
							<div classNameName="referinfo-share">
								{referralInfoList.map(item => {
									return (
										<img
											key={item.img}
											src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/${item.img}-1.png`}
											alt=""
											onClick={() =>
												window.open(
													item.url,
													"",
													"height=600,width=600"
												)
											}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Referral;
