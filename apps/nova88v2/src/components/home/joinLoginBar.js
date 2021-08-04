import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { Link } from "../../route/link";
import path from "../../path";

const HeaderBtn = ({ langId }) => {
	const { i18n } = useContext(i18nContext);

	return (
		<div className="headerButton">
			<Link
				className="joinBtn"
				to={path.join.root}
				state={{ previousPage: `/${langId}` }}>
				{i18n.lbl_JoinNow.toUpperCase()}
			</Link>
			<Link
				className="loginBtn"
				to={path.login.root}
				state={{ previousPage: `/${langId}` }}>
				{i18n.lbl_Login.toUpperCase()}
			</Link>
		</div>
	);
};

export default HeaderBtn;
