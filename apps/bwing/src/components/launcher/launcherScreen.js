import React from "react";
import { bannerImgUrl } from "../../config";

const LauncherScreen = () => (
	<div
		style={{
			position: "fixed",
			inset: 0,
			backgroundColor: "#FFF",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 9999
		}}>
		<img
			src={`${bannerImgUrl}/h5/img/4.0/logo.png`}
			alt="logo"
			style={{ maxWidth: "90%" }}
		/>
	</div>
);

export default LauncherScreen;
