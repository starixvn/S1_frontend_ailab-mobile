import React from "react";
import PropTypes from "prop-types";
import TandC from "../../service/t_and_c";
import { siteInfo } from "../../config";
import HowToDeposit from "../../styles/img/deposit.png";
import HowToWithdrawal from "../../styles/img/withdraw.png";
import FAQ from "../../styles/img/faqs.png";
import Partner_AB from "../../styles/img/partner/ab.png";
import Partner_AE from "../../styles/img/partner/ae.png";
import Partner_CQ9 from "../../styles/img/partner/cq9.png";
import Partner_GP from "../../styles/img/partner/gameplay.png";
import Partner_PG from "../../styles/img/partner/pg.png";
import Partner_PP from "../../styles/img/partner/pp.png";
import Partner_SA from "../../styles/img/partner/sa.png";
import Bong88 from "../../styles/img/partner/bong88.png";

const Bottom = ({ i18n, langId }) => {
	return (
		<>
			<div className="infoCenter">
				<div className="title">{i18n.lbl_InfoCenter}</div>
				<div>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).HowToDeposit}>
						<img src={HowToDeposit} alt="How To Deposit" />
						<p>{i18n.lbl_HowToDepoist}</p>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).HowToWithdraw}>
						<img src={HowToWithdrawal} alt="How To Withdrawal" />
						<p>{i18n.lbl_HowToWithdraw}</p>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).FAQ}>
						<img src={FAQ} alt="FAQ" />
						<p>{i18n.lbl_FAQ.toUpperCase()}</p>
					</a>
				</div>
				<a
					className="AFFILIATEBtn"
					target="_blank"
					rel="noreferrer"
					href={`${siteInfo(langId).affiliateLink}`}>
					{i18n.lbl_Affiliate_Program.toUpperCase()}
				</a>
			</div>
			<div className="partner">
				<div>
					<img src={Partner_AB} alt="AB" />
					<img src={Partner_AE} alt="AE" />
					<img src={Partner_CQ9} alt="CQ9" />
					<img src={Partner_GP} alt="GP" />
					<img src={Partner_PG} alt="PG" />
					<img src={Partner_PP} alt="PP" />
					<img src={Partner_SA} alt="SA" />
				</div>
				<div className="bong88">
					{i18n.lbl_PoweredBy}
					<img src={Bong88} alt="Bong88" />
				</div>
			</div>
		</>
	);
};

Bottom.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Bottom;
