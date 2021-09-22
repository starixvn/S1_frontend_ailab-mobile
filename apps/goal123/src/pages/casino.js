import React, { useContext } from "react";
import Slider from "../components/casino/slider";
import defNav from "../components/casino/defNav";
import Nav from "../components/casino/nav";
import SearchBox from "../components/casino/searchBox";
import { api_Site_GetGameListByDevice } from "../service/api/site";
import Games from "../components/casino/games";
import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "../components/common/context";
import {
	api_SetFavoriteGame,
	api_GetFavoriteGame
} from "../service/api/account";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";
import { useGotoGame, defSpecialSetting } from "../components/hook/useGotoGame";
import useSetTimeout from "../components/hook/useSetTimeout";
import GameProviders from "../components/casino/gameProviders";
import gameList, { defSlotTpGameType } from "../datas/productList";

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
				provider: { idx: 0, value: null, init: false },
				gameType: { idx: 0, value: null }
			},
			favorite: [],
			selNav: Object.keys(defNav)?.[this.props.selNavIdx ?? 0],
			imgUrl: "",
			selProvider: props.tpId,
			sorted: []
		};
	}

	componentDidMount() {
		this.mounted = true;

		window.addEventListener("mousewheel", this.ScrollBarListener, false);
		window.addEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});

		const sort = [];

		api_Site_GetGameListByDevice().then(res => {
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
					const nav = defNav.ALLGAMES.key;
					const _tplistArr = Object.keys(_tpList);
					gameList.forEach(el => {
						if (el.category === "slots") {
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

					this.setState(
						{
							sorted: sort,
							tpList: _tpList,
							selProvider: this.props.tpId,
							gameDatas: games,
							selNav: this.props.selNav ?? nav,
							imgUrl
						},
						() => this.SetMoreItems()
					);
				}
			}
		});

		if (this.props.userInfo.isLogin) {
			api_GetFavoriteGame().then(res => {
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

	componentWillUnmount = () => {
		this.mounted = false;
		window.removeEventListener("mousewheel", this.ScrollBarListener);
		window.removeEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
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
			api_SetFavoriteGame(tpId, gameId, isRemove);
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

	CloseSelGame = () => {
		if (this.mounted) {
			this.setState({ selGameInfo: null });
		}
	};

	SelectGame = (tpId, gameInfo) => {
		if (this.state.selGameInfo === null && this.mounted) {
			this.setState({
				selGameInfo: { tpId, ...gameInfo }
			});
		}
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

	matchKeyword = (name, _keyword) => {
		const keyword = _keyword.toLowerCase();
		return (
			Object.keys(name)?.filter(key => {
				return name[key].toLowerCase().indexOf(keyword) !== -1;
			}).length > 0
		);
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
		const gameCategory = _searchInfo.gameType?.value;
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
			this.props.setNav(defNavPanel.login);
		}
	};

	SetMoreItems = () => {
		const _searchInfo = this.state.searchInfo;
		const _selNav = this.state.selNav;
		const initGameDatas = this.state.gameDatas;
		const _selProvider = this.state.selProvider;
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

	render() {
		return (
			<>
				<Slider />
				<div className="partnerSelect">
					<GameProviders
						selNav={this.state.selProvider}
						SelectNav={this.SelectProvider}
						sorted={this.state.sorted}
					/>
				</div>
				<Nav selNav={this.state.selNav} SelectNav={this.SelectNav} />
				<SearchBox
					{...this.state.searchInfo}
					EditSearchField={this.EditSearchField}
				/>

				<Games
					SelectGame={this.SelectGame}
					Games={this.state.displayGames}
					Favorite={this.state.favorite}
					SetFavorite={this.SetFavorite}
					TpList={this.state.tpList}
					i18n={this.props.i18n}
					imgUrl={this.state.imgUrl}
				/>

				{this.state.selGameInfo === null ? null : (
					<div className="slotFunctionNew open">
						<div>
							<button
								className="icon icon-cancel-circle"
								onClick={this.CloseSelGame}
							/>
							<div className="content">
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
								<div className="mask" />
							</div>
							<div className="title text-blue">
								{this.state.selGameInfo.name[
									this.props.userInfo.langId
								] ?? this.state.selGameInfo.name.en}
							</div>

							<div className="btn-group">
								{this.state.selGameInfo.playFree ? (
									<button
										className="white"
										onClick={this.ClickPlay.bind(
											this,
											true
										)}>
										{this.props.i18n.lbl_Free}
									</button>
								) : null}
								<button
									className="orange"
									onClick={this.ClickPlay.bind(this, false)}>
									{this.props.i18n.lbl_PlayNow}
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

const IndexPage = props => {
	const { throttle } = useSetTimeout();
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const selNav = props.location?.state?.nav;
	const selNavIdx = Object.keys(defNav).findIndex(key => key === selNav);
	let tpId = props.tpId ?? props.location.state?.tpId;
	tpId = typeof tpId === "string" && !isNaN(tpId) ? Number(tpId) : tpId;
	return (
		<Panel
			i18n={i18n}
			userInfo={userInfo}
			setNav={setNav}
			tpId={tpId}
			handleGoToGame={handleGoToGame}
			throttle={throttle}
			selNav={selNav}
			selNavIdx={selNavIdx === -1 ? 0 : selNavIdx}
		/>
	);
};

export default IndexPage;
