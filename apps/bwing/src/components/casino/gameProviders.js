import React from "react";
import PropTypes from "prop-types";
import config from "../../config";

const GameProviders = props => {
	const { selNav, SelectNav, slotPlatform } = props;
	const rows = slotPlatform.map(k => {
		return (
			<button
				key={`casino-nav-${k.tpId}`}
				className={selNav === k.tpId ? "active" : ""}
				onClick={SelectNav.bind(this, k.tpId)}>
				<img
					src={`${config.imgUrl}/common/images/logo/${k.imgName}${
						selNav === k.tpId ? "a" : ""
					}.png`}
					alt={k.imgName}
				/>
			</button>
		);
	});

	return rows;
};

GameProviders.propTypes = {
	selNav: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	SelectNav: PropTypes.func.isRequired
};

export default GameProviders;
