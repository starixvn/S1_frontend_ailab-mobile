import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { isConvert } from "../common/common";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import api from "../../service/api";
import { Detail } from "./referral.history.detail";
import GoTopBtn from "../common/goTopBtn";

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
	const [processing, setProcessing] = useState(false);
	const _isConvert = isConvert(userInfo.currencyId);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api.account.GetRefFriendList,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const arr = history?.map(data => {
		return (
			<Detail
				key={`referral-history-${data.custId}`}
				i18n={i18n}
				_isConvert={_isConvert}
				userName={data.userName}
				registerDate={data.registerDate}
				currencyId={data.currencyId}
				totalDeposit={data.totalDeposit}
				depositC={data.depositC}
				totalBet={data.totalBet}
				vaildBetC={data.vaildBetC}
				bonusAmount={data.bonusAmount}
				status={data.status}
			/>
		);
	});

	return history ? (
		<div className="recent active">
			{history.length > 0 ? (
				<div className="infoList">
					{arr}
					{history.length > 2 ? <GoTopBtn /> : null}
				</div>
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			)}
		</div>
	) : null;
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
