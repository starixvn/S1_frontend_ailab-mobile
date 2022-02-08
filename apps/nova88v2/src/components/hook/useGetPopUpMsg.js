import { useContext, useEffect } from "react";
import { userInfoContext } from "../common/context";
import useInterval from "./useInterval";
import api from "../../service/api";

const useGetPopUpMsg = ({ setPopUp }) => {
	const { userInfo } = useContext(userInfoContext);
	const GetPopupMsg = () => {
		try {
			api.account.GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUp({
						popupMessage: res.data.data.popupMessage,
						id: res.data.data.id,
						pageNumber: res.data.data.pageNumber
					});
				} else {
					setPopUp({
						popupMessage: "",
						id: "",
						pageNumber: ""
					});
				}
			});
		} catch (error) {}
	};

	const ReadPopupMsg = () => {
		api.account.SetPopupMsgRead().then(res => {
			if (res.data.errorCode === 0) {
				GetPopupMsg();
			}
		});
	};

	useEffect(() => {
		if (userInfo.isLogin) {
			GetPopupMsg();
		}
	}, [userInfo.isLogin]);

	useInterval(
		() => {
			GetPopupMsg();
		},
		userInfo.isLogin ? 30000 : null
	);

	return { GetPopupMsg, ReadPopupMsg };
};

export default useGetPopUpMsg;
