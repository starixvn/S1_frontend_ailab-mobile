import React, { useContext, useEffect, useState } from "react";
import {
	userInfoContext,
	popBoxContext,
	i18nContext,
	loadingContext
} from "Context";
import PropTypes from "prop-types";
import moment from "moment";
import Loading from "../common/loading";
import api from "../../service/api";
import GoTopBtn from "../common/goTopBtn";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [getAnnouncement, setGetAnnouncement] = useState([]);
	const [selectItemState, setSelectItemState] = useState(null);

	useEffect(() => {
		const mounted = true;
		if (mounted) {
			setLoading(true);
		}

		api.message.GetAnnouncement(userInfo.langId).then(res => {
			if (mounted) {
				if (res.data.errorCode === 0) {
					const { data } = res.data;
					if (mounted) {
						setGetAnnouncement(data);
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
		});
	}, [
		i18n.lbl_ImportantNote,
		i18n.msg_ApiServerError,
		setPopBox,
		userInfo.langId
	]);

	const openItem = id => {
		if (selectItemState === id) {
			setSelectItemState(null);
		} else {
			setSelectItemState(id);
		}
	};

	const arr = getAnnouncement?.map(item => {
		const _open = selectItemState === item.id;
		return (
			<Item
				key={`announcement-${item.id}`}
				showTime={item.startTime}
				subject={item.subject}
				content={item.content}
				onClick={openItem.bind(null, item.id)}
				isOpen={_open}
			/>
		);
	});

	return (
		<>
			<div className="functionList" />
			{getAnnouncement.length > 0 ? (
				<>
					{arr}
					<GoTopBtn />
				</>
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
		<div className={`account${props.isOpen ? " active" : ""}`}>
			<div className="info">
				<div className="introduction">
					<span className="title">{props.subject}</span>
					<span>{moment(props.showTime).format("MM/DD/YYYY")}</span>
				</div>
				<button
					data-testid="displayBtn"
					className={`icon icon-keyboard_arrow_down${
						props.isOpen ? " active" : ""
					}`}
					onClick={props.onClick}
				/>
			</div>
			<div className="content">
				<pre>{props.content}</pre>
			</div>
		</div>
	);
};

Item.defaultProps = {
	isOpen: false,
	content: ""
};

Item.propTypes = {
	subject: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	content: PropTypes.string,
	showTime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired
};

export default Panel;
