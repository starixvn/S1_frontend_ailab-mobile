import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../path";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";

const JoinStep3 = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	return (
		<div>
			<div className="joinSuccess">
				<div className="Join">
					<div className="congrats">
						<p>{i18n.lbl_MysteryBox_Congratulations}</p>
						{i18n.lbl_BecomingDistinguishedPlayer}
					</div>
					<div className="Terms">{i18n.lbl_AfterJoinHint}</div>
					<Link
						onClick={() => {
							setPopBox({
								isOpen: false
							});
							setUserInfo(prev => ({
								...prev,
								isJoin: false
							}));
						}}
						className="btn-group"
						to={`/${userInfo.langId}/${path.deposit.root}`}>
						<button>{i18n.lbl_DepositNow}</button>
					</Link>
					<Link to="/">
						<div className="visit">
							{i18n.lbl_IWouldLikeToVisit}
							<i className="icon icon-visit" />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default JoinStep3;
