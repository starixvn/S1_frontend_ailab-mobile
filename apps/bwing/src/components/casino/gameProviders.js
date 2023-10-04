import React from "react";
import classNames from "classnames";
import PropTypes, { arrayOf } from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "../../route/link";
import { bannerImgUrl } from "../../config";
import path from "../../path";

const GameProviders = props => {
	const { t } = useTranslation();
	const { selNav, maintainList, onChange, sorted } = props;
	const rows = sorted.map(k => {
		const isMaintain = maintainList.some(
			({ tpId: maintainTpId }) => maintainTpId === k.tpId
		);

		const content = (
			<>
				{isMaintain && (
					<div className="tag-maintain">
						{t("lbl_underMaintenance")}
					</div>
				)}
				<img
					key={`casino-nav-${k.tpId}`}
					src={`${bannerImgUrl}/h5/img/4.0/venderlogo/${k.imgName}${
						selNav === k.tpId ? "a" : ""
					}.png`}
					alt={k.providerImgName ?? k.tpName}
				/>
			</>
		);

		if (k.openPath) {
			return (
				<Link
					to={k.openPath}
					key={`casino-nav-${k.tpId}`}
					className={classNames("slots-vender-item", {
						active: selNav === k.tpId,
						maintain: isMaintain
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
					active: selNav === k.tpId,
					maintain: isMaintain
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
