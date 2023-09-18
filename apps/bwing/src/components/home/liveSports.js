import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { StreamingNoData } from "../streaming/streaming.noData";
import HomeStreaming from "../streaming/homeStreaming";

const LiveSports = ({ videoList }) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="home-title">
				<i className="icon-livesports" />
				{t("lbl_Sports")}
			</div>
			<div className="home-livesports mb-2">
				{videoList?.map(item => (
					<HomeStreaming
						key={`${item.name}-${item.league}-${item.channel}`}
						{...item}
					/>
				))}
				{videoList.length === 0 && <StreamingNoData />}
			</div>
		</>
	);
};

LiveSports.defaultProps = {
	videoList: []
};

LiveSports.propTypes = {
	videoList: PropTypes.arrayOf(PropTypes.any)
};

export default LiveSports;
