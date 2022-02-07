import React from "react";
import { bannerImgUrl } from "../../config";
import { setCookie } from "./common";

export const defEventPeriod = {
	startDate: "2022/1/31 12:00:00",
	endDate: "2022/02/08 12:00:00"
};

const Component = ({ onClickClose, langId }) => {
	const clickClose = () => {
		setCookie(`NewYear-${window.location.hostname}`, 1, 1);
		onClickClose();
	};

	return (
		<div className="angpao">
			<button className="icon icon-close" onClick={clickClose} />
			<img
				src={`${bannerImgUrl}/h5/img/newyear/angpaopop_h5_${langId}.png`}
				alt="BWING Wish You A Happy New Year! Ang Poa Giving Away"
			/>
		</div>
	);
};

export default Component;
