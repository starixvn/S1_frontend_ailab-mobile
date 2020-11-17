import React from "react";

export default ({ i18n }) => (
	<div className="depositTitle">
		<h1>{i18n.lbl_MobileDeposit}</h1>
		<p>{`${i18n.lbl_CreditTime}: ${i18n.lbl_5mins}`}</p>
	</div>
);

export const OneLineTitle = ({ i18n }) => (
	<p>
		{i18n.lbl_MobileDeposit}
		<br />
		{i18n.lbl_CreditTime}: {i18n.lbl_5mins}
	</p>
);
