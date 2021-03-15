import React, { useContext, useEffect } from "react";
import { Link } from "@Router";
import { userInfoContext, i18nContext } from "../common/context";
import path from "../../path";
import Join from "./join";
import Login from "../login/login";
import Logo from "../common/logo";

const Modal = ({ isLogin, isJoin }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const content = isJoin ? (
		<Join showModal={isJoin} />
	) : (
		<Login showModal={isLogin} />
	);

	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, []);

	return isJoin || isLogin ? (
		<div className="logoSwitch active">
			<Link to="/">
				<div className="icon icon-close" />
			</Link>
			<Logo langId={userInfo.langId} />
			<button className="switch">
				<div className={`switchBg${isJoin ? " right" : ""}`} />
				<div className={`switchLogin${isLogin ? " active" : ""}`}>
					<Link to={path.login.root}>{i18n.lbl_Login}</Link>
				</div>
				<div className={`switchJoin${isJoin ? " active" : ""}`}>
					<Link to={path.join.root}>{i18n.lbl_JoinNow}</Link>
				</div>
			</button>
			{content}
		</div>
	) : null;
};

export default Modal;
