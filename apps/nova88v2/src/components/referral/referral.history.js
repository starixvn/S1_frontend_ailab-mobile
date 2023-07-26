import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useLazyGetRefFriendDetailQuery } from "@ailab-mobile/service";
import { i18nContext, popBoxContext } from "../common/context";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import api from "../../service/api";
import ReferralHistoryList from "./referral.history.list";
import ReferralHistoryDetails from "./referral.history.details";

const Panel = ({
	history,
	setHistory,
	pageInfo,
	setPageInfo,
	filterData,
	clickSubmit
}) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [processing, setProcessing] = useState(false);
	const [isDetailsActive, setIsDetailsActive] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const [
		getRefFriendDetail,
		{ data: { data: referralDetail = [] } = {} }
	] = useLazyGetRefFriendDetailQuery();

	const handleRefFriendDetail = async payload => {
		try {
			await getRefFriendDetail(payload).unwrap();
			setIsDetailsActive(true);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: i18n.msg_ApiServerError
			});
		}
	};

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

	return (
		<>
			<div className="recent active">
				{history?.length > 0 ? (
					<ReferralHistoryList
						history={history}
						onRefFriendDetail={handleRefFriendDetail}
					/>
				) : (
					<div className="nodata icon icon-nodata">
						<div className="txt-white">{i18n.msg_NoData}</div>
					</div>
				)}
			</div>

			<ReferralHistoryDetails
				referralDetail={referralDetail}
				active={isDetailsActive}
				setIsDetailsActive={setIsDetailsActive}
			/>
		</>
	);
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
