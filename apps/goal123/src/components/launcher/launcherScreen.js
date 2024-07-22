import React from "react";
import { bannerImgUrl } from "../../config";

const LauncherScreen = () => (
	<div
		style={{
			position: "fixed",
			inset: 0,
			backgroundColor: "#141f33",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 9999
		}}>
		<img
			src={`${bannerImgUrl}/h5/img/logo.png`}
			alt="logo"
			style={{ maxWidth: "90%" }}
		/>
	</div>
);

export default LauncherScreen;
