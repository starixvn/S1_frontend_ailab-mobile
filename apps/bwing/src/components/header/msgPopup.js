import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";
import {
	api_account_GetPopupMsg,
	api_account_SetPopupMsgRead
} from "../../service/api/account";

export default function Component({ isLogin }) {
	const [popUpMsg, setPopUpMsg] = useState("");

	const GetPopupMsg = () => {
		try {
			api_account_GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUpMsg(res.data.data.popupMessage);
				} else {
					setPopUpMsg("");
				}
			});
		} catch (error) {}
	};

	const ReadPopupMsg = () => {
		api_account_SetPopupMsgRead().then(res => {
			if (res.data.errorCode === 0) {
				setPopUpMsg("");
			}
		});
	};

	useEffect(() => {
		if (isLogin) {
			GetPopupMsg();
		}
	}, [isLogin]);

	useInterval(
		() => {
			GetPopupMsg();
		},
		isLogin ? 30000 : null
	);

	return (
		popUpMsg && (
			<div
				className="mailtipPop"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}>
				<div
					className="icon icon-close"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						ReadPopupMsg();
					}}
				/>
				<span className="txt">{popUpMsg}</span>
			</div>
		)
	);
}

Component.defaultProps = {
	isLogin: false
};

Component.propTypes = {
	isLogin: PropTypes.bool
};
