import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext } from "Context";
import moment from "moment";
import { Link } from "@reach/router";
import Dropdown from "../common/dropdown";
import { number_format } from "../common/common";
import Loading from "../common/loading";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange, getSkipLink, defStatement } from "./common";
import { api_GetCustTpBetRecordListbyCategoryId } from "../../service/api/payment";
import path from "../../path";
import { useHandlePage } from "./hook";

const ByCategory = props => {
	const isMountedRef = useRef(null);
	const { timePeriod, date: _selDate, category: _categoryId } = props;
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [loading, setLoading] = useState(true);

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
			getListByCategoryId({ pageNumber: 1 });
		}
	}, []);

	const getListByCategoryId = ({ pageNumber }) => {
		setLoading(true);

		api_GetCustTpBetRecordListbyCategoryId({
			SelDate: _selDate,
			CategoryId: Number(_categoryId),
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
		func_getDatas: getListByCategoryId
	});

	const detailArr = datas?.map(data => {
		return (
			<Detail
				key={`bet-by-category-${data.settledDate}-${data.turnOver}`}
				i18n={i18n}
				settledDate={data.settledDate}
				turnOver={data.turnOver}
				validBet={data.validBet}
				winlostAmount={data.winlostAmount}
				gameTypeName={data.gameTypeName}
				gameTypeID={data.gameTypeID}
				_path={`/${path.statement.root}/${_startDay}to${_endDay}/${_selDate}/${_categoryId}`}
			/>
		);
	});

	if (loading) return <Loading />;

	return datas !== null && !props.path.includes("/:game") ? (
		<>
			<Breadcrumbs
				locationInfo={props}
				root={path.statement.root}
				i18n={i18n}
				customDisplayKey={{
					[path.statement.root]: "lbl_QuickPick",
					timePeriod: dateRange,
					date: "lbl_ByDay",
					category: "lbl_Category"
				}}
				skipLink={skipLink}
			/>
			{datas?.length !== 0 ? (
				<>
					<div className="txt-blue2">{i18n.msg_AmountFormatTip}</div>
					<div className="inputBox page">
						<Dropdown
							options={pageOptions}
							mainKey="betList-By-Category"
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
	) : null;
};

ByCategory.defaultProps = {
	timePeriod: "",
	date: "",
	category: "",
	path: ""
};

ByCategory.propTypes = {
	timePeriod: PropTypes.string,
	date: PropTypes.string,
	category: PropTypes.string,
	path: PropTypes.string
};

const Detail = ({
	i18n,
	settledDate,
	turnOver,
	validBet,
	winlostAmount,
	gameTypeName,
	gameTypeID,
	_path
}) => {
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n.lbl_SettledDate}</span>
					<span>{moment(settledDate).format("YYYY/MM/DD")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_GameTypeName}</span>
					<span>{gameTypeName}</span>
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
				<Link className="blue" to={`${_path}/${gameTypeID}`}>
					{i18n.lbl_Details}
				</Link>
			</div>
		</div>
	);
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	settledDate: PropTypes.string.isRequired,
	turnOver: PropTypes.number.isRequired,
	validBet: PropTypes.number.isRequired,
	winlostAmount: PropTypes.number.isRequired,
	gameTypeName: PropTypes.string.isRequired,
	gameTypeID: PropTypes.number.isRequired,
	_path: PropTypes.string.isRequired
};

export default ByCategory;
