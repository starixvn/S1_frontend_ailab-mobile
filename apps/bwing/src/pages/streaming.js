import React, { useContext, useRef, useEffect } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import { StreamingNoData } from "../components/streaming/streaming.noData";
import { StreamingModule } from "../components/streaming/streaming.row";
import {
	useHandleStreamList,
	useSelCategory
} from "../components/streaming/hook";
import Filter from "../components/header/filter";

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

	const arr = videoList?.map(v => (
		<StreamingModule
			key={`home-streaming-${v.type}-${v.channel}-${v.timeStart}`}
			i18n={i18n}
			langId={userInfo.langId}
			isLogin={userInfo.isLogin}
			isStreamingPage={true}
			tpId={selCategory.tpId}
			gameId={selCategory.gameId}
			actStatus={userInfo.actStatus}
			{...v}
		/>
	));

	return (
		<>
			<Filter
				handleSelect={handleSelectCategory}
				selected={selCategory?.type}
			/>
			<div className="liverightModule">
				<div className="livelist">
					{arr.length <= 0 ? (
						<StreamingNoData />
					) : (
						<div className="opentv active">{arr}</div>
					)}
				</div>
			</div>
		</>
	);
};

export default IndexPage;
