import React, { useEffect, useState, useContext, useRef } from "react";
import { i18nContext, popBoxContext, msgCountContext } from "Context";
import moment from "moment";
import PropTypes from "prop-types";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import api from "../../service/api";

import AUTO_FETCHING_DATA from "../../service/autoFetchingData";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setMsgCount } = useContext(msgCountContext);
	const [getMsgList, setGetMsgList] = useState([]);
	const [getMsgContent, setGetMsgContent] = useState([]);
	const [openContentState, setOpenContentState] = useState(null);
	const [checkboxListState, setcheckboxListState] = useState([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);

	AUTO_FETCHING_DATA(
		api.account.GetMsgList,
		{},
		pageInfo,
		setGetMsgList,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		true
	);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		isMountedRef.current = true;
		setLoading(true);
		api.account.GetMsgList({ PageNumber: 1 }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							setGetMsgList(data);

							if (res.data.totalPages >= res.data.pageNumber) {
								setPageInfo(() => ({
									totalPages: res.data.totalPages,
									pageNumber: res.data.pageNumber
								}));
							}
						}
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
	}, [i18n.lbl_ImportantNote, i18n.msg_ApiServerError, setPopBox]);

	const GetMsgList = () => {
		if (!processing) {
			setProcessing(true);
			api.account.GetMsgList({ PageNumber: 1 }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								setGetMsgList(data);
								if (
									res.data.totalPages >= res.data.pageNumber
								) {
									setPageInfo(() => ({
										totalPages: res.data.totalPages,
										pageNumber: res.data.pageNumber
									}));
								}
							}
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
						setProcessing(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		}
	};

	const openContent = (id, flag) => {
		if (!processing) {
			setProcessing(true);

			if (openContentState === id) {
				setOpenContentState(null);
				setProcessing(false);
			} else {
				api.account.GetMsgContent(id).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								const { data } = res.data;
								setGetMsgContent(data);

								if (!flag) {
									setGetMsgList(prevState => {
										return prevState.map(x => {
											if (x.id === id) {
												x.flag = true;
											}
											return x;
										});
									});

									api.account.GetMsgCount().then(
										resCount => {
											if (isMountedRef.current) {
												if (
													resCount.data.errorCode ===
													0
												) {
													setMsgCount(
														resCount.data.data
													);
												} else {
													setPopBox({
														isOpen: true,
														title:
															i18n.lbl_ImportantNote,
														content:
															resCount.data
																.message
													});
												}
											}
										},
										err => {
											if (isMountedRef.current) {
												setPopBox({
													isOpen: true,
													title:
														i18n.lbl_ImportantNote,
													content:
														i18n.msg_ApiServerError
												});
											}
										}
									);
								}
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
							setProcessing(false);
							setOpenContentState(id);
						}
					},
					err => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
							setProcessing(false);
						}
					}
				);
			}
		}
	};

	const checkboxHandler = item => {
		const currIds = checkboxListState.includes(item.id)
			? checkboxListState.filter(_item => _item !== item.id)
			: [...checkboxListState, item.id];
		setcheckboxListState(currIds);
		setIsSelectedAll(currIds.length === getMsgList.length);
	};

	const selectAll = () => {
		const allId = getMsgList.map(item => {
			return item.id;
		});
		if (checkboxListState.length === getMsgList.length) {
			setcheckboxListState([]);
			setIsSelectedAll(false);
		} else {
			setcheckboxListState(allId);
			setIsSelectedAll(true);
		}
	};

	const delMsg = () => {
		const DelMsg = () => {
			api.account.DelMsg(checkboxListState).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setGetMsgList(prevState =>
								prevState.filter(m => {
									return !checkboxListState.includes(m.id);
								})
							);
							setcheckboxListState([]);
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
			setPopBox({ isOpen: false });
		};

		const closePopBox = () => {
			setPopBox({ isOpen: false });
		};

		if (checkboxListState.length !== 0) {
			setPopBox({
				isOpen: true,
				title: "",
				content: i18n.lbl_CheckConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={closePopBox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="orange" onClick={DelMsg}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const arr = getMsgList?.map(item => {
		const _open = openContentState === item.id;
		const _checked = checkboxListState.includes(item.id);

		return (
			<Item
				key={`msgList-${item.id}`}
				showDate={item.createTime}
				title={item.title}
				onClick={openContent.bind(null, item.id, item.flag)}
				content={getMsgContent.content}
				isOpen={_open}
				isRead={item.flag}
				onChange={checkboxHandler.bind(null, item)}
				isChecked={_checked}
			/>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="functionList">
				<label className="checkbox">
					<input type="checkbox" onChange={selectAll} />
					<i
						className={`icon icon-checkbox ${
							isSelectedAll ? "open" : ""
						}`}
					/>
					{i18n.lbl_SelectAll}
				</label>
				<div className="smallBtn-group">
					<button
						className="icon icon-bin clickBtn"
						onClick={delMsg}
					/>
					<ReloadSpin func={GetMsgList} />
				</div>
			</div>
			{getMsgList.length > 0 ? (
				arr
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			)}
		</>
	);
};

const Item = props => {
	return (
		<div className={`account ${props.isRead ? " read" : ""}`}>
			<div className="info">
				<label className="checkbox">
					<input type="checkbox" onChange={props.onChange} />
					<i
						className={`icon icon-checkbox${
							props.isChecked ? " open" : ""
						}`}
					/>
				</label>
				<div className="introduction">
					<span className="title">{props.title}</span>
					<span>
						{moment(props.showDate).format("MM/DD/YYYY h:mm:ss A")}
					</span>
				</div>
				<button
					className={`icon icon-circle-right ${
						props.isOpen ? " open" : ""
					}`}
					onClick={props.onClick}
				/>
			</div>
			<div className={`content ${props.isOpen ? " open" : ""}`}>
				<pre>{props.content}</pre>
			</div>
		</div>
	);
};

Item.defaultProps = {
	isRead: false,
	isChecked: false,
	isOpen: false,
	content: ""
};

Item.propTypes = {
	onChange: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	isRead: PropTypes.bool,
	isChecked: PropTypes.bool,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	content: PropTypes.string,
	showDate: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired
};

export default Panel;
