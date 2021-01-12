import React, { useEffect, useRef, useContext } from "react";
import { i18nContext } from "Context";
import { useNavigate } from "@reach/router";
import { Filter } from "./filter";
import { Breadcrumbs } from "../common/breadcrumb";
import path from "../../path";

export default props => {
	const { i18n } = useContext(i18nContext);
	const isMountedRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const submitFilter = (startDay, endDay) => {
		if (startDay !== endDay) {
			toDateRangePage({
				startDay,
				endDay
			});
		} else {
			toByDayPage({
				selDate: startDay
			});
		}
	};

	const toDateRangePage = ({ startDay, endDay }) => {
		navigate(`/${path.statement.root}/${startDay}to${endDay}`);
	};

	const toByDayPage = ({ selDate }) => {
		navigate(`/${path.statement.root}/${selDate}`);
	};

	return props.uri === window.location.pathname ? (
		<div className="depositBox">
			<Breadcrumbs
				locationInfo={props}
				root={path.statement.root}
				i18n={i18n}
				customDisplayKey={{
					[path.statement.root]: "lbl_QuickPick"
				}}
			/>
			<Filter submitHandler={submitFilter} />
		</div>
	) : null;
};
