import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { siteInfo, cloudBannerImgURL } from "../../config";
import { Link } from "../../route/link";
import path from "../../path";
import { defCurrenyId, langToCurrency } from "../common/common";
import { useGetSEODatas } from "../seo/seo";

const defSocialMedia = currencyId => {
	switch (currencyId) {
		case defCurrenyId.MYR:
			return {
				fb: "https://www.facebook.com/nova88my/ ",
				twitter: "https://twitter.com/nova88_malaysia",
				ig: "https://www.instagram.com/nova88my/ ",
				yt: "https://www.youtube.com/channel/UCoUtgrQN2E10oke1Hmj0ATw",
				telegram: "https://t.me/nova88my"
			};
		case defCurrenyId.INR:
			return {
				fb: "https://www.facebook.com/nova88india",
				ig: "https://www.instagram.com/nova88indiaofficial/",
				telegram: "https://t.me/nova88india"
			};
		case defCurrenyId.THB:
			return {
				fb: "https://www.facebook.com/nova88thailandofficial/",
				ig: "https://www.instagram.com/nova88thai/",
				twitter: "https://twitter.com/nova88thai",
				telegram: "https://t.me/nova88thai",
				yt: "https://www.youtube.com/channel/UCw-GpZw8YG_VEPjJKZvbXqw"
			};
		case defCurrenyId.IDR:
			return {
				fb: "https://www.facebook.com/nova88indo",
				ig: "https://www.instagram.com/nova88indo/",
				twitter: "https://twitter.com/Nova88Indo",
				telegram: "https://t.me/nova88indo",
				yt: "https://www.youtube.com/channel/UCvX-E6TqyR3Ett7XMkTM1Bw",
				pinterest: "https://id.pinterest.com/Nova88Indonesia2"
			};
		default:
			return {
				fb: "https://www.facebook.com/nova88official/ ",
				twitter: "https://twitter.com/Nova88official/",
				ig:
					"https://www.instagram.com/accounts/login/?next=/nova88_official/ ",
				telegram: "https://t.me/Nova88Support1"
			};
	}
};

const Bottom = ({ i18n, langId, currencyId }) => {
	const _currencyId = currencyId ?? langToCurrency[langId];
	const socialMedia = defSocialMedia(_currencyId);

	return (
		<>
			<Link to={path.appDownload.root}>
				<img
					className="spokesperson"
					src={`${cloudBannerImgURL}/h5/img/app/appmodule.jpg`}
					alt="Go To Download App"
				/>
			</Link>
			<img
				className="spokesperson"
				src={`${cloudBannerImgURL}/h5/img/spokesperson.jpg`}
				alt="Endorser"
			/>
			<div className="aff">
				<a
					className="title"
					href={`${siteInfo(langId).affiliateLink}`}
					target="_blank"
					rel="noreferrer noopener">
					{i18n.lbl_AffiliateProgram}
				</a>
				<p>{i18n.lbl_Cookie_Reminder}</p>
			</div>
			<div className="social">
				<License i18n={i18n} />
				{socialMedia?.fb && (
					<a
						className="icon icon-facebook"
						href={socialMedia?.fb}
						target="_blank"
						rel="noreferrer noopener"
					/>
				)}
				{socialMedia?.ig && (
					<a
						className="icon icon-instagram"
						href={socialMedia?.ig}
						target="_blank"
						rel="noreferrer noopener"
					/>
				)}
				{socialMedia?.twitter && (
					<a
						className="icon icon-twitter"
						href={socialMedia?.twitter}
						target="_blank"
						rel="noreferrer noopener"
					/>
				)}
				{socialMedia?.yt && (
					<a
						className="icon icon-youtube"
						href={socialMedia?.yt}
						target="_blank"
						rel="noreferrer noopener"
					/>
				)}
				{socialMedia?.telegram && (
					<a
						className="icon icon-telegram"
						href={socialMedia?.telegram}
						target="_blank"
						rel="noreferrer noopener"
					/>
				)}
			</div>
		</>
	);
};

Bottom.defaultProps = {
	currencyId: null
};

Bottom.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number
};

const defaultScript = "a7019fa5-9f9a-468b-92da-4890f6a6e4a7";
const defaultXCMScript = "226e4de2-30aa-4077-951b-d440012994f3";

const License = ({ i18n }) => {
	const { SEODatas } = useGetSEODatas({ getFromAPI: true });
	const showLicenseLogo = SEODatas?.activeDomain ?? false;

	const CuracaoScript = SEODatas?.script ?? defaultScript;
	const formattedCuracaoScript = CuracaoScript?.replaceAll("-", "_");

	const XCMScript = SEODatas?.xcmScript ?? defaultXCMScript;
	const formattedXCMScript = XCMScript?.replaceAll("-", "_");

	useEffect(() => {
		try {
			if (showLicenseLogo) {
				// apg_a7019fa5_9f9a_468b_92da_4890f6a6e4a7.init();
				// xcm_226e4de2_30aa_4077_951b_d440012994f3.init();
				`apg_${formattedCuracaoScript}`.init();
				`xcm_${formattedXCMScript}`.init();
			}
		} catch (error) {}
	}, [showLicenseLogo]);

	return (
		<>
			<div>
				{showLicenseLogo && (
					<>
						<div>
							{i18n.lbl_Gaming_License}
							<img
								src={`${cloudBannerImgURL}/img/license_tick.png`}
								alt="vaild gaming license"
							/>
						</div>
						<div>
							{/* <div
							id="apg-a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
							data-apg-seal-id="a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
							data-apg-image-size="48"
							data-apg-image-type="basic-small"
						/> */}
							{/* <div
							id="xcm-226e4de2-30aa-4077-951b-d440012994f3"
							data-xcm-seal-id="226e4de2-30aa-4077-951b-d440012994f3"
							data-xcm-image-size="36"
							data-xcm-image-type="basic-small"
						/> */}
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
						</div>
					</>
				)}
			</div>
			<LicenseHelmet script={CuracaoScript} xcmScript={XCMScript} />
		</>
	);
};

License.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const LicenseHelmet = ({ script, xcmScript }) => (
	<Helmet>
		<script
			type="text/javascript"
			src={`https://${script}.snippet.antillephone.com/apg-seal.js`}
		/>
		<script
			type="text/javascript"
			src={`https://${xcmScript}.seals-xcm.certria.com/xcm-seal.js`}
		/>
	</Helmet>
);

LicenseHelmet.defaultProps = {
	script: null,
	xcmScript: null
};

LicenseHelmet.propTypes = {
	script: PropTypes.string,
	xcmScript: PropTypes.string
};

export default Bottom;
