import React from "react";
import { Link } from "../route/link";
import Component from "../components/mega888";
import Header from "../components/header/header";
import Layout from "../components/common/layout";
import path from "../path";

const IndexPage = () => {
	const link = (
		<Link to={path.home.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);
	const header = <Header title="Mega888" hideLogo={true} link={link} />;

	return (
		<Layout header={header} mainClass="installGuide mega">
			<Component />
		</Layout>
	);
};

export default IndexPage;
