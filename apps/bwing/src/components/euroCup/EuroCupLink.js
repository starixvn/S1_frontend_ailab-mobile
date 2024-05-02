import React, { useState } from "react";
import { Link } from "@reach/router";
import { bannerImgUrl } from "../../config";
import path from "../../path";

const EuroCupLink = () => {
	const [display, setDisplay] = useState(true);

	if (!display) return null;

	return (
		<div className="eventLink eurolink">
			<button
				className="icon-close-white-bg"
				onClick={() => setDisplay(false)}
			/>
			<Link to={`/${path.euroCup.root}`}>
				<img
					src={`${bannerImgUrl}/h5/img/event/eurocup/euro-gif.webp`}
					alt="euro-gif"
				/>
			</Link>
		</div>
	);
};

export default EuroCupLink;
