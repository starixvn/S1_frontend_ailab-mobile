import React, { useEffect } from "react";
import { useLocation, useNavigate } from "@reach/router";

const News = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const imageURL = searchParams.get("imageURL");
	const content = searchParams.get("content");
	const title = searchParams.get("title");

	useEffect(() => {
		if (!(imageURL && content && title)) {
			navigate("/");
		}
	}, []);

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
