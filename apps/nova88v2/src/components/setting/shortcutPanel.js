import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import { userInfoContext } from "Context";
import path from "../../path";
import {
	getAffiliateLink,
	defLiveChatLangIdToCurrencyId
} from "../common/common";
import useHandleLogin from "../hook/useHandleLogin";
import SiteURL, { cloudBannerImgURL } from "../../config";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { getLeaderBoardSupportCurrencyId } from "../ranking/def";

const ShortcutPanel = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin, currencyId } = userInfo;

	const { handleLogin } = useHandleLogin();

	const navigatePath = page =>
		isLogin ? navigate(`/${langId}/${page}`) : handleLogin();

	return (
		<div className="menu-center">
			<a
				onClick={() => {
					navigatePath(path.profile.root);
				}}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/profile.png`}
					alt="profile"
				/>
				<span>{t("lbl_Profile")}</span>
			</a>
			<Link to={path.promotion.root}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/promos.png`}
					alt="promos"
				/>
				<span>{t("lbl_Promotion")}</span>
			</Link>
			{allowedCurrencyList.VIP.includes(currencyId) && (
				<Link to={path.vip.root}>
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/vip.png`}
						alt="vip"
					/>
					<span>{t("lbl_VIP")}</span>
				</Link>
			)}
			{allowedCurrencyList.rewards.includes(currencyId) && (
				<a
					href={`${SiteURL.openURL}/rewards/`}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/88reward.png`}
						alt="88reward"
					/>
					<span>88Reward</span>
				</a>
			)}
			{getLeaderBoardSupportCurrencyId().includes(currencyId) && (
				<Link to={path.ranking.root}>
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/ranking.png`}
						alt="ranking"
					/>
					<span>{t("lbl_Ranking")}</span>
				</Link>
			)}
			<a onClick={() => navigatePath(path.referral.root)}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/referral.png`}
					alt="referral"
				/>
				<span>{t("lbl_Referral")}</span>
			</a>
			<a
				rel="noreferrer"
				target="_blank"
				href={`https://direct.lc.chat/11638088/${
					defLiveChatLangIdToCurrencyId[langId] ??
					defLiveChatLangIdToCurrencyId.en
				}`}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/livechat-2.png`}
					alt="livechat"
				/>
				<span>{t("lbl_LiveChat")}</span>
			</a>
			<a
				className="title"
				style={
					allowedCurrencyList.affiliate.includes(currencyId)
						? {}
						: { pointerEvents: "none" }
				}
				href={getAffiliateLink(currencyId, langId)}
				target="_blank"
				rel="noreferrer noopener">
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/aff.png`}
					alt="aff"
				/>
				<span>{t("lbl_AffiliateProgram")}</span>
			</a>
		</div>
	);
};

export default ShortcutPanel;
