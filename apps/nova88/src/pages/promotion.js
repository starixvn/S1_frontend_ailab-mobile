import React from "react";
import { Promotion } from "@ailab-mobile/promotion";
import config, { siteInfo } from "../config";

export default () => {
	return <Promotion config={config} siteInfo={siteInfo} />;
};
