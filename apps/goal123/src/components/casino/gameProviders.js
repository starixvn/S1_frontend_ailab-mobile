import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const GameProviders = props => {
	const { selNav, SelectNav, sorted } = props;
	const rows = sorted.map(k => {
		return (
			<button
				key={`casino-nav-${k.tpId}`}
				className={selNav === k.tpId ? "active" : ""}
				data-testid={`gameProvider_${k.tpId}`}
				onClick={SelectNav.bind(this, k.tpId)}>
				<img
					src={`${bannerImgUrl}/h5/img/footer/${k.providerImgName}${
						selNav === k.tpId ? "a" : ""
					}.png`}
					alt={k.providerImgName}
				/>
			</button>
		);
	});

	return rows;
};

GameProviders.defaultProps = {
	selNav: null
};

GameProviders.propTypes = {
	selNav: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	SelectNav: PropTypes.func.isRequired
};

export default GameProviders;
