import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import {
	navContext,
	defNavPanel,
	userInfoContext,
	popBoxContext,
	i18nContext
} from "../common/context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { bannerImgUrl } from "../../config";
import { api_GetTpIds } from "../../service/api/site";
import defPlatfrom from "./defPlatform";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";

const Platform = ({ langId, isLogin }) => {
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [tpIds, setTpIds] = useState(null);
	const { maintainList } = useGetTpMaintainList();
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
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [userInfo.isLogin]);

	const ClickItem = ({ tpId, gameId, tpGameType, underMaintain }) => {
		const loginCallback = () => {
			setNav(defNavPanel.login);
		};

		if (underMaintain) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_underMaintenance
			});
		} else {
			GET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	const rows = defPlatfrom
		.filter(item => {
			return tpIds ? tpIds.includes(item.tpId) : true;
		})
		.map(p => {
			const key = `other-platform-${p.tpId}-${p.gameId}`;
			const underMaintain = maintainList?.some(
				m =>
					m.tpId === p.tpId &&
					(m.tpGameType === p.tpGameType ||
						m.tpGameType === defTpGameType.All)
			);

			if (underMaintain && p.parameter) {
				return null;
			}

			return p.parameter ? (
				<Link key={key} to={`/${p.path}/${p.tpId}`} state={p.parameter}>
					<img
						alt={p.imgName}
						src={`${bannerImgUrl}/h5/img/footer/${
							p.otherPlatformImg ?? p.imgName
						}.png`}
					/>
				</Link>
			) : (
				<img
					key={key}
					alt={p.imgName}
					src={`${bannerImgUrl}/h5/img/footer/${
						p.otherPlatformImg ?? p.imgName
					}.png`}
					onClick={ClickItem.bind(this, {
						...p,
						underMaintain
					})}
				/>
			);
		});

	return <div className="partner-bar">{rows}</div>;
};

Platform.defaultProps = {
	isLogin: null
};

Platform.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool
};

export default Platform;
