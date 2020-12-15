import React, { useEffect, useRef, useContext, useState } from "react";
import { i18nContext, userInfoContext } from "Context";
import { useNavigate, Redirect } from "@reach/router";
import { Filter } from "./filter";
import { Breadcrumbs } from "../common/breadcrumb";
import path from "../../path";
import Loading from "../common/loading";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const navigate = useNavigate();
	const currentLocation = window.location.pathname;
	const [redirectPath, setRedirectPath] = useState(null);
	const [loading, setLoading] = useState(false);

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
			GetDateRangeList({
				startDay: startDay,
				endDay: endDay
			});
		} else {
			toByDayPage({
				selDate: startDay
			});
		}
	};

	const GetDateRangeList = ({ startDay, endDay }) => {
		navigate(`/${path.statement.root}/${startDay}to${endDay}`);
	};

	const toByDayPage = ({ selDate }) => {
		navigate(`/${path.statement.root}/${selDate}`);
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : loading ? (
		<Loading />
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
