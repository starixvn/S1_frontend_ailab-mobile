import React, { useContext } from "react";
import { popBoxContext } from "../common/context";
import no1 from "../../styles/img/no1.png";
import no2 from "../../styles/img/no2.png";
import no3 from "../../styles/img/no3.png";

const Event = ({ isOpen, i18n = {} }) => {
	const { setPopBox } = useContext(popBoxContext);
	const HandlePopBox = () => {
		const ClickClose = () => {
			setPopBox({
				isOpen: false
			});
		};
		setPopBox({
			isOpen: true,
			title: i18n.lbl_Ranking,
			content: (
				<p>
					All top 10 daily winners from 4 category (Esports, Sports,
					Live Casino and Slots Game) will be awarded E-Coin
					respectively according to ranking. The winning table will
					update every 30 minutes
				</p>
			),
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={ClickClose}>
						OK
					</button>
				</div>
			)
		});
	};
	return (
		<div className={`rankEvent${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<div className="eventTitle">{i18n.lbl_Event}</div>
			<div className="rankList">
				<ul>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_Rewards}</li>
				</ul>
				<ul>
					<li>
						<img src={no1} alt="no1" />
						{`${i18n.lbl_Top} 1`}
					</li>
					<li>1,000,000.00</li>
				</ul>
				<ul>
					<li>
						<img src={no2} alt="no2" />
						{`${i18n.lbl_Top} 2`}
					</li>
					<li>1,000,000.00</li>
				</ul>
				<ul>
					<li>
						<img src={no3} alt="no3" />
						{`${i18n.lbl_Top} 3`}
					</li>
					<li>1,000,000.00</li>
				</ul>
				<ul>
					<li>{`${i18n.lbl_Top} 4-7`}</li>
					<li>1,000,000.00</li>
				</ul>
				<ul>
					<li>{`${i18n.lbl_Top} 8-10`}</li>
					<li>1,000,000.00</li>
				</ul>
			</div>
			<div className="btn-group">
				<button className="orange openPopup" onClick={HandlePopBox}>
					{i18n.lbl_MoreDetails}
				</button>
			</div>
		</div>
	);
};

export default Event;
