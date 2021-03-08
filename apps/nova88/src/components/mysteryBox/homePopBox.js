import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { rootContext } from "../common/context";
import path from "../../path";
import eventImg from "../../styles/img/event/mysterybox/eventlink.png";

const MysteryBox = ({ isLogin }) => {
	const { root, setRoot } = useContext(rootContext);
	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className={`eventLink${isLogin ? " afterlogin" : ""}`}>
			<button className="icon icon-close" onClick={closePop} />
			<Link to={path.mysteryBox.root}>
				<img src={eventImg} alt="Mystery Box" />
			</Link>
		</div>
	) : null;
};

MysteryBox.defaultProps = {
	isLogin: null
};

MysteryBox.propTypes = {
	isLogin: PropTypes.bool
};

export default MysteryBox;
