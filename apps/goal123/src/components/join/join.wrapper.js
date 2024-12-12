import React, { useContext } from "react";
import { useMatch } from "@reach/router";
import { MultiCaptchaProvider } from "@ailab-mobile/common";
import classNames from "classnames";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import Join from "./join.refactor";
import path from "../../path";

const JoinWrapper = () => {
	const { userInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);

	const showBylink = useMatch(path.join.root);
	const openPanel = showBylink || nav === defNavPanel.join;

	return (
		userInfo?.isLogin === false && (
			<div className={classNames("Join", { open: openPanel })}>
				<MultiCaptchaProvider langId={userInfo?.langId}>
					<Join
						setNav={setNav}
						openPanel={openPanel}
						showBylink={showBylink}
					/>
				</MultiCaptchaProvider>
			</div>
		)
	);
};

export default JoinWrapper;
