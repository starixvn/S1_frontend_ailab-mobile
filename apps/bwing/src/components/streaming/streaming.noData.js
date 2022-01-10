import React from "react";
import { bannerImgUrl } from "../../config";

export const StreamingNoData = ({ i18n }) => (
	<div className="notv active">
		<img src={`${bannerImgUrl}/h5/img/notvicon.png`} alt="nostreaming" />
		<p>{i18n.lbl_Streaming_NoData}</p>
	</div>
);
