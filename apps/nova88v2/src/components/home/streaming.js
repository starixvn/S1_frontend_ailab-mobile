import React, { useEffect, useContext, useRef } from "react";
import { Link } from "../../route/link";
import path from "../../path";
import { userInfoContext, i18nContext } from "../common/context";
import { defStreamingCategory } from "../streaming/defStreaming";
import { useGetVideo } from "../streaming/hook";
import { StreamingModule } from "../streaming/streaming.row";
import { StreamingNoData } from "../streaming/streaming.noData";

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

	const { handleSelectCategory, selCategory } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});

	const btns = Object.values(defStreamingCategory).map(t => (
		<button
			key={`home-streaming-${t.type}`}
			className={`${t.icon}${
				t.type === selCategory.type ? " active" : ""
			}`}
			onClick={handleSelectCategory.bind(this, t.type)}
		/>
	));

	const rows = selCategory.datas
		?.filter((_, idx) => idx < 3)
		.map(v => {
			return (
				<StreamingModule
					key={`home-streaming-${v.type}-${v.matchID}`}
					i18n={i18n}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					{...v}
				/>
			);
		});

	return (
		<>
			<div className="moduleTitle icon icon-film">
				{i18n.lbl_LIVE_SPORT}
				<Link to={path.streaming.root}>{i18n.lbl_More}...</Link>
			</div>
			<div className="liveTvTag">{btns}</div>
			<div className="liveTv active">
				{rows.length <= 0 ? <StreamingNoData i18n={i18n} /> : rows}
			</div>
		</>
	);
};

export default Content;
