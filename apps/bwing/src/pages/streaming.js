import React, { useContext, useRef, useEffect } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import { StreamingNoData } from "../components/streaming/streaming.noData";
import { StreamingModule } from "../components/streaming/streaming.row";
import {
	useHandleStreamList,
	useSelCategory
} from "../components/streaming/hook";
import Header from "../components/header/header";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const { handleSelectCategory, selCategory } = useSelCategory();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const { videoList } = useHandleStreamList({
		selCategory
	});

	const arr = videoList?.map((v, vidx) => (
		<StreamingModule
			key={`home-streaming-selCategory-${v.type}-${vidx}`}
			i18n={i18n}
			langId={userInfo.langId}
			isLogin={userInfo.isLogin}
			isStreamingPage={true}
			tpId={selCategory.tpId}
			gameId={selCategory.gameId}
			{...v}
		/>
	));

	return (
		<>
			<Header
				hideBtn={true}
				title={i18n.lbl_LiveStreaming}
				hideLogo={true}
				showMenuBar={true}
				handleSelectCategory={handleSelectCategory}
				selCategory={selCategory}
			/>
			<main className="main">
				<div className="liverightModule">
					<div className="livelist">
						{arr.length <= 0 ? (
							<StreamingNoData i18n={i18n} />
						) : (
							<div className="opentv active">{arr}</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default IndexPage;
