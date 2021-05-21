import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { isConvert } from "../common/common";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import GoTopBtn from "../common/goTopBtn";
import api from "../../service/api";
import Detail from "./historyDetail";

const Panel = ({
	history,
	setHistory,
	pageInfo,
	setPageInfo,
	filterData,
	clickSubmit
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [processing, setProcessing] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api.payment.GetWithdrawalInfoHistory,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			api.payment.SetWithdrawalCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setHistory(prevState => {
								const newD = [...prevState];
								const idx = newD.findIndex(
									x => x.transId === transId
								);
								newD[idx].status = 5;
								return newD;
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		};

		const ClickPopBoxCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CancelConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="white" onClick={ClickPopBoxCancel}>
						{i18n.lbl_Yes}
					</button>
					<button className="orange" onClick={ClickSubmit}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const arr = history?.map(item => {
		return (
			<Detail
				key={`withdrawalHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				status={item.status}
				_isConvert={_isConvert}
				ClickCancel={ClickCancel}
				i18n={i18n}
			/>
		);
	});

	let infoList = null;
	if (history?.length > 0) {
		infoList = (
			<div className="infoList">
				{arr}
				{history.length > 2 ? <GoTopBtn /> : null}
			</div>
		);
	} else {
		infoList = (
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n.msg_NoData}</div>
			</div>
		);
	}

	let subContent = null;
	if (history) {
		subContent = <div className="recent active">{infoList}</div>;
	}

	return subContent;
};

Panel.defaultProps = {
	history: null,
	setHistory: null,
	pageInfo: { pageNumber: 0, totalPages: 0 },
	setPageInfo: null,
	filterData: {},
	clickSubmit: null
};

Panel.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object),
	setHistory: PropTypes.func,
	pageInfo: PropTypes.objectOf(PropTypes.number),
	setPageInfo: PropTypes.func,
	filterData: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	clickSubmit: PropTypes.bool
};

export default Panel;
