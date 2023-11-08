import React, { useContext } from "react";
import { Link } from "../route/link";
import Kiss918 from "../components/918kiss/918kiss";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Header from "../components/header/header";
import { Footer } from "../components/common/footer";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});
	const link = (
		<Link to="/">
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	return canSee ? (
		<>
			<Header title="918 Kiss" hideLogo={true} link={link} />
			<main className="installGuide">
				<Kiss918 />
			</main>
			<Footer />
		</>
	) : null;
};

export default IndexPage;
