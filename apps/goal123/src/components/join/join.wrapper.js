import React, { useContext } from "react";
import { useMatch } from "@reach/router";
import { GReCaptchaProviders } from "@ailab-mobile/common";
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
				<GReCaptchaProviders langId={userInfo?.langId}>
					<Join
						setNav={setNav}
						openPanel={openPanel}
						showBylink={showBylink}
					/>
					{/* 客製化 element 必須添加 */}
					<div id="g-reCaptcha" />
				</GReCaptchaProviders>
			</div>
		)
	);
};

export default JoinWrapper;
