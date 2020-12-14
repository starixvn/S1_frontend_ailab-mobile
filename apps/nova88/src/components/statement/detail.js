import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange } from "./filter";
import { Redirect } from "@reach/router";
import path from "../../path";
import api from "../../service/api";
import Loading from "../common/loading";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [selectedPage, setSelectedPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [redirectPath, setRedirectPath] = useState(null);
	const [loading, setLoading] = useState(true);

	const _isConvert = isConvert(userInfo.currencyId);
	const isMountedRef = useRef(null);

	const timePeriod = props.timePeriod;
	const _startDay = timePeriod.substr(0, timePeriod.indexOf("to"));
	const _endDay = timePeriod.split("to").pop();
	const _selDate = props.date;
	const _gameId = props.game;

	let dateRange = getDateRange(_startDay, _endDay);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		if (isMountedRef.current) {
			GetListbyGameType({ pageNumber: 1 });
		}
	}, []);

	let pageOptions = [];
	for (let i = 1; i <= totalPages; i++) {
		pageOptions.push({ displayText: i, id: i });
	}

	const selectPage = i => {
		if (i !== selectedPage) {
			setSelectedPage(i);
			let _selectedPage = i + 1;

			GetListbyGameType({ pageNumber: _selectedPage });
		}
	};

	const GetListbyGameType = ({ pageNumber }) => {
		setLoading(true);

		api.payment
			.GetCustTpBetRecordDetailListbyGameType({
				SelDate: _selDate,
				gameTypeId: Number(_gameId),
				PageNumber: pageNumber,
				PageSize: 10
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setDatas(res.data.data);
							setTotalPages(res.data.totalPages);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
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

	let totalTurnover = datas?.reduce((prev, curr) => {
		return prev + curr.turnOver;
	}, 0);

	let totalWinLoss = datas?.reduce((prev, curr) => {
		return prev + curr.winlostAmount;
	}, 0);

	let detailArr = datas?.map(data => {
		return (
			<Detail
				key={`bet-by-gameType-${data.transId}`}
				i18n={i18n}
				transTime={data.transTime}
				transId={data.transId}
				turnOver={data.turnOver}
				validBet={data.validBet}
				winlostAmount={data.winlostAmount}
				_isConvert={_isConvert}
				bonusCode={data.bonusCode}
				settledTime={data.settledTime}
				bonusId={data.bonusId}
			/>
		);
	});

	const getSkipLink = ({ dateRange }) => {
		return (dateRange =
			dateRange === "lbl_Today" || dateRange === "lbl_YesterDay"
				? ["date"]
				: []);
	};
	const skipLink = getSkipLink({ dateRange });

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : loading ? (
		<Loading />
	) : datas !== null ? (
		<>
			<Breadcrumbs
				locationInfo={props}
				root={path.statement.root}
				i18n={i18n}
				customDisplayKey={{
					[path.statement.root]: "lbl_QuickPick",
					timePeriod: dateRange,
					date: "lbl_ByDay",
					category: "lbl_Category",
					game: "lbl_Detail"
				}}
				skipLink={skipLink}
			/>
			{datas?.length !== 0 ? (
				<>
					<div className="inputBox page">
						<Dropdown
							options={pageOptions}
							mainKey="betList-By-GameType"
							onSelectItem={selectPage}
							selectedIdx={selectedPage}
						/>
					</div>

					<div className="recent open">
						<div className="infoList">{detailArr}</div>
					</div>

					<div className="total">
						{i18n.lbl_TurnoverTotal}：
						{number_format(totalTurnover, _isConvert)}
					</div>
					<div className="total">
						{i18n.lbl_WinlostAmountTotal}：
						{number_format(totalWinLoss, _isConvert)}
					</div>

					<div className="inputBox page">
						<Dropdown
							options={pageOptions}
							mainKey="betList-By-GameType"
							onSelectItem={selectPage}
							selectedIdx={selectedPage}
						/>
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
	transTime,
	transId,
	turnOver,
	validBet,
	winlostAmount,
	_isConvert,
	bonusCode,
	settledTime,
	bonusId
}) => {
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n.lbl_TransTime}</span>
					<span>
						{moment(transTime).format("YYYY/MM/DD hh:mm:ss")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TransId}</span>
					<span>{transId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Turnover}</span>
					<span>{number_format(turnOver, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ValidBet}</span>
					<span>{number_format(validBet, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_WinlostAmount}</span>
					<span>{number_format(winlostAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_BonusCode}</span>
					<span>{bonusCode ?? "-"}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_BonusId}</span>
					<span>{bonusId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_SettledTime}</span>
					<span>
						{moment(settledTime).format("YYYY/MM/DD hh:mm:ss")}
					</span>
				</li>
			</ul>
		</div>
	);
};
