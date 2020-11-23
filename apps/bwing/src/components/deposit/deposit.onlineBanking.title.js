import React from "react";

export default ({ i18n }) => (
	<div className="depositTitle">
		<h1>{i18n.lbl_OnlineBanking.toUpperCase()}</h1>
		<p>{`${i18n.lbl_CreditTime}: ${i18n.lbl_Instant}`}</p>
	</div>
);

export const OneLineTitle = ({ i18n }) => (
	<p>
		{i18n["lbl_OnlineBanking"].toUpperCase()}
		<br />
		{i18n.lbl_CreditTime}: {i18n.lbl_Instant}
	</p>
);
