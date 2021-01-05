import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, popBoxContext } from "Context";
import moment from "moment";
import { number_format } from "../common/common";
import Dropdown from "../common/dropdown";
import { api_CustTpBetRecordListDateRange } from "../../service/api/payment";
import { Breadcrumbs } from "../common/breadcrumb";
import { useNavigate, Link } from "@reach/router";
import { getDateRange, defStatement } from "./common";
import path from "../../path";
import { useHandlePage } from "./hook";
import Loading from "../common/loading";

export default props => {
	const isMountedRef = useRef(null);
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [loading, setLoading] = useState(true);

	const timePeriod = props.timePeriod;
	const _startDay = timePeriod.substr(0, timePeriod.indexOf("to"));
	const _endDay = timePeriod.split("to").pop();
	let dateRange = getDateRange({ startDate: _startDay, endDate: _endDay });

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current) {
			if (timePeriod.includes("to")) {
				getListByDateRange({ pageNumber: 1 });
			} else {
				toByDayPage({ selDate: timePeriod });
			}
		}
	}, []);

	const toByDayPage = ({ selDate }) => {
		let _path = timePeriod.includes("to")
			? `${_startDay}to${_endDay}`
			: `${selDate}to${selDate}`;

		navigate(`/${path.statement.root}/${_path}/${selDate}`);
	};

	const getListByDateRange = ({ pageNumber }) => {
		setLoading(true);

		api_CustTpBetRecordListDateRange({
			StartDate: _startDay,
			EndDate: _endDay,
			PageNumber: pageNumber,
			PageSize: defStatement.pageSize
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setDatas(res.data.data);
						setTotalPages(res.data.totalPages);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
					setLoading(false);
				}
			},
			err => {
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

	const { selectedPage, pageOptions, onSelectPage } = useHandlePage({
		totalPages,
		func_getDatas: getListByDateRange
	});

	let detailArr = datas?.map(data => {
		return (
			<Detail
				key={`bet-dateRange-${data.settledDate}-${data.turnOver}`}
				i18n={i18n}
				settledDate={data.settledDate}
				turnOver={data.turnOver}
				validBet={data.validBet}
				winlostAmount={data.winlostAmount}
				timePeriod={timePeriod}
				_startDay={_startDay}
				_endDay={_endDay}
			/>
		);
	});

	return loading ? (
		<Loading />
	) : datas !== null ? (
		<>
			<Breadcrumbs
				locationInfo={props}
				root={path.statement.root}
				i18n={i18n}
				customDisplayKey={{
					[path.statement.root]: "lbl_QuickPick",
					timePeriod: dateRange
				}}
			/>
			{datas?.length !== 0 ? (
				<>
					<div className="txt-blue2">
						{i18n["msg_AmountFormatTip"]}
					</div>
					<div className="inputBox page">
						<Dropdown
							options={pageOptions}
							mainKey="betList-Date-Range"
							onSelectItem={onSelectPage}
							selectedIdx={selectedPage}
						/>
					</div>

					<div className="recent open">
						<div className="infoList">{detailArr}</div>
					</div>
				</>
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n["msg_NoData"]}</div>
				</div>
			)}
		</>
	) : null;
};

const Detail = ({
	i18n,
	settledDate,
	turnOver,
	validBet,
	winlostAmount,
	timePeriod,
	_startDay,
	_endDay
}) => {
	let _selDate = moment(settledDate).format("YYYY-MM-DD");
	let timePeriodPath = timePeriod.includes("to")
		? `${_startDay}to${_endDay}`
		: `${_selDate}to${_selDate}`;
	let _path = `/${path.statement.root}/${timePeriodPath}/${_selDate}`;

	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n.lbl_SettledDate}</span>
					<span>{moment(settledDate).format("YYYY/MM/DD")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Turnover}</span>
					<span>{number_format(turnOver)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ValidBet}</span>
					<span>{number_format(validBet)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_WinlostAmount}</span>
					<span>{number_format(winlostAmount)}</span>
				</li>
			</ul>
			<div className="btn-group">
				<Link className="blue" to={_path}>
					{i18n.lbl_Details}
				</Link>
			</div>
		</div>
	);
};
