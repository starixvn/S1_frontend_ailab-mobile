import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/withdrawal/withdrawal";
import { withdrawal as withdrawalTabs } from "../datas/defTabs";

const IndexPage = props => {
	const defTabs = withdrawalTabs;
	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<Content isCrypto={props.isCrypto} />
		</Layout>
	);
};

IndexPage.defaultProps = {
	isCrypto: false
};

IndexPage.propTypes = {
	isCrypto: PropTypes.bool
};

export default IndexPage;
