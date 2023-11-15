import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { popUpMsgContext, userInfoContext } from "Context";
import path from "../../path";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";

export default function Component() {
	const navigate = useNavigate();

	const { popUp, setPopUp } = useContext(popUpMsgContext);
	const { userInfo } = useContext(userInfoContext);

	const { ReadPopupMsg } = useGetPopUpMsg({ setPopUp });

	return popUp.id !== "" ? (
		<div
			className="message-popup"
			onClick={() => {
				navigate(`/${userInfo?.langId}/${path.message.root}`, {
					state: {
						id: popUp.id,
						pageNumber: popUp.pageNumber,
						popupShowed: false
					}
				});
				ReadPopupMsg();
			}}>
			{popUp.popupMessage}
		</div>
	) : null;
}
