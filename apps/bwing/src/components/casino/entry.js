import React, { useContext } from "react";
import PropTypes, { arrayOf } from "prop-types";
import { Link } from "@reach/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import path from "../../path";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "./defGameType";
import { productList } from "../../datas/defMenu";
import { userInfoContext } from "../common/context";

const Entry = ({ providerList, maintainList }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	return (
		<div className="lobby-products">
			{providerList.map(provider => {
				const { tpId, gameImgDisplayText } = provider;
				const imgName = gameImgDisplayText.toLowerCase();

				const isMaintain = maintainList.some(
					({ tpId: maintainTpId, tpGameType }) =>
						maintainTpId === tpId &&
						tpGameType === defTpGameType.All
				);

				const target = productList(userInfo.langId).casino?.items?.find(
					({ tpId: targetTpId }) => tpId === targetTpId
				);
				let showingIcon = "";
				if (target?.eventIcon) {
					const eventInPeriodObj = target.eventIcon.find(
						obj => obj.inPeriod === true
					);
					showingIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";
				}

				return (
					<Link
						key={tpId}
						className={`lobby-products-item ${showingIcon} ${classNames(
							{
								maintain: isMaintain
							}
						)}`}
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
