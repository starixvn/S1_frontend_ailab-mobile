import React from "react";
import { Router } from "@reach/router";
import path from "../path";

import Casino from "../pages/casino";
import ForgetPwd from "../components/login/forgetPwd";
import ResetPwd from "../components/login/resetPwd";

import Setting from "../pages/setting";

import Whoami from "../pages/whoami";

import Ranking from "../pages/ranking";

const BeforeLoginRouter = () => (
	<Router>
		<ForgetPwd path={`/:langId/${path.forgetPassword.root}`} />
		<ResetPwd path={`/:langId/${path.resetPassword.root}`} />

		<Casino path={`/:langId/${path.casino.root}`} />
		<Casino path={`/:langId/${path.casino.root}/:tpId`} />
		<Setting path={`/:langId/${path.setting.root}`} />
		<Whoami path={path.whoami.root} />
		<Ranking path={`/:langId/${path.ranking.root}`} />
	</Router>
);

export default BeforeLoginRouter;
