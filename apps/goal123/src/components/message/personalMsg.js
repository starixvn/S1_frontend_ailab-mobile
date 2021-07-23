import React, { useEffect, useState, useContext, useRef } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext, msgCountContext } from "../common/context";
import {
	api_GetMsgList,
	api_GetMsgContent,
	api_DelMsg,
	api_GetMsgCount
} from "../../service/api/account";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import { stringLinkify } from "../common/common";

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
		api_GetMsgList,
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
		api_GetMsgList({ PageNumber: 1 }).then(
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
			api_GetMsgList({ PageNumber: 1 }).then(
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
				api_GetMsgContent(id).then(
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

									api_GetMsgCount().then(
										response => {
											if (isMountedRef.current) {
												if (
													response.data.errorCode ===
													0
												) {
													setMsgCount(
														response.data.data
													);
												} else {
													setPopBox({
														isOpen: true,
														title:
															i18n.lbl_ImportantNote,
														content:
															response.data
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
			api_DelMsg(checkboxListState).then(
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
						<button className="darkGray" onClick={closePopBox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="lightBlue" onClick={DelMsg}>
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

	return (
		<>
			{loading ? (
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
						<>{arr}</>
					) : (
						<div className="not-found">{i18n.msg_NoData}</div>
					)}
				</>
			)}
		</>
	);
};

const Item = props => {
	const hasLink =
		props.content?.includes("http://") ||
		props.content?.includes("https://");
	const linkContent = hasLink ? stringLinkify(props.content) : "";

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
			{hasLink ? (
				<div
					className={`content ${props.isOpen ? " open" : ""}`}
					dangerouslySetInnerHTML={{ __html: linkContent }}
				/>
			) : (
				<div className={`content ${props.isOpen ? " open" : ""}`}>
					<pre>{props.content}</pre>
				</div>
			)}
		</div>
	);
};

Item.defaultProps = {
	isRead: null,
	isChecked: null,
	isOpen: null
};

Item.propTypes = {
	isRead: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	isChecked: PropTypes.bool,
	title: PropTypes.string.isRequired,
	showDate: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired
};

export default Panel;
