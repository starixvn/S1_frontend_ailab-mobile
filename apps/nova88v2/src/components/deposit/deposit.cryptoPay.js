import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import path from "Path";
import Step from "./step";
import PageVerify from "./deposit.pageVerify";
import Loading from "../common/loading";
import config from "../../config";
import api from "../../service/api";

export const Panel = props => props.children;

export const Main = props => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [paymentList, setPaymentList] = useState([]);
	const { setPopBox } = useContext(popBoxContext);

	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		navigate,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	useEffect(() => {
		if (props.location.state?.paymentList) {
			if (isMountedRef.current) {
				setLoading(false);
				setPaymentList(props.location.state.paymentList);
			}
		} else if (userInfo.isLogin) {
			setLoading(true);
			api.payment.GetCryptoPayInfoList().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data.length > 0) {
								setPaymentList(res.data.data);
							} else {
								navigate(
									`/${userInfo.langId}/${path.deposit.root}`
								);
							}
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [
		props.location.state,
		setPopBox,
		i18n.lbl_ImportantNote,
		userInfo.isLogin,
		i18n.msg_ApiServerError,
		userInfo.langId,
		navigate
	]);

	const rows = paymentList?.map(p => {
		return (
			<div key={`deposit-cryptoPay-${p.groupId}-${p.channelId}`}>
				<Link state={p} to={p.channelName.replace(" ", "")}>
					<img
						src={`${config.cloudImgURL}/SiteSkin/img/Payment/${p.groupName}.png`}
						alt={p.groupName}
					/>
				</Link>
				<span>{p.groupName}</span>
			</div>
		);
	});

	if (loading) {
		return <Loading />;
	}
	return pageVerify ? (
		<>
			<Step step={2} />
			<div className="depositType">{rows}</div>
			<div className="btn-group">
				<Link to="../" className="white">
					{i18n.lbl_Back}
				</Link>
			</div>
		</>
	) : null;
};

Main.defaultProps = {
	location: {}
};

Main.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};
