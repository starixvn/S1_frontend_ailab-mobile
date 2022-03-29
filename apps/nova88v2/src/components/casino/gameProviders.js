import React from "react";
import PropTypes from "prop-types";
import { cloudImgURL } from "../../config";
import { Link } from "../../route/link";
import path from "../../path";

const GameProviders = props => {
	const { selNav, SelectNav, sorted } = props;
	const rows = sorted.map(k => {
		const content = (
			<img
				src={`${cloudImgURL}/SiteSkin/img/logo/${k.providerImgName}${
					selNav === k.tpId ? "a" : ""
				}.png`}
				alt={k.providerImgName}
			/>
		);

		if (k.path !== path.casino.root) {
			return (
				<Link
					to={k.path}
					key={`casino-nav-${k.tpId}`}
					className={selNav === k.tpId ? "active" : ""}>
					{content}
				</Link>
			);
		}

		return (
			<button
				data-testid={`gameProvider_${k.tpId}`}
				key={`casino-nav-${k.tpId}`}
				className={selNav === k.tpId ? "active" : ""}
				onClick={SelectNav.bind(this, k.tpId)}>
				{content}
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
