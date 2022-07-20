import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import { api_GetCustTpBetRecordListOneDay } from "../../service/api/payment";
import path from "../../path";
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
	}, []);

	const toByCategoryPage = ({ CategoryId }) => {
		navigate(
			`/${path.statement.root}/${_startDay}to${_endDay}/${_selDate}/${CategoryId}`
		);
	};

	const getListByDay = ({ pageNumber }) => {
		setLoading(true);

		api_GetCustTpBetRecordListOneDay({
			SelDate: _selDate,
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
		func_getDatas: getListByDay
	});

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
						date: "lbl_ByDay"
					}}
					skipLink={skipLink}
				/>
				{datas?.length !== 0 ? (
					<>
						<div className="inputBox page">
							<Dropdown
								options={pageOptions}
								mainKey="betList-By-Day"
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
	date: null
};

Content.propTypes = {
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
		<div className="info infoBlack">
			<ul>
				<li>
					<span className="title">
						{i18n.lbl_SettledDate} (+07:00)
					</span>
					<span>
						{moment(settledDate, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("YYYY/MM/DD")}
					</span>
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
					<button
						onClick={toByCategoryPage.bind(this, {
							CategoryId: categoryId
						})}>
						{i18n.lbl_Details}
					</button>
				</li>
			</ul>
		</div>
	);
};

Detail.defaultProps = {
	i18n: null,
	settledDate: null,
	winlostAmount: null,
	categoryName: null,
	turnOver: null,
	validBet: null,
	_isConvert: null,
	categoryId: null,
	toByCategoryPage: null
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	settledDate: PropTypes.string,
	winlostAmount: PropTypes.number,
	categoryName: PropTypes.string,
	turnOver: PropTypes.number,
	validBet: PropTypes.number,
	_isConvert: PropTypes.bool,
	categoryId: PropTypes.string,
	toByCategoryPage: PropTypes.func
};

export default Content;
