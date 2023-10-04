import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { Link } from "@reach/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const Entry = ({ providerList, maintainList }) => {
	const { t } = useTranslation();
	return (
		<div className="lobby-products">
			{providerList.map(provider => {
				const { tpId, tpName } = provider;
				const imgName = tpName.toLowerCase();

				const isMaintain = maintainList.some(
					({ tpId: maintainTpId }) => maintainTpId === tpId
				);

				return (
					<Link
						key={tpId}
						className={`lobby-products-item ${classNames({
							maintain: isMaintain
						})}`}
						to={`/${path.casino.root}/${tpId}`}>
						<img
							src={`${bannerImgUrl}/h5/img/4.0/lobby/slots/${imgName}.png`}
							alt={imgName}
						/>
						{isMaintain && (
							<div className="tag-maintain">
								{t("lbl_underMaintenance")}
							</div>
						)}
					</Link>
				);
			})}
		</div>
	);
};

Entry.propTypes = {
	providerList: arrayOf(PropTypes.any).isRequired,
	maintainList: arrayOf(PropTypes.any).isRequired
};

export default Entry;
