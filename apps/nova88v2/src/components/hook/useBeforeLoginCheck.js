import { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";

const useBeforeLoginCheck = ({ isLogin, beforeLogin = false, langId }) => {
	const [canSee, setCanSee] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		let mounted = true;
		if (mounted && isLogin === false && !beforeLogin) {
			setCanSee(false);
			navigate(`/${langId}`);
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, beforeLogin, langId, navigate]);

	return { canSee };
};

export default useBeforeLoginCheck;
