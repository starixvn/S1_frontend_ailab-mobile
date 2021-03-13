import React, { useContext, useState, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "Context";
import moment from "moment";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import Layout from "../common/layout";
import TabPage from "../common/tabPage";
import { statement_financialLog as statementTabs } from "../../datas/defTabs";
import Breadcrumbs from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import path from "../../path";
import api from "../../service/api";
import { useHandlePage } from "./hook";
import { Filter } from "./filter";

const Index = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);

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
	}, [timePeriod]);

	const getListbyGameType = ({ pageNumber }) => {
		setLoading(true);

		api.payment
			.GetCustTpBetRecordDetailListbyGameType({
				SelDate: _selDate,
				gameTypeId: Number(_gameId),
				PageNumber: pageNumber,
				PageSize: defStatement.pageSize
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
								content: `[${res.data.errorCode}]${res.data.message}`
							});
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

	const breadCrumb = (
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
	);
	const filter = <Filter langId={userInfo.langId} defaultValue={dateRange} />;
	const header = (
		<TabPage
			defTabs={statementTabs}
			filter={filter}
			breadCrumb={breadCrumb}
		/>
	);

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

	return datas !== null ? (
		<Layout header={header} mainClass="main history">
			{datas?.length !== 0 ? (
				<>
					<Dropdown
						options={pageOptions}
						mainKey="betList-By-GameType"
						onSelectItem={onSelectPage}
						selectedIdx={selectedPage}
						hideInfo={true}
					/>

					<div className="recent active">
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
				</>
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			)}
		</Layout>
	) : null;
};

Index.defaultProps = {
	timePeriod: "",
	date: "",
	game: null
};

Index.propTypes = {
	timePeriod: PropTypes.string,
	date: PropTypes.string,
	game: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
		<div className="info">
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

Detail.defaultProps = {
	_isConvert: false,
	bonusCode: null
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	turnOver: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	validBet: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	winlostAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	_isConvert: PropTypes.bool,
	transId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	bonusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	bonusId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	settledTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]).isRequired
};

export default Index;
