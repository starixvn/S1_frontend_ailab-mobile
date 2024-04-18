import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import Marquee from "react-fast-marquee";
import path from "apps/goal123/src/path";
import { api_GetAnnouncement } from "../../../service/api/message";
import { userInfoContext } from "../../common/context";
import { GET_LANG_ID } from "../../../service/language";

const HomeMarquee = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { currencyId } = userInfo;
	const navigate = useNavigate();
	const langId = GET_LANG_ID(userInfo.langId);
	const [datas, setDatas] = useState([]);

	useEffect(() => {
		const getAnnouncement = async () => {
			try {
				const res = await api_GetAnnouncement({
					langId,
					currencyId
				});
				setDatas(res.data.data);
			} catch (error) {}
		};
		getAnnouncement();
	}, [langId, currencyId]);

	const clickMarquee = () => {
		if (userInfo.isLogin) {
			navigate(`/${path.announcement.root}`);
		} else {
			navigate(`/${path.login.root}`);
		}
	};

	return (
		<div id="Marquee" className="home-marquee">
			<div className="marquee-box">
				<i className="icon-speaker" style={{ zIndex: "3" }} />
				<Marquee pauseOnHover={true} speed={75} gradient={false}>
					{datas &&
						datas.map(data => (
							<div key={data.subject}>{data.subject}</div>
						))}
				</Marquee>
				<button
					className="btn-info"
					onClick={clickMarquee}
					style={{ zIndex: "3" }}>
					{t("lbl_Home_More")}
				</button>
			</div>
		</div>
	);
};
export default HomeMarquee;
