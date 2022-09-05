import React, { useEffect, useState, useContext, useRef } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "@reach/router";
import {
	i18nContext,
	popBoxContext,
	msgCountContext,
	userInfoContext
} from "../common/context";
import {
	api_GetMsgList,
	api_GetMsgContent,
	api_DelMsg,
	api_GetMsgCount
} from "../../service/api/account";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import Layout from "../common/layout";
import TabPage from "../common/tabPage";
import path from "../../path";

const defTabs = {
	default: {
		to: `/${path.message.root}`,
		displayKey: "lbl_PersonalMsg"
	},
	announcement: {
		to: `/${path.announcement.root}`,
		displayKey: "lbl_Announcement"
	}
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setMsgCount } = useContext(msgCountContext);
	const { userInfo } = useContext(userInfoContext);
	const location = useLocation();
	const showMessageRef = useRef(null);
	const navigate = useNavigate();
	const [msgList, setMsgList] = useState([]);
	const [getMsgContent, setGetMsgContent] = useState([]);
	const [openContentState, setOpenContentState] = useState(null);
	const [checkboxList, setcheckboxList] = useState([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const isMountedRef = useRef(null);

	AUTO_FETCHING_DATA(
		api_GetMsgList,
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
		if (
			location?.state?.pageNumber > 1 &&
			!location?.state?.popupShowed &&
			showMessageRef.current
		) {
			showMessageRef.current?.scrollIntoView({
				behavior: "smooth"
			});
			location.state.popupShowed = true;
		}
	}, [getMsgContent, showMessageRef]);

	useEffect(() => {
		isMountedRef.current = true;
		setLoading(true);

		if (userInfo.isLogin) {
			GetMsgList({
				pageNumber: location?.state?.pageNumber
			});
		} else {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin, location.state]);

	const GetMsgList = ({ pageNumber }) => {
		if (!processing) {
			setProcessing(true);
			api_GetMsgList({
				PageNumber: 1,
				PageSize: pageNumber ? pageNumber * 5 : 5
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								setMsgList(data);
								const msg = data.find(
									el => el.id === location.state.id
								);
								if (pageNumber && msg) {
									if (
										openContentState !== location.state.id
									) {
										openContent(
											location.state.id,
											msg.flag,
											msg.isBatch
										);
									}

									setPageInfo(() => ({
										totalPages: res.data.totalPages,
										pageNumber
									}));
								} else if (
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
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
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

	const openContent = (id, flag, isBatch) => {
		if (!processing) {
			setProcessing(true);

			if (openContentState === id) {
				setOpenContentState(null);
				setProcessing(false);
			} else {
				api_GetMsgContent(id, isBatch ? 1 : 0).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								const { data } = res.data;
								setGetMsgContent(data);

								if (!flag) {
									setMsgList(prevState => {
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
														content: `[${response.data.errorCode}] ${response.data.message}`
													});
												}
											}
										},
										() => {
											if (isMountedRef.current) {
												setPopBox({
													isOpen: true,
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
									content: `[${res.data.errorCode}] ${res.data.message}`
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
		const currIds = checkboxList.find(el => el.id === item.id)
			? checkboxList.filter(_item => _item.id !== item.id)
			: [...checkboxList, item];
		setcheckboxList(currIds);
		setIsSelectedAll(currIds.length === msgList.length);
	};

	const selectAll = () => {
		if (checkboxList.length === msgList.length) {
			setcheckboxList([]);
			setIsSelectedAll(false);
		} else {
			setcheckboxList(msgList);
			setIsSelectedAll(true);
		}
	};

	const delMsg = () => {
		const DelMsg = () => {
			const delList = checkboxList.map(el => ({
				msgId: el.id,
				isBatch: el.isBatch
			}));
			api_DelMsg(delList).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setMsgList(prevState =>
								prevState.filter(m => {
									return !checkboxList.find(
										el => el.id === m.id
									);
								})
							);
							setcheckboxList([]);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
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

	const arr = msgList?.map(item => {
		const _open = openContentState === item.id;
		const _checked = checkboxList.some(el => el.id === item.id);

		return (
			<Item
				key={`msgList-${item.id}`}
				showDate={item.createTime}
				title={item.title}
				onClick={openContent.bind(
					null,
					item.id,
					item.flag,
					item.isBatch
				)}
				content={getMsgContent.content}
				isOpen={_open}
				isRead={item.flag}
				onChange={checkboxHandler.bind(null, item)}
				isChecked={_checked}
				showMessageRef={showMessageRef}
			/>
		);
	});

	if (loading) return <Loading />;

	return (
		<Layout title={i18n.lbl_Message} mainClass="main Message">
			<TabPage defTabs={defTabs}>
				<div className="functionList">
					<label className="checkbox">
						<input
							type="checkbox"
							data-testid="selectAll"
							onChange={selectAll}
						/>
						<i
							className={`icon icon-checkbox ${
								isSelectedAll ? "open" : ""
							}`}
						/>
						{i18n.lbl_SelectAll}
					</label>
					<div className="smallBtn-group">
						<button
							data-testid="deleteMsg"
							className="icon icon-bin clickBtn"
							onClick={delMsg}
						/>
						<ReloadSpin func={GetMsgList} />
					</div>
				</div>
				{msgList.length > 0 ? (
					arr
				) : (
					<div className="not-found">{i18n.msg_NoData}</div>
				)}
			</TabPage>
		</Layout>
	);
};

const Item = props => (
	<div
		ref={props.showMessageRef}
		data-testid="isRead"
		className={`account ${props.isRead ? " read" : ""}`}>
		<div className="info">
			<label className="checkbox">
				<input
					data-testid="msgChkbox"
					type="checkbox"
					onChange={props.onChange}
				/>
				<i
					data-testid="checkIcon"
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
				data-testid="openBtn"
				className={`icon icon-circle-right ${
					props.isOpen ? " open" : ""
				}`}
				onClick={props.onClick}
			/>
		</div>
		<div
			data-testid="msgCard"
			className={`content backstage${props.isOpen ? " open" : ""}`}
			// eslint-disable-next-line
			dangerouslySetInnerHTML={{ __html: props.content }}
		/>
	</div>
);

Item.defaultProps = {
	isRead: null,
	isChecked: null,
	isOpen: null,
	showMessageRef: null,
	content: ""
};

Item.propTypes = {
	isRead: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	isChecked: PropTypes.bool,
	title: PropTypes.string.isRequired,
	showDate: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	showMessageRef: PropTypes.objectOf(PropTypes.any),
	content: PropTypes.string
};

export default Panel;
