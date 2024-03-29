import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import path from "../../path";

const EuroCupLink = () => {
	const { userInfo } = useContext(userInfoContext);
	const [display, setDisplay] = useState(true);

	if (!display) return null;

	return (
		<div className="eventLink eurocup">
			<button
				className="icon icon-close"
				onClick={() => setDisplay(false)}
			/>
			<Link to={`/${userInfo.langId}/${path.euroCup.root}`}>
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/eurocup-icon.webp`}
					alt=""
				/>
			</Link>
		</div>
	);
};

export default EuroCupLink;
