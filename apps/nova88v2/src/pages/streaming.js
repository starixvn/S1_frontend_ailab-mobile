import React, { useContext, useRef, useEffect } from "react";
import Layout from "../components/common/layout";
import Filter from "../components/streaming/filter";
import { userInfoContext, i18nContext } from "../components/common/context";
import Header from "../components/header/header";
import { useGetVideo } from "../components/streaming/hook";
import { StreamingNoData } from "../components/streaming/streaming.noData";
import { StreamingModule } from "../components/streaming/streaming.row";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

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

	const filter = (
		<Filter
			handleSelect={handleSelectCategory}
			selected={selCategory.type}
		/>
	);

	const rows = selCategory.datas?.map(v => {
		return (
			<StreamingModule
				key={`home-streaming-${v.type}-${v.matchID}`}
				i18n={i18n}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				isStreamingPage={true}
				{...v}
			/>
		);
	});

	const header = (
		<Header
			title={i18n.lbl_LiveStreaming}
			hideLogo={true}
			filter={filter}
		/>
	);

	return (
		<Layout header={header} mainClass="main streaming">
			<div className="liveTv active">
				{rows.length <= 0 ? <StreamingNoData i18n={i18n} /> : rows}
			</div>
		</Layout>
	);
};

export default IndexPage;
