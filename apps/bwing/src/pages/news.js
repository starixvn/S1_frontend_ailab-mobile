import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "@reach/router";
import { userInfoContext } from "../components/common/context";
import { api_GetNews } from "../service/api/news";

const News = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const paramsNewsId = searchParams.get("newsId");
	const [news, setNews] = useState([]);
	const { userInfo } = useContext(userInfoContext);

	const newObject = () => {
		return news?.find(newObj => newObj?.newsId === Number(paramsNewsId));
	};

	const { title, imageURL, content } = newObject() || {};

	const getNews = async () => {
		try {
			const res = await api_GetNews({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			setNews(res.data.data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	useEffect(() => {
		if (!paramsNewsId) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		getNews();
	}, [userInfo?.langId]);

	return (
		<div className="wrapper">
			<div className="col-12">
				<div className="lobby-top">
					<img
						className="lobby-news-img"
						src={imageURL}
						alt={title}
					/>
				</div>
				<div className="lobby-news">
					<div className="lobby-news-title">{title}</div>
					<div className="lobby-news-content">{content}</div>
				</div>
			</div>
		</div>
	);
};

export default News;
