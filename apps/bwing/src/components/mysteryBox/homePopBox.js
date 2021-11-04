import React, { useContext } from "react";
import { Link } from "@reach/router";
import { rootContext, userInfoContext } from "../common/context";
import path from "../../path";
import eventImg from "../../styles/img/mystery/homeImg.png";
import eventImgVN from "../../styles/img/mystery/homeImg_vn.png";

const MysteryBox = () => {
	const { root, setRoot } = useContext(rootContext);
	const { userInfo } = useContext(userInfoContext);
	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className="mystery_module">
			<div className="mystery_close" onClick={closePop}>
				X
			</div>
			<Link to={`/${path.mysteryBox.root}`}>
				<img
					className="mystery"
					src={userInfo.langId === "vn" ? eventImgVN : eventImg}
					alt="Mystery Box"
				/>
			</Link>
		</div>
	) : null;
};

export default MysteryBox;
