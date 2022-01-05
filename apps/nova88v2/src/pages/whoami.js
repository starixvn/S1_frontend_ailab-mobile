import React, { useEffect, useState, useContext } from "react";
import api from "../service/api";
import { popBoxContext, i18nContext } from "../components/common/context";

const IndexPage = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [datas, setDatas] = useState(null);

	useEffect(() => {
		let mounted = true;
		api.site.WhoAMI().then(
			res => {
				if (mounted && res.data.errorCode === 0) {
					setDatas(res.data.data);
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
	return <div className="important">{row}</div>;
};

export default IndexPage;
