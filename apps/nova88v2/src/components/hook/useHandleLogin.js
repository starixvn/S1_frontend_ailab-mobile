import { useContext } from "react";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "Context";
import path from "../../path";

const useHandleLogin = () => {
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const handleLogin = () => {
		localStorage.setItem(
			"previousPage",
			window.location.pathname.split("/")[2] ?? `/${userInfo.langId}`
		);
		navigate(`/${userInfo.langId}/${path.login.root}`);
	};

	return { handleLogin };
};

export default useHandleLogin;
