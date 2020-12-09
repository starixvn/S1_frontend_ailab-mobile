import React from "react";
import no1 from "../../styles/img/no1.png";
import no2 from "../../styles/img/no2.png";
import no3 from "../../styles/img/no3.png";
import { number_format } from "../common/common";

const Top3Img = ({ Ranking }) => {
	let img = null;
	if (Ranking === 1) img = <img src={no1} alt="no1" />;
	else if (Ranking === 2) img = <img src={no2} alt="no2" />;
	else if (Ranking === 3) img = <img src={no3} alt="no3" />;
	return img;
};

const RankItem = ({ Ranking, userName, turnover }) => {
	return (
		<ul>
			<li>
				<Top3Img Ranking={Ranking} />
				{Ranking}
			</li>
			<li>{userName}</li>
			<li>{number_format(turnover)}</li>
		</ul>
	);
};

const RankItems = ({ i18n: { lbl_Top }, datas, selected }) =>
	datas?.map((data, idx) => {
		const { userName, wTurnover } = data;
		return (
			<RankItem
				key={`rank-${selected}-${idx}-${userName}-${wTurnover}`}
				Ranking={`${lbl_Top} ${idx + 1}`}
				userName={userName}
				turnover={wTurnover}
			/>
		);
	});

export default RankItems;
