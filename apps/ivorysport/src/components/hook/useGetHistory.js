import { useEffect, useContext, useRef, useState } from "react";
import moment from "moment";
import {
	loadingContext,
	popBoxContext,
	i18nContext,
	userInfoContext
} from "../common/context";
import { currencyIdToTimeZone } from "../common/common";

export default ({ api }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [filterData, setFilterData] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [history, setHistory] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);

	const timeZone = currencyIdToTimeZone[userInfo.currencyId];

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const submitFilter = ({ startDay, endDay, isUnix }) => {
		setLoading(true);
		let transactionData = filterData;
		if (!isUnix) {
			transactionData = {
				StartDate: moment(startDay, "YYYY-MM-DD").zone(timeZone).unix(),
				EndDate: moment(endDay, "YYYY-MM-DD")
					.endOf("day")
					.zone(timeZone)
					.unix()
			};
			setFilterData(transactionData);
		} else {
			transactionData = {
				StartDate: moment(startDay, "YYYY-MM-DD").zone(timeZone),
				EndDate: moment(endDay, "YYYY-MM-DD")
					.endOf("day")
					.zone(timeZone)
			};
			setFilterData(transactionData);
		}

		setClickSubmit(true);
		api({
			...transactionData,
			PageNumber: 1
		}).then(
			response => {
				if (isMountedRef.current) {
					const { errorCode, message } = response.data;
					if (errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					} else {
						setHistory(response.data.data);
						if (
							response.data.totalPages >= response.data.pageNumber
						) {
							setPageInfo(() => ({
								totalPages: response.data.totalPages,
								pageNumber: response.data.pageNumber
							}));
						}
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	};

	return {
		history,
		setHistory,
		pageInfo,
		setPageInfo,
		filterData,
		clickSubmit,
		submitFilter
	};
};
