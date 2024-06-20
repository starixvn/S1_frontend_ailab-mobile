import { products } from "@ailab-mobile/common";
import config, { errorPageUrl } from "../config";
import path from "../path";

export const _ACTION_TYPE = {
	blank: 1,
	redirect: 2
};

export const defAppType = {
	desktop: 1,
	mobile: 2
};

export const GET_CASINO_ENTER_PAGE = ({
	tpId,
	gameId,
	isFree,
	langId,
	execFunction,
	tpGameType
}) => {
	if (execFunction) {
		execFunction();
	} else {
		const appUrl = window.location.origin;
		const homeUrl = `${appUrl}`;
		const signupUrl = `${appUrl}/${path.join.root}`;
		const LoginUrl = `${appUrl}/${path.login.root}`;
		const lobbyUrl = `${appUrl}/${path.casino.root}?tpId=${tpId}&tpGameType=${tpGameType}`;
		const _errorPageUrl = errorPageUrl(langId);
		const _tpGameType = tpGameType ? `&tpGameType=${tpGameType}` : "";
		const entPageUrl = `${config.openURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}&errorUrl=${_errorPageUrl}&AppType=2${_tpGameType}`;

		const searchParams = new URLSearchParams({
			fun: isFree ? "1" : "0",
			gameType: "slots"
		});

		if (Number(tpId) === products.PragmaticPlaySlot.tpId) {
			searchParams.set("LobbyUrl", lobbyUrl);
		}

		const url = `${entPageUrl}&${searchParams.toString()}`;

		// * stage 環境， log url 提供資訊 debug
		if (
			window.location.href.indexOf("stag") !== -1 ||
			window.location.href.indexOf("localhost") !== -1
		) {
			console.log("GET_CASINO_ENTER_PAGE", url);
		}

		window
			.open(
				url,
				`Tp_${tpId}`,
				"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
			)
			?.focus();
	}
};

export const GET_ENTER_PAGE = ({
	langId,
	tpId,
	gameId,
	matchid,
	isLogin,
	loginCallback,
	execFunction,
	tpGameType,
	appType
}) => {
	console.log("GET_ENTER_PAGE");
	const appUrl = window.location.origin;
	const homeUrl = `${appUrl}`;
	const signupUrl = `${appUrl}/${path.join.root}`;
	const LoginUrl = `${appUrl}/${path.login.root}`;
	const lobbyUrl = ``;
	const cashierUrl = `${appUrl}/${path.deposit.root}`;
	const _errorPageUrl = errorPageUrl(langId);

	let result = setResult("", true, _ACTION_TYPE.blank);
	let urlSpecialPattern = "";
	const _tpId = isNaN(tpId) ? tpId : Number(tpId);
	const _gameId = isNaN(gameId) ? gameId : Number(gameId);
	const _matchid = isNaN(matchid) ? matchid : Number(matchid);
	const _tpGameType = tpGameType ? `&tpGameType=${tpGameType}` : "";
	const _appType = appType ? `&AppType=${appType}` : `&AppType=2`;

	if (_tpId === 1) {
		if (_gameId === 43 || _gameId === 220 || _gameId === 202) {
			result = setResult("", true, _ACTION_TYPE.redirect, _tpId, _gameId);
		} else if (
			_gameId < 100 ||
			_gameId === 997 ||
			_gameId === 161 ||
			_gameId === 180 ||
			_gameId === 192 ||
			_gameId === 2002
		) {
			result = setResult(
				"",
				false,
				_ACTION_TYPE.redirect,
				_tpId,
				_gameId
			);
		} else if (_gameId >= 200) {
			result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
		}
	} else if (_tpId === 29) {
		result = setResult("", false, _ACTION_TYPE.blank, _tpId, _gameId);
		urlSpecialPattern = `&gameType=sports${
			isLogin === false ? "&fun=1" : ""
		}`;
	} else if (_tpId === products.CryptoSports.tpId) {
		result = setResult("", false, _ACTION_TYPE.blank, _tpId, _gameId);
	} else {
		result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
	}

	const entPageUrl = `${
		config.openURL
	}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}
	&tpId=${tpId}&gameId=${gameId}&CashierUrl=${cashierUrl}&LobbyUrl=${lobbyUrl}&matchid=${
		_matchid || ""
	}&errorUrl=${_errorPageUrl}${_appType}${urlSpecialPattern}${_tpGameType}`;
	if (!isLogin && result.needLogin) {
		loginCallback();
	} else if (execFunction) {
		execFunction();
	} else if (result.actionType === _ACTION_TYPE.blank) {
		// * stage 環境， log url 提供資訊 debug
		if (
			window.location.href.indexOf("stag") !== -1 ||
			window.location.href.indexOf("localhost") !== -1
		) {
			console.log("GET_ENTER_PAGE", entPageUrl);
		}

		window.open(
			entPageUrl,
			result.windowKey,
			"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
		);
	} else if (result.actionType === _ACTION_TYPE.redirect) {
		window.location.href = entPageUrl;
	}
};

const setResult = (url, needLogin, actionType, tpId, gameId) => {
	return {
		url,
		needLogin,
		actionType,
		windowKey: tpId === 1 ? `Tp_${tpId}_${gameId}` : `Tp_${tpId}`
	};
};
