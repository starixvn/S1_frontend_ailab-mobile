import React, { useContext } from "react";
import { i18nContext } from "../components/common/context";
import Header from "../components/header/header";
import Layout from "../components/common/layout";
import Main from "../components/worldCup/main";
import WorldCupWrapper from "../components/worldCup/wrapper";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<WorldCupWrapper>
			<Layout
				header={
					<Header title={i18n.lbl_FIFAWorldCup} hideLogo={true} />
				}
				mainClass="worldcupEvent">
				<Main />
			</Layout>
		</WorldCupWrapper>
	);
};

export default IndexPage;
