import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../path";
import { i18nContext, userInfoContext } from "./context";

const PopBoxUpdateProfile = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="popTxt">
			<div>{i18n.lbl_UpdatePersonalInfo}</div>
			<div className="btn-group">
				<Link
					className="btn-check"
					to={`/${userInfo.langId}/${path.profile.root}`}
					onClick={() => {
						setPopBox({ isOpen: false });
					}}>
					{i18n.lbl_UpdatePersonalDetail}
				</Link>
			</div>
		</div>
	);
};

export default PopBoxUpdateProfile;
