import React from "react";
import PropTypes from "prop-types";
import { BannerWithStaticImages } from "../common/swipperBanner";

const LinePay = ({ langId, redirectLink }) => {
	return (
		<BannerWithStaticImages
			length={3}
			langId={langId}
			redirectLink={redirectLink}
		/>
	);
};

LinePay.defaultProps = {
	langId: null,
	redirectLink: null
};

LinePay.propTypes = {
	langId: PropTypes.string,
	redirectLink: PropTypes.string
};

export default LinePay;
