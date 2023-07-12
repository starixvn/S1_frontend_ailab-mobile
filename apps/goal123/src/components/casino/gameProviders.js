import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import { bannerMediaUrl } from "../../config";

import path from "../../path";

const GameProviders = props => {
	const { selNav, onChange, sorted } = props;
	const rows = sorted.map(k => {
		const content = (
			<img
				key={`casino-nav-${k.tpId}`}
				src={`${bannerMediaUrl}/h5/img/venderlogo/${k.imgName}${
					selNav === k.tpId ? "a" : ""
				}.png`}
				alt={k.providerImgName ?? k.tpName}
			/>
		);

		if (k.openPath) {
			return (
				<Link
					to={k.openPath}
					key={`casino-nav-${k.tpId}`}
					className={selNav === k.tpId ? "active" : ""}>
					{content}
				</Link>
			);
		}
		return (
			<Link
				to={
					window.location.pathname ===
					`/${path.casino.root}/${k.tpId}`
						? `${path.casino.root}`
						: `${path.casino.root}/${k.tpId}`
				}
				data-testid={`gameProvider_${k.tpId}`}
				key={`casino-nav-${k.tpId}`}
				className={selNav === k.tpId ? "active" : ""}
				onClick={() => {
					onChange(selNav === k.tpId ? {} : k);
				}}>
				{content}
			</Link>
		);
	});

	return rows;
};

GameProviders.defaultProps = {
	selNav: null
};

GameProviders.propTypes = {
	selNav: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func.isRequired
};

export default GameProviders;
