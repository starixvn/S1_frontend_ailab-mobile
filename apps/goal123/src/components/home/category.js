import React, { useState, useContext, Component, useEffect } from "react";
import { Redirect, Link } from "@reach/router";
import PropTypes from "prop-types";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext,
	popBoxContext
} from "../common/context";
import productList from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { api_GetTpIds } from "../../service/api/site";
import path from "../../path";

const Category = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [redirect, setRedirect] = useState({
		redirect: false,
		path: ""
	});

	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowingTpIds] = useState(null);

	const clickGame = gameInfo => {
		const { tpId, gameId, path: _path } = gameInfo;
		if (_path) {
			setRedirect({
				redirect: true,
				path: `/${_path}`
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin === true,
				loginCallback: () => {
					setNav(defNavPanel.login);
				}
			});
		}
	};

	useEffect(() => {
		let mounted = true;

		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && mounted) {
						setShowingTpIds(res.data.data);
					}
				},
				() => {
					if (mounted) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.isLogin, i18n, setPopBox]);

	return redirect.redirect ? (
		<Redirect to={redirect.path} noThrow />
	) : (
		<CateGoryContent
			clickGame={clickGame}
			i18n={i18n}
			top={props.shortcutBarLocate?.bottom}
			showingTpIds={showingTpIds}
			userCurrencyId={userInfo.currencyId}
			setNav={setNav}
			langId={userInfo.langId}
		/>
	);
};

class CateGoryContent extends Component {
	constructor(props) {
		super(props);
		this.state = { category: "sports" };
		this.mounted = false;
		this.RefItems = {};
		this.setCategory = false;
		productList(this.props.langId).forEach(item => {
			this.RefItems[`${item.category}`] = {
				First: React.createRef(),
				Last: React.createRef()
			};
		});
		this.checkScrollTimer = null;
		this.sideBarRef = React.createRef();
	}

	componentDidMount() {
		this.mounted = true;

		window.scrollTo({ top: 0, behavior: "smooth" });
		window.addEventListener("mousewheel", this.ScrollBarListener, false);
		window.addEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		window.addEventListener("scroll", this.checkScrolling, false);
	}

	componentWillUnmount() {
		this.mounted = false;
		window.removeEventListener("mousewheel", this.ScrollBarListener, false);
		window.removeEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		window.removeEventListener("scroll", this.checkScrolling, false);
	}

	ScrollBarListener = () => {
		if (!this.setCategory) {
			this.setCategory = true;
			let currentCategory = null;
			Object.keys(this.RefItems).forEach(k => {
				const item =
					this.RefItems[k].Last.current ??
					this.RefItems[k].First.current;
				const x = item.getBoundingClientRect();
				if (
					x.bottom >=
						this.sideBarRef.current.getBoundingClientRect().bottom +
							50 &&
					currentCategory === null
				) {
					currentCategory = k;
				}
			});
			if (
				currentCategory !== null &&
				this.state.category !== currentCategory
			) {
				if (this.mounted) {
					this.setState({ category: currentCategory }, () => {
						this.setCategory = false;
					});
				}
			} else {
				this.setCategory = false;
			}
		}
	};

	checkScrolling = () => {
		if (this.checkScrollTimer !== null) {
			clearTimeout(this.checkScrollTimer);
		}
		this.checkScrollTimer = setTimeout(this.ScrollBarListener, 10);
	};

	selectCategory = _category => {
		if (this.state.category !== _category) {
			this.setState({ category: _category });
		}

		const firstItem = this.RefItems[
			_category
		]?.First.current.getBoundingClientRect();

		if (firstItem) {
			const offset_y = -this.sideBarRef.current.getBoundingClientRect()
				.bottom;
			const y = firstItem.top + window.pageYOffset + offset_y;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	showSubMenu = _category => {
		this.selectCategory(_category);
		this.props.setNav(defNavPanel.subMenu);
	};

	render() {
		const sideBarItems = [];
		let products = [];
		productList(this.props.langId).forEach(item => {
			const _open = this.state.category === item.category;
			sideBarItems.push(
				<CategoryItem
					key={`category-${item.category}`}
					onClick={
						!item._blank
							? this.selectCategory.bind(null, item.category)
							: this.props.clickGame.bind(this, { ...item })
					}
					isOpen={`${_open ? " open" : ""}`}
					translation={this.props.i18n[item.translateKey]}
					eventIcon={item.eventIcon}
					subIcon={item.items.filter(
						subItem =>
							subItem.eventIcon &&
							(subItem.tpId
								? this.props.showingTpIds === null ||
								  this.props.showingTpIds.includes(subItem.tpId)
								: true)
					)}
				/>
			);

			const content = item.items
				.filter(subItem => {
					const allowCurrency =
						this.props.userCurrencyId === null ||
						this.props.userCurrencyId === undefined ||
						subItem.allowCurrency === undefined ||
						subItem.allowCurrency.includes(
							this.props.userCurrencyId
						);

					return (
						allowCurrency &&
						(subItem.tpId
							? this.props.showingTpIds === null ||
							  this.props.showingTpIds.includes(subItem.tpId)
							: true)
					);
				})
				.map((subItem, idx) => {
					let refItem = null;
					if (idx === 0) {
						refItem = this.RefItems[item.category].First;
					} else if (idx === item.items.length - 1) {
						refItem = this.RefItems[item.category].Last;
					}
					const key = subItem.tpId
						? `home-category-product-tpId_${subItem.tpId}-gameId_${subItem.gameId}`
						: `home-category-${subItem.spanTextKey}`;
					if (subItem.parameter) {
						return (
							<ProductLinkItem
								_ref={refItem}
								isShow={!item.className && _open}
								key={key}
								to={path.casino.root}
								parameter={subItem.parameter}
								img={subItem.img}
								spanText={this.props.i18n[subItem.spanTextKey]}
								icon={subItem.icon}
								eventIcon={subItem.eventIcon}
							/>
						);
					}
					return (
						<ProductItem
							_ref={refItem}
							isShow={!item.className && _open}
							key={key}
							clickGame={this.props.clickGame.bind(this, {
								...subItem
							})}
							img={subItem.img}
							spanText={this.props.i18n[subItem.spanTextKey]}
							icon={subItem.icon}
							href={item.href}
							eventIcon={subItem.eventIcon}
						/>
					);
				});

			if (item.comingSoonImg && content.length % 2 !== 0) {
				content.push(
					<ComingSoonItem
						key={`product-${item.category}-comingsoon`}
						img={item.comingSoonImg}
					/>
				);
			}
			if (item.className) {
				products.push(
					<div
						key={`productGroup-${item.category}`}
						className={`${item.className}${_open ? " open" : ""}`}>
						{content}
					</div>
				);
			} else {
				products = [...products, ...content];
			}
		});

		return (
			<div id="content">
				<div className="menuBtn">
					<button onClick={this.showSubMenu.bind(null, "≡")}>
						<span>≡</span>
					</button>
				</div>
				<div className="sideBar" ref={this.sideBarRef}>
					{sideBarItems}
				</div>
				<div className="gameList">{products}</div>
			</div>
		);
	}
}

CateGoryContent.defaultProps = {
	userCurrencyId: null,
	showingTpIds: null
};

CateGoryContent.propTypes = {
	langId: PropTypes.string.isRequired,
	setNav: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userCurrencyId: PropTypes.number,
	showingTpIds: PropTypes.arrayOf(PropTypes.any),
	clickGame: PropTypes.func.isRequired
};

const CategoryItem = ({
	eventIcon = [],
	isOpen,
	onClick,
	translation,
	subIcon
}) => {
	const showingEventIcon = getEventIcon({ subIcon, eventIcon });
	return (
		<button
			className={`${isOpen ? "open " : ""}${`icon${
				showingEventIcon !== "" ? showingEventIcon : ""
			}`}`}
			onClick={onClick}>
			<div>{translation?.toUpperCase()}</div>
		</button>
	);
};

CategoryItem.defaultProps = {
	eventIcon: [],
	translation: "",
	subIcon: []
};

CategoryItem.propTypes = {
	eventIcon: PropTypes.arrayOf(PropTypes.any),
	isOpen: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	translation: PropTypes.string,
	subIcon: PropTypes.arrayOf(PropTypes.any)
};

const ProductItem = ({
	href,
	clickGame,
	_ref,
	isShow,
	img,
	icon,
	spanText,
	eventIcon
}) => {
	const showingEventIcon = getEventIcon({ eventIcon });
	return (
		<a
			href={href}
			target={href ? "_blank" : null}
			onClick={!href ? clickGame : null}
			ref={_ref}
			className={`${isShow ? "open " : ""}${
				eventIcon ? `icon${showingEventIcon}` : ""
			}`}>
			<img src={img} alt={icon ?? ""} />
			{spanText ? (
				<span className={`icon icon-${icon}`}>{spanText}</span>
			) : null}
		</a>
	);
};

ProductItem.defaultProps = {
	href: null,
	_ref: null,
	isShow: false,
	icon: "",
	spanText: "",
	eventIcon: []
};

ProductItem.propTypes = {
	href: PropTypes.string,
	clickGame: PropTypes.func.isRequired,
	_ref: PropTypes.objectOf(PropTypes.any),
	isShow: PropTypes.bool,
	img: PropTypes.string.isRequired,
	icon: PropTypes.string,
	spanText: PropTypes.string,
	eventIcon: PropTypes.arrayOf(PropTypes.any)
};

const ProductLinkItem = ({
	to,
	parameter,
	_ref,
	isShow,
	img,
	icon,
	spanText,
	className = "",
	eventIcon
}) => {
	const showingEventIcon = getEventIcon({ eventIcon });
	return (
		<Link
			to={`/${to}`}
			state={parameter}
			ref={_ref}
			className={`${className}${isShow ? " open" : ""}${
				showingEventIcon !== "" ? ` icon ${showingEventIcon}` : ""
			}`}>
			<img src={img} alt={icon ?? ""} />
			{spanText ? (
				<span className={`icon icon-${icon}`}>{spanText}</span>
			) : null}
		</Link>
	);
};

ProductLinkItem.defaultProps = {
	parameter: {},
	_ref: null,
	isShow: null,
	icon: "",
	spanText: "",
	className: "",
	eventIcon: []
};

ProductLinkItem.propTypes = {
	to: PropTypes.string.isRequired,
	parameter: PropTypes.objectOf(PropTypes.number),
	_ref: PropTypes.objectOf(PropTypes.any),
	isShow: PropTypes.bool,
	img: PropTypes.string.isRequired,
	icon: PropTypes.string,
	spanText: PropTypes.string,
	className: PropTypes.string,
	eventIcon: PropTypes.arrayOf(PropTypes.any)
};

const ComingSoonItem = ({ isShow, img }) => {
	return (
		<a className={isShow ? "open" : ""}>
			<img src={img} alt="Coming Soon" />
		</a>
	);
};

ComingSoonItem.defaultProps = {
	isShow: null
};

ComingSoonItem.propTypes = {
	isShow: PropTypes.bool,
	img: PropTypes.string.isRequired
};

export const getEventIcon = ({ subIcon, eventIcon }) => {
	let showingEventIcon = "";
	let eventIconList = eventIcon ?? [];

	if (subIcon?.length > 0) {
		const categoryIdx = subIcon.findIndex(obj =>
			obj?.eventIcon.find(item => item.inPeriod === true)
		);
		eventIconList =
			categoryIdx === -1 ? [] : subIcon[categoryIdx].eventIcon;
	}
	const eventInPeriodObj = eventIconList.find(item => item.inPeriod === true);
	showingEventIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";

	return showingEventIcon;
};

export default Category;
