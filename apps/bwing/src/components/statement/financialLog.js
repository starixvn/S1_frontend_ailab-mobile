import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Redirect } from "@reach/router";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetStatement } from "../../service/api/payment";
import { number_format } from "../common/common";
import HistoryFilter from "../common/historyFilter";
import ReloadSpin from "../common/reloadSpin";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import Loading from "../common/loading";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickSubmit, setClickSubmit] = useState(false);
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin, setRedirectPath]);

	AUTO_FETCHING_DATA(
		api_GetStatement,
		filterData,
		pageInfo,
		setGetHistoryState,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const submitHandler = (startDay, endDay, isUnix) => {
		setLoading(true);

		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDay).unix(),
					EndDate: moment(endDay).endOf("day").unix()
				};
				setFilterData(transactionData);
			} else {
				transactionData = {
					StartDate: moment(startDay).zone("+07:00").unix(),
					EndDate: moment(endDay).endOf("day").zone("+07:00").unix()
				};
				setFilterData(transactionData);
			}

			setClickSubmit(true);
			api_GetStatement({
				...transactionData,
				PageNumber: 1
			}).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}] ${message}`
							});
						} else {
							setGetHistoryState(response.data.data);
							if (
								response.data.totalPages >=
								response.data.pageNumber
							) {
								setPageInfo(() => ({
									totalPages: response.data.totalPages,
									pageNumber: response.data.pageNumber
								}));
							}
						}

						setProcessing(false);
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});

						setProcessing(false);
						setLoading(false);
					}
				}
			);
		}
	};

	const arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`financial log-${item.refTransId}-${item.createTime}`}
				createTime={item.createTime}
				typeName={item.typeName}
				changeAmount={item.changeAmount}
				beforeAmount={item.beforeAmount}
				afterAmount={item.afterAmount}
				direction={item.direction === 1 ? "+" : "-"}
				refTransId={item.refTransId}
				i18n={i18n}
				className="info infoBlack"
			/>
		);
	});

	const history = getHistoryState ? (
		<>
			<div className="textArea" style={{ padding: "2vw 0 4vw 2vw" }}>
				{i18n.msg_AmountFormatTip}
			</div>
			<div className="recent open">
				<div className="recentTransactions">
					<ReloadSpin
						func={submitHandler.bind(
							this,
							filterData?.StartDate,
							filterData?.EndDate,
							true
						)}
					/>
				</div>
				{getHistoryState.length > 0 ? (
					<div className="infoList">{arr}</div>
				) : (
					<div className="not-found">
						<i className="icon icon-warning" />
						<p>{i18n.msg_NoData}</p>
					</div>
				)}
			</div>
		</>
	) : null;

	return redirectPath !== null ? (
		<Redirect to="/" noThrow />
	) : (
		<div className="depositBox">
			<HistoryFilter submitHandler={submitHandler} statement={true} />
			{loading ? <Loading /> : history}
		</div>
	);
};

const TransactionHistory = props => {
	return (
		<div className={props.className}>
			<ul>
				<li>
					<span className="title">
						{props.i18n.lbl_Date} (+07:00)
					</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">
						{props.i18n.lbl_Time} (+07:00)
					</span>
					<span>
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone("+07:00")
							.format("hh:mm:ss A")}
					</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_TypeName}</span>
					<span>{props.typeName}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_ChangeAmount}</span>
					<span>
						{props.direction}
						{number_format(props.changeAmount, false)}
					</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_BeforeAmount}</span>
					<span>{number_format(props.beforeAmount, false)}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_AfterAmount}</span>
					<span>{number_format(props.afterAmount, false)}</span>
				</li>
				<li>
					<span className="title">{props.i18n.lbl_RefTransId}</span>
					<span>{props.refTransId}</span>
				</li>
			</ul>
			<div className="btn-group" />
		</div>
	);
};

TransactionHistory.defaultProps = {
	i18n: null,
	className: null,
	createTime: null,
	typeName: null,
	beforeAmount: null,
	afterAmount: null,
	changeAmount: null,
	refTransId: null,
	direction: null
};

TransactionHistory.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	className: PropTypes.string,
	createTime: PropTypes.string,
	typeName: PropTypes.string,
	beforeAmount: PropTypes.number,
	afterAmount: PropTypes.number,
	changeAmount: PropTypes.number,
	refTransId: PropTypes.string,
	direction: PropTypes.string
};

export default IndexPage;
