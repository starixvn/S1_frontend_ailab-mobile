import { useContext } from "react";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "Context";
import path from "../../path";

const useHandleLogin = () => {
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();

	const currentPages = () => {
		const redirect = window.location.pathname;
		const query = window.location.search;
		return `${redirect}${query}`;
	};

	const handleLogin = ({
		selGameInfo,
		selProvider,
		searchInfo,
		selNav
	} = {}) => {
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

		navigate(`/${userInfo.langId}/${path.login.root}`, {
			state: { previousPage: currentPages() }
		});
	};

	return { handleLogin };
};

export default useHandleLogin;
