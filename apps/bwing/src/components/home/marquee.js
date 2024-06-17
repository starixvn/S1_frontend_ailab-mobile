import React, { Component, useContext, createRef } from "react";
import PropTypes from "prop-types";
import { Redirect } from "@reach/router";
import { api_GetAnnouncement } from "../../service/api/message";
import {
	popBoxContext,
	userInfoContext,
	navContext,
	defNavPanel,
	i18nContext
} from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import path from "../../path";

const Panel = () => {
	const { nav, setNav } = useContext(navContext);
	const { i18n } = useContext(i18nContext);

	const OpenLoginPanel = () => {
		setNav(() => {
			return defNavPanel.login;
		});
	};

	const { popBox, setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const langId = GET_LANG_ID(userInfo.langId);

	return (
		<Marquee
			nav={nav}
			OpenLoginPanel={OpenLoginPanel}
			setPopBox={setPopBox}
			userIsLogin={userInfo.isLogin}
			langId={langId}
			popBoxIsOpen={popBox.isOpen}
			i18n={i18n}
			currencyId={userInfo.currencyId}
		/>
	);
};

class Marquee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datas: [],
			pos: null,
			redirectPath: null
		};
		this.isMountedRef = false;
		this.marquee = createRef();
		this.content = createRef();
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.langId !== nextProps.langId) {
			this.GetAnnouncement(nextProps.langId, nextProps.currencyId);
		}
		return true;
	};

	componentDidMount = () => {
		this.isMountedRef = true;
		this.GetAnnouncement(this.props.langId, this.props.currencyId);
		this.intervalId = setInterval(
			this.GetAnnouncement.bind(this, this.props.langId),
			60000
		);
	};

	SetPos = () => {
		if (
			this.isMountedRef &&
			!this.props.popBoxIsOpen &&
			this.state.prev !== null
		) {
			// let style = window.getComputedStyle(this.content.current, null);
			// let outerBox = parseFloat(style.width);
			const style = window.getComputedStyle(this.marquee.current, null);
			const outerBox = parseFloat(style.width);
			this.setState(prev => {
				if (prev.pos <= -outerBox) {
					const _style = window.getComputedStyle(
						this.content.current,
						null
					);
					const contentBox = parseFloat(_style.width);
					return { pos: contentBox };
				}
				return { pos: prev.pos - 1.5 };
			});
		}
	};

	componentWillUnmount = () => {
		this.isMountedRef = false;
		clearInterval(this.intervalId);
	};

	componentDidUpdate = () => {
		if (this.state.pos === null && this.isMountedRef) {
			const style = window.getComputedStyle(this.marquee.current, null);
			const pos = parseFloat(style.width);

			this.setState({ pos: -pos });
		}
	};

	GetAnnouncement = (langId, currencyId) => {
		api_GetAnnouncement({ langId, currencyId }).then(
			res => {
				if (res.data.errorCode === 0) {
					const resData = res.data.data;
					const stateData = this.state.datas;
					let upd = false;
					if (resData?.length !== 0 && stateData.length !== 0) {
						for (const d in resData) {
							if (
								!stateData.find(
									x =>
										x.id === resData[d].id &&
										x.subject === resData[d].subject &&
										x.content === resData[d].content
								)
							) {
								upd = true;
								break;
							}
						}
					} else {
						upd = true;
					}

					if (upd) {
						if (this.intervalId_Pos === undefined) {
							this.intervalId_Pos = setInterval(this.SetPos, 25);
						}

						if (this.isMountedRef && res.data.data) {
							this.setState({
								datas: res.data.data.map(item => {
									return {
										...item,
										subject: item.subject,
										content: item.content
									};
								})
							});
						}
					}
				} else {
					this.props.setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			},
			() => {
				console.log("GetAnnouncement-api-Error");
			}
		);
	};

	ClickMarquee = item => {
		if (this.props.userIsLogin) {
			const content = item.content.split("\\n").join("　");
			const GoToAnnouncement = () => {
				this.props.setPopBox({
					isOpen: false
				});
				this.setState({
					redirectPath: `/${path.message.root}/${path.message.sub.announcement.root}`
				});
			};
			this.props.setPopBox({
				isOpen: true,
				title: item.subject,
				content,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={GoToAnnouncement}>
							{this.props.i18n.lbl_More ?? "More"}
						</button>
					</div>
				)
			});
		} else {
			this.props.OpenLoginPanel();
		}
	};

	render() {
		const rows = this.state.datas.map(item => {
			return (
				<button
					key={`announcement-${item.id}`}
					style={{ paddingLeft: "2rem" }}
					onClick={this.ClickMarquee.bind(this, item)}>
					{item.subject}
				</button>
			);
		});

		const style = this.state.pos === null ? {} : { left: this.state.pos };
		return this.state.redirectPath === null ? (
			<div className="marquee" id="Marquee">
				<div ref={this.content} className="marquee-box icon-speaker">
					<div
						className="marquee-run"
						ref={this.marquee}
						style={style}>
						{rows}
					</div>
				</div>
			</div>
		) : (
			<Redirect to={this.state.redirectPath} noThrow />
		);
	}
}

Marquee.defaultProps = {
	langId: `en`,
	userIsLogin: true,
	currencyId: null
};

Marquee.propTypes = {
	langId: PropTypes.string,
	userIsLogin: PropTypes.bool,
	currencyId: PropTypes.number
};

export default Panel;
