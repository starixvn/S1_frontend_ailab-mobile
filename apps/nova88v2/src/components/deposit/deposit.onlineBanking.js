import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import Step from "./step";
import PageVerify from "./deposit.pageVerify";
import path from "../../path";
import Loading from "../common/loading";
import config from "../../config";
import api from "../../service/api";

export const Panel = props => props.children;

export const Main = props => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [paymentList, setPaymentList] = useState([]);
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
				setPaymentList(props.location.state.paymentList);
				setLoading(false);
			}
		} else if (userInfo.isLogin) {
			setLoading(true);
			api.payment.GetOnlinePaymentList().then(
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
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		}
	}, [
		props.location.state,
		i18n.lbl_ImportantNote,
		setPopBox,
		userInfo.isLogin,
		i18n.msg_ApiServerError,
		userInfo.langId,
		navigate
	]);

	const rows = paymentList?.map(p => {
		return (
			<div key={`onlinebanking-${p.payId}-${p.channelId}`}>
				<Link
					to={`${p.payName}`}
					state={{
						...p
					}}>
					<img
						src={`${config.cloudImgURL}/SiteSkin/img/Payment/${p.payName}.png`}
						alt={p.payName}
					/>
				</Link>
				<span>{p.payName}</span>
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
				<Link to="/deposit" className="white">
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
