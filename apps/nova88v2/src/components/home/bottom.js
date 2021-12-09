import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spokesperson from "../../styles/img/spokesperson.jpg";
import { siteInfo, cloudBannerImgURL } from "../../config";
import { Link } from "../../route/link";
import appDownloadImg from "../../styles/img/app/appmodule.jpg";
import path from "../../path";
import { defCurrenyId, langToCurrency } from "../common/common";
import { useGetSEODatas } from "../seo/seo";
// import PagcorLicensee from "../../styles/img/licenses.png";

const Bottom = ({ i18n, langId, currencyId }) => {
	const _currencyId = currencyId ?? langToCurrency[langId];

	return (
		<>
			<Link to={path.appDownload.root}>
				<img
					className="spokesperson"
					src={appDownloadImg}
					alt="Go To Download App"
				/>
			</Link>
			<img className="spokesperson" src={Spokesperson} alt="Endorser" />
			<div className="aff">
				<a
					className="title"
					href={`${siteInfo(langId).affiliateLink}`}
					target="_blank"
					rel="noreferrer noopener"
					style={
						_currencyId === defCurrenyId.INR
							? { pointerEvents: "none" }
							: null
					}>
					{i18n.lbl_AffiliateProgram}
				</a>
				<p>{i18n.lbl_Cookie_Reminder}</p>
			</div>
			<div className="social">
				<License i18n={i18n} />
				<a
					className="icon icon-facebook"
					href="https://www.facebook.com/nova88official/"
					target="_blank"
					rel="noreferrer noopener"
				/>
				<a
					className="icon icon-instagram"
					href="https://www.instagram.com/nova88_official/"
					target="_blank"
					rel="noreferrer noopener"
				/>
				<a
					className="icon icon-twitter"
					href="https://twitter.com/nova88official"
					target="_blank"
					rel="noreferrer noopener"
				/>
				<a
					className="icon icon-youtube"
					href="https://www.youtube.com/channel/UCoUtgrQN2E10oke1Hmj0ATw"
					target="_blank"
					rel="noreferrer noopener"
				/>
				<a
					className="icon icon-envelope"
					href="mailto:support@nova88.com"
					target="_blank"
					rel="noreferrer noopener"
				/>
			</div>
		</>
	);
};

Bottom.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

const License = ({ i18n }) => {
	const { SEODatas } = useGetSEODatas({ getFromAPI: true });
	const showLicenseLogo = SEODatas?.activeDomain ?? false;

	useEffect(() => {
		try {
			if (showLicenseLogo) {
				apg_a7019fa5_9f9a_468b_92da_4890f6a6e4a7.init();
			}
		} catch (error) {
			console.log(error);
		}
	}, [showLicenseLogo]);

	return (
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
					<div
						id="apg-a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
						data-apg-seal-id="a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
						data-apg-image-size="48"
						data-apg-image-type="basic-small"
					/>
				</>
			)}
		</div>
	);
};

export default Bottom;
