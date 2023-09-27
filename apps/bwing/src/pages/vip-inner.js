import React, { useContext, useEffect, useRef, useState } from "react";
import { AutoPlay, AutoPlayWithBtn } from "../components/common/swipperBanner";
import { userInfoContext } from "../components/common/context";
import { api_site_GetVipBanner } from "../service/api/site";
import { defBannersUrl } from "../components/vip/def";
import VipTable from "../components/vip/vipTable";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const [vipBanner, setVipBanner] = useState([]);
	const isMountedRef = useRef(null);

	const rows = defBannersUrl({ langId: userInfo.langId }).map(b => (
		<img
			key={`VIPBanner-${b}`}
			src={b}
			className="banner"
			alt="vip banner"
		/>
	));

	const vipTableRow = vipBanner?.vipBannerData?.map(item => {
		return (
			<div className="vip-grade-info" key={item.levelName}>
				<div className="vip-grade-icon">
					<img
						src={`https://banner.bw88.io/h5/img/4.0/vip/vip${item?.level}.png`}
						alt=""
					/>
					<div>{item.levelName}</div>
				</div>
				<VipTable vipBanner={item} />
			</div>
		);
	});

	useEffect(() => {
		const getVipBanner = async () => {
			await api_site_GetVipBanner().then(
				res => {
					if (isMountedRef.current && res.data.errorCode === 0) {
						setVipBanner(res.data.data || []);
					} else if (res.data.errorCode !== 0) {
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
		};
		getVipBanner();
	}, [userInfo.langId]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<div className="wrapper">
			<div className="col-12">
				<div className="lobby-top">
					<AutoPlay Rows={rows} />
				</div>
				<div className="vip-grade">
					<AutoPlayWithBtn Rows={vipTableRow ?? []} />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
