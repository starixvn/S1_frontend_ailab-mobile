import React, { useEffect, useRef, useContext, useState } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate, Redirect } from "@reach/router";
import { Filter } from "./filter";
import api from "../../service/api";
import { Breadcrumbs } from "../common/breadcrumb";
import path from "../../path";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const navigate = useNavigate();
	const currentLocation = window.location.pathname;
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin]);

	const submitFilter = (startDay, endDay) => {
		if (startDay !== endDay) {
			GetBetRecordListDateRange({
				startDay: startDay,
				endDay: endDay,
				pageNumber: 1
			});
		} else {
			GetRecordListOneDay({
				selDate: startDay
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
							navigate(
								`/${path.statement.root}/${startDay}to${endDay}`,
								{
									state: {
										datas: res.data.data,
										totalPages: res.data.totalPages
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
		navigate(`/${path.statement.root}/${selDate}`);
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			{props.uri === currentLocation ? (
				<>
					<Breadcrumbs
						locationInfo={props}
						root={path.statement.root}
						i18n={i18n}
						customDisplayKey={{
							[path.statement.root]: "lbl_QuickPick"
						}}
					/>
					<Filter submitHandler={submitFilter} />
				</>
			) : (
				<>{props.children}</>
			)}
		</>
	);
};
