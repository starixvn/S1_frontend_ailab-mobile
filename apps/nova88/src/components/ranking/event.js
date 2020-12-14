import React from "react";
import { defBtnsOfCategory } from "./def";
import BtnBar from "./btnBar";
import { useHandleSelect } from "./hook";
import PrizeList from "./prize";
import { Link } from "@reach/router";
import path from "../../path";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtnsOfCategory.Sports.value
	});

	return (
		<div className={`rankEvent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<div className="eventTitle">{i18n.lbl_EventTitle}</div>
			<BtnBar
				i18n={i18n}
				selected={selected}
				handleSelect={handleSelect}
				mainKey="leader-board-records-btnsOfCategory"
				defBtns={defBtnsOfCategory}
			/>
			<PrizeList userInfo={userInfo} category={selected} i18n={i18n} />
			<div className="btn-group">
				<Link
					to={`/${path.rankingTNC.root}`}
					className="orange openPopup">
					{i18n.lbl_MoreDetails}
				</Link>
			</div>
		</div>
	);
};

export default Event;
