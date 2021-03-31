import React from "react";
import PropTypes from "prop-types";
import Spokesperson from "../../styles/img/spokesperson.jpg";
import { siteInfo } from "../../config";

const Bottom = ({ i18n, langId }) => {
	return (
		<>
			<img className="spokesperson" src={Spokesperson} alt="Endorser" />
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
				<a
					className="icon icon-facebook"
					href="https://www.facebook.com/nova88official/"
					target="_blank"
					rel="noreferrer noopener"
				/>
				<a
					className="icon icon-instagram"
					href="https://www.instagram.com/nova88.net_official"
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
			</div>
		</>
	);
};

Bottom.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Bottom;
