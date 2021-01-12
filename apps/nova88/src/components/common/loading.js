import React, { useContext } from "react";
import { i18nContext } from "Context";

export default () => {
	const { i18n } = useContext(i18nContext);

	const loadingDisplayText = i18n.lbl_Loading;
	return (
		<div id="Loading" className="open">
			<div className="container">
				<div className="cube">
					<div className="sides">
						<div className="top" />
						<div className="right" />
						<div className="bottom" />
						<div className="left" />
						<div className="front" />
						<div className="back" />
					</div>
				</div>
				<h1> </h1>
				<div className="text">{loadingDisplayText}...</div>
			</div>
		</div>
	);
};
