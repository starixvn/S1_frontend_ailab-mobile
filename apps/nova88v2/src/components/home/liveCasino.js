import React, { useEffect, useContext, useRef } from "react";
import { Link } from "../../route/link";
import path from "../../path";
import { i18nContext } from "../common/context";

const Content = () => {
	const { i18n } = useContext(i18nContext);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<>
			<div className="moduleTitle icon icon-livecasino">
				{i18n.lbl_Casino}
			</div>
			<div className="liveCasinoBox">
				<div className="content">
					<div className="title">{i18n.lbl_casino_world}</div>
					<div className="info">{i18n.lbl_LiveCasinoInfo1}</div>
					<div className="info">{i18n.lbl_LiveCasinoInfo2}</div>
					<div className="info">{i18n.lbl_LiveCasinoInfo3}</div>
					<Link to={path.casino.root}>
						<button className="icon icon-casino">
							{i18n.lbl_Play}
						</button>
					</Link>
				</div>
				<img
					src="https://banner.0814media.net/img/liveCasinoBox/bg.png"
					alt=""
				/>
			</div>
		</>
	);
};

export default Content;
