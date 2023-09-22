import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";

const News = ({ news }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<>
			<div className="home-title">
				<i className="icon-news" />
				{t("lbl_SiteNews")}
			</div>
			<div className="home-news">
				<div className="home-news-content">
					{news.map(({ imageURL, content, newsId }) => (
						<div key={newsId} className="home-news-item">
							<img src={imageURL} alt="" />
							<div className="home-news-info">
								<span>{content}</span>
								<a
									onClick={() =>
										navigate(`/${paths.news.root}`)
									}>
									${t("lbl_Read_more")} &gt;&gt;
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

News.defaultProps = {
	news: []
};

News.propTypes = {
	news: PropTypes.arrayOf(PropTypes.any)
};

export default News;
