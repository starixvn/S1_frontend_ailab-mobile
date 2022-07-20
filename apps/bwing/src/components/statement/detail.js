import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import path from "../../path";
import { api_GetCustTpBetRecordDetailListbyGameType } from "../../service/api/payment";
import { useHandlePage } from "./hook";
import Loading from "../common/loading";

const Content = props => {
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

	const dateRange = getDateRange({ startDate: _startDay, endDate: _endDay });
	const skipLink = getSkipLink({ dateRange });

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
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
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
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

	const { selectedPage, pageOptions, onSelectPage } = useHandlePage({
		totalPages,
		func_getDatas: getListbyGameType
	});

	const totalTurnover = datas?.reduce((prev, curr) => {
		return prev + curr.turnOver;
	}, 0);

	const totalWinLoss = datas?.reduce((prev, curr) => {
		return prev + curr.winlostAmount;
	}, 0);

	const detailArr = datas?.map(data => {
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

	let content = null;

	if (loading) {
		content = <Loading />;
	} else if (datas !== null) {
		content = (
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
						<div className="txt-white">{i18n.msg_NoData}</div>
					</div>
				)}
			</>
		);
	}

	return content;
};

Content.defaultProps = {
	timePeriod: null,
	game: null,
	date: null
};

Content.propTypes = {
	timePeriod: PropTypes.string,
	game: PropTypes.string,
	date: PropTypes.string
};

const Detail = ({
	i18n,
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
					<span className="title">
						{i18n.lbl_SettledTime} (+07:00)
					</span>
					<span>
						{moment(settledTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("YYYY/MM/DD HH:mm:ss")}
					</span>
				</li>
			</ul>
		</div>
	);
};

Detail.defaultProps = {
	i18n: null,
	transId: null,
	winlostAmount: null,
	bonusCode: null,
	turnOver: null,
	validBet: null,
	settledTime: null,
	bonusId: null,
	_isConvert: null
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	transId: PropTypes.string,
	winlostAmount: PropTypes.number,
	bonusCode: PropTypes.string,
	turnOver: PropTypes.number,
	validBet: PropTypes.number,
	settledTime: PropTypes.string,
	bonusId: PropTypes.string,
	_isConvert: PropTypes.bool
};

export default Content;
