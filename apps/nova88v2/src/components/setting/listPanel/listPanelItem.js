import classNames from "classnames";
import React, { useState } from "react";
import { node, bool, string } from "prop-types";
import { cloudBannerImgURL } from "../../../config";

const Item = ({ title, imgText, children, defaultOpen }) => {
	const [open, setOpen] = useState(defaultOpen ?? false);

	return (
		<div className={classNames("menu-bottom-item", { active: open })}>
			<div
				className="info"
				onClick={() => {
					setOpen(prev => !prev);
				}}>
				<img
					src={`${cloudBannerImgURL}/h5/img/4.0/${imgText}.png`}
					alt={imgText}
				/>
				<div>{title}</div>
			</div>
			{children}
		</div>
	);
};

Item.defaultProps = {
	defaultOpen: false
};

Item.propTypes = {
	defaultOpen: bool,
	title: string.isRequired,
	children: node.isRequired,
	imgText: string.isRequired
};

export default Item;
