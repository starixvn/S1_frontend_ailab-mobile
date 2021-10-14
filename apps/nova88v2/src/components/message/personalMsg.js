import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	popBoxContext,
	msgCountContext,
	loadingContext,
	userInfoContext
} from "Context";
import ReloadSpin from "../common/reloadSpin";
import GoTopBtn from "../common/goTopBtn";
import api from "../../service/api";
import Detail from "./personalMsg.detail";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";

const Panel = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setMsgCount } = useContext(msgCountContext);
	const { setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const [msgList, setMsgList] = useState([]);
	const [msgContent, setMsgContent] = useState([]);
	const [openContentState, setOpenContentState] = useState(null);
	const [checkboxList, setCheckboxList] = useState([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);

	AUTO_FETCHING_DATA(
		api.account.GetMsgList,
		{},
		pageInfo,
		setMsgList,
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
		if (userInfo.isLogin) {
			GetMsgList({ loading: true });
		} else {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin]);

	const GetMsgList = ({ loading }) => {
		if (!processing) {
			if (loading) {
				setLoading(true);
			}
			setProcessing(true);
			api.account.GetMsgList({ PageNumber: 1 }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								setMsgList(data);
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
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
						setLoading(false);
						setProcessing(false);
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
								setMsgContent(data);

								if (!flag) {
									setMsgList(prevState => {
										return prevState.map(x => {
											if (x.id === id) {
												x.flag = true;
											}
											return x;
										});
									});

									getMsgCount();
								}
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: `[${res.data.errorCode}]${res.data.message}`
								});
							}
							setProcessing(false);
							setOpenContentState(id);
						}
					},
					() => {
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

	const getMsgCount = () => {
		api.account.GetMsgCount().then(
			resCount => {
				if (isMountedRef.current) {
					if (resCount.data.errorCode === 0) {
						setMsgCount(resCount.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${resCount.data.errorCode}]${resCount.data.message}`
						});
					}
				}
			},
			() => {
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

	const checkboxHandler = item => {
		const currIds = checkboxList.includes(item.id)
			? checkboxList.filter(_item => _item !== item.id)
			: [...checkboxList, item.id];
		setCheckboxList(currIds);
		setIsSelectedAll(currIds.length === msgList.length);
	};

	const selectAll = () => {
		const allId = msgList.map(item => {
			return item.id;
		});

		if (checkboxList.length === msgList.length) {
			setCheckboxList([]);
			setIsSelectedAll(false);
		} else {
			setCheckboxList(allId);
			setIsSelectedAll(true);
		}
	};

	const delMsg = () => {
		const DelMsg = () => {
			api.account.DelMsg(checkboxList).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setMsgList(prevState =>
								prevState.filter(m => {
									return !checkboxList.includes(m.id);
								})
							);
							setCheckboxList([]);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
					}
				},
				() => {
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
		if (checkboxList.length !== 0) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_CheckConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="white" onClick={DelMsg}>
							{i18n.lbl_Yes}
						</button>
						<button className="orange" onClick={closePopBox}>
							{i18n.lbl_No}
						</button>
					</div>
				)
			});
		}
	};

	const readSelectedMsg = () => {
		if (checkboxList.length > 0) {
			setLoading(true);
			api.account.SetMsgRead({ MsgIds: checkboxList }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setCheckboxList([]);
							getMsgCount();
							GetMsgList({ loading: false });
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
		}
	};

	const arr = msgList?.map(item => {
		const _open = openContentState === item.id;
		const _checked = checkboxList.includes(item.id);

		return (
			<Detail
				key={`msgList-${item.id}`}
				showDate={item.createTime}
				title={item.title}
				onClick={openContent.bind(null, item.id, item.flag)}
				content={msgContent.content}
				isOpen={_open}
				isRead={item.flag}
				onChange={checkboxHandler.bind(null, item)}
				isChecked={_checked}
			/>
		);
	});

	return (
		<>
			<div className="functionList">
				<label className="checkbox">
					<input
						type="checkbox"
						data-testid="selectAll"
						onChange={selectAll}
					/>
					<i
						className={`icon icon-checkbox${
							isSelectedAll ? "-checked" : ""
						}`}
					/>
					{i18n.lbl_SelectAll}
				</label>
				<div
					className={`smallBtn-group${
						checkboxList.length > 0 ? " active" : ""
					}`}>
					<button
						data-testid="readMsg"
						className="icon icon-icon32px_openmail"
						onClick={readSelectedMsg}
					/>
					<button
						className="icon icon-bin"
						data-testid="deleteMsg"
						onClick={delMsg}
					/>
					<ReloadSpin
						func={GetMsgList.bind(this, { loading: false })}
						className="icon icon-spinner11"
					/>
				</div>
			</div>
			{msgList.length > 0 ? (
				<>
					{arr}
					{msgList.length > 5 ? <GoTopBtn /> : null}
				</>
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			)}
		</>
	);
};

export default Panel;
