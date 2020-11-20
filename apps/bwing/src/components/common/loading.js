import React from "react";
import LoadingLogo from "../../styles/img/loading_star.png";

export default () => {
	return (
		<div id="Loading" className="open">
			<div>
				<img src={LoadingLogo} alt="loading" />
				<img src={LoadingLogo} alt="loading" />
				<img src={LoadingLogo} alt="loading" />
				<img src={LoadingLogo} alt="loading" />
				<img src={LoadingLogo} alt="loading" />
			</div>
		</div>
	);
};
