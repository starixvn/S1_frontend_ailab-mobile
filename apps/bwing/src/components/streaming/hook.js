import { useState, useEffect, useContext } from "react";
import { userInfoContext, i18nContext, popBoxContext } from "../common/context";
import { defStreamingCategory } from "./defStreaming";
import { api_GetLiveStreamingList } from "../../service/api/video";
import path from "../../path";

export const useSelCategory = () => {
	const [selCategory, setSelCategory] = useState({
		type: defStreamingCategory.FOOTBALL.type,
		tpId: defStreamingCategory.FOOTBALL.tpId,
		gameId: defStreamingCategory.FOOTBALL.gameId
	});
	const handleSelectCategory = type => {
		setSelCategory({
			type,
			tpId: defStreamingCategory[type].tpId,
			gameId: defStreamingCategory[type].gameId
		});
	};
	return { selCategory, handleSelectCategory };
};

export const useHandleStreamList = ({ selCategory }) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [all, setAll] = useState([]);
	const [videoList, setVideoList] = useState([]);

	useEffect(() => {
		api_GetLiveStreamingList(userInfo.langId).then(
			res => {
				if (res.data.errorCode === 0) {
					if (window.location.pathname !== path.home.root) {
						setAll(res.data.data);
						setVideoList(
							res.data.data.filter(
								v => v.type === selCategory?.type
							)
						);
					} else {
						setAll(res.data.data);
						setVideoList(res.data.data);
					}
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	}, [userInfo.langId]);

	useEffect(() => {
		if (window.location.pathname === `/${path.home.root}`) {
			setVideoList(all);
		}
		if (window.location.pathname === `/${path.streaming.root}`) {
			setVideoList(all.filter(v => v.type === selCategory?.type));
		}
	}, [selCategory]);

	return { videoList };
};
