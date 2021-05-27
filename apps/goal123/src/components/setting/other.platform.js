import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import { navContext, defNavPanel, userInfoContext } from "../common/context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";
import { api_GetTpIds } from "../../service/api/site";
import defPlatfrom from "./defPlatform";

const Platform = ({ langId, isLogin }) => {
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [tpIds, setTpIds] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setTpIds(res.data.data);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [userInfo.isLogin]);

	const ClickItem = ({ _path, urlParams, tpId, gameId }) => {
		const loginCallback = () => {
			setNav(defNavPanel.login);
		};

		if (_path) {
			setRedirectPath(`/${_path}${urlParams}`);
		} else {
			GET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback
			});
		}
	};

	const rows = defPlatfrom
		.filter(item => {
			return tpIds ? tpIds.includes(item.tpId) : true;
		})
		.map(p => {
			const key = `other-platform-${p.tpId}-${p.gameId}`;
			let params = null;
			if (p.parameter) {
				params = Object.keys(p.parameter).map(_key => {
					return `${_key}=${p.parameter[key]}`;
				});
			}

			const _urlParams = params !== null ? `?${params.join("&")}` : "";

			return (
				<img
					key={key}
					alt={p.imgName}
					src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
					onClick={ClickItem.bind(this, {
						...p,
						urlParams: _urlParams
					})}
				/>
			);
		});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<div className="partner-bar">{rows}</div>
	);
};

Platform.defaultProps = {
	isLogin: null
};

Platform.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool
};

export default Platform;
