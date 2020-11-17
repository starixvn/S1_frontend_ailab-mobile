import React from "react";
import { Link } from "@reach/router";

export default ({ i18n, to }) => (
	<div className="btn-group">
		<Link to={to} className="left">
			<span
				style={{
					transform: "rotate(180deg)",
					marginRight: "5px"
				}}>
				→
			</span>
			{i18n.lbl_Back}
		</Link>
	</div>
);
