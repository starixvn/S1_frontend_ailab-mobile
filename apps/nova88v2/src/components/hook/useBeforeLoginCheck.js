import { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";

const useBeforeLoginCheck = ({ isLogin, beforeLogin = false, langId }) => {
	const navigate = useNavigate();
	const [canSee, setCanSee] = useState(true);

	useEffect(() => {
		let mounted = true;
		if (mounted && isLogin === false && !beforeLogin) {
			navigate(`/${langId}`);
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, beforeLogin, langId, navigate]);

	return { canSee };
};

export default useBeforeLoginCheck;
