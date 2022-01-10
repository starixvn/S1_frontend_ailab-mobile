import React, { useContext } from "react";
// import { Redirect } from "@reach/router";
// import PropTypes from "prop-types";
import { userInfoContext } from "../components/common/context";

const errorPageUrl = "https://error.bw88.io";

export default () => {
	// const [data, setData] = useState({
	// Maintain: true,
	// DateTimeStart: "2021-12-20 11:00:00",
	// UTCTimeStart: "1639969200",
	// DateTimeEnd: "2021-12-20 17:00:00",
	// UTCTimeEnd: "1639990800"
	// });
	// useEffect(() => {
	// 	let mounted = true;
	// 	fetch(`${errorPageUrl}/maintain.json`, {
	// 		// mode: "no-cors"
	// 	})
	// 		.then(res => {
	// 			console.log(res);
	// 			return res.json();
	// 		})
	// 		.then(json => {
	// 			console.log(json);
	// 			if (mounted) {
	// 				setData(json);
	// 			}
	// 		});
	// 	return () => {
	// 		mounted = false;
	// 	};
	// }, []);
	// return (
	// 		<UMPage data={data} />
	// );

	return <UMPage />;
};

const UMPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const lang = userInfo?.langId.replace("_en");

	// if (data.Maintain === false) {
	// 	return <Redirect to={`/${userInfo.langId}`} noThrow />;
	// }

	return (
		<iframe
			style={{
				minHeight: "100vh"
			}}
			title="um"
			width="100%"
			height="100%"
			frameBorder="0"
			src={`${errorPageUrl}/UM/index_${lang}.html`}
		/>
	);

	// return (
	// 	data.Maintain && (
	// 		<iframe
	// 			title="um"
	// 			width="100%"
	// 			height="100%"
	// 			frameBorder="0"
	// 			src={`${errorPageUrl}/UM/index_${lang}.html`}
	// 		/>
	// 	)
	// );
};

// UMPage.propTypes = {
// 	data: PropTypes.objectOf(PropTypes.any).isRequired
// };
