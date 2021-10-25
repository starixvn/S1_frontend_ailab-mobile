import React from "react";
import nostreaming from "../../styles/img/notvicon.png";

export const StreamingNoData = ({ i18n }) => (
	<div className="notv active">
		<img src={nostreaming} alt="nostreaming" />
		<p>{i18n.lbl_Streaming_NoData}</p>
	</div>
);
