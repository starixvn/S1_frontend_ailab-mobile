import React, { useState } from "react";
import TestItem from "./TestItem";

const HomeSideBar = () => {
	const [activeButton, setActiveButton] = useState("hotgame"); // 預設激活的是 "hotgame"

	const buttons = [
		{ id: "hotgame", text: "hot", hasNew: false },
		{ id: "sports", text: "sports", hasNew: true },
		{ id: "games", text: "games", hasNew: false },
		{ id: "esports", text: "esports", hasNew: true },
		{ id: "casino", text: "casino", hasNew: false },
		{ id: "slots", text: "slots", hasNew: false },
		{ id: "fishing", text: "fishing", hasNew: false },
		{ id: "lottery", text: "lottery", hasNew: false },
		{ id: "cockfigting", text: "cockfighting", hasNew: true }
	];

	const imgUrl = "https://banner.goal123.org/h5/img/home-page/icon/btn-";

	const handleButtonClick = id => {
		setActiveButton(id);
	};

	return (
		<div className="home-categorymenu">
			<div className="home-sidebar">
				<div className="sidebar-tab">
					{buttons.map(button => (
						<button
							key={button.id}
							className={`btn-${button.id} ${
								activeButton === button.id ? "active" : ""
							}`}
							onClick={() => handleButtonClick(button.id)}>
							{button.hasNew && <div className="new-icon" />}
							<div className="category-icon">
								<img
									src={`${imgUrl}${button.id}${
										activeButton === button.id
											? "-active"
											: ""
									}.svg`}
									alt=""
								/>
							</div>
							<span>{button.text}</span>
						</button>
					))}
				</div>
			</div>

			{/* <div className="home-gamelist">
				<div
					className={`gamelist-box ${
						activeButton === "hotgame" ? "active" : ""
					}`}>
					123
				</div>
				<div
					className={`gamelist-box ${
						activeButton === "fishing" ? "active" : ""
					}`}>
					456
				</div>
				<div
					className={`gamelist-box ${
						activeButton === "esports" ? "active" : ""
					}`}>
					789
				</div>
			</div> */}
		</div>
	);
};

export default HomeSideBar;
