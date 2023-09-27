import React from "react";
import { arrayOf, object } from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import { bannerImgUrl } from "../../config";

const Entry = ({ providerList }) => {
	return (
		<div className="lobby-products">
			{providerList.map(provider => {
				const { tpId, tpName } = provider;
				const imgName = tpName.toLowerCase();

				return (
					<Link
						key={tpId}
						className="lobby-products-item"
						to={`/${path.casino.root}/${tpId}`}>
						<img
							src={`${bannerImgUrl}/h5/img/4.0/lobby/slots/${imgName}.png`}
							alt={imgName}
						/>
					</Link>
				);
			})}
		</div>
	);
};

Entry.propTypes = {
	providerList: arrayOf(object).isRequired
};

export default Entry;
