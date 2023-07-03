import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "@reach/router";
import { Link } from "../../route/link";
import { userInfoContext, i18nContext } from "../common/context";
import path from "../../path";
import Join from "./join.step.all";
import Login from "../login/login";
import Logo from "../common/logo";

const Modal = ({ isLogin, isJoin }) => {
	const { state } = useLocation();
	const { userInfo } = useContext(userInfoContext);
	const previousPage = state?.previousPage ?? `/${userInfo.langId}`;
	const { i18n } = useContext(i18nContext);
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
				data-testid="close_join_modal_btn"
				onClick={() =>
					navigate(previousPage, {
						state: { fromModal: true }
					})
				}>
				<div className="icon icon-close" />
			</button>
			<Logo langId={userInfo.langId} isWhite={false} />
			<button className="switch">
				<div className={`switchBg${isJoin ? " right" : ""}`} />
				<div
					className={`switchLogin${isLogin ? " active" : ""}`}
					data-testid="switch_login_btn">
					<Link to={path.login.root} state={{ previousPage }}>
						{i18n.lbl_Login}
					</Link>
				</div>
				<div className={`switchJoin${isJoin ? " active" : ""}`}>
					<Link to={path.join.root} state={{ previousPage }}>
						{i18n.lbl_JoinNow}
					</Link>
				</div>
			</button>
			{content}
		</div>
	) : null;
};

export default Modal;
