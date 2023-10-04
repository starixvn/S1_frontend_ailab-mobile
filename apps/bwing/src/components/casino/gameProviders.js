import React from "react";
import classNames from "classnames";
import PropTypes, { arrayOf } from "prop-types";
import { Link } from "../../route/link";
import { bannerImgUrl } from "../../config";
import path from "../../path";

const GameProviders = props => {
	const { selNav, onChange, sorted } = props;
	const rows = sorted.map(k => {
		const content = (
			<img
				key={`casino-nav-${k.tpId}`}
				src={`${bannerImgUrl}/h5/img/4.0/venderlogo/${k.imgName}${
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
					className={classNames("slots-vender-item", {
						active: selNav === k.tpId
					})}>
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
				key={`casino-nav-${k.tpId}`}
				className={classNames("slots-vender-item", {
					active: selNav === k.tpId
				})}
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
	selNav: null,
	maintainList: []
};

GameProviders.propTypes = {
	selNav: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	maintainList: arrayOf(PropTypes.any),
	onChange: PropTypes.func.isRequired
};

export default GameProviders;
