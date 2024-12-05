import React, { useState } from "react";
import { Link } from "@reach/router";
// import { userInfoContext } from "../common/context";
import path from "../../path";
// import eventImg from "../../styles/img/mystery/homeImg.png";
// import eventImgVN from "../../styles/img/mystery/homeImg_vn.png";

const MysteryBox = () => {
	// const { userInfo } = useContext(userInfoContext);
	const [mysteryBox, setMysteryBox] = useState(true);
	const closePop = () => {
		setMysteryBox(false);
	};

	return (
		mysteryBox && (
			<div className="mystery_module">
				<div className="mystery_close" onClick={closePop}>
					X
				</div>
				<Link to={`/${path.mysteryBox.root}`}>
					<img className="mystery" src="" alt="Mystery Box" />
				</Link>
			</div>
		)
	);
};

export default MysteryBox;
