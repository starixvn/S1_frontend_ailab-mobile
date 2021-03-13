import React, { useContext, useState, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "Context";
import moment from "moment";
import { useNavigate } from "@reach/router";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import Layout from "../common/layout";
import TabPage from "../common/tabPage";
import { statement_financialLog as statementTabs } from "../../datas/defTabs";
import Breadcrumbs from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import api from "../../service/api";
import path from "../../path";
import { useHandlePage } from "./hook";
import { Filter } from "./filter";

const ByDay = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const _isConvert = isConvert(userInfo.currencyId);
	const navigate = useNavigate();
	const isMountedRef = useRef(null);

	const { timePeriod, date: _selDate } = props;
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
			getListByDay({ pageNumber: 1 });
		}
	}, [timePeriod]);

	const toByCategoryPage = ({ CategoryId }) => {
		navigate(
			`/${userInfo.langId}/${path.statement.root}/${_startDay}to${_endDay}/${_selDate}/${CategoryId}`
		);
	};

	const getListByDay = ({ pageNumber }) => {
		setLoading(true);
		api.payment
			.GetCustTpBetRecordListOneDay({
				SelDate: _selDate,
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
		func_getDatas: getListByDay
	});

	const breadCrumb = (
		<Breadcrumbs
			locationInfo={props}
			root={path.statement.root}
			i18n={i18n}
			customDisplayKey={{
				[path.statement.root]: "lbl_QuickPick",
				timePeriod: dateRange,
				date: "lbl_ByDay"
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
				key={`bet-by-day-${data.settledDate}-${data.turnOver}`}
				i18n={i18n}
				settledDate={data.settledDate}
				turnOver={data.turnOver}
				validBet={data.validBet}
				winlostAmount={data.winlostAmount}
				_isConvert={_isConvert}
				toByCategoryPage={toByCategoryPage}
				categoryName={data.categoryName}
				categoryId={data.categoryId}
			/>
		);
	});

	return datas !== null ? (
		<Layout header={header} mainClass="main history">
			{datas?.length !== 0 ? (
				<>
					<Dropdown
						options={pageOptions}
						mainKey="betList-By-Day"
						onSelectItem={onSelectPage}
						selectedIdx={selectedPage}
						hideInfo={true}
					/>
					<div className="recent active">
						<div className="infoList">{detailArr}</div>
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

ByDay.defaultProps = {
	timePeriod: "",
	date: ""
};

ByDay.propTypes = {
	timePeriod: PropTypes.string,
	date: PropTypes.string
};

const Detail = ({
	i18n,
	settledDate,
	turnOver,
	validBet,
	winlostAmount,
	_isConvert,
	toByCategoryPage,
	categoryName,
	categoryId
}) => {
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n.lbl_SettledDate}</span>
					<span>{moment(settledDate).format("YYYY/MM/DD")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_TypeName}</span>
					<span>{categoryName}</span>
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
					<span className="title">{i18n.lbl_Action}</span>
					<div className="btn-group">
						<button
							className="orange openPopup"
							onClick={toByCategoryPage.bind(this, {
								CategoryId: categoryId
							})}>
							{i18n.lbl_Details}
						</button>
					</div>
				</li>
			</ul>
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	settledDate: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]).isRequired,
	turnOver: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	validBet: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	winlostAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	_isConvert: PropTypes.bool,
	toByCategoryPage: PropTypes.func.isRequired,
	categoryName: PropTypes.string.isRequired,
	categoryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired
};

export default ByDay;
