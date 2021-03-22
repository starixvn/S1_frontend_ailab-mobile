import { useEffect, useContext, useRef, useState } from "react";
import moment from "moment";
import { loadingContext, popBoxContext, i18nContext } from "../common/context";

export default ({ api }) => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [filterData, setFilterData] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [history, setHistory] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);

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
				StartDate: moment(startDay).unix(),
				EndDate: moment(endDay).endOf("day").unix()
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
					const { errorCode } = response.data;
					if (errorCode !== 0) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: response.data.message
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
						title: i18n.lbl_ImportantNote,
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
