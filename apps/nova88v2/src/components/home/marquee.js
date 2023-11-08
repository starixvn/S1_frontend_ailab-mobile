import PropTypes from "prop-types";
import React, { Component, useContext, createRef } from "react";
import { useNavigate } from "@reach/router";
import { popBoxContext, userInfoContext, i18nContext } from "Context";
import path from "../../path";
import api from "../../service/api";
import { GET_LANG_ID } from "../../service/language";
import useHandleLogin from "../hook/useHandleLogin";

const Marquee = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { popBox, setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const langId = GET_LANG_ID(userInfo.langId);

	const { handleLogin } = useHandleLogin();

	return (
		<MarqueeComponent
			i18n={i18n}
			langId={langId}
			navigate={navigate}
			setPopBox={setPopBox}
			currencyId={userInfo.currencyId}
			isLogin={userInfo.isLogin}
			popBoxIsOpen={popBox.isOpen}
			handleLogin={handleLogin}
		/>
	);
};

class MarqueeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datas: [],
			pos: null
		};
		this.isMountedRef = false;
		this.marquee = createRef();
		this.content = createRef();
	}

	shouldComponentUpdate = nextProps => {
		if (this.props.langId !== nextProps.langId) {
			this.getAnnouncement(nextProps.langId, nextProps.currencyId);
		}
		return true;
	};

	componentDidMount = () => {
		this.isMountedRef = true;
		this.getAnnouncement(this.props.langId, this.props.currencyId);
		this.intervalId = setInterval(
			this.getAnnouncement.bind(this, this.props.langId),
			60000
		);
	};

	setPos = () => {
		if (
			this.isMountedRef &&
			!this.props.popBoxIsOpen &&
			this.state.prev !== null
		) {
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

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ pos });
		}
	};

	getAnnouncement = (langId, currencyId) => {
		api.message.GetAnnouncement({ langId, currencyId }).then(
			res => {
				if (res.data.errorCode === 0) {
					const resData = res.data.data;
					const stateData = this.state.datas;
					let upd = false;
					if (resData.length !== 0 && stateData.length !== 0) {
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
							this.intervalId_Pos = setInterval(this.setPos, 25);
						}

						if (this.isMountedRef) {
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
				} else if (res.data.errorCode !== 0) {
					this.props.setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			},
			() => {
				this.props.setPopBox({
					isOpen: true,
					content: this.props.i18n.msg_ApiServerError
				});
			}
		);
	};

	clickMarquee = item => {
		if (this.props.isLogin) {
			const content = item.content.split("\\n").join("　");
			const GoToAnnouncement = () => {
				this.props.setPopBox({
					isOpen: false
				});
				this.props.navigate(
					`/${this.props.langId}/${path.announcement.root}`
				);
			};
			this.props.setPopBox({
				isOpen: true,
				title: item.subject,
				content,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={GoToAnnouncement}>
							{this.props.i18n.lbl_More}
						</button>
					</div>
				)
			});
		} else {
			this.props.handleLogin();
		}
	};

	clickMore = () => {
		if (this.props.isLogin) {
			this.props.navigate(
				`/${this.props.langId}/${path.announcement.root}`
			);
		} else {
			this.props.handleLogin();
		}
	};

	render() {
		const rows = this.state.datas.map(item => {
			return (
				<button
					key={`announcement-${item.id}`}
					className="white"
					style={{ paddingLeft: "2rem" }}
					onClick={this.clickMarquee.bind(this, item)}>
					{item.subject}
				</button>
			);
		});

		const style = this.state.pos === null ? {} : { left: this.state.pos };
		return (
			<div id="Marquee">
				<div ref={this.content} className="marquee-box">
					<div
						className="marquee-run"
						ref={this.marquee}
						style={style}>
						{rows}
					</div>
				</div>
				<button className="btn-more" onClick={this.clickMore}>
					{this.props.i18n.lbl_More}
				</button>
			</div>
		);
	}
}

MarqueeComponent.defaultProps = {
	langId: `en`,
	isLogin: true,
	currencyId: null
};

MarqueeComponent.propTypes = {
	langId: PropTypes.string,
	isLogin: PropTypes.bool,
	setPopBox: PropTypes.func.isRequired,
	popBoxIsOpen: PropTypes.bool.isRequired,
	handleLogin: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	navigate: PropTypes.func.isRequired,
	currencyId: PropTypes.number
};

export { Marquee };
