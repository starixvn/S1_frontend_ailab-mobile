import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { popUpMsgContext, userInfoContext } from "Context";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";
import path from "../../path";

export default function Component() {
	const navigate = useNavigate();

	const { popUp, setPopUp } = useContext(popUpMsgContext);
	const { userInfo } = useContext(userInfoContext);

	const { GetPopupMsg } = useGetPopUpMsg({ setPopUp });

	useEffect(() => {
		GetPopupMsg();
	}, []);

	return popUp.id !== "" ? (
		<div
			className="message-popup"
			onClick={() => {
				navigate(`/${userInfo?.langId}/${path.message.root}`);
			}}>
			<div>{popUp.popupMessage}</div>
		</div>
	) : null;
}
