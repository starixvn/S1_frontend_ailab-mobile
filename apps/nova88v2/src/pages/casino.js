import React, { useContext, createRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "Context";
import Slider from "../components/casino/slider";
import defNav from "../components/casino/defNav";
import Nav from "../components/casino/nav";
import SearchBox from "../components/casino/searchBox";
import GameProviders from "../components/casino/gameProviders";
import Games from "../components/casino/games";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";
import api from "../service/api";
import Header from "../components/header/header";
import Footer from "../components/common/footer";
import useHandleLogin from "../components/hook/useHandleLogin";
import { Link } from "../route/link";
import path from "../path";
import { useGotoGame, defSpecialSetting } from "../components/hook/useGotoGame";
import { GetMetaDataByPage } from "../components/seo/seo";
import useSetTimeout from "../components/hook/useSetTimeout";
import gameList, { defSlotTpGameType } from "../datas/productList";
import { GetCurrencyName } from "../components/common/common";

const eachPageItem = 20;

class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.trigger = false;
		this.state = {
			tpList: {},
			hasMore: true,
			displayedCount: 0,
			displayGames: null,
			selGameInfo: null,
			gameDatas: null,
			searchInfo: {
				searchText: "",
				gameType: { idx: 0, value: null }
			},
			favorite: [],
			selNav: Object.keys(defNav)?.[props.selNavIdx],
			selProvider: props.tpId,
			imgUrl: "",
			listFixed: false,
			sorted: []
		};
		this.gameList = createRef(null);
	}

	componentDidMount() {
		this.mounted = true;

		window.addEventListener("mousewheel", this.ScrollBarListener, false);
		window.addEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});

		window.addEventListener("wheel", this.setListFixed, false);
		window.addEventListener("touchmove", this.setListFixed, {
			passive: false
		});

		const sort = [];

		api.site.GetGameListByDevice().then(res => {
			if (res.data.errorCode === 0) {
				const _tpList = {};
				const games = [];

				const { imgUrl, providerList } = res.data.data;
				providerList?.forEach(t => {
					_tpList[t.value] = { ...t };
					if (t.gameList?.data) {
						t.gameList.data.forEach(g => {
							games.push({
								tpId: t.value,
								...g
							});
						});
					}
				});

				if (games.length) {
					for (let i = 0; i < games.length; i++) {
						const idx = Math.floor(Math.random() * games.length);
						const tempEle1 = games[i];
						const tempEle2 = games[idx];

						games[i] = tempEle2;
						games[idx] = tempEle1;
					}
				}

				if (this.mounted) {
					const nav = this.props.selNav ?? defNav.FEATURED.key;
					const _tplistArr = Object.keys(_tpList);

					gameList({
						langId: this.props.userInfo.langId ?? "en",
						currencyName: GetCurrencyName({
							langId: this.props.userInfo.langId ?? "en",
							i18n: this.props.i18n
						})
					}).forEach(el => {
						if (el.category === "slot") {
							el.items.forEach(game => {
								if (
									_tplistArr.indexOf(game.tpId.toString()) >
									-1
								) {
									if (game.tpId === this.props.tpId) {
										sort.unshift(game);
									} else if (game.providerImgName) {
										sort.push(game);
									}
								}
							});
						}
					});

					if (!this.props.fromModal) {
						this.setState(
							{
								sorted: sort,
								tpList: _tpList,
								gameDatas: games,
								selProvider: this.props.tpId,
								selNav: nav ?? 0,
								imgUrl
							},
							() => {
								this.SetMoreItems();
							}
						);
					} else {
						const {
							selGameInfo,
							selProvider,
							searchText,
							selGameType,
							selNav
						} = JSON.parse(localStorage.getItem("prevScreen")) || {
							selGameInfo: null,
							selNav: Object.keys(defNav)?.[
								this.props.selNavIdx ?? 0
							],
							selProvider: this.props.tpId,
							selGameType: { idx: 0, value: null },
							searchText: ""
						};

						this.setState(
							{
								selGameInfo,
								selProvider,
								searchInfo: {
									searchText,
									gameType: selGameType
								},
								selNav,
								sorted: sort,
								tpList: _tpList,
								gameDatas: games,
								imgUrl
							},
							() => {
								this.SetMoreItems();
							}
						);
					}
				}
			}
		});
		if (this.props.userInfo.isLogin) {
			api.account.GetFavoriteGame().then(res => {
				if (res.data.errorCode === 0 && res.data.data) {
					const fav = res.data.data.map(f => {
						return `${f.providerId}_${f.gameId}`;
					});
					if (this.mounted) {
						this.setState({ favorite: fav });
					}
				}
			});
		}
	}

	ScrollBarListener = () => {
		const window_height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;

		const window_scrollTop =
			document.body.scrollTop ||
			window.pageYOffset ||
			document.documentElement.scrollTop;

		const { body } = document;
		const html = document.documentElement;

		const document_height =
			Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			) * 0.8;

		if (
			!this.trigger &&
			window_height + window_scrollTop >= document_height
		) {
			this.trigger = true;
			this.SetMoreItems();
		}
	};

	setListFixed = () => {
		const gameListTop = this.gameList.current.getBoundingClientRect().top;
		if (gameListTop >= 200) {
			this.setState({ listFixed: false });
		} else {
			this.setState({ listFixed: true });
		}
	};

	componentWillUnmount = () => {
		this.mounted = false;
		window.removeEventListener("mousewheel", this.ScrollBarListener);
		window.removeEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		window.removeEventListener("wheel", this.setListFixed);
		window.removeEventListener("touchmove", this.setListFixed, {
			passive: false
		});
	};

	SetFavorite = (tpId, gameId) => {
		const key = `${tpId}_${gameId}`;
		const isRemove = this.state.favorite?.includes(key);
		const newFav = isRemove
			? this.state.favorite?.filter(f => f !== key)
			: [...this.state.favorite, key];
		const displayGames =
			isRemove && this.state.selNav === defNav.FAVOURITE.key
				? this.state.displayGames.filter(
						g => !(g.tpId === tpId && g.gameId === gameId)
				  )
				: this.state.displayGames;
		if (this.mounted) {
			this.setState({ favorite: newFav, displayGames });
		}
		if (this.props.userInfo.isLogin) {
			api.account.SetFavoriteGame(tpId, gameId, isRemove);
		}
	};

	SelectNav = navKey => {
		if (this.state.selNav !== navKey) {
			this.setState(
				{
					selNav: navKey,
					displayGames: null,
					hasMore: true,
					displayedCount: 0
				},
				() => {
					this.SetMoreItems();
				}
			);
		}
	};

	SelectProvider = key => {
		this.setState(
			prevState => ({
				selProvider: prevState.selProvider !== key ? key : null,
				displayGames: null,
				hasMore: true,
				displayedCount: 0
			}),
			() => {
				this.SetMoreItems();
			}
		);
	};

	CloseSelGame = () => {
		if (this.mounted) {
			this.setState({ selGameInfo: null });
		}
		localStorage.removeItem("prevScreen");
	};

	SelectGame = (tpId, gameInfo) => {
		if (this.state.selGameInfo === null && this.mounted) {
			this.setState({
				selGameInfo: { tpId, ...gameInfo }
			});
		}
	};

	matchKeyword = (name, _keyword) => {
		const keyword = _keyword.toLowerCase();
		return (
			Object.keys(name)?.filter(key => {
				return name[key].toLowerCase().indexOf(keyword) !== -1;
			}).length > 0
		);
	};

	EditSearchField = (colName, v) => {
		if (
			JSON.stringify(this.state.searchInfo[colName]) !== JSON.stringify(v)
		) {
			const newData = {
				...this.state.searchInfo,
				[colName]: v
			};

			if (this.mounted) {
				this.setState(
					{
						searchInfo: newData,
						displayGames: [],
						hasMore: true,
						displayedCount: 0
					},
					() => {
						this.SetMoreItems();
					}
				);
			}
		}
	};

	FilterGames = (
		_searchInfo,
		_nav,
		initGameDatas,
		initTpList,
		_selProvider
	) => {
		const _gameDatas = initGameDatas ?? this.state.gameDatas;
		const _tpList = initTpList ?? this.state.tpList;

		const gameCategory = _searchInfo.gameType.value;
		const { searchText } = _searchInfo;

		const matchFilter = (_tpId, g) => {
			const matchNav =
				(_nav === defNav.NEW.key && g.new === true) ||
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.FAVOURITE.key &&
					this.state.favorite.includes(`${_tpId}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;
			return (
				matchNav &&
				(gameCategory === null || g.category1 === gameCategory) &&
				(searchText === "" || this.matchKeyword(g.name, searchText)) &&
				(_selProvider ? g.tpId === _selProvider : true)
			);
		};

		return _gameDatas?.filter(g => {
			const tp = _tpList[g.tpId];
			return matchFilter(tp.value, g);
		});
	};

	ClickPlay = freePlay => {
		if (freePlay || this.props.userInfo.isLogin) {
			this.props.throttle(
				() =>
					GET_CASINO_ENTER_PAGE({
						tpId: this.state.selGameInfo.tpId,
						gameId: this.state.selGameInfo.gameId,
						isFree: freePlay,
						langId: this.props.userInfo.langId,
						execFunction:
							this.state.selGameInfo.tpId ===
							defSpecialSetting.playTech
								? this.props.handleGoToGame.bind(this, {
										langId: this.props.userInfo.langId,
										tpId: this.state.selGameInfo.tpId,
										gameId: this.state.selGameInfo.gameId,
										isFun: freePlay,
										tpGameType:
											defSlotTpGameType.PT.tpGameType
								  })
								: null,
						tpGameType: Object.values(defSlotTpGameType).find(
							obj => this.state.selGameInfo.tpId === obj.tpId
						).tpGameType
					}),
				freePlay ? 0 : 5000
			);
		} else {
			this.props.handleLogin({
				selGameInfo: this.state.selGameInfo,
				selProvider: this.state.selProvider,
				searchInfo: this.state.searchInfo,
				selNav: this.state.selNav
			});
		}
	};

	SetMoreItems = () => {
		const _searchInfo = this.state.searchInfo;
		const _selNav = this.state.selNav;
		const _selProvider = this.state.selProvider;
		const initGameDatas = this.state.gameDatas;
		const initTpList = this.state.tpList;
		const s = this.state;

		if (s.hasMore && initGameDatas) {
			const _gameDatas = this.FilterGames(
				_searchInfo,
				_selNav,
				initGameDatas,
				initTpList,
				_selProvider
			);
			const restCount = _gameDatas?.length - s.displayedCount;
			const loadCount =
				restCount >= eachPageItem ? eachPageItem : restCount;
			const startIdx = s.displayedCount;
			const endIdx = startIdx + loadCount;

			const newItem = [];
			for (let i = startIdx; i < endIdx; i++) {
				newItem.push(_gameDatas[i]);
			}

			if (newItem.length !== 0 && this.mounted) {
				const new_count = s.displayedCount + newItem.length;
				if (this.mounted) {
					const displayGames = s.displayGames ?? [];
					this.setState({
						displayGames: [...displayGames, ...newItem],
						hasMore: new_count < _gameDatas?.length,
						displayedCount: new_count
					});
				}
			} else if (this.mounted) {
				if (s.displayGames === null) {
					this.setState({
						hasMore: false,
						displayGames: []
					});
				} else {
					this.setState({
						hasMore: false
					});
				}
			}
		}

		this.trigger = false;
	};

	IsFavorite = () => {
		return this.state.favorite.includes(
			`${this.state.selProvider}_${this.state.selGameInfo.gameId}`
		);
	};

	render() {
		return (
			<>
				<Slider />
				<div
					className={`functionList${
						this.state.listFixed ? " active" : ""
					}`}>
					<div className="partnerSelect">
						<GameProviders
							selNav={this.state.selProvider}
							SelectNav={this.SelectProvider}
							sorted={this.state.sorted}
						/>
					</div>
					<Nav
						selNav={this.state.selNav}
						SelectNav={this.SelectNav}
					/>
					<SearchBox
						{...this.state.searchInfo}
						EditSearchField={this.EditSearchField}
					/>
				</div>

				<Games
					SelectGame={this.SelectGame}
					Games={this.state.displayGames}
					Favorite={this.state.favorite}
					SetFavorite={this.SetFavorite}
					TpList={this.state.tpList}
					i18n={this.props.i18n}
					imgUrl={this.state.imgUrl}
					ref={this.gameList}
				/>

				{this.state.selGameInfo === null ? null : (
					<div className="slotpopup active">
						<div className="slotFunction">
							<img
								src={`${this.state.imgUrl}/${
									this.state.tpList[
										this.state.selGameInfo.tpId
									]?.name
								}/${
									this.state.selGameInfo.imgName[
										this.props.userInfo.langId
									] ?? this.state.selGameInfo.imgName.en
								}`}
								alt={
									this.state.selGameInfo.name[
										this.props.userInfo.langId
									] ?? this.state.selGameInfo.name.en
								}
							/>
							<div className="gameTitle">
								<div className="title text-org">
									{this.state.selGameInfo.name[
										this.props.userInfo.langId
									] ?? this.state.selGameInfo.name.en}
								</div>
								<span
									onClick={() =>
										this.SetFavorite(
											this.state.selProvider,
											this.state.selGameInfo.gameId
										)
									}
									className={`icon icon-star-${
										this.IsFavorite() ? "full" : "empty"
									}`}
								/>
							</div>
							<button
								className="icon icon-cancel-circle"
								onClick={this.CloseSelGame}
							/>
							<div className="btn-group">
								<button
									className="blue"
									onClick={this.ClickPlay.bind(this, false)}>
									{this.props.i18n.lbl_PlayNow}
								</button>
								{this.state.selGameInfo.playFree ? (
									<button
										className="orange"
										onClick={this.ClickPlay.bind(
											this,
											true
										)}>
										{this.props.i18n.lbl_FreePlay}
									</button>
								) : null}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

// Panel.defaultProps = {
// 	tpId: null
// };

// Panel.propTypes = {
// 	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
// 	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
// 	setNav: PropTypes.func.isRequired,
// 	tpId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
// };

const IndexPage = props => {
	const { throttle } = useSetTimeout();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { handleLogin } = useHandleLogin();
	const link = (
		<Link to={path.home.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const helmet = GetMetaDataByPage({
		path: path.casino.root,
		langId: userInfo.langId
	});

	const selNav = props.location?.state?.nav;
	const selNavIdx = Object.keys(defNav).findIndex(key => key === selNav);
	let tpId = props.tpId ?? props.location.state?.tpId;
	tpId = typeof tpId === "string" && !isNaN(tpId) ? Number(tpId) : tpId;
	return (
		<>
			<Header title={i18n.lbl_Casino} hideLogo={true} link={link} />
			<main className="main casino">
				<Panel
					fromModal={props.location.state?.fromModal}
					i18n={i18n}
					userInfo={userInfo}
					tpId={tpId}
					handleLogin={handleLogin}
					handleGoToGame={handleGoToGame}
					throttle={throttle}
					selNav={selNav}
					selNavIdx={selNavIdx === -1 ? 3 : selNavIdx}
				/>
			</main>
			<Footer />
			{helmet}
		</>
	);
};

IndexPage.defaultProps = {
	tpId: null,
	location: { state: {} }
};

IndexPage.propTypes = {
	tpId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	location: PropTypes.objectOf(PropTypes.any)
};

export default IndexPage;
