import React, { useState, useEffect, useRef, useContext } from "react";
import { i18nContext, popBoxContext } from "Context";
import { Link, useNavigate } from "@reach/router";
import Filter from "../components/betList/filter";
import api from "../service/api";
import { Breadcrumbs } from "../components/common/breadcrumb";
import path from "../path";

export default props => {
	// console.log(props);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const navigate = useNavigate();
	const [nextPage, setNextPage] = useState(false);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const submitFilter = (startDay, endDay) => {
		if (startDay !== endDay) {
			GetBetRecordListDateRange({
				startDay: startDay,
				endDay: endDay,
				pageNumber: 1
			});
		} else {
			GetRecordListOneDay({
				selDate: "2020-11-16"
			});
		}
	};

	const GetBetRecordListDateRange = ({ startDay, endDay, pageNumber }) => {
		api.payment
			.CustTpBetRecordListDateRange({
				StartDate: startDay,
				EndDate: endDay,
				PageNumber: pageNumber,
				PageSize: 10
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setNextPage(true);
							navigate(
								`/${path.betList.root}/${startDay}to${endDay}`,
								{
									state: {
										datas: res.data.data,
										totalPages: res.data.totalPages
										// startDay: startDay,
										// endDay: endDay
									}
								}
							);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
	};

	const GetRecordListOneDay = ({ selDate }) => {
		navigate(`/${path.betList.root}/${selDate}-${selDate}`);
	};

	return (
		<>
			<Breadcrumbs
				locationInfo={props}
				root={path.betList.root}
				i18n={i18n}
			/>
			{nextPage === false ? (
				<>
					<Filter
						onlyQuickPick={true}
						submitHandler={submitFilter}
						optionsLength={4}
					/>
				</>
			) : (
				<>{props.children}</>
			)}
		</>
	);
};
