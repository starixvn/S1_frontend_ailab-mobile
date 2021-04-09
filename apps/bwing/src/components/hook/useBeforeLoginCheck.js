import { useEffect, useState } from "react";

const useBeforeLoginCheck = ({ isLogin, beforeLogin = false }) => {
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}

		return () => {
			mounted = false;
		};
	}, [redirectPath, setRedirectPath]);

	useEffect(() => {
		let mounted = true;
		if (mounted && isLogin === false && !beforeLogin) {
			setRedirectPath("/");
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, setRedirectPath, beforeLogin]);

	return { redirectPath, setRedirectPath };
};

export default useBeforeLoginCheck;
