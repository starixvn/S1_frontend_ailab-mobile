import React, { useContext } from "react";
import PropTypes from "prop-types";
import Slider from "../components/casino/slider";
import defNav from "../components/casino/defNav";
import Nav from "../components/casino/nav";
import SearchBox from "../components/casino/searchBox";
import { api_Site_GetGamelistV2 } from "../service/api/site";
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
			selNav: Object.keys(defNav)?.[0]
		};
	}

	componentDidMount() {
		this.mounted = true;
		const { userInfo } = this.props;

		window.addEventListener("mousewheel", this.ScrollBarListener, false);
		window.addEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		api_Site_GetGamelistV2().then(res => {
			if (res.data.errorCode === 0) {
				const _tpList = {};
				const games = [];

				const { providerList } = res.data.data;
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
					this.setState(
						{
							tpList: _tpList,
							gameDatas: games,
							selNav: nav
						},
						() => {
							this.SetMoreItems();
						}
					);
				}
			}
		});

		ScrollBarListener = () => {
			const windowHeight =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;

			const windowScrollTop =
				document.body.scrollTop ||
				window.pageYOffset ||
				document.documentElement.scrollTop;

			const { body } = document;
			const html = document.documentElement;

			const documentHeight =
				Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight,
					html.scrollHeight,
					html.offsetHeight
				) * 0.8;

			if (
				!this.trigger &&
				windowHeight + windowScrollTop >= documentHeight
			) {
				this.trigger = true;
				this.SetMoreItems();
			}
		};

		componentWillUnmount = () => {
			this.mounted = false;
			window.removeEventListener("mousewheel", this.ScrollBarListener);
			window.removeEventListener("touchmove", this.ScrollBarListener, {
				passive: false
			});
		};

		if (userInfo[isLogin]) {
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

	SetFavorite = (tpId, gameId) => {
		const { userInfo } = this.props;
		const { favorite, selNav, displayGames: _displayGames } = this.state;

		const key = `${tpId}_${gameId}`;
		const isRemove = tfavorite?.includes(key);
		const newFav = isRemove
			? favorite?.filter(f => f !== key)
			: [...favorite, key];
		const displayGames =
			isRemove && selNav === defNav.FAVOURITE.key
				? _displayGames.filter(
						g => !(g.tpId === tpId && g.gameId === gameId)
				  )
				: _displayGames;
		if (this.mounted) {
			this.setState({ favorite: newFav, displayGames });
		}
		if (userInfo[isLogin]) {
			api_SetFavoriteGame(tpId, gameId, isRemove);
		}
	};

	SelectNav = navKey => {
		const { selNav } = this.state;
		if (selNav !== navKey) {
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
		const { selGameInfo } = this.state;
		if (selGameInfo === null && this.mounted) {
			this.setState({
				selGameInfo: { tpId, ...gameInfo }
			});
		}
	};

	EditSearchField = (colName, v) => {
		const { searchInfo } = this.state;
		if (JSON.stringify(searchInfo[colName]) !== JSON.stringify(v)) {
			const newData = {
				...searchInfo,
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

	FilterGames = (_searchInfo, _nav, initGameDatas, initTpList) => {
		const { gameDatas, tpList, favorite } = this.state;
		const _gameDatas = initGameDatas ?? gameDatas;
		const _tpList = initTpList ?? tpList;
		const tpId = _searchInfo.provider.value;
		const gameCategory = _searchInfo.gameType.value;
		const { searchText } = _searchInfo;

		const matchFilter = (_tpId, g) => {
			const matchNav =
				(_nav === defNav.NEW.key && g.new === true) ||
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.FAVOURITE.key &&
					favorite.includes(`${_tpId}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;
			return (
				matchNav &&
				(gameCategory === null || g.category1 === gameCategory) &&
				(searchText === "" || this.matchKeyword(g.name, searchText))
			);
		};

		return _gameDatas?.filter(g => {
			const tp = _tpList[g.tpId];
			return (
				(tpId === null || tp.value === tpId) && matchFilter(tp.value, g)
			);
		});
	};

	ClickPlay = freePlay => {
		const { userInfo } = this.props;
		const { selGameInfo, setNav } = this.state;
		if (userInfo.isLogin) {
			GET_CASINO_ENTER_PAGE(
				selGameInfo.tpId,
				selGameInfo.gameId,
				freePlay,
				userInfo.langId
			);
		} else {
			setNav(defNavPanel.login);
		}
	};

	SetMoreItems = () => {
		const {
			searchInfo: _searchInfo,
			setNav: _selNav,
			gameDatas: initGameDatas,
			tpList: initTpList
		} = this.state;

		const s = this.state;
		if (s.hasMore) {
			const _gameDatas = this.FilterGames(
				_searchInfo,
				_selNav,
				initGameDatas,
				initTpList
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
				const newCount = s.displayedCount + newItem.length;
				if (this.mounted) {
					const displayGames = s.displayGames ?? [];
					this.setState({
						displayGames: [...displayGames, ...newItem],
						hasMore: newCount < _gameDatas?.length,
						displayedCount: newCount
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
		const {
			selNav,
			tpList,
			searchInfo,
			displayGames,
			favorite,
			imgUrl,
			selGameInfo
		} = this.stste;
		const { userInfo, i18n, tpId } = this.props;
		return (
			<>
				<Slider />
				<Nav selNav={selNav} SelectNav={this.SelectNav} />
				<SearchBox
					TpList={tpList}
					provider={searchInfo.provider}
					providerList={searchInfo.providerList}
					searchText={searchInfo.searchText}
					gameType={searchInfo.gameType}
					EditSearchField={this.EditSearchField}
					DefaultProvider={tpId}
				/>

				<Games
					SelectGame={this.SelectGame}
					Games={displayGames}
					Favorite={favorite}
					SetFavorite={this.SetFavorite}
					TpList={tpList}
					i18n={i18n}
					imgUrl={imgUrl}
				/>

				{selGameInfo === null ? null : (
					<div className="slotFunction open">
						<div className="title text-org">
							{selGameInfo.name[userInfo.langId] ??
								selGameInfo.name.en}
						</div>
						<button
							className="icon icon-cancel-circle"
							onClick={this.CloseSelGame}
						/>
						<div className="btn-group">
							{selGameInfo.playFree ? (
								<button
									className="white"
									onClick={this.ClickPlay.bind(this, true)}>
									{i18n.lbl_Free}
								</button>
							) : null}
							<button
								className="orange"
								onClick={this.ClickPlay.bind(this, false)}>
								{i18n.lbl_PlayNow}
							</button>
						</div>
					</div>
				)}
			</>
		);
	}
}

Panel.defaultProps = {
	tpId: 0
};

Panel.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tpId: PropTypes.number
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { tpId: _tpId, location } = props;

	let tpId = _tpId ?? location.state?.tpId;
	tpId = typeof tpId === "string" && !isNaN(tpId) ? Number(tpId) : tpId;
	return (
		<Panel i18n={i18n} userInfo={userInfo} setNav={setNav} tpId={tpId} />
	);
};

IndexPage.defaultProps = {
	tpId: 0,
	location: {}
};

IndexPage.propTypes = {
	tpId: PropTypes.number,
	location: PropTypes.objectOf(PropTypes.object)
};

export default IndexPage;
