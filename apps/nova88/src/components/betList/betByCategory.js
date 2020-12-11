import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { useNavigate, Redirect } from "@reach/router";
import { Breadcrumbs } from "../common/breadcrumb";
import { getDateRange } from "../betList/filter";
import api from "../../service/api";
import path from "../../path";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [selectedPage, setSelectedPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [redirectPath, setRedirectPath] = useState(null);

	const navigate = useNavigate();
	const _isConvert = isConvert(userInfo.currencyId);
	const isMountedRef = useRef(null);

	const timePeriod = props.timePeriod;
	const _startDay = timePeriod.substr(0, timePeriod.indexOf("to"));
	const _endDay = timePeriod.split("to").pop();
	const _selDate = props.date;
	const _categoryId = props.category;
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
			if (props?.location.state?.datas) {
				setDatas(props?.location.state.datas);
				setTotalPages(props?.location.state.totalPages);
			} else {
				GetRecordListbyCategoryId({ pageNumber: 1 });
			}
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

			GetRecordListbyCategoryId({ pageNumber: _selectedPage });
		}
	};

	const clickDetail = gameTypeId => {
		api.payment
			.GetCustTpBetRecordDetailListbyGameType({
				SelDate: _selDate,
				gameTypeId: gameTypeId,
				PageNumber: 1,
				PageSize: 10
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setDatas(null);
							navigate(
								`/${path.betList.root}/${_startDay}to${_endDay}/${_selDate}/${_categoryId}/${gameTypeId}`,
								{
									state: {
										datas: res.data.data,
										totalPages: res.data.totalPages
									}
								}
							);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
	};

	const GetRecordListbyCategoryId = ({ pageNumber }) => {
		api.payment
			.GetCustTpBetRecordListbyCategoryId({
				SelDate: _selDate,
				CategoryId: Number(_categoryId),
				PageNumber: pageNumber,
				PageSize: 10
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setDatas(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
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
				key={`bet-by-category-${data.settledDate}-${data.turnOver}`}
				i18n={i18n}
				settledDate={data.settledDate}
				turnOver={data.turnOver}
				validBet={data.validBet}
				winlostAmount={data.winlostAmount}
				_isConvert={_isConvert}
				clickDetail={clickDetail}
				gameTypeName={data.gameTypeName}
				gameTypeID={data.gameTypeID}
			/>
		);
	});

	const getSkipLink = ({ dateRange }) => {
		return dateRange === "lbl_YesterDay" ? ["date"] : [];
	};
	const skipLink = getSkipLink({ dateRange });

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : datas !== null && !props.path.includes("/:game") ? (
		<>
			<Breadcrumbs
				locationInfo={props}
				root={path.betList.root}
				i18n={i18n}
				customDisplayKey={{
					[path.betList.root]: "lbl_QuickPick",
					timePeriod: dateRange,
					date: "lbl_ByDay",
					category: "lbl_Category"
				}}
				skipLink={skipLink}
			/>
			{datas?.length !== 0 ? (
				<>
					<div className="inputBox page">
						<Dropdown
							options={pageOptions}
							mainKey="betList-By-Category"
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
							mainKey="betList-By-Category"
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
	) : (
		<>{props.children}</>
	);
};

const Detail = ({
	i18n,
	settledDate,
	turnOver,
	validBet,
	winlostAmount,
	_isConvert,
	clickDetail,
	gameTypeName,
	gameTypeID
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
							onClick={clickDetail.bind(this, gameTypeID)}>
							{i18n.lbl_Details}
						</button>
					</div>
				</li>
			</ul>
		</div>
	);
};
