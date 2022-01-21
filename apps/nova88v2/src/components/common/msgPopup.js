import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";
import api from "../../service/api";

export default function Component({ isLogin }) {
	const [popUpMsg, setPopUpMsg] = useState("");

	const GetPopupMsg = () => {
		try {
			api.account.GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUpMsg(res.data.data.popupMessage);
				} else {
					setPopUpMsg("");
				}
			});
		} catch (error) {}
	};

	const ReadPopupMsg = () => {
		api.account.SetPopupMsgRead().then(res => {
			if (res.data.errorCode === 0) {
				setPopUpMsg("");
			}
		});
	};

	useEffect(() => {
		GetPopupMsg();
	}, []);

	useInterval(
		() => {
			GetPopupMsg();
		},
		isLogin ? 30000 : null
	);

	return (
		popUpMsg && (
			<div
				className="msgPop"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}>
				<div>{popUpMsg}</div>
				<button
					className="icon icon-close"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						ReadPopupMsg();
					}}
				/>
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
