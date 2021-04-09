import { useState, useEffect } from "react";
import { defStreamingCategory } from "./defStreaming";
import api from "../../service/api";

export const useGetVideo = ({ langId, isMounted }) => {
	const [videoList, setVideoList] = useState([]);
	const [selCategory, setSelCategory] = useState({
		type: defStreamingCategory.FOOTBALL.type,
		tpId: defStreamingCategory.FOOTBALL.tpId,
		gameId: defStreamingCategory.FOOTBALL.gameId,
		datas: []
	});

	useEffect(() => {
		api.video.GetLiveStreamingList(langId).then(res => {
			if (isMounted && res.data.errorCode === 0) {
				setVideoList(res.data.data);
				setSelCategory(prev => ({
					...prev,
					datas: res.data.data.filter(v => v.type === prev.type)
				}));
			}
		});
	}, [langId, isMounted]);

	const handleSelectCategory = type => {
		setSelCategory({
			type,
			tpId: defStreamingCategory[type].tpId,
			gameId: defStreamingCategory[type].gameId,
			datas: videoList?.filter(v => v.type === type)
		});
	};

	return { selCategory, handleSelectCategory };
};
