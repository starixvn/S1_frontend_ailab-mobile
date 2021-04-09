import React, { useContext } from "react";
import { Link, Match } from "@reach/router";
import { userInfoContext, i18nContext } from "./context";
import path from "../../path";
import { siteInfo } from "../../config";

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	if (userInfo.isLogin === false) {
		return (
			<footer className="footerNew">
				<Match path={path.promotion.root}>
					{props => {
						const isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion" />
								</div>
								<span>{i18n.lbl_Promotion}</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.home.root}>
					{props => {
						const isMatch = props.match !== null;
						return (
							<Link
								to={path.home.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-home" />
								</div>
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>

				<a
					target="_blank"
					rel="noreferrer"
					href={`https://direct.lc.chat/${siteInfo().liveChatId}`}
					className="">
					<div className="circleAnimation">
						<div className="icon icon-contact" />
					</div>
					<span>{i18n.lbl_LiveChat}</span>
				</a>

				<Match path={path.other.root}>
					{props => {
						const isMatch =
							props.location.pathname === `/${path.other.root}`;
						return (
							<Link
								to={path.other.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-more" />
								</div>
								<span>{i18n.lbl_More}</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		);
	}
	return (
		<footer className="footerNew">
			<Match path={path.promotion.root}>
				{props => {
					const isMatch = props.match !== null;
					return (
						<Link
							to={path.promotion.root}
							className={isMatch ? "open" : ""}>
							<div className="circleAnimation">
								<div className="icon icon-promotion" />
							</div>
							<span>{i18n.lbl_Promotion}</span>
						</Link>
					);
				}}
			</Match>

			<Match path={`${path.statement.root}/*`}>
				{props => {
					const isMatch =
						props.match !== null ||
						props.location.pathname ===
							`/${path.financialLog.root}`;
					return (
						<Link
							to={path.statement.root}
							className={isMatch ? "open" : ""}>
							<div className="circleAnimation">
								<div className="icon icon-statement1" />
							</div>
							<span>{i18n.lbl_Statement}</span>
						</Link>
					);
				}}
			</Match>

			<Match path={path.home.root}>
				{props => {
					const isMatch = props.match !== null;
					return (
						<Link
							to={path.home.root}
							className={isMatch ? "open" : ""}>
							<div className="circleAnimation">
								<div className="icon icon-home" />
							</div>
							<span>{i18n.lbl_Home}</span>
						</Link>
					);
				}}
			</Match>

			<a
				target="_blank"
				rel="noreferrer"
				href={`https://direct.lc.chat/${siteInfo().liveChatId}`}
				className="">
				<div className="circleAnimation">
					<div className="icon icon-contact" />
				</div>
				<span>{i18n.lbl_LiveChat}</span>
			</a>

			<Match path={path.member.root}>
				{props => {
					const isMatch =
						props.location.pathname === `/${path.member.root}` ||
						props.location.pathname ===
							`/${path.member.root}/${path.member.sub.bankInfo.root}`;
					return (
						<Link
							to={path.member.root}
							className={isMatch ? "open" : ""}>
							<div className="circleAnimation">
								<div className="icon icon-member" />
							</div>
							<span>{i18n.lbl_Me}</span>
						</Link>
					);
				}}
			</Match>
			{/* <Match path={path.setting.root}>
				{props => {
					const isMatch =
						props.location.pathname === `/${path.setting.root}` ||
						props.location.pathname ===
							`/${path.setting.root}/${path.setting.sub.other.root}`;
					return (
						<Link
							to={path.setting.root}
							className={isMatch ? "open" : ""}>
							<div className="circleAnimation">
								<div className="icon icon-cog" />
							</div>
							<span>{i18n.lbl_Setting}</span>
						</Link>
					);
				}}
			</Match> */}
		</footer>
	);
};

export default Footer;
