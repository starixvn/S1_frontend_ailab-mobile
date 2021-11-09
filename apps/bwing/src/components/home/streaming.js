import React, { useEffect, useContext, useRef } from "react";
import { Link } from "@reach/router";
import path from "../../path";
import { userInfoContext, i18nContext } from "../common/context";
import { StreamingNoData } from "../streaming/streaming.noData";
import { StreamingModule } from "../streaming/streaming.row";
import { useHandleStreamList } from "../streaming/hook";

const Content = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const { videoList } = useHandleStreamList({});

	const rows = videoList?.map((v, vIdx) => (
		<StreamingModule
			key={`home-streaming-${v.type}-${v.matchID}-${vIdx}`}
			i18n={i18n}
			langId={userInfo.langId}
			isLogin={userInfo.isLogin}
			actStatus={userInfo.actStatus}
			{...v}
		/>
	));

	return (
		<div className="top10Aear">
			<div className="topImg" />
			<div className="title">
				{i18n.lbl_LiveStreaming.toUpperCase()}
				<Link to={`/${path.streaming.root}`}>{i18n.lbl_More}...</Link>
			</div>
			<div className="top10Box">
				{rows.length <= 0 ? (
					<StreamingNoData i18n={i18n} />
				) : (
					<div>{rows}</div>
				)}
			</div>
		</div>
	);
};

export default Content;
