import React, { useContext, useState } from "react";
import { i18nContext, popBoxContext } from "Context";

export const useHandlePopBox = () => {
	const { i18n } = useContext(i18nContext);
	const { popBox, setPopBox } = useContext(popBoxContext);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const handleErrorPopBox = ({
		message = i18n.msg_ApiServerError,
		errorCode = 999,
		uiSetting = {}
	}) => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: <p>{`[${errorCode}] ${message}`}</p>,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						onClick={clickClose}
						className={uiSetting.popBox?.submitBtn ?? "btn-check"}>
						{i18n.lbl_Close}
					</button>
				</div>
			)
		});
	};

	const handlePopBox = ({
		title = i18n.lbl_ImportantNote,
		content,
		btnBar
	}) => {
		setPopBox({
			isOpen: true,
			title,
			content,
			hasBtn: btnBar !== undefined,
			btnBar
		});
	};

	return { handlePopBox, handleErrorPopBox, clickClose };
};
