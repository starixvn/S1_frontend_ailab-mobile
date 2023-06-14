import { useContext } from "react";
import api from "../../service/api";
import { popBoxContext } from "../common/context";

export const defType = {
	register: 1,
	login: 2,
	binding: 3
};

const useHandleLineLogin = () => {
	const { setPopBox } = useContext(popBoxContext);

	const lineLogin = async ({ type }) => {
		const res = await api.lineLogin.LineLoginDirect(type);

		const { errorCode, message, data } = res.data;
		if (errorCode === 0) {
			window.location = `${data}`;
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	return { lineLogin };
};

export default useHandleLineLogin;
