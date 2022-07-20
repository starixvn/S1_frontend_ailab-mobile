import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { isConvert, currencyIdToTimeZone } from "../common/common";
import GoTopBtn from "../common/goTopBtn";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import api from "../../service/api";
import Detail from "./financialLog.detail";

const IndexPage = ({
	history,
	setHistory,
	pageInfo,
	setPageInfo,
	filterData,
	clickSubmit
}) => {
	const navigate = useNavigate();
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

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin, navigate, userInfo.langId]);

	AUTO_FETCHING_DATA(
		api.payment.GetStatement,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const timeZone = currencyIdToTimeZone[userInfo.currencyId];
	const arr = history?.map(item => {
		return (
			<Detail
				key={`financialLog-${item.createTime}-${item.changeAmount}`}
				createTime={item.createTime}
				typeName={item.typeName}
				_isConvert={_isConvert}
				changeAmount={item.changeAmount}
				beforeAmount={item.beforeAmount}
				afterAmount={item.afterAmount}
				direction={item.direction === 1 ? "+" : "-"}
				refTransId={item.refTransId}
				i18n={i18n}
				timeZone={timeZone}
			/>
		);
	});

	let infoList = null;
	if (history?.length > 0) {
		infoList = (
			<div className="infoList">
				{arr}
				{history.length > 1 ? <GoTopBtn /> : null}
			</div>
		);
	} else {
		infoList = (
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n.msg_NoData}</div>
			</div>
		);
	}

	let content = null;

	content = history ? <div className="recent active">{infoList}</div> : null;

	return content;
};

export default IndexPage;
