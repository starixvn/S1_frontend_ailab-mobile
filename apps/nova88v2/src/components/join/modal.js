import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { Link } from "../../route/link";
import { userInfoContext, i18nContext } from "../common/context";
import path from "../../path";
import Join from "./join.step.all";
import Login from "../login/login";
import Logo from "../common/logo";

const Modal = ({ isLogin, isJoin }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
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
			<button
				onClick={() => navigate(localStorage.getItem("previousPage"))}>
				<div className="icon icon-close" />
			</button>
			<Logo langId={userInfo.langId} isWhite={false} />
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
