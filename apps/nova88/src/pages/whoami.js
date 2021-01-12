import React, { useEffect, useState } from "react";
import config from "../config";
import api from "../service/api";

const IndexPage = () => {
	const [datas, setDatas] = useState(null);
	useEffect(() => {
		let mounted = true;
		api.site.WhoAMI({ apiURL: config.apiURL }).then(res => {
			if (mounted) {
				setDatas(res.data.data);
			}
		});
		return () => {
			mounted = false;
		};
	}, []);

	const row =
		datas &&
		Object.keys(datas).map(key => {
			return (
				<p>
					{key}: {datas[key]}
				</p>
			);
		});
	return <div className="info">{row}</div>;
};

export default IndexPage;
