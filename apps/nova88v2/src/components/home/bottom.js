import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect } from "react";
import { userInfoContext } from "Context";
import { useGetSEODatas } from "../seo/seo";
import { getAffiliateLink } from "../common/common";
import { cloudBannerImgURL } from "../../config";
import useGetSocialChannel, {
	channelIcon,
	defDisplayPage
} from "../hook/useGetSocialChannel";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const defaultCuracaoScript = "a7019fa5-9f9a-468b-92da-4890f6a6e4a7";
const defaultXCMScript = "226e4de2-30aa-4077-951b-d440012994f3";

const Bottom = () => {
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { langId, currencyId } = userInfo;

	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId,
		displayPage: defDisplayPage.Footer
	});

	const { SEODatas } = useGetSEODatas();
	const showLicenseLogo = SEODatas?.activeDomain ?? false;

	const CuracaoScript = SEODatas?.script ?? defaultCuracaoScript;
	const XCMScript = SEODatas?.xcmScript ?? defaultXCMScript;

	const formattedCuracaoScript = CuracaoScript?.replaceAll("-", "_");
	const formattedXCMScript = XCMScript?.replaceAll("-", "_");

	useEffect(() => {
		try {
			if (showLicenseLogo) {
				const apgScript = window[`apg_${formattedCuracaoScript}`];
				const xcmScript = window[`xcm_${formattedXCMScript}`];
				apgScript?.init();
				xcmScript?.init();
			}
		} catch (error) {}
	}, [showLicenseLogo]);

	return (
		<div className="home-bottom">
			<div className="home-bottom-top">
				<div className="bottom-social">
					{socialChannel?.map(({ link, channelName }) => (
						<a
							key={channelName}
							href={link}
							target="_blank"
							rel="noreferrer noopener">
							<img
								src={`${cloudBannerImgURL}/h5/img/4.0/${channelIcon[channelName]}.png`}
								alt={channelName}
							/>
						</a>
					))}
				</div>
				<div className="bottom-license">
					<div>
						{t("lbl_Gaming_License")}
						<img
							className="icon-tick"
							src={`${cloudBannerImgURL}/h5/img/4.0/license-tick.png`}
							alt="license-tick"
						/>
					</div>
					<div>
						<div
							id={`apg-${CuracaoScript}`}
							data-apg-seal-id={CuracaoScript}
							data-apg-image-size="48"
							data-apg-image-type="basic-small"
						/>
						<div
							id={`xcm-${XCMScript}`}
							data-xcm-seal-id={XCMScript}
							data-xcm-image-size="36"
							data-xcm-image-type="basic-small"
						/>
						<div>
							<a
								href="https://www.begambleaware.org/"
								target="_blank"
								rel="noreferrer">
								<img
									src={`${cloudBannerImgURL}/h5/img/aware.png`}
									alt="begambleaware"
								/>
							</a>
						</div>
					</div>
					<Helmet>
						<script
							type="text/javascript"
							src={`https://${CuracaoScript}.snippet.antillephone.com/apg-seal.js?v=${Date.now()}`}
						/>
						<script
							type="text/javascript"
							src={`https://${XCMScript}.seals-xcm.certria.com/xcm-seal.js?v=${Date.now()}`}
						/>
					</Helmet>
				</div>
			</div>
			<div className="home-bottom-aff">
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
					{t("lbl_AffiliateProgram")}
				</a>
				<p>{t("lbl_Cookie_Reminder")}</p>
			</div>
		</div>
	);
};

export { Bottom };
