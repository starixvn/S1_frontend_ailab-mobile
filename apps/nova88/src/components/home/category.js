import React, { useState, useContext, Component, useEffect } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext,
	popBoxContext
} from "Context";
import { Redirect, Link } from "@reach/router";
import gameList from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";
import api from "../../service/api";
import Ambassador from "../../styles/img/ambassador.jpg";

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
		const {
			tpId,
			gameId,
			path: _path,
			needLogin,
			popBox: popBoxData
		} = gameInfo;
		const HandleLogin = () => {
			setNav(defNavPanel.login);
		};
		if (_path) {
			return needLogin && !userInfo.isLogin
				? HandleLogin()
				: setRedirect({
						redirect: true,
						path: `/${_path}`
				  });
		}
		if (popBoxData) {
			return needLogin && !userInfo.isLogin
				? HandleLogin()
				: setPopBox({
						isOpen: true,
						title: i18n[popBoxData.title],
						popBoxType: popBoxData.type,
						setRedirect
				  });
		}
		return GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: HandleLogin
		});
	};

	useEffect(() => {
		let mounted = true;

		if (userInfo.isLogin) {
			api.site.GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && mounted) {
						setShowingTpIds(res.data.data);
					}
				},
				err => {
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
		<Redirect to={`/${redirect.path}`} noThrow />
	) : (
		<CateGoryContent
			clickGame={clickGame}
			i18n={i18n}
			top={props.shortcutBarLocate?.bottom}
			showingTpIds={showingTpIds}
			userCurrencyId={userInfo.currencyId}
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

		const _productList = gameList({ langId: this.props.langId });
		_productList &&
			_productList.forEach(item => {
				this.RefItems[`${item.category}`] = {
					First: React.createRef(),
					Last: React.createRef()
				};
			});
		this.checkScrollTimer = null;
	}

	componentDidMount() {
		this.mounted = true;
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

	checkScrolling = () => {
		if (this.checkScrollTimer !== null) {
			clearTimeout(this.checkScrollTimer);
		}
		this.checkScrollTimer = setTimeout(this.ScrollBarListener, 10);
	};

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
					x.bottom >= this.props.top + 50 &&
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

	selectCategory = _category => {
		if (this.state.category !== _category) {
			this.setState({ category: _category });
		}
		const firstItem = this.RefItems[
			_category
		].First.current.getBoundingClientRect();

		const offset_y = -this.props.top;
		const y = firstItem.top + window.pageYOffset + offset_y;
		window.scrollTo({ top: y, behavior: "smooth" });
	};

	render() {
		const sideBarItems = [];
		let products = [];
		const _productList = gameList({ langId: this.props.langId });
		_productList &&
			_productList.forEach(item => {
				const _open = this.state.category === item.category;
				sideBarItems.push(
					<CategoryItem
						key={`category-${item.category}`}
						categoryIcon={item.categoryIcon}
						onClick={
							!item._blank
								? this.selectCategory.bind(null, item.category)
								: this.props.clickGame.bind(this, { ...item })
						}
						isOpen={`${_open ? " open" : ""}`}
						translation={this.props.i18n[item.translateKey]}
						subIcon={item.items.filter(
							subItem =>
								subItem.eventIcon &&
								(subItem.tpId
									? this.props.showingTpIds === null ||
									  this.props.showingTpIds.includes(
											subItem.tpId
									  )
									: true)
						)}
						eventIcon={item.eventIcon}
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
						const refItem =
							idx === 0
								? this.RefItems[item.category].First
								: idx === item.items.length - 1
								? this.RefItems[item.category].Last
								: null;
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
								spanText={this.props.i18n[subItem.spanTextKey]}
								descText={
									subItem.descTextKey
										? this.props.i18n[subItem.descTextKey]
										: ""
								}
								{...subItem}
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
							className={`${item.className}${
								_open ? " open" : ""
							}`}>
							{content}
						</div>
					);
				} else {
					products = [...products, ...content];
				}
			});

		return (
			<div className="content">
				<div className="sideBar">{sideBarItems}</div>
				<div className="gameList">{products}</div>
			</div>
		);
	}
}

const CategoryItem = props => {
	const showingEventIcon = getEventIcon({
		subIcon: props?.subIcon,
		eventIcon: props?.eventIcon
	});
	return (
		<button
			className={`icon icon-${props.categoryIcon}${props.isOpen}`}
			onClick={props.onClick}>
			<div>{props.translation}</div>
			{showingEventIcon !== "" ? (
				<i className={`icon${showingEventIcon}`} />
			) : null}
		</button>
	);
};

const ProductItem = props => {
	const showingEventIcon = getEventIcon({ eventIcon: props?.eventIcon });
	const content = props.href ? (
		<a
			href={props.href}
			target="_blank"
			rel="noreferrer"
			ref={props._ref}
			className={props.isShow ? "open" : ""}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={props.img} alt={props.icon ?? ""} />
			{props.spanText ? (
				<span className={`icon icon-${props.icon}`}>
					{props.spanText}
				</span>
			) : null}
			{props.descText ? (
				<div className={props.descClassName}>{props.descText}</div>
			) : null}
		</a>
	) : (
		<a
			onClick={props.clickGame}
			ref={props._ref}
			className={props.isShow ? "open" : ""}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={props.img} alt={props.icon ?? ""} />
			{props.spanText ? (
				<span className={`icon icon-${props.icon}`}>
					{props.spanText}
				</span>
			) : null}
			{props.descText ? (
				<div className={props.descClassName}>{props.descText}</div>
			) : null}
		</a>
	);

	return (
		<>
			{content}
			{props.addSpaceInBelow ? (
				<>
					<a className="ambassador">
						<img
							src={Ambassador}
							alt="Nova88 Brand Ambassador JOE COLE"
						/>
					</a>
					<a href="" className="space" />
				</>
			) : null}
		</>
	);
};

const ProductLinkItem = props => {
	const showingEventIcon = getEventIcon({ eventIcon: props?.eventIcon });
	return (
		<Link
			to={`/${props.to}`}
			state={props.parameter}
			ref={props._ref}
			className={props.isShow ? "open" : ""}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={props.img} alt={props.icon ?? ""} />
		</Link>
	);
};

const ComingSoonItem = props => {
	return (
		<a className={props.isShow ? "open" : ""}>
			<img src={props.img} alt="Coming Soon" />
		</a>
	);
};

const getEventIcon = ({ subIcon, eventIcon }) => {
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
