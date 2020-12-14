import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext } from "../components/common/context";
import path from "../path";

export default () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="promodule">
			<Link className="btn-cancel" to={`/${path.ranking.root}`}>
				{i18n.lbl_Back}
			</Link>
			<div className="protitle">23456789876543</div>
			<div className="text">
				0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
			</div>
			<div className="info">
				<ul>
					<li>
						<span className="title">Min Amount</span>
						<span>2,000</span>
					</li>
					<li>
						<span className="title">BONUS</span>
						<span>Malaysian Ringgit 100%</span>
					</li>
					<li>
						<span className="title">MAX BONUS AMOUNT</span>
						<span>Malaysian Ringgit 388</span>
					</li>
					<li>
						<span className="title">ROLLOVER</span>
						<span>18x</span>
					</li>
					<li>
						<span className="title">REMAINING TIME</span>
						<span>30 days6 hours</span>
					</li>
				</ul>
			</div>
			<div className="protitle">Significant Conditions</div>
			<div className="text">
				<ol>
					<li>
						This promotion applies only to Malaysian Ringgit account
						players;
					</li>
					<li>
						This promotion starts at until{" "}
						<span id="ExpiryTime">July 31 ,2020 23:59</span>{" "}
						(“Promotion Period”).
					</li>
					<li>
						To qualify, the player must have made their First
						Deposit and have not made any withdrawal requests
						before.
					</li>
					<li>
						A Bonus of up to Malaysian Ringgit 388 based on the
						First Deposit amount will be credited to qualified
						players within 48 hours;
					</li>
					<li>
						The Bonus and Qualifying Deposit amount used are subject
						to a 18 times rollover requirement within 30 days on any
						Nova88 products, except Casino, Live Casino,Virtual
						Games, Poker, Fishing Games, Chess Games and Cash Out.
					</li>
				</ol>
			</div>
			<div className="protitle">
				FULL PROMOTION SPECIFIC TERMS AND CONDITIONS
			</div>
			<div className="text">
				<ol>
					<li>
						To be eligible for the Promotion, players must meet all
						the criteria below (“Qualified Player”):
					</li>
					<ol>
						<li>
							Have chosen Malaysian Ringgit as their preferred
							currency,
						</li>
						<li>
							Have made their first approved deposit to their
							Nova88 account during the promotion period.
						</li>
					</ol>
					<li>
						Qualified Players will be awarded with a 100% bonus
						based on their first approved deposit amount made during
						the Promotion Period, up to a maximum of Malaysian
						Ringgit 388, as illustrated below:
					</li>
					<li>
						The Qualified Player is required to click on the “JOIN
						NOW” button within the Promotion-Specific Terms and
						Conditions page upon login to their Nova88 account at
						www.Nova88.net to claim the Bonus.
					</li>
					<li>
						The Qualified Member is not allowed to cancel the Bonus
						once it is credited to their Nova88 account.
					</li>
					<li>
						The bonus received and deposit amount used to generate
						the bonus (“Qualifying Deposit”) by the Qualified Player
						from the Promotion are subject to a 18 times rollover
						requirement in all Nova88 products, except casino, live
						casino, virtual game, poker, fishing game, chess games,
						indo 4D and cash out products, before any withdrawal can
						be made. General withdrawal rule applies for all other
						deposit amounts not used for the promotion.
					</li>
					<li>
						The Qualified Player is allowed to participate in only
						one (1) ‘First Time Deposit Bonus’ related promotion
						offered by Nova88. Should the Qualified Player
						participate in more than one (1), only the first
						approved ‘First Time Deposit Bonus’ related promotion
						received by Nova88 from such Qualified Player will be
						considered valid and participation in all other ‘First
						Time Deposit Bonus’ related promotions will be void.
					</li>
					<li>
						The Qualified Player will be disqualified from the
						Promotion if any withdrawals are made before the Bonus
						is credited to their Nova88 account.
					</li>
					<li>
						Only wagers in Nova88 that generate a win/loss return
						will be contributed to the rollover requirement. Cash
						Out, cancelled or void wagers, wagers on odds less than
						1.5 (Decimal odd); 0.5 (China odd); 0.5 (Malay Positive
						odd); -2.0(Indo odd); -200 (US odd), or wagers on both
						even-chances during a single game will not count towards
						this requirement.
					</li>
					<li>
						The rollover requirement will be considered fulfilled if
						the Qualified Player’s account balance is less than the
						minimum stake amount allowed (i.e. Malaysian Ringgit 5)
					</li>
					<li>
						Nova88 reserves the right to amend or withdraw the
						Promotion at any time.
					</li>
					<li>
						Nova88 is the sole arbiter of the Promotion and its
						decision is final.
					</li>
					<li>
						Nova88{" "}
						<a
							href="/SiteSkin/Nova88/Static/en/Promotion.html"
							target="_blank">
							Standard Terms and Conditions
						</a>{" "}
						apply.
					</li>
				</ol>
			</div>
		</div>
	);
};
