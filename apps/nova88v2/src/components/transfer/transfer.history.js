import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { isConvert } from "../common/common";
import GoTopBtn from "../common/goTopBtn";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import api from "../../service/api";
import Detail from "./historyDetail";

const transferDirection = (direction, displayMainWallet, displaySabaWallet) => {
	let startWallet = "";
	let endWallet = "";

	if (direction === 1) {
		startWallet = displayMainWallet;
		endWallet = displaySabaWallet;
	} else {
		startWallet = displaySabaWallet;
		endWallet = displayMainWallet;
	}
	return { startWallet, endWallet };
};

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
		api.tp.GetTransferHistory,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const arr = history?.map(item => {
		const _transferDirection = transferDirection(
			item.direction,
			i18n.lbl_MainWallet,
			i18n.lbl_Wallet_Saba
		);
		return (
			<Detail
				key={`transferHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				_isConvert={_isConvert}
				amount={item.amount}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				i18n={i18n}
				memo={item.memo}
				status={item.status}
				currencyId={userInfo.currencyId}
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
