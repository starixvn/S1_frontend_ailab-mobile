import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import moment from "moment";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import path from "../../path";
import { api_GetCustTpBetRecordDetailListbyGameType } from "../../service/api/payment";
import { useHandlePage } from "./hook";
import Loading from "../common/loading";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [loading, setLoading] = useState(true);

	const _isConvert = isConvert(userInfo.currencyId);
	const isMountedRef = useRef(null);

	const { timePeriod, date: _selDate, game: _gameId } = props;
	const _startDay = timePeriod.substr(0, timePeriod.indexOf("to"));
	const _endDay = timePeriod.split("to").pop();

	let dateRange = getDateRange({ startDate: _startDay, endDate: _endDay });
	const skipLink = getSkipLink({ dateRange });

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current) {
			getListbyGameType({ pageNumber: 1 });
		}
	}, []);

	const getListbyGameType = ({ pageNumber }) => {
		setLoading(true);

		api_GetCustTpBetRecordDetailListbyGameType({
			SelDate: _selDate,
			gameTypeId: Number(_gameId),
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
		func_getDatas: getListbyGameType
	});

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
							onSelectItem={onSelectPage}
							selectedIdx={selectedPage}
						/>
					</div>

					<div className="recent open">
						{detailArr}

						<div className="total">
							{i18n.lbl_TurnoverTotal}：
							{number_format(totalTurnover, _isConvert)}
						</div>
						<div className="total">
							{i18n.lbl_WinlostAmountTotal}：
							{number_format(totalWinLoss, _isConvert)}
						</div>
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
		<div className="info infoBlack">
			<ul>
				<li>
					<span className="title">{i18n.lbl_SettledTime}</span>
					<span>
						{moment(settledTime).format("YYYY/MM/DD hh:mm:ss")}
					</span>
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
					<span className="title">{i18n.lbl_TransId}</span>
					<span>{transId}</span>
				</li>
			</ul>
		</div>
	);
};
