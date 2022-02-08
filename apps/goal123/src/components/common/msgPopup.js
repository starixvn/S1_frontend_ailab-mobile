import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import useInterval from "../hook/useInterval";
import {
	api_account_GetPopupMsg,
	api_account_SetPopupMsgRead
} from "../../service/api/account";
import path from "../../path";

export default function Component({ userInfo }) {
	const navigate = useNavigate();
	const [popUp, setPopUp] = useState({
		popupMessage: "",
		id: "",
		pageNumber: ""
	});

	const GetPopupMsg = () => {
		try {
			api_account_GetPopupMsg().then(res => {
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
		api_account_SetPopupMsgRead().then(res => {
			if (res.data.errorCode === 0) {
				GetPopupMsg();
			}
		});
	};

	useEffect(() => {
		if (userInfo?.isLogin) {
			GetPopupMsg();
		}
	}, [userInfo?.isLogin]);

	useInterval(
		() => {
			GetPopupMsg();
		},
		userInfo?.isLogin ? 30000 : null
	);

	return popUp.id !== "" ? (
		<div
			className="itemInfo"
			onClick={e => {
				e.preventDefault();
				e.stopPropagation();
			}}>
			<div
				onClick={() => {
					navigate(`/${path.message.root}`, {
						state: {
							id: popUp.id,
							pageNumber: popUp.pageNumber,
							popupShowed: false
						}
					});
				}}>
				{popUp.popupMessage}
			</div>
			<div
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

Component.defaultProps = {
	isLogin: false
};

Component.propTypes = {
	isLogin: PropTypes.bool
};
