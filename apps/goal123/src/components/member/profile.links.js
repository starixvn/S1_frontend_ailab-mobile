import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "@reach/router";
import { LOGOUT } from "../../service/auth";
import path from "../../path";

const ProfileLinks = ({ i18n, setUserInfo, setNav }) => {
	const [redirectPath, setRedirectPath] = useState(null);

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			setRedirectPath("/");
		});
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<div className="btn-group">
				<Link className="lightBlue" to={`/${path.other.root}`}>
					{i18n.lbl_Other}
				</Link>
			</div>
			<div className="btn-group">
				<button className="lightBlue" onClick={handleLogout}>
					{i18n.lbl_Logout}
				</button>
			</div>
		</>
	);
};

ProfileLinks.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setUserInfo: PropTypes.func.isRequired,
	setNav: PropTypes.func.isRequired
};

export default ProfileLinks;
