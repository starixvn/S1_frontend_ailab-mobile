import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import eventImg from "../../styles/img/event/box/eventlink.png";
import eventVNImg from "../../styles/img/event/box/eventlink_vn.png";

const MysteryBox = ({ userInfo }) => {
	const { root, setRoot } = useContext(rootContext);
	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className={`eventLink${userInfo.isLogin ? " afterlogin" : ""}`}>
			<button className="icon icon-close" onClick={closePop} />
			<Link to={path.mysteryBox.root}>
				<img
					src={userInfo.langId === "vn" ? eventVNImg : eventImg}
					alt="Mystery Box"
				/>
			</Link>
		</div>
	) : null;
};

MysteryBox.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default MysteryBox;
