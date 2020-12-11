import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import moment from "moment";
import Dropdown from "../common/dropdown";
import { number_format, isConvert } from "../common/common";
import { useNavigate, Link } from "@reach/router";
import api from "../../service/api";
import path from "../../path";
import BreadCrumb from "./breadCrumb";

export default props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [selectedPage, setSelectedPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [datas, setDatas] = useState(null);
	const [nextPage, setNextPage] = useState(false);
	const navigate = useNavigate();
	const _isConvert = isConvert(userInfo.currencyId);
	const state = props?.location.state;

	const timePeriod = props.timePeriod;
	const _startDay = timePeriod.substr(0, timePeriod.indexOf("-"));
	const _endDay = timePeriod.split("-").pop();
	const _selDate = props.date;
	const _categoryId = props.category;
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current) {
			if (props.location.state.datas) {
				setDatas(props?.location.state.datas);
				setTotalPages(props?.location.state.totalPages);
			} else {
				GetRecordListbyCategoryId({ pageNumber: 1 });
			}
			setNextPage(false);
		}
	}, []);

	console.log("timePeriod", timePeriod);

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
				SelDate: state?.selDate,
				gameTypeId: gameTypeId,
				PageNumber: 1,
				PageSize: 10
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setNextPage(true);
							navigate(
								`/${path.betList.root}/${_startDay}to${_endDay}/${_selDate}/${_categoryId}/${gameTypeId}`,
								{
									state: {
										datas: res.data.data,
										totalPages: res.data.totalPages,
										selDate: _selDate,
										gameTypeId: gameTypeId

										// startDay: state?.startDay,
										// endDay: state?.endDay,
										// dateRangePath: state?.dateRangePath,
										// categoryId: state?.categoryId,
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
				CategoryId: _categoryId,
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

	// const breadCrumb = (
	// 	<BreadCrumb>
	// 		<BreadCrumb.Item isOpen={false}>
	// 			<Link to={`/${path.betList.root}`}>{i18n.lbl_QuickPick}</Link>
	// 		</BreadCrumb.Item>
	// 		<BreadCrumb.Item isOpen={false}>
	// 			<Link to={`/${path.betList.root}/${state?.dateRangePath.path}`}>
	// 				{i18n[state?.dateRangePath.displayKey]}
	// 			</Link>
	// 		</BreadCrumb.Item>
	// 		<BreadCrumb.Item isOpen={false}>
	// 			<Link
	// 				to={`/${path.betList.root}/${state?.dateRangePath.path}/${state?.selDate}`}>
	// 				{i18n.lbl_ByDay}
	// 			</Link>
	// 		</BreadCrumb.Item>
	// 		<BreadCrumb.Item isOpen={true}>
	// 			<Link
	// 				to={`/${path.betList.root}/${state?.dateRangePath.path}/${state?.selDate}/categoryId${state?.categoryId}`}>
	// 				{i18n.lbl_Category}
	// 			</Link>
	// 		</BreadCrumb.Item>
	// 	</BreadCrumb>
	// );

	return datas !== null && nextPage === false ? (
		<>
			{/* {breadCrumb} */}
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
						{`${i18n.lbl_Total} ${i18n.lbl_Turnover}`}：
						{number_format(totalTurnover, _isConvert)}
					</div>
					<div className="total">
						{`${i18n.lbl_Total} ${i18n.lbl_WinLoss}`}：
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
					<span className="title">{i18n.lbl_TypeName}</span>
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
					<span className="title">{i18n.lbl_WinLoss}</span>
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
