import { useContext } from "react";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "Context";
import path from "../../path";

const useHandleLogin = () => {
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();

	const currentPages = () => {
		const arr = window.location.pathname.split("/");
		if (!arr[2]) {
			return `/${userInfo.langId}`;
		}
		if (arr[3]) {
			return `/${userInfo.langId}/${arr[2]}/${arr[3]}`;
		}
		return arr[2];
	};

	const handleLogin = ({
		selGameInfo,
		selProvider,
		searchInfo,
		selNav
	} = {}) => {
		localStorage.setItem("previousPage", currentPages());
		const prevScreen = {
			selGameInfo,
			selProvider,
			searchText: searchInfo?.searchText,
			selGameType: searchInfo?.gameType,
			selNav
		};
		if (!selGameInfo) {
			localStorage.removeItem("prevScreen");
		} else {
			localStorage.setItem("prevScreen", JSON.stringify(prevScreen));
		}

		navigate(`/${userInfo.langId}/${path.login.root}`);
	};

	return { handleLogin };
};

export default useHandleLogin;
