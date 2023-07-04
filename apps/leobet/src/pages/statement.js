import React, { useContext, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "@reach/router";
import { userInfoContext, i18nContext } from "../components/common/context";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { statement_financialLog as statementTabs } from "../datas/defTabs";
import { Filter } from "../components/statement/filter";
import Breadcrumbs from "../components/common/breadcrumb";
import path from "../path";

const IndexPage = props => {
	const defTabs = statementTabs;
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const navigate = useNavigate();
	const today = moment().format("YYYY-MM-DD");

	useEffect(() => {
		navigate(`/${userInfo.langId}/${path.statement.root}/${today}`);
	}, [navigate, today, userInfo.langId]);

	const breadCrumb = (
		<Breadcrumbs
			locationInfo={props}
			root={path.statement.root}
			i18n={i18n}
			customDisplayKey={{ [path.statement.root]: "lbl_QuickPick" }}
		/>
	);

	const filter = <Filter langId={userInfo.langId} />;
	const header = (
		<TabPage defTabs={defTabs} filter={filter} breadCrumb={breadCrumb} />
	);

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}
		/>
	);
};

export default IndexPage;
