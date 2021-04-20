import { useEffect } from "react";
import { useNavigate } from "@reach/router";

const useBeforeLoginCheck = ({ isLogin, beforeLogin = false, langId }) => {
	const navigate = useNavigate();

	useEffect(() => {
		let mounted = true;
		if (mounted && isLogin === false && !beforeLogin) {
			navigate(`/${langId}`);
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, beforeLogin, langId, navigate]);
};

export default useBeforeLoginCheck;
