import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const Groups = ({ options, i18n }) => {
	let list = [];
	if (options) {
		list = Object.keys(options).map(el => {
			const name = el.replace("group", "");
			const subList = options[el].map(sub => (
				<div className="team" key={`group-${sub.countryName}`}>
					<img
						src={`${bannerImgUrl}/img/flag/${sub.imageName}`}
						alt={sub.imageName}
					/>
					<div>{sub.countryName}</div>
				</div>
			));

			return (
				<div className="group-item" key={`groups-${el}`}>
					<div className="group-title">
						{i18n.lbl_group} {name}
					</div>
					{subList}
				</div>
			);
		});
	}
	return (
		<>
			<div className="subtitle">{i18n.lbl_group}</div>
			<div className="group-list">{list}</div>
		</>
	);
};

Groups.defaultProps = {
	options: null,
	i18n: null
};

Groups.propTypes = {
	options: PropTypes.objectOf(PropTypes.array),
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Groups;
