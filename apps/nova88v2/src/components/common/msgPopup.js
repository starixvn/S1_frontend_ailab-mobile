import React, { useContext } from "react";
import { popUpMsgContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "../../path";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";

export default function Component({ userInfo }) {
	const navigate = useNavigate();
	const { popUp, setPopUp } = useContext(popUpMsgContext);
	const { ReadPopupMsg } = useGetPopUpMsg({ setPopUp });

	return popUp.id !== "" ? (
		<div
			className="msgPop"
			onClick={e => {
				e.preventDefault();
				e.stopPropagation();
			}}>
			<div
				onClick={() => {
					navigate(`/${userInfo?.langId}/${path.message.root}`, {
						state: {
							id: popUp.id,
							pageNumber: popUp.pageNumber,
							popupShowed: false
						}
					});
				}}>
				{popUp.popupMessage}
			</div>
			<button
				className="icon icon-close"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					ReadPopupMsg();
				}}
			/>
		</div>
	) : null;
}
