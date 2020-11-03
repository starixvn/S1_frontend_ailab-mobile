import React from "react";
import { Promotion } from "@ailab-mobile/promotion";
import promotionList from "../datas/promotionList";

export default () => {
	return <Promotion staticList={promotionList} />;
};
