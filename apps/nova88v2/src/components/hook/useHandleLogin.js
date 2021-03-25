import { useNavigate } from "@reach/router";
import { userInfoContext } from "Context";
import { useContext } from "react";
import path from "../../path";

const useHandleLogin = () => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const handleLogin = () => {
		localStorage.setItem(
			"previousPage",
			window.location.pathname.split("/")[2]
		);
		navigate(`/${userInfo.langId}/${path.login.root}`);
	};

	return { handleLogin };
};

export default useHandleLogin;
