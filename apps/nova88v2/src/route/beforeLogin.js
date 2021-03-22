import React from "react";
import { Router } from "@reach/router";
import path from "../path";
import Home from "../pages/home";
import Promotion from "../pages/promotion";

import Casino from "../pages/casino";
import ForgetPwd from "../components/login/forgetPwd";
import ResetPwd from "../components/login/resetPwd";

import Setting from "../pages/setting";

import Whoami from "../pages/whoami";
import PromotionInfo from "../pages/promotionInfo";

import Ranking from "../pages/ranking";
import AngPow from "../pages/angPow";

const BeforeLoginRouter = () => (
	<Router>
		<Home path={`/:langId/${path.home.root}`} />
		<ForgetPwd path={`/:langId/${path.forgetPassword.root}`} />
		<ResetPwd path={`/:langId/${path.resetPassword.root}`} />
		<Promotion path={`/:langId/${path.promotion.root}`} />
		<PromotionInfo path={`/:langId/${path.promotionInfo.root}`} />
		<Casino path={`/:langId/${path.casino.root}`} />
		<Casino path={`/:langId/${path.casino.root}/:tpId`} />
		<Setting path={`/:langId/${path.setting.root}`} />
		<Whoami path={path.whoami.root} />
		<Ranking path={`/:langId/${path.ranking.root}`} />
		<AngPow path={`/:langId/${path.angPow.root}`} />
	</Router>
);

export default BeforeLoginRouter;
