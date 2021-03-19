import { useNavigate } from "@reach/router";
import path from "../../path";

const useHandleLogin = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		localStorage.setItem(
			"previousPage",
			window.location.pathname.split("/")[2]
		);
		navigate(`${path.login.root}`);
	};

	return { handleLogin };
};

export default useHandleLogin;
