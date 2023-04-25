import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { defCurrenyId } from "apps/nova88v2/src/components/common/common";
import { cloudBannerImgURL } from "../../config";
import { Link } from "../../route/link";
import path from "../../path";
import { useGetSEODatas } from "../seo/seo";
import useGetSocialChannel, {
	defDisplayPage,
	channelIcon
} from "../hook/useGetSocialChannel";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const Bottom = ({ i18n, langId, currencyId }) => {
	const _currencyId = currencyId;

	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId: _currencyId,
		displayPage: defDisplayPage.Footer
	});

	const getCurrencyLink = (targetCurrencyId, targetLangId) => {
		if (targetCurrencyId === defCurrenyId.MYR) {
			return ` https://aff.nova88mas102.com/?lang=${targetLangId}`;
		}
		if (targetCurrencyId === defCurrenyId.INR) {
			return `https://aff.nova88india.com/?lang=${targetLangId}`;
		}
		return `https://aff.nova88bkk.com/?lang=${targetLangId}`;
	};

	const snsArr = socialChannel.map(el => (
		<a
			key={`channel-${el.channelName}`}
			className={channelIcon[el.channelName]}
			href={el.link}
			target="_blank"
			rel="noreferrer noopener"
		/>
	));

	return (
		<>
			<Link to={path.appDownload.root}>
				<img
					className="spokesperson"
					src={`${cloudBannerImgURL}/h5/img/app/appdownload-${langId}.jpg`}
					alt="Go To Download App"
				/>
			</Link>
			<div className="footerModule">
				<img
					className="spokesperson"
					src={`${cloudBannerImgURL}/h5/img/homepage/spokesperson.png`}
					alt="Endorser"
				/>
				<div className="middle">
					<div className="social">
						{socialChannel.length > 0 && snsArr}
					</div>
					<div className="border" />
					<License i18n={i18n} />
				</div>
				<div className="aff">
					<a
						className="title"
						style={
							allowedCurrencyList.affiliate.includes(currencyId)
								? {}
								: { pointerEvents: "none" }
						}
						href={getCurrencyLink(currencyId, langId)}
						target="_blank"
						rel="noreferrer noopener">
						{i18n.lbl_AffiliateProgram}
					</a>
					<p>{i18n.lbl_Cookie_Reminder}</p>
				</div>
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
	const { SEODatas } = useGetSEODatas();
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
			<div className="license">
				{showLicenseLogo && (
					<>
						<div>
							{i18n.lbl_Gaming_License}
							<img
								src={`${cloudBannerImgURL}/h5/img/license_tick.png`}
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
							<div>
								<a href="https://www.begambleaware.org/">
									<img
										src="https://banner.0814media.net/h5/img/aware.png"
										alt=""
									/>
								</a>
							</div>
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
