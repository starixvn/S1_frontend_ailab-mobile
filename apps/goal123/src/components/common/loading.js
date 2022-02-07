import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "./context";
import { bannerImgUrl } from "../../config";

export default () => {
	const { i18n } = useContext(i18nContext);

	return <Loading loadingDisplayText={i18n.lbl_Loading} />;
};

const Loading = ({ loadingDisplayText }) => {
	return (
		<div id="Loading" className="open">
			<div className="container">
				<div>
					<div>
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="Goal123"
						/>
					</div>
					<div>
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="Goal123"
						/>
					</div>
					<div>
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="Goal123"
						/>
					</div>
					<div>
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="Goal123"
						/>
					</div>
				</div>
				<div className="text">{loadingDisplayText}...</div>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	loadingDisplayText: "Loading"
};

Loading.propTypes = {
	loadingDisplayText: PropTypes.string
};
