import React, { useContext, useEffect, useState } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import api from "../../service/api";

export const useGotoGame = ({ isLogin, langId, tpId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [data, setData] = useState({ account: "", password: "" });

	const ClickClose = () => {
		setPopBox(() => ({
			isOpen: false
		}));
	};

	useEffect(() => {
		let mounted = true;
		if (isLogin) {
			api.tp
				.GotoGame({
					TpId: tpId,
					LangId: langId
				})
				.then(res => {
					if (mounted) {
						if (res.data.errorCode === 0 && res.data.message) {
							setData(() => JSON.parse(res.data.message));
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`,
								hasBtn: true,
								btnBar: (
									<div className="btn-group">
										<button
											className="blue"
											onClick={ClickClose}>
											{i18n.lbl_Cancel}
										</button>
									</div>
								)
							});
						}
					}
				});
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, langId, tpId]);

	return { data };
};
