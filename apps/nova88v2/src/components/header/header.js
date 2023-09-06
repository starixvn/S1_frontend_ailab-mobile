import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext, rootContext } from "Context";
import { Link } from "@reach/router";
import classNames from "classnames";
import {
	dragonBoatFestivalEventPeriod,
	isDateRange
} from "@ailab-mobile/common";
import Logo from "../common/logo";
import path from "../../path";
import Balance from "./balance";
import AppDownloadHint from "./appDownloadHint";
import { cloudBannerImgURL } from "../../config";

const HeaderTitle = ({ title = "", link = "", titleClass = "title", navBar }) =>
	title ? (
		<>
			<div className={titleClass}>
				{link} {title}
			</div>
			{navBar}
		</>
	) : null;

const Header = ({
	title,
	hideLogo,
	filter,
	children,
	link,
	titleClass = "title",
	navBar,
	id,
	hideId,
	isShowInput,
	searchInput,
	setSearchInput,
	appHint,
	setAppHint
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { root } = useContext(rootContext);
	const headerClassName = !title ? "" : "header";
	const [isShowSearchInput, setIsShowSearchInput] = useState(false);

	const handleInputClose = () => {
		if (searchInput !== "") {
			setSearchInput("");
		} else {
			setIsShowSearchInput(false);
		}
	};

	const handleInputChange = e => {
		setSearchInput(e.target.value);
	};

	const titleJudge = () => {
		if (title) {
			return isShowInput ? (
				<div className="title searchBar">
					<Link to={path.home.root}>
						<i className="icon icon-keyboard_arrow_left" />
					</Link>
					{title}
					<i
						className="icon icon-search"
						onClick={() => setIsShowSearchInput(true)}
					/>
					<div
						className={`infoModule ${
							isShowSearchInput && "active"
						}`}>
						<div className="inputBox">
							<input
								value={searchInput}
								onChange={e => handleInputChange(e)}
								placeholder="Search"
							/>
							<i
								className="icon icon-close"
								onClick={handleInputClose}
							/>
						</div>
					</div>
				</div>
			) : (
				<HeaderTitle
					title={title}
					link={link}
					titleClass={titleClass}
					navBar={navBar}
				/>
			);
		}

		return <HeaderInfo userInfo={userInfo} i18n={i18n} />;
	};

	return (
		<header className={headerClassName} id={hideId ? "" : id}>
			{hideLogo ? null : (
				<AppDownloadHint
					i18n={i18n}
					root={root}
					appHint={appHint}
					setAppHint={setAppHint}
				/>
			)}
			{titleJudge()}
			{filter || null}
			{children}
		</header>
	);
};

const HeaderInfo = ({ userInfo, i18n }) => {
	return (
		<div
			className={classNames("headerModule", {
				dragon: isDateRange(dragonBoatFestivalEventPeriod)
			})}>
			<a href={`/${userInfo.langId}`}>
				{isDateRange(dragonBoatFestivalEventPeriod) ? (
					<>
						<img
							src={`${cloudBannerImgURL}/h5/img/${
								userInfo.langId === "cs"
									? "dragon-logo_cs"
									: "dragon-logo"
							}.png`}
							alt="logo"
							className="dragonlogo"
						/>
						<img
							className="dragon-light"
							src={`${cloudBannerImgURL}/h5/img/dragon-light.png`}
							alt="logo"
						/>
					</>
				) : (
					// 端午節活動 logo 跟網站其他 logo 用的顏色不一樣

					<Logo langId={userInfo.langId} />
				)}
			</a>
			<a className="splogo" />
			{userInfo.isLogin ? (
				<div>
					<div className="headerInfo">
						{i18n.lbl_Welcome}
						<Link className="MemberID" to={path.profile.root}>
							{userInfo.userName}
						</Link>
					</div>
					<Balance i18n={i18n} userInfo={userInfo} />
				</div>
			) : null}
		</div>
	);
};

HeaderInfo.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

Header.defaultProps = {
	filter: null,
	title: null,
	hideLogo: false,
	link: null,
	children: null,
	titleClass: undefined,
	navBar: null,
	id: "header",
	hideId: false,
	isShowInput: false,
	searchInput: "",
	setSearchInput: null,
	appHint: false,
	setAppHint: null
};

Header.propTypes = {
	filter: PropTypes.node,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	hideLogo: PropTypes.bool,
	link: PropTypes.node,
	children: PropTypes.node,
	titleClass: PropTypes.string,
	navBar: PropTypes.node,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	hideId: PropTypes.bool,
	isShowInput: PropTypes.bool,
	searchInput: PropTypes.string,
	setSearchInput: PropTypes.func,
	appHint: PropTypes.bool,
	setAppHint: PropTypes.func
};

HeaderTitle.defaultProps = {
	title: false,
	link: "",
	titleClass: null,
	navBar: null
};

HeaderTitle.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	link: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	titleClass: PropTypes.string,
	navBar: PropTypes.node
};

export default Header;
