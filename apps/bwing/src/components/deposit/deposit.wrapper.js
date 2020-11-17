import React from "react";
import Step from "./step";

export default ({ step, i18n, children }) => (
	<div className="depositBox">
		<p className="depositBox-text">{i18n.lbl_DepositOptionHint}</p>
		<Step step={step} i18n={i18n} />
		{children}
	</div>
);
