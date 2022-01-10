import React from "react";
import { bannerImgUrl } from "../../config";

export default () => {
	return (
		<div id="Loading" className="open">
			<div>
				<img
					src={`${bannerImgUrl}/h5/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/h5/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/h5/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/h5/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/h5/img/loading_star.png`}
					alt="loading"
				/>
			</div>
		</div>
	);
};
