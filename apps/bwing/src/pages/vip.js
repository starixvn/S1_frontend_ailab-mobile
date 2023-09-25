import React, { useContext, useEffect, useRef } from "react";
import { userInfoContext } from "../components/common/context";
import { Info } from "../components/vip/info";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<div className="wrapper">
			<div className="col-12">
				<div className="col-12">
					<div className="lobby-top">
						<div className="lobby-banner">
							<img
								src={`${process.env.REACT_APP_BANNER_URL}/h5/img/4.0/vip/en/all-banner.jpg`}
								alt=""
							/>
						</div>
					</div>
					<Info langId={userInfo.langId} />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
